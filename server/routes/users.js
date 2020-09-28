const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../midleware/auth')



router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
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

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.name,
        name: req.user.name,
        role: req.user.role,
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user.id
    }, {
        token: ""
    }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    });
});

module.exports = router;