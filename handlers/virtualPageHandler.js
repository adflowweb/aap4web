/**
 * User: @nadir93
 * Date: 13. 7. 5
 * Time: 오후 12:18
 */
var util = require('util'),
    logger = require('../logger');

var virtualPageHandler = function () {
};

virtualPageHandler.prototype.post = function (req, res, client) {
    try {
        //nonExistFunctionCall();
        if (!req.headers['virtual_page_uri']) {
            //reponseCode 400 : bad request
            res.send('{"error":{"code":400,"message":"virtual_page_uri header not found"}}', 400);
            return;
        }

        var path = '../routes/site' + req.headers['virtual_page_uri'];
        logger.debug('path : ', path);
        var val = require(path).post(req, res);
        //set page
        client.set(req.params.id, val, function (err) {
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                } else res.send(200);
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
    try {
        if (!req.headers['virtual_page_uri']) {
            //reponseCode 400 : bad request
            res.send('{"error":{"code":400,"message":"virtual_page_uri header not found"}}', 400);
            return;
        }

        var path = '../routes/site' + req.headers['virtual_page_uri'];
        logger.debug('path : ', path);
        client.get(req.params.id, function (err, reply) {
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }

                // reply is null when the key is missing
                if (!reply) {
                    res.send(404);
                    return;
                }

                var val = require(path).put(req, res, reply);
                client.set(req.params.id, val, function (err) {
                    try {
                        if (err) {
                            logger.error('error : ', err);
                            res.send(err.message, 500);
                        } else res.send(200);
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
    try {
        logger.debug('key : ', req.params.id);
        client.del(req.params.id, function (err) {
            //console.log(util.inspect(arguments))
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                } else {
                    logger.debug('key deleted just to be sure');
                    res.send(200);
                }
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

virtualPageHandler.prototype.get = function (req, res, client) {
    try {
        logger.debug('key : ', req.params.id);
        client.get(req.params.id, function (err, reply) {
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }

                // reply is null when the key is missing
                if (reply) {
                    res.send(reply);
                } else res.send(404);
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

module.exports = virtualPageHandler;