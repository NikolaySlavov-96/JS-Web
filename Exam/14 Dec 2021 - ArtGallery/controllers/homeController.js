const { getAll } = require('../services/artService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const art = await getAll();

    res.render('home', {
        title: 'Home Page',
        art,
    })
})

module.exports = homeController;