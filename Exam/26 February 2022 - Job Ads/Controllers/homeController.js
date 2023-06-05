const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const ads = [];
    res.render('home', {
        title: 'Home Page',
        ads,
    });
})

module.exports = homeController;