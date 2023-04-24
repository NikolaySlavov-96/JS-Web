const authController = require('express').Router();

const { isGuest, hasUser } = require('../middleware/guard');
const { login, register } = require('../services/authService');
const { errorParser } = require('../util/parser');

authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page',
    })
});

authController.post('/login', async (req, res) => {
    const body = req.body;

    try {
        if (body.username == '' || body.password == '') {
            throw new Error('All fields is required');
        }

        const token = await login(body.username, body.password);
        res.cookie('token', token);
        res.redirect('/')
    } catch (err) {
        res.render('login', {
            title: 'Login Page',
            body: {
                username: body.username
            },
            errors: errorParser(err)
        })
    }
});

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    const body = req.body;
    try {
        if (body.username == '' || body.password == '' || body.repassword == '' || body.address == '') {
            throw new Error('All fields is required');
        }

        if (body.password.length < 3) {
            throw new Error('Password length minimal 3 characters');
        }

        if (body.password != body.repassword) {
            throw new Error('Password dont match')
        }

        const token = await register(body.username, body.password, body.address);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('register', {
            title: 'Register Page',
            body: {
                username: body.username,
                address: body.address
            },
            errors: errorParser(err)
        });
    }
});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = authController;