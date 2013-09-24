/**
 * User: @nadir93
 * Date: 13. 7. 9
 * Time: 오전 10:27
 */
var logger = require('../logger');
var VERIFICATIONURI = 'verificationURI';
var srcName = __filename.substring(__filename.lastIndexOf('/'));
var verificationUri = function () {
};

verificationUri.prototype = {
    post: function (req, res, client) {
        try {
            logger.debug(srcName + ' req.rawBody : ', req.rawBody);
            client.set(VERIFICATIONURI, req.rawBody, function (err) {
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
            client.set(VERIFICATIONURI, req.rawBody, function (err) {
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
            client.del(VERIFICATIONURI, function (err) {
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
            client.get(VERIFICATIONURI, function (err, reply) {
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
    }
}

module.exports = verificationUri;
