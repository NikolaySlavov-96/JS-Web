const fs = require('fs');
const { IncomingForm } = require("formidable");

function createBreed(req, res) {
    const form = new IncomingForm();

    form.parse(req, (err, fields) => {
        const item = {
            id: 'ads' + ('0000' + (Math.random() * 9999 | 0)).slice(-4),
            name: fields.breed,
            value: fields.breed
        } 
        
        res.writeHead(301, [
            'Location',
            '/'
        ]);

        res.end();
    })
}

function createCats(req, res) {
    const form = new IncomingForm();

    form.parse(req, (err, fields) => {
        console.log(fields)
        const item = {
            id: 'ads' + ('0000' + (Math.random() * 9999 | 0)).slice(-4),
            name: fields.name,
            description: fields.description,
            breed: fields.breed
        }

        res.writeHead(301, [
            'Location',
            '/'
        ]);
        res.end()
    })
}

module.exports = {
  createBreed,
  createCats,
};
