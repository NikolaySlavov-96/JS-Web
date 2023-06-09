const { model, Schema, Types: { ObjectId } } = require('mongoose');

const patterEmail = /[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+/;

const userSchem = new Schema({
    email: {
        type: String, require: true, validate: {
            validator: (value) => patterEmail.test(value),
            message: (props) => {
                return `${props.value} is not a valid email Addres`
            }
        }
    },
    hashedPassword: { type: String, require: true },
    skills: { type: String, require: true, minLength: [5, 'Minimal length for skills is 5 characteres'] },
    ads: { type: [ObjectId], default: [], ref: 'Ads' }
})

const User = model('User', userSchem);

module.exports = User;