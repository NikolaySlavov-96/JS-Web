const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, require: true, minlength: [4, 'Longht for username is minimul 4 characters'] },
    password: { type: String, require: true },
    address: { type: String, require: true, maxlentgth: [20, 'Address is maximul characters 20'] },
    myPublication: { type: [ObjectId], require: true, ref: 'Art', default: [] },
    myShares: { type: [ObjectId], require: true, ref: 'Art', default: [] },
});

const User = model('User', userSchema);

module.exports = User;