const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());

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

app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`서버 연결 ${port}`));
