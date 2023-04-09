const authorization = require('express').Router();

const { isGues, hasUser } = require('../middleware/guards');
const { register, login } = require('../services/userService');
const { parserError } = require('../until/parser');

authorization.get('/register', isGues(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });
});

authorization.post('/register', async (req, res) => {
    const body = req.body;

    try {
        if (body.username == '' || body.password == '') {
            throw new Error('All fiels is required');
        }

        if (body.password !== body.repeatPassword) {
            throw new Error('Password don\'t match');
        }

        const token = await register(body.username, body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = parserError(err);
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: body.username
            }
        })
    }
})

authorization.get('/login', isGues(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
});

authorization.post('/login', async (req, res) => {
    const body = req.body;

    try {
        const token = await login(body.username, body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        const errors = parserError();

        res.render('login', {
            title: 'Login Page',
            errors,
            body: {
                username: body.username
            }
        })
    }
});

authorization.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authorization;