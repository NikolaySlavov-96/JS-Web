const { register, login, logout } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 charactes long'),
    async (req, res) => {
        try {
            const { errors } = validationResult((req));
            if (errors.length > 0) {
                throw errors;
            }

            const token = await register(req.body.email, req, body.password);
            res.json(token);
        } catch (err) {
            const message = parseError(err);
            res.status(400).json({ message })
        }
    });

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (err) {
        const message = parseError(err);
        res.status(401).json({ message });
    }
});

authController.get('/logout', async (req, res) => {
    // const token = req.headers['x-authorization']; //not using this line after adding middleware
    const token = req.token;

    await logout(token);
    res.status(204).end();
});

module.exports = authController;