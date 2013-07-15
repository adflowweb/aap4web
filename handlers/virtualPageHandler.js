/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 12:18
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    util = require('util'),
    logger = require('../logger');

module.exports = function () {
    this.post = function (req, res, client) {
        //nonExistFunctionCall();
        if (!req.headers['request_uri_origin']) {
            res.send(404);
            return;
        }

        try {
            var path = '../routes/site' + req.headers['request_uri_origin'];
            logger.debug('path : ', path);
            var val = require(path).post(req, res);
            //console.log('ret : ',ret);
            //set page
            client.set(req.params.id, val, function (err) {
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                        return;
                    }
                    //testCode
                    //testHtml(val);
                    res.send(200);
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

    this.put = function (req, res, client) {
        if (!req.headers['request_uri_origin']) {
            res.send(404);
            return;
        }

        try {
            var path = '../routes/site' + req.headers['request_uri_origin'];
            logger.debug('path : ', path);
            client.get(req.params.id, function (err, reply) {
                // reply is null when the key is missing
                //console.log('reply : ', reply);
                //var $ = parser.load(reply);
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                        return;
                    }
                    if (reply == null) {
                        res.send(404);
                        return;
                    }
                    //res.send(200);
                    var val = require(path).put(req, res, reply);
                    //console.log('response data : ', val);
                    //console.log('<html>' + $('html').html() + '</html>');
                    client.set(req.params.id, val, function (err) {
                        try {
                            if (err) {
                                logger.error('error : ', err);
                                res.send(err.message, 500);
                                return;
                            }
                            //testCode
                            //testHtml(val);
                            res.send(200);
                        } catch (e) {
                            logger.error(e.stack);
                            res.send(e.message, 500);
                        }
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


    };

    this.delete = function (req, res, client) {
        //res.send({id: req.params.id, name: "The Name", description: "description"});
        logger.debug('key : ', req.params.id);
        client.del(req.params.id, function (err) {
            //console.log(util.inspect(arguments))
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                logger.debug('key deleted just to be sure');
                res.send(200);
            } catch (e) {
                logger.error(e.stack);
                res.send(e.message, 500);
            }
        });
    };
    this.get = function (req, res, client) {
        //res.send({id: req.params.id, name: "The Name", description: "description"});
        logger.debug('key : ', req.params.id);
        client.get(req.params.id, function (err, reply) {
            // reply is null when the key is missing
            //console.log('reply : ', reply);
            //var $ = parser.load(reply);
            try {
                if (err) {
                    logger.error('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                if (reply == null) {
                    res.send(404);
                    return;
                }
                //console.log('reponse : ', reply);
                res.send(reply);
            } catch (e) {
                logger.error(e.stack);
                res.send(e.message, 500);
            }
        });
    };

    function testHtml(html) {
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
        logger.debug('hash : ', crypto.createHash('sha1').update(enc).digest('hex'));
        //res.end('<html>'+$('html').html()+'</html>');
    }
}