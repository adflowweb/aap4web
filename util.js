/**
 * Created with JetBrains WebStorm.
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 5:07
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('./logger');

exports.normalize = function (html) {
    var $ = parser.load(html);
    var responseData = $('html').html().replace(/[\n\r]/g, '').replace(/\s+/g, '');
    //logger.debug('response data : ', responseData);
    //logger.debug('----------------------------------------------');
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
    //logger.debug('encoded string : ', enc);
    //console.log('hash : ', crypto.createHmac('sha1', key).update('<html>'+$('html').html()+'</html>').digest('hex'));
    var hash = crypto.createHash('sha1').update(enc).digest('hex');
    logger.debug('hash : ', hash);
    //res.end('<html>'+$('html').html()+'</html>');
    return hash;
};