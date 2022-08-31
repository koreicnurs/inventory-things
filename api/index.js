const express = require('express');
const categories = require('./app/categories');
const locations = require('./app/locations');
// const fileDb = require('./fileDb');
const cors = require('cors');
const mySqlDb = require('./mySqlDb');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/categories', categories);
app.use('/locations', locations);

// fileDb.init();
mySqlDb.connect();
app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});