/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 4
 * Time: 오후 3:05
 * To change this template use File | Settings | File Templates.
 */
var express = require('express')
    , virtualpages = require('./routes/virtualpages')
    , http = require('http')
    , path = require('path');

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

//route
var PATH = '/v1/virtualpages/:id';
app.post(PATH, virtualpages.post);
app.put(PATH, virtualpages.put);
app.get(PATH, virtualpages.get);
app.delete(PATH, virtualpages.delete);

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
