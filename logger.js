/**
 * User: @nadir93
 * Date: 13. 7. 15
 * Time: 오후 1:42
 */
var winston = require('winston');
//require('winston-riak').Riak;
//require('winston-mongo').Mongo;
module.exports = new (winston.Logger)({
    transports: [
        new winston.transports.Console({level: 'error'}),
        new winston.transports.File({ filename: './logs/all-logs.log', level: 'error' })
        //new winston.transports.Couchdb({ 'host': 'localhost', 'db': 'logs' })
        //new winston.transports.Riak({ bucket: 'logs' })
        //new winston.transports.MongoDB({ db: 'db', level: 'info'})
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './logs/exceptions.log' })
    ]
})
;
