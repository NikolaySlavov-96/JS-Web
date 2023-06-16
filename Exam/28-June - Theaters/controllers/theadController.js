const theadController = require('express').Router();

theadController.get('/', (req, res) => {
    res.render('');
});

module.exports = theadController;