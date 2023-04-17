const { Schema, model, Types: { ObjectId } } = require('mongoose');

const gameSchema = new Schema({
    game: { type: String, require: true, minlength: [4, 'Name minimal length is 4 characters'] },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    genge: { type: String, require: true },
    platform: { type: String, require: true },
    boughtBy: { type: [ObjectId], default: [], ref: 'User' },
    owner: {type: ObjectId, ref: 'User', require: true}
});

const Game = model('Game', gameSchema);

module.exports = Game;


/*
platform: string (required; one of the following: "PC", "Nintendo", "PS4", "PS5", "XBOX"),
*/