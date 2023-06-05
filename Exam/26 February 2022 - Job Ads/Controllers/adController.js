const adController = require('express').Router();

adController.get('/all', async (req, res) => {
    const ads = [2] //await 
    res.render('allAds', {
        title: '',
        ads,
    })
});

adController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
});

adController.get('/detail/:id', (req, res) => {

});


module.exports = adController;