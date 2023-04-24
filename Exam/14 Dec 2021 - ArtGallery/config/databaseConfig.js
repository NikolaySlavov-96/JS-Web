const mongoose = require('mongoose');

const DB_STRING = 'mongodb://192.168.88.50/artGalery';

module.exports = async (app) => {
    try {
        await mongoose.connect(DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}