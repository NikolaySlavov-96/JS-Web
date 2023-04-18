const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const gameController = require("../controllers/gameController");
const defaultController = require("../controllers/defaultController");
const searchController = require("../controllers/searchController");


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/game', gameController);
    app.use('/search', searchController);
    app.use('*', defaultController);
}