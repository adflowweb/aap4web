/**
 * User: @nadir93
 * Date: 13. 7. 5
 * Time: 오후 12:18
 */
var util = require('util'),
    logger = require('../logger'),
    DEFAULT_INDEX_JS = '../routes/site/default/index.js',
    RESPONSE_MESSAGE = '{"error":{"code":400,"message":"virtual_page_uri header not found"}}';
var srcName = __filename.substring(__filename.lastIndexOf('/'));

var virtualPageHandler = function () {
};

virtualPageHandler.prototype = {
    //create virtualPage
    post: function (req, res, client) {
        try {
            if (!req.headers['virtual_page_uri']) {
                //reponseCode 400 : bad request
                res.send(RESPONSE_MESSAGE, 400);
                return;
            }

            var path = '../routes/site' + req.headers['virtual_page_uri'];
            logger.debug(srcName + ' path : ', path);

            try {
                var handler = require(path);
            } catch (e) {
                logger.error(e.message);
                handler = require(DEFAULT_INDEX_JS);
            }

            logger.debug(srcName + ' handler : ', handler);

            handler.post(req, res, function (err, data) {

                if (err) {
                    logger.error(err.stack);
                    res.send(err.message, 500);
                    return;
                }
                //logger.debug(srcName + ' data : ', data);
                //set page
                client.hset('virtualpage', req.params.id, data, function (err) {
                    try {
                        if (err) {
                            logger.error(err.stack);
                            res.send(err.message, 500);
                            return;
                        }
                        res.send(200);
                    } catch (e) {
                        logger.error(e.stack);
                        res.send(e.message, 500);
                    }
                });
            });
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    },
    //modify virtualPage
    put: function (req, res, client) {
        try {

            logger.debug(srcName + ' req : ', req);

            if (!req.headers['virtual_page_uri']) {
                //reponseCode 400 : bad request
                res.send(RESPONSE_MESSAGE, 400);
                return;
            }

            var path = '../routes/site' + req.headers['virtual_page_uri'];
            logger.debug(srcName + ' path : ', path);
            logger.debug(srcName + ' req.params.id : ', req.params.id);
            client.hget('virtualpage', req.params.id, function (err, reply) {
                try {
                    if (err) {
                        logger.error('error : ', err.stack);
                        res.send(err.message, 500);
                        return;
                    }

                    // reply is null when the key is missing
                    if (!reply) {
                        res.send(404);
                        return;
                    }

                    try {
                        var handler = require(path);
                    } catch (e) {
                        logger.error(e.stack);
                        handler = require(DEFAULT_INDEX_JS);
                    }

                    handler.put(req, res, reply, function (error, reply) {

                        if (error) {
                            logger.error('error : ', error.stack);
                            res.send(err.message, 500);
                            return;
                        }

                        // reply is null when the key is missing
                        if (!reply) {
                            res.send(404);
                            return;
                        }

                        //logger.debug(srcName + ' reply : ', reply);
                        logger.debug(srcName + ' req.params.id : ', req.params.id);
                        client.set(req.params.id, reply, function (err) {
                            try {
                                if (err) {
                                    logger.error('error : ', err.stack);
                                    res.send(err.message, 500);
                                } else res.send(200);
                            } catch (e) {
                                logger.error(e.stack);
                                res.send(e.message, 500);
                            }
                        });
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
    },
    //delete virtualPage
    delete: function (req, res, client) {
        try {
            logger.debug(srcName + ' key : ', req.params.id);
            client.hdel('virtualpage', req.params.id, function (err) {
                //console.log(util.inspect(arguments))
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                    } else {
                        logger.debug(srcName + ' key deleted');
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
    //read virtualPage
    get: function (req, res, client) {
        try {
            logger.debug(srcName + ' key : ', req.params.id);
            client.hget('virtualpage', req.params.id, function (err, reply) {
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
    }
}

module.exports = virtualPageHandler;