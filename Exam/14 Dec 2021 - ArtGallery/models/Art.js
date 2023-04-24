const { model, Schema, Types: { ObjectId } } = require('mongoose');

const artSchema = new Schema({
    titleArt: { type: String, required: true },
    technique: { type: String, required: true },
    picture: { type: String, required: true },
    certificate: { type: String, required: true },
    auther: { type: ObjectId, required: true, ref: 'User' },
    shared: { type: [ObjectId], required: true, ref: 'User', default: [] },
});

const Art = model('Art', artSchema);

module.exports = Art;