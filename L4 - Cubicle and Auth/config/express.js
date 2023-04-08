const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('../middleware/session');

const hbr = handlebars.create({
    extname: '.hbs'
})

module.exports = (app) => {
    //TODO: Setup the view engine
    app.engine('.hbs', hbr.engine);
    app.set('view engine', '.hbs');

    //TODO: Setup the body parser
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(session());

    //TODO: Setup the static files
    app.use('/static', express.static('static'));
};