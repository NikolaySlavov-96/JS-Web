const express = require('express');
const handlebars = require('express-handlebars');
const cookieparset = require('cookie-parser');
const trimbody = require('../middleware/trimbody');
const session = require('../middleware/session');

module.exports = (app) => {

    const hbs = handlebars.create({
        extname: '.hbs'
    });

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieparset());
    app.use(session());
    app.use(trimbody());
}