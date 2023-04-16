const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

// userSchema.index({ email }, {
//     collation: {
//         locale: 'en',
//         strength: 2
//     }
// });

const User = model('User', userSchema);

module.exports = User;