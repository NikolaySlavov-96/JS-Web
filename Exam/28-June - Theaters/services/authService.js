const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const JWT_SECRET = 'dgfwehgjkg234';

async function register(username, password) {
    const taken = await UserModel.findOne({ username, }).collation({ locale: 'en', strength: 2 });
    if (taken) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = UserModel.create({
        username,
        password: hashedPassword,
    });

    const token = createSession(user);
    return token;
}

async function login(username, password) {
    const taken = await UserModel.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!taken) {
        throw new Error('Username or password don\'t match');
    }

    const hashMatch = await bcrypt.compare(password, taken.password);

    if (!hashMatch) {
        throw new Error('Username or password don\'t match');
    }

    const token = createSession(taken);
    return token;
}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username,
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verificationToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verificationToken
}