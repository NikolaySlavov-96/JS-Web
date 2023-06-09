const errorController = require("../Controllers/404Controller");
const adController = require("../Controllers/adController");
const authController = require("../Controllers/authController");
const homeController = require("../Controllers/homeController");
const searchController = require("../Controllers/searchController");


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/jobs', adController);
    app.use('/search', searchController);
    app.use('*', errorController)
}