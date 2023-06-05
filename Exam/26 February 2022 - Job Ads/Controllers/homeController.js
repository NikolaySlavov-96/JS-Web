const { getThreeAds } = require('../services/adServices');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const ads = await getThreeAds();
    res.render('home', {
        title: 'Home Page',
        ads,
    });
})

module.exports = homeController;