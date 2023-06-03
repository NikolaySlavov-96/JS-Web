const { model, Schema, Types: { ObjectId } } = require('mongoose');

const adSchema = new Schema({
    headline: { type: String, require: true },
    location: { type: String, require: true },
    companyName: { type: String, require: true },
    author: { type: ObjectId, require: true, ref: 'User' },
    userApplied: { type: [ObjectId], ref: 'User', default: [] },
})

const Ad = model('Ad', adSchema);

module.exports = Ad;