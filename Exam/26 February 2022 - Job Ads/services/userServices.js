const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const JWT_SECTER = 'hahtnnfgyf';

async function register(email, password, description) {

    const chechEmail = await User.findOne({ email });

    if (chechEmail) {
        throw new Error('Userna is taken');
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        description
    });

    const token = createSession(user);

    return token;
}

async function login(email, password) {
    const user = User.findOne({ email });

    if(!user) {
        throw new Error('Incorrect username or password');
    }

    const hasMatch = bcrypt.compare(password, user.hashedPassword);

    if(hasMatch == false) {
        throw new Error('Incorrect username or password');
    }

    const token = createSession(user);
    return token;
}

function createSession({ _id, email, description }) {
    const payload = {
        _id,
        email,
        description
    };

    const token = jwt.sign(payload, JWT_SECTER);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECTER);
}

module.exports = {
    register,
    login,
    verifyToken
}