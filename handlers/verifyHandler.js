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
        logger.debug(__filename + ' key : ', req.params.id);
        logger.debug(__filename + ' hash : ', req.headers['hash']);
        //var hash = req.headers['hash'];

        //var hash = eval("(" + req.headers['hash'] + ")");
        var hash = JSON.parse(req.headers['hash']);
        logger.debug(__filename + ' clientHash', typeof(hash));
        logger.debug(__filename + ' clientHash', hash.valueOf());
        logger.debug(__filename + ' clientHash', hash.main);

        //var length = 0;
        //for (var k in hash) if (hash.hasOwnProperty(k)) length++;
        //logger.debug(__filename + ' length ', length);

        var index = [];

        // build the index
        for (var x in hash) {
            index.push(x);
        }
        logger.debug(__filename + ' index ', index);

        function verify(i) {
            if (i < index.length) {
                try {
                    var key = req.params.id;
                    if (index[i] != 'main') {
                        key = index[i];
                    }

                    client.get(key, function (err, reply) {

                        logger.debug(__filename + ' key', key);

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

                        if (index[i] == 'main') {
                            //process main page
                            //logger.debug(__filename + ' reply : ', reply);
                            //정규화
                            var nornalizedData = util.normalize(reply);
                            //hash
                            var serverHash = util.hash(nornalizedData);
                            logger.debug(__filename + ' hash', hash.main);
                            //var clientHash = req.headers['hash'];
                            var clientHash = hash.main;
                            logger.debug(__filename + ' serverHash', serverHash);
                            logger.debug(__filename + ' clientHash', clientHash);
                            //검증
                            if (serverHash.toUpperCase() != clientHash.toUpperCase()) {
                                res.send(505);
                                return;
                            }
                        }
                        else {
                            //else process static resource
                            logger.debug(__filename + ' value : ', hash[index[i]]);

                        }
                        verify(++i);
                    })
                } catch (e) {
                    logger.error(e.stack);
                    res.send(e.message, 500);
                }
            }
            else {
                //최종 response
                res.send(200);
            }
        }

        verify(0);
    } catch (e) {
        logger.error(e.stack);
        res.send(e.message, 500);
    }
};


module.exports = verifyHandler;