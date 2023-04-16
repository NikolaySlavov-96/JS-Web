const { register, login } = require('../servicess/userService');
const { body, validationResult } = require('express-validator');
const { hasUser, isGues } = require('../middleware/guards');

const authController = require('express').Router();

authController.get('/login', isGues(), (req, res) => {
    res.render('login', {
        title: 'Login Page - Gaming Team'
    });
});

authController.post('/login', async (req, res) => {
    const body = req.body;

    try {
        if (body.email == '' || body.password == '') {
            throw new Error('All fields is required')
        }

        const token = await login(body.email, body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            title: 'Login Page - Gaming Team',
            body: {
                email: body.email
            },
            errors: err
        })
    }
})

authController.get('/register', isGues(), (req, res) => {
    res.render('register', {
        title: 'Register Page - Gaming Team'
    });
});

authController.post('/register',
    body('username').notEmpty().withMessage('Username is require')
        .isLength({ min: 5 }).withMessage('Username is minimal 5 charactes'),
    body('email').notEmpty().withMessage('Email is required').bail()
        .isLength({ min: 10 }).withMessage('Email addres require long is minimal 10 charactes'),
    body('password').notEmpty().withMessage('Password is required')
        .isLength({ min: 4 }).withMessage('Password is minimal required long is 4 character'),
    async (req, res) => {
        const body = req.body;

        try {
            const { errors } = validationResult(req.body);
            if (errors.length > 0) {
                throw errors;
            }

            if (body.password !== body.repass) {
                throw new Error('Password don\'t match')
            }

            const token = await register(body.username, body.email, body.password);
            res.cookie('token', token);
            res.redirect('/');
        } catch (err) {
            res.render('register', {
                title: 'Register Page - Gaming Team',
                body: {
                    email: body.email,
                    username: body.username
                },
                errors: err,
            })
        }
    })

authController.get('/logout', hasUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;