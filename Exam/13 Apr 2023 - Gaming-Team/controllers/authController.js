const authController = require('express').Router();

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page - Gaming Team'
    });
});

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page - Gaming Team'
    });
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = authController;