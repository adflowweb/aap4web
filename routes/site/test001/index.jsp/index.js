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

