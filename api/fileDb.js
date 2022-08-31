const fs = require('fs');

const filename = './db.json';
let data = [];

module.exports = {
    init() {
        try {
            const fileContents = fs.readFileSync(filename);
            data = JSON.parse(fileContents);
        } catch (e) {
            data = [];
        }
    },
    getResources() {
        return data;
    },
    addResources(message) {
        data.push(message);
        fs.writeFileSync(filename, JSON.stringify(data));
    },
};