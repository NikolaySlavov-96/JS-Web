const { model, Schema, Types: { ObjectId } } = require('mongoose');

const HTTP_STRING = /^https?:\/\/.+$/i;

const artSchema = new Schema({
    titleArt: { type: String, required: true, minlength: [6, 'Title is minimum required 6 characters'] },
    technique: { type: String, required: true, maxlength: [15, 'Technique is maximum 15 characters'] },
    picture: {
        type: String, required: true, validate: {
            validator: (value) => HTTP_STRING.test(value),
            message: 'Image path is not correct'
        }
    },
    certificate: { type: String, required: true },
    auther: { type: String, required: true },
    owner: { type: ObjectId, required: true, ref: 'User' },
    shared: { type: [ObjectId], required: true, ref: 'User', default: [] },
});

const Art = model('Art', artSchema);

module.exports = Art;