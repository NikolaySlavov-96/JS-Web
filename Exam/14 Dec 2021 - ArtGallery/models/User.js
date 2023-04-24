const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    myPublication: { type: [ObjectId], require: true, ref: 'Art', default: [] },
});

const User = model('User', userSchema);

module.exports = User;