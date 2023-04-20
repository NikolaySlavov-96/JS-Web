const express = require('express');
const database = require('./config/database');
const expressC = require('./config/expressC');
const router = require('./config/router');



start();

async function start() {
    const app = express();

    expressC(app);
    await database(app);
    router(app);

    app.listen(3000, () => console.log('Server working'));
}