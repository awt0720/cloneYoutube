const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./midleware/auth");

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const config = require("./config/key");

mongoose
  .connect(config.mongURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("몽고 DB 연결됨"))
  .catch((err) => console.log("에러났다..하" + err));


app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({
      success: false,
      err
    });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 유저 없음",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호 틀림 :( 돌아가",
        });
      }
      user.genToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id
          });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.name,
    name: req.user.name,
    role: req.user.role,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({
    _id: req.user.id
  }, {
    token: ""
  }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});


const port = 8000;

app.listen(port, () => console.log(`서버 연결 ${port}`));