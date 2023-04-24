const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('../middleware/session');
const trimBody = require('../middleware/trimBody');

module.exports = (app) => {

    const hbs = handlebars.create({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use('/style', express.static('style'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session());
    app.use(trimBody());
}