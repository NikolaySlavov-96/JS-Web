const { model, Schema, Types: { ObjectId } } = require('mongoose');

const adSchema = new Schema({
    headline: { type: String, require: true },
    location: { type: String, require: true },
    company: { type: String, require: true },
    description: { type: String, require: true },
    author: { type: ObjectId, ref: 'User' },
    userApplied: { type: [ObjectId], ref: 'User', default: [] },
})

const Ad = model('Ads', adSchema);

module.exports = Ad;