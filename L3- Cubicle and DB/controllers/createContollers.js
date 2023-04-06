const createControler = require('express').Router();
const { createCube } = require('../services/servicesCube');
const { createAccessory } = require('../services/servicesAccessory');


createControler.get('/cube', (req, res) => {
    res.render('create');
});

createControler.post('/cube', async (req, res) => {
    const body = req.body;
    await createCube(body.name, body.description, body.imageUrl, Number(body.difficultyLevel))
    res.redirect('/')
})

createControler.get('/accessory', (req, res) => {
    res.render('accessory');
})

createControler.post('/accessory', async(req, res) => {
    const body = req.body;
    console.log(body.name, body.description, body.imageUrl);
    await createAccessory(body.name, body.imageUrl, body.description)
    res.redirect('/');
})

module.exports = createControler;