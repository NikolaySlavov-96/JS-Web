const { hasUser, isGues } = require('../middleware/guard');
const { register, login } = require('../services/authServices');
const { errorParser } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', isGues(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

authController.post('/register', async (req, res) => {
    const body = req.body;
    try {
        if (body.username == '' || body.email == '' || body.password == '' || body.repassword == '') {
            throw new Error('All field is required');
        }

        if (body.password.length < 3) {
            throw new Error('Password must be min 3 characters');
        }

        if (body.password !== body.repassword) {
            throw new Error('Password dont\'t match');
        }

        const token = await register(body.username, body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('register', {
            title: 'Register Page',
            body: {
                username: body.username,
                email: body.email
            },
            errors: errorParser(err),
        })
    }

});

authController.get('/login', isGues(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', async (req, res) => {
    const body = req.body;
    try {
        if (body.email == '' || body.password == '') {
            throw new Error('All fields is required');
        }

        const token = await login(body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            title: 'Login Page',
            body: {
                email: body.email
            },
            errors: errorParser(err)
        })
    }
});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;