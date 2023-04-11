const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');

const connectionString = 'mongodb://192.168.88.50:27017/furniture-REST';
// const connectionString = 'mongodb://localhost:27017/furniture-REST';

start();

async function start() {
    await mongoose.connect(connectionString);
    console.log('Successfull Connected');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({})
    });

    // app.use('/data', dataController);
    app.use('/data/catalog', dataController);
    app.use('/users', authController);

    app.listen(3030, () => console.log('REST service started on 3030'));
}