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
            }
            logger.debug(srcName + ' index ', index);
            function set(i) {
                if (i < index.length) {
                    client.set(index[i], data[index[i]], function (err) {
                        try {
                            if (err) {
                                logger.error('error : ', err);
                                res.send(err.message, 500);
                                return;
                            } else {
                                logger.debug(srcName + ' key inserted ', index[i]);
                                //res.send(200);
                            }
                            set(++i);
                        } catch (e) {
                            logger.error(e.stack);
                            //res.send(e.message, 500);
                        }
                    });
                }
                else {
                    //최종 response
                    logger.debug(srcName + ' insert done');
                    res.send(200);
                }
                //logging
            }

            set(0);


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
    put: function (req, res, client) {
//        try {
//            logger.debug(__filename + ' req.rawBody : ', req.rawBody);
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
//        } catch (e) {
//            logger.error(e.stack);
//            res.send(e.message, 500);
//        }
    },
    delete: function (req, res, client) {

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
                client.del(index[i], function (err) {
                    try {
                        if (err) {
                            logger.error('error : ', err);
                            res.send(err.message, 500);
                            return;
                        } else {
                            logger.debug(srcName + ' key deleted ', index[i]);
                            //res.send(200);
                        }
                        del(++i);
                    } catch (e) {
                        logger.error(e.stack);
                        res.send(e.message, 500);
                    }
                });
            }
            else {
                //최종 response
                logger.debug(srcName + ' delete done');
                res.send(200);
            }
            //logging
        }
        del(0);
    },
    get: function (req, res, client) {
//        try {
//            client.get(VERIFICATIONURI, function (err, reply) {
//                try {
//                    if (err) {
//                        logger.error('error : ', err);
//                        res.send(err.message, 500);
//                        return;
//                    }
//                    if (reply) {
//                        logger.debug(__filename + ' reponse : ', reply);
//                        res.send(reply);
//                    } else res.send(404);
//                } catch (e) {
//                    logger.debug(e.stack);
//                    res.send(e.message, 500);
//                }
//            });
//        } catch (e) {
//            logger.debug(e.stack);
//            res.send(e.message, 500);
//        }
    }
}

module.exports = redisHandler;