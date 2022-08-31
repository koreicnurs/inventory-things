const mySql = require('mysql2/promise');
const config = require('./config');

let connection = null;

module.exports = {
    connect: async () => {
        connection = await mySql.createConnection(config.databaseOptions);
        console.log(`Connect to MYSQL successful! id=${connection.threadId}`);
    },
    getConnection: () => connection,
}