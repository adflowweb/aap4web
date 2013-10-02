/**
 * User: nadir93
 * Date: 13. 7. 22.
 * Time: 오후 12:25
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('../../../logger');

exports.post = function (req, res) {
    logger.debug(__filename + ' called post default/index.js');
    //logger.debug('req.xhr : ', req.xhr);
    //logger.debug('req.rawBody : ', req.rawBody);
    var $ = parser.load(req.rawBody);
    //var testData = $('html').text().replace(/[\n\r]/g, '').replace(/\s+/g, '');
    //logger.debug(__filename + ' testData : ', testData);

    if ($('html').html()) {
        return $('html').html();
    }
    else {
        //return '<HTML>' + $('HTML').html() + '</HTML>';
        return $('HTML').html();
    }
};

exports.put = function (req, res, data) {
    logger.debug(__filename + ' called put default/index.js');
    var $ = parser.load(data);
    //req 에서 변경데이타를 뽑아
    //virtual dom 에 적용하는 코드
    //...
    if ($('html').html()) {
        return $('html').html();
    }
    else {
        return $('HTML').html();
    }
}

exports.normalize = function (data) {
//logger.debug(srcName + ' before data : ', data);
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
//logger.debug(srcName + ' $("html").html() : ', msg);


    //testCode
    //msg = msg.replace(/style=\"[\w\#\'\(\)\-\.\,\/\:\;\_\s]*\"|value=\"\w+\"|type=\"[\w\/]+\"/g, '');
    //msg = msg.replace(/\<meta\scontent=[\w\"\#\(\)\-\.\,\/\:\;\_\s\=]*\/\>/g, '');
    //msg = msg.replace(/\<param\s[\w\=\"\'\s\r\n\/\.\,]*\/\>/g, '');
//logger.debug(srcName + ' test data : ', msg);
    //testEnd
    var normalizedData = encodeURIComponent(msg.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
    //encodeURIComponent(data.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
//logger.debug(srcName + ' normalizedData : ', normalizedData);
    return normalizedData;
};

