const express = require('express');

const fileDb = require('../fileDb');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = fileDb.getResources();
    res.send(messages);
});

router.post('/',  (req, res) => {
    if (!req.body.location_title || !req.body.location_id) {
        return res.status(400).send({error: 'Message missing'});
    }

    const location = {
        location_id: req.body.id,
        location_title: req.body.title,
        location_description: req.destination
    };

    // if (req.file) {
    //     categories.image = req.file.filename;
    // }

    fileDb.addResources(location);

    res.send(location);
});

module.exports = router;