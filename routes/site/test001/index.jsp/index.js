/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:47
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto');

exports.post = function (req, res) {
    //console.log('req.rawBody : ', req.rawBody);
    var $ = parser.load(req.rawBody);
    //var xhr = req.headers['x-requested-with'];
    console.log('req.xhr : ', req.xhr);
    $("h3").append("Login Example");
    console.log('user id : ', req.params.id);
    //client.set(req.params.id, '<html>' + $('html').html() + '</html>', client.print);
    return '<html>' + $('html').html() + '</html>';
};

