const express = require('express');
const mySqlDb = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    const [categories] = await mySqlDb.getConnection().query('SELECT * from categories');
    res.send(categories);
});

router.get('/:id', async (req, res) => {
    const [category] = await mySqlDb.getConnection().query(
        `SELECT * FROM ?? WHERE id = ?`,
        ['categories', req.params.id]
    );
    res.send(category[0]);
});

router.delete('/:id', async (req, res) => {
    await mySqlDb.getConnection().query(
        `DELETE FROM ?? WHERE id = ?`,
        ['categories', req.params.id]
    );
    res.send('Deleted');
});

router.post('/',  async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({error: 'Something are missing'});
    }

    const category = {
        title: req.body.title,
        description: req.body.description
    };

    const newCategory = await mySqlDb.getConnection().query(
        'INSERT INTO ?? (title, description) VALUES (?, ?)',
        ['categories', category.title, category.description]
    )

    res.send({
        ...category,
        id: newCategory.insertId,
    });
});

router.put('/:id',  async (req, res) => {

    const category = {
        title: req.body.title,
        description: req.body.description
    };

    await mySqlDb.getConnection().query(
        'UPDATE ?? SET ? WHERE id = ?',
        ['categories', {...category}, req.params.id]
    )

    res.send(category);
});

module.exports = router;