const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, require: true, minlength: [4, 'Username must be min 4 characters'] },
    email: { type: String, require: true, minlength: [10, 'Email address must be min 10 characters'] },
    password: { type: String, require: true },
    wishBook: { type: [Object], ref: 'Book', require: true, default: [] }
});

const User = model('User', userSchema);

module.exports = User;