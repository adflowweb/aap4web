/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:47
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto');

exports.post = function (req, res, client) {
    console.log('req.rawBody : ', req.rawBody);
    var $ = parser.load(req.rawBody);
    //var xhr = req.headers['x-requested-with'];
    console.log('req.xhr : ', req.xhr);
    $("h3").append("Login Example");
    console.log('user id : ', req.params.id);
    client.set(req.params.id, '<html>' + $('html').html() + '</html>', client.print);
    var responseData = $('html').html().replace(/[\n\r]/g, '').replace(/\s+/g, '');
    console.log('response data : ', responseData);
    console.log('----------------------------------------------');
    //var key = 'abcdeg'
    //console.log('hash : ', crypto.createHash('sha1').update('this is test').digest('hex'));
    var bytes = Buffer.byteLength(responseData, 'utf8');
    var hex = '';
    console.log(responseData.length + " characters, " + bytes + " bytes");
    for (var i = 0; i < bytes; i++) {
        hex += responseData.charCodeAt(i).toString(16);
        //console.log('hex : ', hex);
    }
    console.log('encoded string : ', hex);
    //console.log('hash : ', crypto.createHmac('sha1', key).update('<html>'+$('html').html()+'</html>').digest('hex'));
    console.log('hash : ', crypto.createHash('sha1').update(hex).digest('hex'));
    //res.end('<html>'+$('html').html()+'</html>');
    res.end('ok');
};

