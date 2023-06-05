const errorController = require('express').Router();

errorController.get('*', (req, res) => {
    res.render('404')
})

module.exports = errorController;