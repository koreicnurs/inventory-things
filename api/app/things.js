const express = require('express');

const multer = require('multer');
const path = require('path');
const config = require('../config');
const {nanoid} = require('nanoid');

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
    const [things] = await mySqlDb.getConnection().query('SELECT * from things');
    res.send(things);
});

router.get('/:id', async (req, res) => {
    const [thing] = await mySqlDb.getConnection().query(
        `SELECT * from ?? where id = ?`,
        ['things', req.params.id]
    );
    res.send(thing[0]);
});

router.delete('/:id', async (req, res) => {
    await mySqlDb.getConnection().query(
        `DELETE FROM ?? WHERE id = ?`,
        ['things', req.params.id]
    );
    res.send('Deleted');
});

router.post('/',  upload.single('photo'), async (req, res) => {
    if (!req.body.title || !req.body.location_id || !req.body.category_id) {
        return res.status(400).send({error: 'Something are missing'});
    }

    const thing = {
        location_id: req.body.location_id,
        category_id: req.body.category_id,
        title: req.body.title,
        description: req.body.description
    };

    if (req.file) {
        thing.photo = req.file.filename;
    }

    const newThing = await mySqlDb.getConnection().query(
        'INSERT INTO ?? (location_id, category_id, title, description, photo) VALUES(?, ?, ?, ?, ?)',
        ['things', thing.location_id, thing.category_id, thing.title, thing.description, thing.photo]
    )

    res.send({
        ...thing,
        id: newThing.insertId,
    });
});

router.put('/:id',  upload.single('photo'), async (req, res) => {

    const thing = {
        location_id: req.body.location_id,
        category_id: req.body.category_id,
        title: req.body.title,
        description: req.body.description
    };

    if (req.file) {
        thing.photo = req.file.filename;
    }

    await mySqlDb.getConnection().query(
        "UPDATE ?? SET ? where id = ?",
        ["locations", {...thing}, req.params.id]
    )

    res.send(thing);
});

module.exports = router;