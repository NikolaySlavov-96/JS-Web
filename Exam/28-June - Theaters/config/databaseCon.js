const mongoose = require('mongoose');

// const CONNECTION_STRING = 'mongodb://localhost:27017/theater';
const CONNECTION_STRING = 'mongodb://192.168.88.50:27017/theater';

module.exports = async (app) => {
    try {

        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB Connectet with ' + CONNECTION_STRING);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}