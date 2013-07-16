/**
 * Created with JetBrains WebStorm.
 * User: nadir93
 * Date: 13. 7. 16.
 * Time: 오후 1:04
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('../logger');

module.exports = function () {
    this.post = function (req, res, client) {
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

                    if (reply == null) {
                        res.send(404);
                    } else {
                        //검증하기
                        //console.log('reponse : ', reply);
                        var serverHash = normalize(reply);
                        var clientHash = req.headers['hash'];
                        logger.debug('serverHash', serverHash);
                        logger.debug('clientHash', clientHash);

                        if (serverHash == clientHash) {
                            res.send(200);
                        }
                        else {
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

    function normalize(html) {
        var $ = parser.load(html);
        var responseData = $('html').html().replace(/[\n\r]/g, '').replace(/\s+/g, '');
        logger.debug('response data : ', responseData);
        logger.debug('----------------------------------------------');
        var enc = encodeURIComponent(responseData);
        //var key = 'abcdeg'
        //console.log('hash : ', crypto.createHash('sha1').update('this is test').digest('hex'));
        //var bytes = Buffer.byteLength(responseData, 'utf8');
        //var hex = '';
        //console.log(responseData.length + " characters, " + bytes + " bytes");
        //for (var i = 0; i < bytes; i++) {
        //    hex += responseData.charCodeAt(i).toString(16);
        //    //console.log('hex : ', hex);
        //}
        logger.debug('encoded string : ', enc);
        //console.log('hash : ', crypto.createHmac('sha1', key).update('<html>'+$('html').html()+'</html>').digest('hex'));
        var hash = crypto.createHash('sha1').update(enc).digest('hex');
        logger.debug('hash : ', hash);
        //res.end('<html>'+$('html').html()+'</html>');
        return hash;
    }
};