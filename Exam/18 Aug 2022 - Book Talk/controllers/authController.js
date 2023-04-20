const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    })
});

authController.post('/register', (req, res) => {
    const body = req.body;


});

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page'
    })
});

authController.post('/login', (req, res) => {
    const body = req.body;

    
});

authController.get('/logout', (req, res) => {
    //TO DO 
});

module.exports = authController;