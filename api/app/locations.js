const express = require('express');
const mySqlDb = require("../mySqlDb");

const router = express.Router();

router.get('/', async (req, res) => {
    const [locations] = await mySqlDb.getConnection().query('SELECT * from locations');
    res.send(locations);
});

router.get('/:id', async (req, res) => {
    const [location] = await mySqlDb.getConnection().query(
        `SELECT * from ?? where id = ?`,
        ['locations', req.params.id]
    );
    res.send(location[0]);
});

router.post('/',  async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({error: 'Something are missing'});
    }

    const location = {
        title: req.body.title,
        description: req.body.description
    };

    const newLocation = await mySqlDb.getConnection().query(
        'INSERT INTO ?? (title, description) values(?, ?)',
        ['locations', location.title, location.description]
    )

    res.send({
        ...location,
        id: newLocation.insertId,
    });
});

module.exports = router;