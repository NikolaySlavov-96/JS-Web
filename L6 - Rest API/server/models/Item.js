const { Schema, model, Types: { ObjectId } } = require('mongoose');

const itemSchema = new Schema({
    make: { type: String, require: true, minlength: [4, 'Make must be at least 4 characters long'] },
    mode: { type: String, require: true, minlength: [4, 'Model must be at least 4 characters long'] },
    year: {
        type: Number, require: true, validate: {
            validator: value => value >= 1950 && value <= 2050,
            message: 'Year must be betwen 1950 and 2050'
        }
    },
    description: { type: String, require: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, require: true, min: [0.01, 'Price must be a positive number'] },
    image: { type: String, require: [true, 'Image URL is required'] },
    material: { type: String, default: '' },
    _ownerId: { type: ObjectId, ref: 'User', require: true }
});

const Item = model('Item', itemSchema);

module.exports = Item;