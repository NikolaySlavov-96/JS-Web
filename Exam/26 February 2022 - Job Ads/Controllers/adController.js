const { hasUser } = require('../middlewares/guards');
const { createAd, getAllAds, getOneAd, getAdPopulate, applyAd, updateAd, removeById } = require('../services/adServices');
const { partserError } = require('../util/parser');

const adController = require('express').Router();

adController.get('/all', async (req, res) => {
    const ads = await getAllAds();
    console.log(ads)
    res.render('allAds', {
        title: 'All Ads',
        ads,
    })
});

adController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page',
    })
});

adController.post('/create', async (req, res) => {
    const body = req.body;
    console.log(req.user._id)
    const ad = {
        headline: body.headline,
        location: body.location,
        company: body.company,
        description: body.description,
        author: req.user._id
    }

    try {
        if (Object.values(ad).some(a => !a)) {
            throw new Error('All fields is required');
        }

        await createAd(ad);
        res.redirect('/jobs/all');

    } catch (err) {
        res.render('create', {
            title: 'Create Page',
            error: partserError(err),
            body: {
                headline: body.headline,
                location: body.location,
                company: body.company,
                description: body.description
            }
        })
    }
})

adController.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
    const ad = await getOneAd(id);
    const isOwner = {
        checkOwner: ad.author.toString() === req?.user?._id ? true : false,
        candidates: ''
    }
    if (isOwner) {
        const data = await getAdPopulate(id);
        isOwner.candidates = data.userApplied ? data.userApplied : false;
    }

    const adInfo = Object.assign(ad, {
        isOwner: isOwner.checkOwner,
        isGues: req.user ? true : false,
        isUser: !isOwner.checkOwner,
        isApplied: ad.userApplied?.map(e => e.toString()).includes(req?.user?._id.toString())
    });

    res.render('details', {
        title: 'Details Page',
        adInfo,
        isOwner,
    })
});

adController.get('/apply/:id', async (req, res) => {
    const id = req.params.id;
    const data = await getOneAd(id);
    try {
        const userId = req.user._id;
        if (data.author == userId) {
            adinfo.isOwner = true;
            throw new Error('Cannot apply your own jobs')
        }

        if (data.userApplied.map(e => e.toString()).includes(userId.toString())) {
            throw new Error('Cannot apply twice');
        }
        await applyAd(id, userId);
        res.redirect('/jobs/details/' + id);

    } catch (err) {
        res.render('details', {
            title: 'Detail Page',
            error: partserError(err),
        })
    }
});

adController.get('/edit/:id', hasUser(), async (req, res) => {
    const ad = await getOneAd(req.params.id);

    res.render('edit', {
        title: 'Edit Page',
        ad,
    })
});

adController.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const ad = await getOneAd(id);

    if (ad.author.toString() !== req.user._id) {
        return res.redirect('/auth/login');
    }
    const body = req.body;
    const editValueAd = {
        headline: body.headline,
        location: body.location,
        company: body.company,
        description: body.description,
        author: req.user._id
    }

    try {
        if (Object.values(editValueAd).some(e => !e)) {
            throw new Error('All fields is required');
        }
        await updateAd(id, editValueAd);
        res.redirect('/jobs/detail/' + id);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Page',
            ad: Object.assign(editValueAd, { _id: req.user.id }),
            error: partserError(err)
        })
    }
});

adController.get('/delete/:id', hasUser(), async (req, res) => {
    const id = req.params.id;

    await removeById(id);
    res.redirect('/jobs/all')
})

module.exports = adController;