const { getAll, getById, createBook, updateBook, deleteById } = require('../services/bookServides');

const bookController = require('express').Router();

bookController.get('/', async (req, res) => {
    const books = await getAll();
    res.render('catalog', {
        title: 'Catalog Page',
        books,
        errors,
    })
});

bookController.get('/detail/:id', async (req, res) => {
    const idBook = req.params.id;
    const book = await getById(idBook);

    res.render('details', {
        title: 'Details Page',
        book,
    })
});

bookController.get('/edit/:id', async (req, res) => {
    const idBook = req.params.id;
    const book = await getById(idBook);
    res.render('edit', {
        title: 'Edit Page',
        book,
    })
});

bookController.post('/edit/:id', async (req, res) => {
    const idBook = req.params.id;
    const body = req.body;

    //To Do Validation

    const book = {
        titleBook: body.titleBook,
        author: body.author,
        genge: body.genge,
        start: Number(body.start),
        image: body.image,
        bookReview: body.bookReview
    }

    try {
        await updateBook(idBook, book);
        res.redirect('/catalog/detail' + idBook);
    } catch (err) {
        res.redirect('edit', {
            title: 'Edit Page',
            book,
            errors: err,
        })
    }
});

bookController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
});

bookController.post('/create', async (req, res) => {
    const body = req.body;

    //To Do Validation

    const book = {
        titleBook: body.titleBook,
        author: body.author,
        genge: body.genge,
        start: Number(body.start),
        image: body.image,
        bookReview: body.bookReview,
        owner: req.user._id,
    }

    try {
        await createBook(book);
        res.redirect('/catalog');
    } catch (err) {
        res.render('create', {
            title: 'Create Page',
            book,
            errors: err,
        })
    }
})

bookController.get('/delete', async (req, res) => {
    const idBook = req.params.id;

    //To Do Validation

    await deleteById(idBook);
    res.redirect('/catalog');
})

module.exports = bookController;