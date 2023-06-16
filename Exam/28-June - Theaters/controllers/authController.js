const { hasUser, isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/authService');

const authController = require('express').Router();

authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => {
    const body = req.body;

    try {
        if (body.usernam === '' || body.password === '') {
            throw new Error('All fields is required');
        }

        const token = await login(body.username, body.password);

        res.cookie('token', token);
        res.redirect('/');

    } catch (err) {
        res.render('login', {
            title: 'Login Page',
            body: {
                username: body.username,
            },
            erorr: err
        })
    }
})

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {

    const body = req.body;
    try {
        if (body.username === '' || body.password === '' || body.rePassword === '') {
            throw new Error('All field is required');
        }

        if (body.password.length < 3) {
            throw new Error('Password length don\'t need');
        }

        if (body.rePassword !== body.password) {
            throw new Error('Password don\'t equal')
        }

        const dataResponse = await register(body.username, body.password);

        res.cookie('token', dataResponse);
        res.redirect('/')
    } catch (err) {
        res.render('register', {
            title: 'Register Form',
            body: {
                username: body.username
            },
            error: err
        })
    }
});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
})

module.exports = authController;