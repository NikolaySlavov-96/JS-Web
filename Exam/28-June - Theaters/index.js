const express = require('express');
const databaseCon = require('./config/databaseCon');
const routerCon = require('./config/routerCon');
const expressCon = require('./config/expressCon');


const PORT = 3000;

start();

async function start() {
    const app = express();

    await databaseCon(app);
    expressCon(app);
    routerCon(app);

    app.listen(PORT, () => console.log('Server working on ' + PORT));
}