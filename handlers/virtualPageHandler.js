/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 12:18
 * To change this template use File | Settings | File Templates.
 */
var util = require('util'),
    logger = require('../logger');

var virtualPageHandler = function () {
};

virtualPageHandler.prototype.post = function (req, res, client) {
    //nonExistFunctionCall();
    if (!req.headers['request_uri_origin']) {
        res.send(404);
        return;
    }

    try {
        var path = '../routes/site' + req.headers['request_uri_origin'];
        logger.debug('path : ', path);
        var val = require(path).post(req, res);
        //set page
        client.set(req.params.id, val, function (err) {
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                //testCode
                //normalize(val);
                //testHtml(val);
                res.send(200);
            } catch (e) {
                logger.error(e.stack);
                res.send(e.message, 500);
            }
        });
    } catch (e) {
        logger.error(e.stack);
        res.send(e.message, 500);
    }
};

virtualPageHandler.prototype.put = function (req, res, client) {
    if (!req.headers['request_uri_origin']) {
        res.send(404);
        return;
    }

    try {
        var path = '../routes/site' + req.headers['request_uri_origin'];
        logger.debug('path : ', path);
        client.get(req.params.id, function (err, reply) {
            // reply is null when the key is missing
            //console.log('reply : ', reply);
            //var $ = parser.load(reply);
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                if (!reply) {
                    res.send(404);
                    return;
                }
                //res.send(200);
                var val = require(path).put(req, res, reply);
                //console.log('response data : ', val);
                //console.log('<html>' + $('html').html() + '</html>');
                client.set(req.params.id, val, function (err) {
                    try {
                        if (err) {
                            logger.error('error : ', err);
                            res.send(err.message, 500);
                            return;
                        }
                        //testCode
                        //testHtml(val);
                        res.send(200);
                    } catch (e) {
                        logger.error(e.stack);
                        res.send(e.message, 500);
                    }
                });
            } catch (e) {
                logger.error(e.stack);
                res.send(e.message, 500);
            }
        });
    } catch (e) {
        logger.error(e.stack);
        res.send(e.message, 500);
    }
};

virtualPageHandler.prototype.delete = function (req, res, client) {
    //res.send({id: req.params.id, name: "The Name", description: "description"});
    logger.debug('key : ', req.params.id);
    client.del(req.params.id, function (err) {
        //console.log(util.inspect(arguments))
        try {
            if (err) {
                logger.error('error : ', err);
                res.send(err.message, 500);
                return;
            }
            logger.debug('key deleted just to be sure');
            res.send(200);
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    });
};

virtualPageHandler.prototype.get = function (req, res, client) {
    //res.send({id: req.params.id, name: "The Name", description: "description"});
    logger.debug('key : ', req.params.id);
    client.get(req.params.id, function (err, reply) {
        // reply is null when the key is missing
        //console.log('reply : ', reply);
        //var $ = parser.load(reply);
        try {
            if (err) {
                logger.error('error : ', err);
                res.send(err.message, 500);
                return;
            }
            if (reply) {
                //console.log('reponse : ', reply);
                res.send(reply);
            } else {
                res.send(404);
            }
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    });
};

module.exports = virtualPageHandler;