/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 15
 * Time: 오후 1:42
 * To change this template use File | Settings | File Templates.
 */
var winston = require('winston');
//require('winston-riak').Riak;
//require('winston-mongo').Mongo;
module.exports = new (winston.Logger)({
    transports: [
        new winston.transports.Console({level: 'debug'}),
        new winston.transports.File({ filename: './logs/all-logs.log', level: 'debug' })
        //new winston.transports.Couchdb({ 'host': 'localhost', 'db': 'logs' })
        //new winston.transports.Riak({ bucket: 'logs' })
        //new winston.transports.MongoDB({ db: 'db', level: 'info'})
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: './logs/exceptions.log' })
    ]
})
;
