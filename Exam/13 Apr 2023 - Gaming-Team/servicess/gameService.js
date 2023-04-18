const Game = require("../models/Game");

async function getAll(game, platform) {
    const search = {};
    if(game) {
        // search.game = game;
        search.game = new RegExp(game, 'i');
    }
    if(platform) {
        // search.platform = platform;
        search.platform = new RegExp(platform, 'i');
    }

    return Game.find(search).lean();
}

async function getById(id) {
    return Game.findById(id).lean();
}

async function createGame(game) {
    return Game.create(game);
}

async function updateGame(id, gameEdit) {
    const game = await Game.findById(id);

    game.game = gameEdit.game;
    game.image = gameEdit.image;
    game.price = Number(gameEdit.price);
    game.description = gameEdit.description;
    game.genge = gameEdit.genge;
    game.platform = gameEdit.platform;

    return await game.save();
}

async function deleteById(id) {
    return Game.findByIdAndDelete(id);
}

async function buyGame(idGame, idUser) {
    const game = await Game.findById(idGame).populate('boughtBy');
    game.boughtBy.push(idUser);

    return await game.save();
}

module.exports = {
    getAll,
    getById,
    createGame,
    updateGame,
    deleteById,
    buyGame
}