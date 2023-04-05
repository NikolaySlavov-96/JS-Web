// TODO: Require Controllers...

const aboutControler = require("../controllers/aboutControllers");
const createControler = require("../controllers/createContollers");
const defaultControler = require("../controllers/defaultControllers");
const detailControler = require("../controllers/detailControllers");
const homeControler = require("../controllers/homeControllers");

module.exports = (app) => {
    app.use('/', homeControler);
    app.use('/create', createControler);
    app.use('/details', detailControler);
    app.use('/about', aboutControler);
    app.use('*', defaultControler);
};