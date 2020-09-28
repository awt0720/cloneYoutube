const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("몽고 DB 연결됨"))
  .catch((err) => console.log("에러났다..하" + err));

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));

app.use('/uploads', express.static('uploads'));


const port = 8000;

app.listen(port, () => console.log(`서버 연결 ${port}`));