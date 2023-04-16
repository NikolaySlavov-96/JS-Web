const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'gogwekg';

async function register(username, email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (user) {
        throw new Error('Email is taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreate = User.create({
        username,
        email,
        password: hashedPassword
    });
    const token = createSession(userCreate);

    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Email or Password is not correct');
    }
    
    const hasMatch = await bcrypt.compare(password, user.password);
    
    if (hasMatch == false) {
        throw new Error('Email or Password is not correct');
    }
    
    const token = createSession(user);
    return token;
}

function createSession({ _id, username, email }) {

    const payload = {
        _id,
        username,
        email
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken
}