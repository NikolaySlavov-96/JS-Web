const { isGuest, hasUser } = require('../middlewares/guards');
const { login } = require('../services/userServices');
const { register } = require('../services/userServices');
const { partserError } = require('../util/parser');

const authController = require('express').Router();


authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', async (req, res) => {
    const body = req.body;

    try {
        if(body.username === '') {
            throw new Error('Username is request');
        }

        if(body.password === '') {
            throw new Error('Password is required');
        }
        const token = await login(body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');
        
    } catch(err) {
        res.render('login', {
            title: 'Login Page',
            error: partserError(err),
            body: {
                email: body.email
            }
        })
    } 
});

authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
})

authController.post('/register', async (req, res) => {
    const body = req.body;
    try {
        if(body.password.length < 6) {
            throw new Error('Email addres is not long');
        }
    
        if(body.password !== body.rePassword) {
            throw new Error('Password don\'t match')
        }
    
        if(body.description.length < 4 || body.description.length > 40) {
            throw new Error('Description length betwen 4 and 40 symbols')
        }

        const token = await register(body.email, body.password, body.description);
        res.cookie('token', token);
        res.redirect('/');

    } catch(err) {
        res.render('register', {
            title: 'Register Page',
            error: partserError(err),
            body: {
                email: body.email,
                description: body.description
            }
        })
    }
    

});

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;