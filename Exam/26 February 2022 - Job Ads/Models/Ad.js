const { model, Schema, Types: { ObjectId } } = require('mongoose');

const adSchema = new Schema({
    headline: { type: String, required: true, minLength: [4, 'Headline length is minilam length is 4 characters'] },
    location: { type: String, required: true, minLength: [8, 'Location minimal length is 8 characters'] },
    company: { type: String, required: true, minLength: [3, 'Company Name minimal length is 3 characters'] },
    description: { type: String, required: true, maxLength: [40, 'Description length is minimal 40 characters'] },
    author: { type: ObjectId, ref: 'User' },
    userApplied: { type: [ObjectId], ref: 'User', default: [] },
})

const Ad = model('Ads', adSchema);

module.exports = Ad;
