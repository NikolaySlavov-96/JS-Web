const artController = require("../controllers/artController");
const authController = require("../controllers/authController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', artController);
    app.use('/profile', profileController);
    app.use('*', defaultController);
}