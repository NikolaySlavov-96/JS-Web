const { model, Schema, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const bookSchema = new Schema({
    titleBook: { type: String, require: true, minlength: [2, 'Title is must be minimum 2 characters'] },
    author: { type: String, require: true, minlength: [5, 'Author is must be minimum 5 characters'] },
    genge: { type: String, require: true, minlength: [3, 'Genge is must be mininum 3 charactes'] },
    start: { type: Number, require: true, min: [1, 'Min number is 1 and max 5'], max: [5, 'Max number is 5 and min 1'] },
    image: {
        type: String, require: true, validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image url is not valit'
        }
    },
    bookReview: { type: String, require: true, minlength: [10, 'Rewiew book is must be minimum 10 characters'] },
    wishingList: { type: [ObjectId], require: true, ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User', require: true },
});

const Book = model('Book', bookSchema);

module.exports = Book;
