const { hasUser } = require('../middleware/guards');
const { createGame, getAll, getById, buyGame, deleteById, updateGame } = require('../servicess/gameService');
const { parseErrors } = require('../util/parser');

const gameController = require('express').Router();

gameController.get('/catalog', async (req, res) => {
    const games = await getAll();
    res.render('catalog', {
        title: 'Catalog Page - Gaming Team',
        games,
    })
});

gameController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Create Page - Gaming Team'
    })
});

gameController.post('/create', async (req, res) => {
    const body = req.body;

    const game = {
        game: body.game,
        image: body.image,
        price: Number(body.price),
        description: body.description,
        genge: body.genge,
        platform: body.platform,
        owner: req.user._id
    }

    try {
        if (Object.values(game).some(h => !h)) {
            throw new Error('All fields is required');
        }
        const platform = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

        if (!platform.includes(body.platform)) {
            throw new Error('Platform not required');
        }

        if (game.price <= 0) {
            throw new Error('Price is be positive')
        }

        const data = await createGame(game);
        res.redirect('/game/catalog');
    } catch (err) {
        res.render('create', {
            title: 'Create Page - Gaming Team',
            game,
            errors: parseErrors(err),
        })
    }

})

gameController.get('/edit/:id', hasUser(), async (req, res) => {
    const game = await getById(req.params.id);
    res.render('edit', {
        title: 'Edit Page - Gaming Team',
        game
    })
});

gameController.post('/edit/:id', async (req, res) => {
    const idGame = req.params.id;
    const game = await getById(idGame);

    if (game.owner.toString() !== req.user._id) {
        return res.redirect('/auth/login');
    }

    const body = req.body;

    const editInfor = {
        game: body.game,
        image: body.image,
        price: Number(body.price),
        description: body.description,
        genge: body.genge,
        platform: body.platform,
    }

    try {
        if (Object.values(editInfor).some(g => !g)) {
            throw new Error('All fields is required');
        }

        const platform = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

        if (!platform.includes(body.platform)) {
            throw new Error('Platform not required');
        }

        if (editInfor.price <= 0) {
            throw new Error('Price is be positive')
        }

        await updateGame(idGame, editInfor);
        res.redirect('/game/catalog');
    } catch (err) {
        res.render('edit', {
            title: 'Edit Page - Gaming Team',
            game: Object.assign(editInfor, { _id: req.params.id }),
            errors: parseErrors(err)
        })
    }
});

gameController.get('/detail/:id', async (req, res) => {
    const idGame = req.params.id;
    const gameInfo = await getById(idGame);
    const infoType = {};
    infoType.isOwner = false;
    infoType.isBuy = false;

    if (req.user) {
        if (gameInfo.owner == req.user._id) {
            infoType.isOwner = true;
        }
        
        if (gameInfo.boughtBy.map(g => g.toString()).includes(req.user._id)) {
            infoType.isBuy = true;
        }
    }


    res.render('details', {
        title: 'Details Page',
        gameInfo,
        infoType,
    })
});

gameController.get('/delete/:id', hasUser(), async (req, res) => {
    const idGame = req.params.id;
    const game = await getById(idGame);

    if (game.owner !== req.user.id) {
        return res.redirect('/auth/login');
    }

    await deleteById(idGame);
    res.redirect('/game/catalog');
});

gameController.get('/buy/:id', hasUser(), async (req, res) => {
    const idGame = req.params.id;
    const game = await getById(idGame);
    const idUser = req.user._id;

    try {
        if (game.owner == idUser) {
            game.isOwner = true;
            throw new Error('Cannot buy your own Game')
        }

        if (game.boughtBy.map(b => b.toString()).includes(idUser.toString())) {
            game.isBuy = true;
            throw new Error('Cannot buy twice');
        }
        await buyGame(idGame, idUser);
        res.redirect('/game/detail/' + idGame);
    } catch (err) {
        res.render('detail', {
            title: 'Details Page',
            game,
            errors: parseErrors(err)
        })
    }
})



module.exports = gameController;