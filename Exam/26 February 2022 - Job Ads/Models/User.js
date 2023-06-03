const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchem = new Schema({
    email: { type: String, require: true },
    hashedPassword: { type: String, require: true },
    skills: { type: String, require: true },
    ads: { type: [ObjectId], default: [], ref: 'Ads' }
})

const User = model('User', userSchem);

module.exports = User;