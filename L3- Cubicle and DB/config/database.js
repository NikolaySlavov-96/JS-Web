const mongoose = require('mongoose');

const serviceIP = 'mongodb://192.168.88.50:27017/cubicleBD'

async function db() {
    await mongoose.connect(serviceIP, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
}

module.exports = db;