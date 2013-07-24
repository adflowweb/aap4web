/**
 * User: @nadir93
 * Date: 13. 7. 9
 * Time: 오후 1:54
 */
//var config = require('./Config-debug');
var config = require('./config');
var logger = require('./logger');
//var mongoose = require('mongoose');
var server = require('./server');

Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, '__function', {
    get: function () {
        return __stack[1].getFunctionName();
    }
});

//function foo() {
//    console.log(__line);
//    console.log(__function);
//}
//
//foo();

// Exception Handler 등록
process.on('uncaughtException', function (err) {
    console.log('uncaughtException : ' + err.stack);
    // 추후 trace를 하게 위해서 err.stack 을 사용하여 logging하시기 바랍니다.
    // Published story에서 beautifule logging winston 참조
});

// We will log normal api operations into api.log
//winston.info("starting logger...");
//winston.add(winston.transports.File, {
//    filename: config.logger.api, level: 'debug'
//});

//winston.setLevels(winston.config.syslog.levels);

// We will log all uncaught exceptions into exceptions.log
//winston.handleExceptions(new winston.transports.File({
//    filename: config.logger.exception
//}));
//console.log("logger started. Connecting to MongoDB...");
//mongoose.connect(config.db.mongodb);
//console.log("Successfully connected to MongoDB. Starting web server...");
server.start();
logger.info("Successfully started web server. Waiting for incoming connections...");
