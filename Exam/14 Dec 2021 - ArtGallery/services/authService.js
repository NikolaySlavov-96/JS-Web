const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'dgfwehgjkg234';

async function register(username, passwor, address) {
    const taken = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (taken) {
        throw new Error('Username is taken');
    };

    const hashedPassword = await bcrypt.hash(passwor, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        address,
    });

    const token = createSession(user);
    return token;
}

async function login(username, passwor) {
    const taken = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!taken) {
        throw new Error('Username or Password not correct');
    }

    const hasMatch = await bcrypt.compare(passwor, taken.password);

    if (!hasMatch) {
        throw new Error('Username or Password not correct');
    }

    const token = createSession(taken);
    return token;
}

function createSession({ username, _id }) {
    const payload = {
        username,
        _id,
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verificationToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verificationToken,
}