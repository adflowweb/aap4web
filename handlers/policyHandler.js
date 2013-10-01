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
            var key = req.url.substring(req.url.lastIndexOf('/v1/policy') + 11);
            logger.debug(srcName + ' key : ', key);

            if (key) {
                //hgetall
                client.hgetall(key, function (err, reply) {
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
                logger.debug(srcName + ' return all keys ');
                client.keys("*", function (err, keys) {
                    logger.debug(srcName + " keys : ", utils.inspect(keys));
                    if (keys.length != 0) {
                        var results = [];
                        keys.forEach(function (key, pos) {
                            var count = 0;
                            client.type(key, function (err, keytype) {
                                logger.debug(srcName + " " + key + " is " + keytype);
                                results.push('{' + key + ':' + keytype + '}');
                                if (pos === (keys.length - 1)) {
                                    logger.debug(srcName + " results : ", results);
                                    res.send(results);
                                    //client.quit();
                                }
                            });
                        });
                    } else {
                        res.send(404);
                    }
                });
            }
        } catch (e) {
            logger.debug(e.stack);
            res.send(e.message, 500);
        }
    }
}

module.exports = policyHandler;