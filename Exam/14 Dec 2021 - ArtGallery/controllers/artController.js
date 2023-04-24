const { hasUser } = require('../middleware/guard');
const { createArt, deleteById, updateArt, getById, getAll, shareArt } = require('../services/artService');
const { errorParser } = require('../util/parser');

const artController = require('express').Router();

artController.get('/', async (req, res) => {
    const art = await getAll();

    res.render('gallery', {
        title: 'Gallery Page',
        art,
    })
});

artController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page'
    })
});

artController.post('/create', async (req, res) => {
    const body = req.body;


    const art = {
        titleArt: body.titleArt,
        technique: body.technique,
        picture: body.picture,
        certificate: body.certificate,
        auther: req.user.username,
        owner: req.user._id,
    }

    try {
        if (Object.values(art).some(a => !a)) {
            throw new Error('All fields is required');
        }

        if (art.certificate != 'Yes' && art.certificate != 'No') {
            throw new Error('Certificate Yes or No')
        }

        await createArt(art);
        res.redirect('/catalog')
    } catch (err) {
        res.render('create', {
            title: 'Create Page',
            art,
            errors: errorParser(err)
        })
    }
});

artController.get('/detail/:id', async (req, res) => {
    const idArt = req.params.id;
    const art = await getById(idArt);

    const info = {
        isOwner: false,
        isShare: false,
    };

    if (req.user && art.owner == req.user._id) {
        info.isOwner = true;
    }

    if (req.user && art.shared.map(s => s.toString()).includes(req.user._id)) {
        info.isShare = true;
    }

    res.render('details', {
        title: 'Deatils Page',
        art,
        info
    })
});

artController.get('/edit/:id', hasUser(), async (req, res) => {
    const idArt = req.params.id;
    const art = await getById(idArt);
    res.render('edit', {
        title: 'Edit Page',
        art
    })
});

artController.post('/edit/:id', async (req, res) => {
    const idArt = req.params.id;
    const body = req.body;

    const art = {
        titleArt: body.titleArt,
        technique: body.technique,
        picture: body.picture,
        certificate: body.certificate,
    }

    try {
        if (Object.values(art).some(a => !a)) {
            throw new Error('All field is required');
        }

        if (art.certificate != 'Yes' || art.certificate != 'No') {
            throw new Error('Certificate Yes or No')
        }

        await updateArt(idArt, art)
        res.redirect('/catalog/detail/' + idArt);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Page'
        })
    }
});

artController.get('/delete/:id', hasUser(), async (req, res) => {
    const owner = req.user._id;
    const idArt = req.params.id;

    const art = await getById(idArt);
    if (art.owner.toString() != owner.toString()) {
        return res.redirect('/auth/login');
    }

    await deleteById(idArt);
    res.redirect('/catalog');
});

artController.get('/share/:id', async (req, res) => {
    const idArt = req.params.id;
    const idUser = req.user._id;

    const art = await getById(idArt);

    try {
        if (art.owner.toString() == idUser.toString()) {
            throw new Error('Not share your Art');
        }

        if (art.shared.map(a => a.toString()).includes(idUser.toString())) {
            isShare = true;
            throw new Error('Cannot share twice');
        }

        await shareArt(idArt, idUser);
        res.redirect('/');
    } catch (err) {
        res.render('details', {
            title: 'Deatils Page',
            art,
            errors: errorParser(err)
        });
    }
})

module.exports = artController;