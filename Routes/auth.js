const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const con = require("../mysql");
const loggingout = (req, res, next) => {
  req.logout();
  res.redirect("/");
  next();
};
router.get("/login", (req, res) => {
  console.log(req.session);
  res.render("login.ejs");
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});
router.get("/logout", loggingout, (req, res) => {});
router.get("/signup", (req, res) => {
  res.render("signup.ejs", { user: req.user });
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  con.query("select email from users where email = ?", [email], (ree, row) => {
    console.log(row);
    if (!row.length == 0) {
      req.flash("err_msg", "email already exist");
      res.redirect("/auth/signup");
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);

          return res.status(500).send("An error occurred");
        }
        con.query(
          "insert into users(name,email,password) values(?,?,?)",
          [name, email, hash],
          (err, row) => {
            if (err) {
              req.flash("err_msg", err.errors.name.properties.message);
              console.log(err);
              res.redirect("/auth/signup");
            }
            console.log("create normal account(not google) success");
            req.flash(
              "success_msg",
              "create normal account(not google) success"
            );
            console.log(row);
            // res.send({
            //   msg: "create normal account(not google) success",
            //   obj: row[0],
            // });
            res.redirect("/auth/login");
          }
        );
      });
    }
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "wrong email or password ",
  }),
  (req, res) => {
    console.log(req.session);
    console.log("from the post request of /auth/login " + req.session.returnTo);
    if (req.session.returnTo) {
      var newpath = req.session.returnTo;
      req.session.returnTo = "";
      console.log(newpath);
      res.redirect(newpath);
    } else {
      res.redirect("/profile");
    }
  }
);

module.exports = router;
