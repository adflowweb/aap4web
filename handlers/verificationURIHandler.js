/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오전 10:27
 * To change this template use File | Settings | File Templates.
 */
var logger = require('../logger');
var VERIFICATIONURI = 'verificationURI';
var verificationUri = function () {
};

verificationUri.prototype.post = function (req, res, client) {
    logger.debug('req.rawBody : ', req.rawBody);
    client.set(VERIFICATIONURI, req.rawBody, function (err) {
        try {
            if (err) {
                logger.error('error : ', err);
                res.send(err.message, 500);
                return;
            }
            logger.debug('key set just to be sure');
            res.send(200);
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    });
};

verificationUri.prototype.put = function (req, res, client) {
    logger.debug('req.rawBody : ', req.rawBody);
    client.set(VERIFICATIONURI, req.rawBody, function (err) {
        try {
            if (err) {
                logger.error('error : ', err);
                res.send(err.message, 500);
                return;
            }
            logger.debug('key set just to be sure');
            res.send(200);
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    });
};

verificationUri.prototype.delete = function (req, res, client) {
//    res.send({id: req.params.id, name: "The Name", description: "description"});
    client.del(VERIFICATIONURI, function (err) {
        try {
            if (err) {
                logger.error('error : ', err);
                res.send(err.message, 500);
                return;
            }
            logger.debug('key deleted just to be sure');
            //console.log(util.inspect(arguments))
            res.send(200);
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    });
};

verificationUri.prototype.get = function (req, res, client) {
    client.get(VERIFICATIONURI, function (err, reply) {
        try {
            if (err) {
                logger.error('error : ', err);
                res.send(err.message, 500);
                return;
            }
            if (reply) {
                logger.debug('reponse : ', reply);
                res.send(reply);
            } else res.send(404);
        } catch (e) {
            logger.debug(e.stack);
            res.send(e.message, 500);
        }
    });
};

module.exports = verificationUri;
