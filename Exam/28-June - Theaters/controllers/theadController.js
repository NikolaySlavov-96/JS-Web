const { hasUser } = require('../middlewares/guards');

const theadController = require('express').Router();

theadController.get('/create', hasUser(), (req, res) => {
    res.render('createTheater', {
        title: 'Create Page',
    });
});

theadController.post('/create', hasUser(), async (req, res) => {
    const body = req.body;

    const thead = {
        title: body.title,
        description: body.description,
        imgUrl: body.imgUrl,
    }

    try {

        if (Object.values(thead).same(v => !v)) {
            throw new Erorr('All field is required');
        }

        await createThead({ ...thead, publick: body.publick });
        res.redirect('/')

    } catch (err) {
        res.render('createTheater', {
            title: 'Create Page',
            body: thead,
            error: err
        })
    }
})

theadController.get('/edit/:id', hasUser(), async (req, res) => {
    res.render('createTheater', {
        title: 'Edit Page',
    })
})

theadController.get('/detail/:id', hasUser(), (req, res) => {
    res.render('theaterDetails', {
        title: 'Detail Page'
    });
});

theadController.get('/delete', hasUser(), (req, res) => {

});


module.exports = theadController;