/**
 * User: nadir93
 * Date: 13. 9. 23.
 * Time: 오후 1:34
 */
var logger = require('../logger');
var srcName = __filename.substring(__filename.lastIndexOf('/'));
var redisHandler = function () {
};

redisHandler.prototype = {
    post: function (req, res, client) {
        try {
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            var data = JSON.parse(req.rawBody);
            var index = [];
            // build the index
            for (var x in data) {
                index.push(x);
                index.push(data[x]);
            }
            logger.debug(srcName + ' index ', index);
            client.mset(index, function (err, reply) {
                try {
                    if (err) {
                        logger.error('error : ', err);
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
//            Object.keys(data).forEach(function (key) {
//                var val = data[key];
//                logger.debug(__filename + ' key :', key);
//                logger.debug(__filename + ' val :', val);
//            });
//            client.set(VERIFICATIONURI, req.rawBody, function (err) {
//                try {
//                    if (err) {
//                        logger.error('error : ', err);
//                        res.send(err.message, 500);
//                    } else {
//                        logger.debug(__filename + ' key set just to be sure');
//                        res.send(200);
//                    }
//                } catch (e) {
//                    logger.error(e.stack);
//                    res.send(e.message, 500);
//                }
//            });
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    },
    postHash: function (req, res, client) {
        try {
            logger.debug(srcName + ' key : ', req.param.id);
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            var data = JSON.parse(req.rawBody);
            var index = [];
            // build the index
            for (var x in data) {
                index.push(x);
            }
            logger.debug(srcName + ' index ', index);
            function hashSet(i) {
                if (i < index.length) {
                    client.hset(req.param.id, index[i], data[index[i]], function (err) {
                        try {
                            if (err) {
                                logger.error('error : ', err);
                                res.send(err.message, 500);
                                return;
                            } else {
                                logger.debug(srcName + ' key inserted ', index[i]);
                                //res.send(200);
                            }
                            hashSet(++i);
                        } catch (e) {
                            logger.error(e.stack);
                            //res.send(e.message, 500);
                        }
                    });
                } else {
                    //최종 response
                    logger.debug(srcName + ' hash insert done');
                    res.send(200);
                }
                //logging
            }

            hashSet(0);
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    },
    put: function (req, res, client) {
        try {
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            var data = JSON.parse(req.rawBody);
            var index = [];
            // build the index
            for (var x in data) {
                index.push(x);
                index.push(data[x]);
            }
            logger.debug(srcName + ' index ', index);
            client.mset(index, function (err, reply) {
                try {
                    if (err) {
                        logger.error('error : ', err);
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
    putHash: function (req, res, client) {
        try {
            logger.debug(srcName + ' key : ', req.param.id);
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            var data = JSON.parse(req.rawBody);
            var index = [];
            // build the index
            for (var x in data) {
                index.push(x);
            }
            logger.debug(srcName + ' index ', index);
            function hashSet(i) {
                if (i < index.length) {
                    client.hset(req.param.id, index[i], data[index[i]], function (err) {
                        try {
                            if (err) {
                                logger.error('error : ', err);
                                res.send(err.message, 500);
                                return;
                            } else {
                                logger.debug(srcName + ' key inserted ', index[i]);
                                //res.send(200);
                            }
                            hashSet(++i);
                        } catch (e) {
                            logger.error(e.stack);
                            //res.send(e.message, 500);
                        }
                    });
                } else {
                    //최종 response
                    logger.debug(srcName + ' hash insert done');
                    res.send(200);
                }
                //logging
            }

            hashSet(0);
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }

    },
    delete: function (req, res, client) {

        logger.debug(srcName + ' req.rawBody : ', req.rawBody);
        var data = JSON.parse(req.rawBody);
        logger.debug(srcName + ' data : ', data);

        client.del(data, function (err, replies) {
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                } else {
                    logger.debug(srcName + ' key deleted ', replies);
                    res.end(replies.toString(), 200);
                }
            } catch (e) {
                logger.error(e.stack);
                res.send(e.message, 500);
            }
        });
    },
    deleteHash: function (req, res, client) {

        logger.debug(srcName + ' req.rawBody : ', req.rawBody);
        var data = JSON.parse(req.rawBody);
        logger.debug(srcName + ' data : ', data);
        var index = [];
        // build the index
        for (var x in data) {
            index.push(x);
        }
        function del(i) {
            if (i < index.length) {
                client.hdel(index[i], function (err) {
                    try {
                        if (err) {
                            logger.error('error : ', err);
                            res.send(err.message, 500);
                            return;
                        } else {
                            logger.debug(srcName + ' keys deleted ', index[i]);
                            //res.send(200);
                        }
                        del(++i);
                    } catch (e) {
                        logger.error(e.stack);
                        res.send(e.message, 500);
                    }
                });
            } else {
                //최종 response
                logger.debug(srcName + ' delete done');
                res.send(200);
            }
            //logging
        }

        del(0);

    },
    get: function (req, res, client) {
        try {
            logger.debug(srcName + ' req.url : ', req.url);
            logger.debug(srcName + ' key : ', req.url.substring(req.url.lastIndexOf('/v1/redis') + 9));
            client.mget(req.url.substring(req.url.lastIndexOf('/v1/redis') + 9), function (err, reply) {
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                        return;
                    }
                    if (reply) {
                        logger.debug(srcName + ' reponse : ', reply);
                        res.send(reply);
                    } else res.send(404);
                } catch (e) {
                    logger.debug(e.stack);
                    res.send(e.message, 500);
                }
            });
        } catch (e) {
            logger.debug(e.stack);
            res.send(e.message, 500);
        }
    },
    getHash: function (req, res, client) {

    }
}

module.exports = redisHandler;