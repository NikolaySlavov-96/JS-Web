const gameController = require('express').Router();

gameController.get('/catalog', (req, res) => {
    res.render('catalog', {
        title: 'Catalog Page - Gaming Team'
    })
});

gameController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page - Gaming Team'
    })
})

gameController.get('/edit/:id', (req, res) => {
    res.render('edit', {
        title: 'Edit Page - Gaming Team'
    })
});

gameController.get('/detail/:id', (req, res) => {
    res.render('details', {
        title: 'Details Page'
    })
});



module.exports = gameController;