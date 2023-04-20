const { model, Schema, Types: { ObjectId } } = require('mongoose');

const bookSchema = new Schema({
    title: { type: String, require: true },
    author: { type: String, require: true },
    image: { type: String, require: true },
    bookReview: { type: String, require: true },
    genge: { type: String, require: true },
    start: { type: Number, require: true, min: [1, 'Min number is 1 and max 5'], max: [5, 'Max number is 5 and min 1'] },
    wishingList: { type: [ObjectId], require: true, ref: 'User' },
    owner: { type: ObjectId, ref: 'User', require: true },
});

const Book = model('Book', bookSchema);

module.exports = Book;
