/**
 * User: @nadir93
 * Date: 13. 7. 4
 * Time: 오후 3:05
 */
var express = require('express')
    , virtualPageHandler = require('./handlers/virtualPageHandler')
    , verificationURIHandler = require('./handlers/verificationURIHandler')
    , verifyHandler = require('./handlers/verifyHandler')
    , routes = require('./routes')
    , http = require('http')
    , redis = require('redis').createClient()
    , path = require('path')
    , logger = require('./logger');

//redis error
redis.on('error', function (err) {
    logger.error(err.stack);
});

//redis ready
redis.on('ready', function () {
    logger.info('redis server ready');
});

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.logger());
app.use(rawBody);
app.use(express.methodOverride());
app.use(app.router);

//development only
if ('development' == app.get('env')) {
    //app.use(express.errorHandler());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

//message parser
function rawBody(req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf-8');
    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function () {
        next();
    });
}

var handlers = {
    virtualpages: new virtualPageHandler(),
    verificationuri: new verificationURIHandler(),
    verifyHandler: new verifyHandler()
};

function start() {
    //    console.log('virtualpages : ', handlers.virtualpages);
    //    console.log('verificationuri : ', handlers.verificationuri);
    routes.setup(app, handlers, redis);
    var port = process.env.PORT || 3000;
    app.listen(port);
    logger.info("Express server listening on port %d in %s mode", port, app.settings.env);
}

exports.start = start;
//exports.app = app;
