/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오후 1:54
 * To change this template use File | Settings | File Templates.
 */
//var config = require('./Config-debug');
var config = require('./config');
var winston = require('winston');
//var mongoose = require('mongoose');
var server = require('./server');

// Exception Handler 등록
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err.stack);
    // 추후 trace를 하게 위해서 err.stack 을 사용하여 logging하시기 바랍니다.
    // Published story에서 beautifule logging winston 참조
});

// We will log normal api operations into api.log
console.log("starting logger...");
winston.add(winston.transports.File, {
    filename: config.logger.api
});
// We will log all uncaught exceptions into exceptions.log
winston.handleExceptions(new winston.transports.File({
    filename: config.logger.exception
}));
//console.log("logger started. Connecting to MongoDB...");
//mongoose.connect(config.db.mongodb);
//console.log("Successfully connected to MongoDB. Starting web server...");
server.start();
console.log("Successfully started web server. Waiting for incoming connections...");