const router = require("express").Router();
const con = require("mysql");
const AuthOrNot = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log(req.session);
    console.log(
      "from the profile middleware the originalurl is " + req.session.returnTo
    );
    res.redirect("/auth/login");
  } else {
    next();
  }
};
router.get("/", AuthOrNot, (req, res) => {
  let userInfor = req.user.id;
  console.log(userInfor);
  res.render("profile.ejs", { user: req.user, userID: userInfor });
});
router.get("/post", AuthOrNot, (req, res) => {
  let userInfor = req.user.id;
  console.log(userInfor);
  res.render("post.ejs", { user: req.user, userID: userInfor });
});
router.post("/post", AuthOrNot, async (req, res) => {
  try {
    let theSthff = await con.query("insert into post() values(?,?,?)", []);
    req.flash("success_msg", "insert data success");
  } catch (e) {
    console.log(e);
    req.flash("err_msg", "error occured while fetching the data");
  }
});

module.exports = router;
