const express = require('express');

const multer = require('multer');
const path = require('path');
const config = require('../config');
const {nanoid} = require('nanoid');

// const fileDb = require('../fileDb');
const mySqlDb = require('../mySqlDb');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const categories = await mySqlDb.getConnection().query('SELECT * from categories');
    res.send(categories);
});



router.post('/',  (req, res) => {
    if (!req.body.title || !req.body.id) {
        return res.status(400).send({error: 'Message missing'});
    }

    const categories = {
        id: req.body.id,
        title: req.body.title,
        description: req.destination
    };

    // if (req.file) {
    //     categories.image = req.file.filename;
    // }

    fileDb.addResources(categories);

    res.send(categories);
});

module.exports = router;