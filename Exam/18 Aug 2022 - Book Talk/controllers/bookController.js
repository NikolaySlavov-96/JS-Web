const { hasUser } = require('../middleware/guard');
const { getAll, getById, createBook, updateBook, deleteById, wisheBook } = require('../services/bookServides');
const { errorParser } = require('../util/parser');

const bookController = require('express').Router();

bookController.get('/', async (req, res) => {
    const books = await getAll();

    res.render('catalog', {
        title: 'Catalog Page',
        books,
    })
});

bookController.get('/detail/:id', async (req, res) => {
    const idBook = req.params.id;
    const book = await getById(idBook);

    const option = {
        isOwner: false,
        isWish: false,
    };

    if (req.user && book.owner.toString() == req.user._id) {
        option.isOwner = true;
    };

    if (req.user && book.wishingList.map(b => b.toString()).includes(req.user._id)) {
        option.isWish = true;
    }

    res.render('details', {
        title: 'Details Page',
        book,
        option
    })
});

bookController.get('/edit/:id', hasUser(), async (req, res) => {
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

    const book = {
        titleBook: body.titleBook,
        author: body.author,
        genge: body.genge,
        start: Number(body.start),
        image: body.image,
        bookReview: body.bookReview
    }

    try {
        if (Object.values(book).some(b => !b)) {
            throw new Error('All field is required');
        }

        await updateBook(idBook, book);
        res.redirect('/catalog/detail/' + idBook);
    } catch (err) {
        res.redirect('edit', {
            title: 'Edit Page',
            book,
            errors: errorParser(err),
        })
    }
});

bookController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
});

bookController.post('/create', async (req, res) => {
    const body = req.body;

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
        if (Object.values(book).some(b => !b)) {
            throw new Error('All fields is required');
        }

        await createBook(book);
        res.redirect('/catalog');
    } catch (err) {
        res.render('create', {
            title: 'Create Page',
            book,
            errors: errorParser(err),
        })
    }
});

bookController.get('/wish/:id', hasUser(), async (req, res) => {
    const idBook = req.params.id;
    const idUser = req.user._id;

    const book = await getById(idBook);

    try {
        if (book.owner.toString() == idUser.toString()) {
            option.isOwner = true;
            throw new Error('Not Wish own book');
        }

        if (book.wishingList.map(b => b.toString()).includes(idUser.toString())) {
            option.isWish = true;
            throw new Error('Cannot wish twice');
        }

        await wisheBook(idBook, idUser);
        res.redirect('/catalog/detail/' + idBook);
    } catch (err) {
        res.render('details', {
            title: 'Details Page',
            book,
            errors: errorParser(err)
        })
    }

})

bookController.get('/delete/:id', hasUser(), async (req, res) => {
    const idBook = req.params.id;

    const book = await getById(idBook);
    if (book.owner.toString() != req.user._id) {
        return res.redirect('/auth/login');
    }

    await deleteById(idBook);
    res.redirect('/catalog');
})

module.exports = bookController;