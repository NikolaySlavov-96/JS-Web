const mongoDB = require('mongoose');
// const CONNECT_STRING = 'mongodb://localhost:27017';
const CONNECT_STRING = 'mongodb://192.168.88.50:27017/ads';

module.exports = async (app) => {
    try {
        await mongoDB.connect(CONNECT_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Data Base connecter');

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}