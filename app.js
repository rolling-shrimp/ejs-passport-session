const express = require("express");
const app = express();

const authRoute = require("./Routes/auth");
const profileRoute = require("./Routes/profile");
const con = require("./mysql");
const dotenv = require("dotenv");
dotenv.config();

const cookieSession = require("cookie-session");
const session = require("express-session");
const flash = require("connect-flash");
require("./config/passport");
const passport = require("passport");

//connect to mongoose
// const mongoose = require("mongoose");
// mongoose
//   .connect(process.env.DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connect to mongodb atlas.");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.err_msg = req.flash("err_msg");
  res.locals.error = req.flash("error");
  next();
});
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
// app.use(cookieSession({ keys: [process.env.SECRET] }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
