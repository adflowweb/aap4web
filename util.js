/**
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 5:07
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('./logger');
var srcName = __filename.substring(__filename.lastIndexOf('/'));

exports.normalize = function (data) {
//logger.debug(__filename + ' before data : ', data);
    var $ = parser.load('<html>' + data + '</html>');
    $('meta').remove(); //remove meta tag
    $('param').remove(); //remove param tag
    $('link[rel="stylesheet"]').remove(); //remove param tag
    $('*[style]').removeAttr('style'); //remove style attr
    $('*[value]').removeAttr('value'); //remove value attr
    $('*[type]').removeAttr('type'); //remove type attr
    //$('*[selected]').removeAttr(); //remove selected attr
    //$('img[@src$=.png']).removeAtrr('src');
    //console.log("test : ",);
    $('img[src$=".png"]').removeAttr('src');
    $('option[selected]').removeAttr('selected');
    $('form[name="searchForm"]').removeAttr('id');
    //$('*[rel]').removeAttr('rel');

    //logger.debug(__filename + ' before data : ', data);

    //var msg = $('html').text();
    var msg = $('html').html();
//logger.debug(__filename + ' $("html").html() : ', msg);


    //testCode
    //msg = msg.replace(/style=\"[\w\#\'\(\)\-\.\,\/\:\;\_\s]*\"|value=\"\w+\"|type=\"[\w\/]+\"/g, '');
    //msg = msg.replace(/\<meta\scontent=[\w\"\#\(\)\-\.\,\/\:\;\_\s\=]*\/\>/g, '');
    //msg = msg.replace(/\<param\s[\w\=\"\'\s\r\n\/\.\,]*\/\>/g, '');
//logger.debug(__filename + ' test data : ', msg);
    //testEnd
    var normalizedData = encodeURIComponent(msg.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
    //encodeURIComponent(data.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
//logger.debug(__filename + ' normalizedData : ', normalizedData);
    return normalizedData;
};

exports.hash = function (data) {
//logger.debug(__filename + ' before data : ', data);
    var hash = crypto.createHash('sha256').update(data).digest('hex');
    logger.debug(srcName + ' hash : ', hash);
    //res.end('<html>'+$('html').html()+'</html>');
    return hash;
};