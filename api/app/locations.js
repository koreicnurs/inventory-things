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

router.delete('/:id', async (req, res) => {
    await mySqlDb.getConnection().query(
        `DELETE FROM ?? WHERE id = ?`,
        ['locations', req.params.id]
    );
    res.send('Deleted');
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
        'INSERT INTO ?? (title, description) VALUES(?, ?)',
        ['locations', location.title, location.description]
    )

    res.send({
        ...location,
        id: newLocation.insertId,
    });
});

router.put('/:id',  async (req, res) => {

    const location = {
        title: req.body.title,
        description: req.body.description
    };

    await mySqlDb.getConnection().query(
        'UPDATE ?? SET ? where id = ?',
        ['locations', {...location}, req.params.id]
    )

    res.send(location);
});

module.exports = router;