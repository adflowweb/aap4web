/**
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 1:04
 */
var logger = require('../logger'),
    util = require('../util');

var verifyHandler = function () {
};

verifyHandler.prototype.get = function (req, res, client) {
    try {
        logger.debug('key : ', req.params.id);
        var hash = req.headers['hash'];
        logger.debug('clientHash#1', hash);
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
                //정규화
                var serverHash = util.normalize(reply);
                console.log('hash', hash);
                var clientHash = req.headers['hash'];
                logger.debug('serverHash', serverHash);
                logger.debug('clientHash', clientHash);
                //검증
                if (serverHash == clientHash) {
                    res.send(200);
                } else res.send(505);
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