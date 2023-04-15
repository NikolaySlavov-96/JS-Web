const mongoose = require('mongoose');

// const DB_STRING = 'mongodb://localhost:27017/gaming-team';
const DB_STRING = 'mongodb://192.168.88.50:27017/gaming-team';

module.exports = async (app) => {
    try {
        await mongoose.connect(DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Success connect for DB');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}