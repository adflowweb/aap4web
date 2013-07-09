/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 4
 * Time: 오후 3:05
 * To change this template use File | Settings | File Templates.
 */
var express = require('express')
    , virtualpages = require('./routes/virtualpages')
    , verificationuri = require('./routes/verificationuri')
    , http = require('http')
    , redisClient = require('redis').createClient()
    , path = require('path');


//redis error
redisClient.on('error', function (err) {
    console.log("Error " + err);
});

//redis ready
redisClient.on('ready', function () {
    console.log("redis server ready");
});

var app = express();

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.logger());
app.use(rawBody);
app.use(express.methodOverride());
app.use(app.router);

//development only
if ('development' == app.get('env')) {
    //app.use(express.errorHandler());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

//route virtualpages
var VIRTUALPAGES_PATH = '/v1/virtualpages/:id';
app.post(VIRTUALPAGES_PATH, function (req, res) {
    virtualpages.post(req, res, redisClient);
});
app.put(VIRTUALPAGES_PATH, function (req, res) {
    virtualpages.put(req, res, redisClient);
});
app.get(VIRTUALPAGES_PATH, function (req, res) {
    virtualpages.get(req, res, redisClient);
});
app.delete(VIRTUALPAGES_PATH, function (req, res) {
    virtualpages.delete(req, res, redisClient);
});

//route verificationuri
var VERIFICATIONURI_PATH = '/v1/verificationuri';
app.post(VERIFICATIONURI_PATH, function (req, res) {
    verificationuri.post(req, res, redisClient);
});
app.put(VERIFICATIONURI_PATH, function (req, res) {
    verificationuri.put(req, res, redisClient);
});
app.get(VERIFICATIONURI_PATH, function (req, res) {
    verificationuri.get(req, res, redisClient);
});
app.delete(VERIFICATIONURI_PATH, function (req, res) {
    verificationuri.delete(req, res, redisClient);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('verification server listening on port ' + app.get('port'));
});

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
