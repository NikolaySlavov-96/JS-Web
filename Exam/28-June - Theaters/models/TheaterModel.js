const { model, Schema, Types: { ObjectId } } = require('mongoose');

const TheatedSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxLength: [50, 'Max length on Description field is 50 characters'] },
    imgUrl: { type: String, required: true },
    publick: { type: Boolean, default: false },
    createAt: { type: String, required: true },
    usersLike: { type: [ObjectId], ref: 'User', default: [] }
});

TheatedSchema.index({ title: -1 }, {
    collation: 'en',
    strength: 2
})

const TheaterModel = model('theater', TheatedSchema);

module.exports = TheaterModel;