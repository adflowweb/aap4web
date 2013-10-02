/**
 * User: nadir93
 * Date: 13. 10. 1.
 * Time: 오전 12:42
 */
var logger = require('../logger');
var srcName = __filename.substring(__filename.lastIndexOf('/'));
var utils = require('util');
var policyHandler = function () {
};

policyHandler.prototype = {
    post: function (req, res, client) {
        try {
            logger.debug(srcName + ' method : post ');
            logger.debug(srcName + ' req.url : ', req.url);
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            var data = JSON.parse(req.rawBody);
            logger.debug(srcName + ' data : ', data);
            var key = req.url.substring(req.url.lastIndexOf('/v1/policy') + 11);
            logger.debug(srcName + ' key : ', key);

            client.hmset(key, data, function (err, reply) {
                try {
                    if (err) {
                        logger.error(err.stack);
                        res.send(err.message, 500);
                        return;
                    } else {
                        logger.debug(srcName + ' key inserted ', reply);
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
    },
    put: function (req, res, client) {
        try {
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            client.set('uri', req.rawBody, function (err) {
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                    } else {
                        logger.debug(srcName + ' key set just to be sure');
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
    },
    delete: function (req, res, client) {
        try {
            client.del('uri', function (err) {
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                    } else {
                        logger.debug(srcName + ' key deleted just to be sure');
                        //console.log(util.inspect(arguments))
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
    },
    get: function (req, res, client) {
        try {
            logger.debug(srcName + ' method : get ');
            logger.debug(srcName + ' req.url : ', req.url);

            var uri = req.url.substring(req.url.lastIndexOf('/v1/policy') + 11);
            logger.debug(srcName + ' uri : ', uri);
            if (uri.indexOf('/') > 0) {
                var field = uri.substring(uri.indexOf('/'));
                var key = uri.substring(0, uri.indexOf('/'));
                logger.debug(srcName + ' key : ', key);
                logger.debug(srcName + ' field : ', field);

                //hget
                client.hget(key, field, function (err, reply) {
                    try {
                        if (err) {
                            logger.error(err.stack);
                            res.send(err.message, 500);
                            return;
                        }
                        if (reply) {
                            logger.debug(srcName + ' reply : ', reply);
                            res.send(reply);
                            //res.send('{"' + field + '":"' + reply + '"}');
                        } else {
                            logger.debug(srcName + ' not found ');
                            res.send(404);
                        }
                    } catch (e) {
                        logger.debug(e.stack);
                        res.send(e.message, 500);
                    }
                });
            } else {
                if (uri) {
                    //hgetall
                    client.hgetall(uri, function (err, reply) {
                        try {
                            if (err) {
                                logger.error(err.stack);
                                res.send(err.message, 500);
                                return;
                            }
                            if (reply) {
                                logger.debug(srcName + ' reply : ', reply);
                                res.send(reply);
                            } else {
                                logger.debug(srcName + ' not found ');
                                res.send(404);
                            }
                        } catch (e) {
                            logger.debug(e.stack);
                            res.send(e.message, 500);
                        }
                    });
                } else {
                    logger.debug(srcName + ' return all policy');

                    var pollingData = ['uri', 'content'];
                    var result = [];

                    function getHash(i) {
                        if (i < pollingData.length) {
                            //hgetall
                            client.hgetall(pollingData[i], function (err, reply) {
                                try {
                                    if (err) {
                                        logger.error(err.stack);
                                    }
                                    if (reply) {
                                        logger.debug(srcName + ' reply : ', reply);
                                        result.push(reply);
                                    } else {
                                        logger.debug(srcName + ' not found ');
                                    }
                                } catch (e) {
                                    logger.debug(e.stack);
                                }
                                getHash(++i);
                            });
                        } else {
                            logger.debug(srcName + ' result : ', result);
                            res.send({'uri': result[0], "content": result[1]});
                        }
                    }

                    getHash(0);
                }
            }
        } catch (e) {
            logger.debug(e.stack);
            res.send(e.message, 500);
        }
    }
}

module.exports = policyHandler;