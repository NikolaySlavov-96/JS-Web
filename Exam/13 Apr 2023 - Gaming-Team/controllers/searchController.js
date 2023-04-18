const { getAll } = require('../servicess/gameService');

const searchController = require('express').Router();


searchController.get('/', (req, res) => {
    res.render('search', {
        title: 'Search - Gaming Team',
        isClick: false,
    })
})

searchController.post('/', async (req, res) => {
    const body = req.body;
    const game = await getAll(body.game, body.platform)

    res.render('search', {
        title: 'Search - Gaming Team',
        isClick: true,
        game,
    })
})

module.exports = searchController;