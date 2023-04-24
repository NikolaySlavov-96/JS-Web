const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');


const JWT_SECRET = 'gqeoik3tfef3';

async function register(username, email, password) {
    const takenEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 })

    if (takenEmail) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = await User.create({
        username,
        email,
        password: hashedPassword
    })

    const token = createSession(users);
    return token;
};

async function login(email, password) {
    const taken = await User.findOn({ email }).collation({ locale: 'en', strength: 2 });

    if (!taken) {
        throw new Error('Username or Password don\'t match');
    };
    const hasMatch = await bcrypt.compare(password, taken.password);

    if (hasMatch == false) {
        throw new Error('Username or Password don\'t match');
    }

    const token = createSession(taken);
    return token;
}

function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email,
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    register,
    login,
    verifyToken
}