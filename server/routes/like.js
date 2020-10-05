const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like')
const { DisLike } = require('../models/DisLike')


router.post("/getLikes", (req, res) => {
    let value = {}
    if (req.body.videoId) {
        value = { videoId: req.body.videoId }
    }
    else {
        value = { commentId: req.body.commentId }
    }

    Like.find(value)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })
});
router.post("/getDisLikes", (req, res) => {
    let value = {}
    if (req.body.videoId) {
        value = { videoId: req.body.videoId }
    }
    else {
        value = { commentId: req.body.commentId }
    }

    DisLike.find(value)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })
});
router.post("/uplike", (req, res) => {
    let value = {}
    if (req.body.videoId) {
        value = { videoId: req.body.videoId, userId: req.body.userId }
    }
    else {
        value = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(value)

    like.save((err, likeResult) => {
        if (err) return res.json({ success: false, err })

        // dislike 클릭됬다며 1 줄인다
        DisLike.findOneAndDelete(value)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })

    })
});
router.post("/unlike", (req, res) => {
    let value = {}
    if (req.body.videoId) {
        value = { videoId: req.body.videoId, userId: req.body.userId }
    }
    else {
        value = { commentId: req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(value)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })


});

router.post("/unDislike", (req, res) => {
    let value = {}
    if (req.body.videoId) {
        value = { videoId: req.body.videoId, userId: req.body.userId }
    }
    else {
        value = { commentId: req.body.commentId, userId: req.body.userId }
    }

    DisLike.findOneAndDelete(value)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
});

router.post("/upDislike", (req, res) => {
    let value = {}
    if (req.body.videoId) {
        value = { videoId: req.body.videoId, userId: req.body.userId }
    }
    else {
        value = { commentId: req.body.commentId, userId: req.body.userId }
    }

    const dislike = new DisLike(value)

    dislike.save((err, dislikeResult) => {
        if (err) return res.json({ success: false, err })

        // like 클릭됬다며 1 줄인다
        Like.findOneAndDelete(value)
            .exec((err, LikeResult) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
            })

    })
});


module.exports = router;