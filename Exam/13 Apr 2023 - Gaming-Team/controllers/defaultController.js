const defaultController = require('express').Router();

defaultController.get('/', (req, res) => {
    res.render('404', {
        title: '404 Page - Gaming Team'
    })
})

module.exports = defaultController;