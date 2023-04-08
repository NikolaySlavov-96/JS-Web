const createControler = require('express').Router();
const { createCube } = require('../services/servicesCube');
const { createAccessory } = require('../services/servicesAccessory');


createControler.get('/cube', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
});

createControler.post('/cube', async (req, res) => {
    const body = req.body;
    await createCube(body.name, body.description, body.imageUrl, Number(body.difficultyLevel))
    res.redirect('/')
})

createControler.get('/accessory', (req, res) => {
    res.render('accessory', { title: 'Attach Accessory' });
})

createControler.post('/accessory', async (req, res) => {
    const body = req.body;
    await createAccessory(body.name, body.imageUrl, body.description)
    res.redirect('/');
})

module.exports = createControler;