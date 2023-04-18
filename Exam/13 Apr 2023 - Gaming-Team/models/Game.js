const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const gameSchema = new Schema({
    game: { type: String, require: true, minlength: [4, 'Name minimal length is 4 characters'] },
    image: { type: String, require: true, validate: {
        validator:(value) => URL_PATTERN.test(value),
        message: 'Image URL is not correct'
    } },
    price: { type: Number, require: true },
    description: { type: String, require: true, minlength: [10, 'Minilam length in description is 10 characters'] },
    genge: { type: String, require: true, minlength: [2, 'Genge minimal length is 2 characters'] },
    platform: { type: String, require: true },
    boughtBy: { type: [ObjectId], default: [], ref: 'User' },
    owner: {type: ObjectId, ref: 'User', require: true}
});

const Game = model('Game', gameSchema);

module.exports = Game;