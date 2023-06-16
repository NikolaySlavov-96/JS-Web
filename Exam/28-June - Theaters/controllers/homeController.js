const homeController = require('express').Router();

homeController.get('/', (req, res) => {

    const hasUser = req.user ? 'userHome' : 'guestHome';

    res.render(hasUser, {
        title: 'Home'
    })
})

module.exports = homeController;