const express = require('express');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { log } = require('console');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 创建上传和图片目录
const uploadDir = path.join(__dirname, 'uploads');
const imageDir = path.join(__dirname, 'images');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(imageDir)){
    fs.mkdirSync(imageDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const decodedFilename = decodeURIComponent(file.originalname);
        const uniqueSuffix = '-' + Date.now();
        cb(null, decodedFilename + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    limits: { fileSize: 1000000000 },
    storage: storage,
    fileFilter: function (req, file, cb) {
        const allowedExtensions = new Set(['.mp4', '.png', '.jpg', '.jpeg']);
        const extension = path.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.has(extension)) {
            return cb(new Error('Only .mp4, .png, .jpg and .jpeg files are allowed!'));
        }
        cb(null, true);
    }
});


// 文件上传的路由
app.post('/upload', upload.single('mp4File'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const videoFilePath = req.file.path;
    const previewImageFilename = 'preview-' + Date.now() + '.jpg';
    const previewImagePath = path.join(imageDir, previewImageFilename);

    ffmpeg(videoFilePath)
        .screenshots({
            timestamps: [4.3],
            filename: previewImageFilename,
            folder: imageDir,
            size: '320x240'
        }).on('end', () => {
            res.send({
                status: 0,
                message: "上传成功",
                imageUrl: `http://localhost:${port}/images/${previewImageFilename}`
            });
        }).on('error', (err) => {
            console.error('Error processing video:', err);
            res.status(500).send('Could not process video file');
        });
});

// 用户登录的路由
app.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body.email === "1@qq.com") {
        res.send({
            message: "登录成功",
            status: 0,
            token: "mhy 2778623708@qq.com"
        });
    } else {
        res.send({
            message: "登录失败",
            status: 1
        });
    }
});

app.post('/signup', (req, res) => {
    res.send({
        message: "注册成功",
        status: 0
    });
    console.log(req.body);
});

app.post('/rename', (req, res) => {
    res.send({
        message: "修改成功",
        status: 0
    });
});


// 静态文件服务，用于访问生成的图片
app.use('/images', express.static(imageDir));

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
