const express = require('express');
const PORT_LISTEN = 3000;
const expresConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routerConfig = require('./config/routers');

start();

async function start() {
    const app = express();

    expresConfig(app);
    await databaseConfig(app);
    routerConfig(app);

    app.listen(PORT_LISTEN, () => console.log('Server listen on ' + PORT_LISTEN));
}