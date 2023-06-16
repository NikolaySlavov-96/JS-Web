const { model, Schema, type: { ObjectId } } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, minLength: [3, 'Username is minimal length is 3 letters'] },
    password: { type: String, required: true },
    plays: { type: [ObjectId], required: true, default: [], ref: 'Plays' }
});

UserSchema.index(username, -1);

const UserModel = model('User', UserSchema);

module.exports = UserModel;