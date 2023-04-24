const express = require('express');
const expressConfig = require('./config/expressConfig');
const databaseConfig = require('./config/databaseConfig');
const routerConfig = require('./config/routerConfig');

const PORT = 3000;


start();

async function start() {

    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routerConfig(app);

    app.listen(PORT, () => console.log('Server is listening on ' + PORT))
}