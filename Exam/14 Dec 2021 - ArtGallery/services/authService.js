const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'dgfwehgjkg234';

async function register() {

}

async function login() {

}

function createSession() {

}

function verificationToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verificationToken,
}