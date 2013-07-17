/**
 * Created with JetBrains WebStorm.
 * User: nadir93
 * Date: 13. 7. 16.
 * Time: 오후 1:04
 * To change this template use File | Settings | File Templates.
 */
var logger = require('../logger'),
    util = require('../util');

var verifyHandler = function () {
};

verifyHandler.prototype.post = function (req, res, client) {
    try {
        logger.debug('key : ', req.params.id);
        client.get(req.params.id, function (err, reply) {
            // reply is null when the key is missing
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }

                if (!reply) {
                    res.send(404);
                } else {
                    //검증하기
                    //console.log('reponse : ', reply);
                    var serverHash = util.normalize(reply);
                    var clientHash = req.headers['hash'];
                    logger.debug('serverHash', serverHash);
                    logger.debug('clientHash', clientHash);

                    if (serverHash == clientHash) {
                        res.send(200);
                    } else {
                        res.send(505);
                    }
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

module.exports = verifyHandler;