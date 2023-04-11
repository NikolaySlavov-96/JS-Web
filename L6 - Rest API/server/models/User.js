const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, require: true, unique: true },
    hashedPassword: { type: String, require: true }
});

userSchema.index({email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;