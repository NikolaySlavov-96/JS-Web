const bookController = require('express').Router();

bookController.get('/', (req, res) => {
    res.render('catalog', {
        title: 'Catalog Page',
    })
});

bookController.get('/detail/:id', (req, res) => {
    res.render('details', {
        title: 'Details Page'
    })
});

bookController.get('/edit/:id', (req, res) => {
    res.render('edit', {
        title: 'Edit Page'
    })
});

bookController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
})

module.exports = bookController;