const { register, login } = require('../services/authServices');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

authController.post('/register', async (req, res) => {
    const body = req.body;
    try {
        //To Do validation

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
            errors: []
        })
    }

});

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', async (req, res) => {
    const body = req.body;
    try {
        // TO DO Validation

        const token = await login(body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.redirect('login', {
            title: 'Login Page',
            body: {
                email: body.email
            },
            errors: []
        })
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;