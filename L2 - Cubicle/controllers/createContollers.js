const createControler = require('express').Router();
const { create } = require('../models/productService');

createControler.get('/', (req, res) => {
    res.render('create');
});

createControler.post('/', async (req, res) => {
    await create(req.body.name, req.body.description, req.body.imageUrl, Number(req.body.difficultyLevel));

    res.redirect('/')
})

module.exports = createControler;