const { profileData } = require('../services/profileService');

const profileController = require('express').Router();

profileController.get('/', async (req, res) => {
    const profile = await profileData(req.user._id);
    res.render('profile', {
        title: 'Profile Page',
        profile
    })
});

module.exports = profileController;