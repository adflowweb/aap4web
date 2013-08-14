/**
 * User: nadir93
 * Date: 13. 8. 14.
 * Time: 오후 12:59
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('../../../../logger');


exports.post = function (req, res) {
    //console.log('req.rawBody : ', req.rawBody);
    var $ = parser.load(req.rawBody);
    //var xhr = req.headers['x-requested-with'];
    //__dirname
    //logger.debug(arguments.callee.toString());

    logger.debug(__filename + ' req.xhr : ', req.xhr);
    //$('head').append('<script>function formsummit(){return 1;}</script>');
    $("h3").append("Login Example");
    logger.debug(__filename + ' user id : ', req.params.id);
    //client.set(req.params.id, '<html>' + $('html').html() + '</html>', client.print);
    //logger.debug('modified : ', '<html>' + $('html').html() + '</html>');

    if ($('html').html()) {
        return $('html').html();
    }
    else {
        return $('HTML').html();
    }
};
