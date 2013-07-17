/**
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:47
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('../../../../logger');

exports.post = function (req, res) {
    //console.log('req.rawBody : ', req.rawBody);
    var $ = parser.load(req.rawBody);
    //var xhr = req.headers['x-requested-with'];
    logger.debug('req.xhr : ', req.xhr);
    $("h3").append("Login Example");
    logger.debug('user id : ', req.params.id);
    //client.set(req.params.id, '<html>' + $('html').html() + '</html>', client.print);
    return '<html>' + $('html').html() + '</html>';
};

