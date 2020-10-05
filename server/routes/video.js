const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { auth } = require('../midleware/auth')
const multer = require('multer')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg');
const { Subscriber } = require('../models/Subscriber');
const { Comment } = require('../models/Comment');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== 'png') {
            return cb(res.status(400).send('mp4 파일만 가능'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")

router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/thumbnail', (req, res) => {

    let filePath = ""
    let fileDuration = ""

    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        fileDuration = metadata.format.duration
    })

    //썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            filePath = "uploads/thumbnails/" + filenames[0]
        })
        .on('end', function () {
            return res.json({ success: true, url: filePath, Duration: fileDuration })
        })
        .on('error', function (err) {
            return res.json({ success: false, err })
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })

})

router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body)
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.get('/getVideo', (req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
})
router.post('/getVideoDetail', (req, res) => {
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, videoData) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, videoData })
        })
})

router.post('/getSubscriptionVideo', (req, res) => {
    Subscriber.find({ userFrom: req.body.userFrom })
        .exec((err, subscriberInfo) => {
            if (err) return res.status(400).send(err)
            let subscribeUser = []
            subscriberInfo.map((Subscribe, index) => {
                subscribeUser.push(Subscribe.userTo)
            })



            Video.find({ writer: { $in: subscribeUser } })
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err)
                    res.status(200).json({ success: true, videos })
                })

        })
})

router.post('/getComment', (req, res) => {
    Comment.find({ "postId": req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
})

module.exports = router;