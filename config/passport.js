var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");
const con = require("../mysql");
const bcrypt = require("bcrypt");
passport.serializeUser(function (user, cb) {
  console.log("adding to cookie");
  cb(null, user);
});
passport.deserializeUser(function (id, cb) {
  console.log("checking if cookie's id is correct");
  con.query(`select * from users where id = ${id.id}`, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result[0]) {
      console.log("found");
      const { id, name, googleID, date, thumbnail, email } = result[0];
      let user = {
        id: id,
        name: name,
        googleID: googleID,
        date: date,
        thumbnail: thumbnail,
        email: email,
      };

      cb(null, user);
    }
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/redirect",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      con.query(
        "select * from users where googleID = ? ",
        [profile.id],
        (err, result) => {
          console.log(result[0]);
          if (err) {
            console.log(err);
          }
          if (result.length !== 0) {
            console.log("already have the account");
            const { id, name, googleID, date, thumbnail, email } = result[0];
            let user = {
              id: id,
              name: name,
              googleID: googleID,
              date: date,
              thumbnail: thumbnail,
              email: email,
            };
            console.log(user);
            cb(null, user);
          } else {
            con.query(
              "insert into users(name,googleID,thumbnail,email) values(?,?,?,?)",
              [
                profile.displayName,
                profile.id,
                profile.photos[0].value,
                profile.emails[0].value,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                }
                if (result.length !== 0) {
                  cb(null, result);
                }
              }
            );
          }
        }
      );
    }
  )
);
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username, password);
    // console.log(
    //   "local strategy executing confirming password req.session.returnTo= " +
    //     req.seesion.returnTo
    // );
    con.query("select * from users where email = ?", [username], (err, row) => {
      if (err) {
        done(null, false);
      }
      if (row.length == 0) {
        console.log("the email has not been signed up");
        return done(null, false);
      }
      console.log("found the same email");
      bcrypt.compare(password, row[0].password, (err, result) => {
        if (err) {
          done(null, err);
        }
        if (!result) {
          console.log("not the same password");
          done(null, false);
        }
        // console.log(
        //   "password the same req.session.returnTo= " + req.seesion.returnTo
        // );

        console.log(row[0]);
        done(null, row[0]);
      });
    });
  })
);
