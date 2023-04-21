const { hasUser } = require('../middleware/guard');
const { getAll } = require('../services/bookServides');

const profileController = require('express').Router();

profileController.get('/', hasUser(), async (req, res) => {
    const book = await getAll()
    const dataView = book.filter(b => (b.wishingList.toString()) == req.user._id.toString());

    res.render('profile', {
        title: 'Profile Page',
        book: dataView,
    })
});

profileController.post('/', (req, res) => {

})

module.exports = profileController;