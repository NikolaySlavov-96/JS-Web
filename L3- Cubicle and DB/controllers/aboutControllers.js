const aboutControler = require('express').Router();

aboutControler.get('/', (req, res) => {
    res.render('about');
});

module.exports = aboutControler;