/**
 * User: nadir93
 * Date: 2014. 2. 12.
 * Time: 오전 11:37
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    tidy = require('htmltidy').tidy,
    logger = require('../../../../logger');
var srcName = __filename.substring(__filename.lastIndexOf('/'));

var opts = {
    //doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    'sort-attributes': 'alpha'
}

exports.post = function (req, res, callback) {
    try {
        //logger.debug(__filename + ' called post default/index.js');
        //logger.debug('req.xhr : ', req.xhr);
        //logger.debug('req.rawBody : ', req.rawBody);
        var $ = parser.load('<html>' + req.rawBody + '</html>');

        //var testData = $('html').text().replace(/[\n\r]/g, '').replace(/\s+/g, '');
        //logger.debug(__filename + ' testData : ', testData);


        $( "#fs_navigation" ).append( '<div id="gnb"></div>' );





                        tidy($('html').html(), opts, function (err, html) {
            //console.log(encodeURIComponent(html.replace(/[\n\r]/g, '').replace(/\s+/g, '')));
            var cleanedHtml = html.replace(/\/\/\<\!\[CDATA\[/g, '').replace(/\/\/\]\]\>/g, '').replace(/\<\!\[CDATA\[/g, '').replace(/\]\]\>/g, '').substring(html.indexOf('<head>'));
            cleanedHtml = cleanedHtml.substring(0, cleanedHtml.indexOf('</html>'));
            //logger.debug(srcName + ' cleanedHtml : ', cleanedHtml);
            //.replace('//]]>/g',''));
            //$string = str_replace("//<![CDATA[","",$string);
            //$string = str_replace("//]]>","",$string);
            //console.log('value : ', html);
            callback(null, cleanedHtml);
        });
    } catch (e) {
        logger.error(e.stack);
        callback(e);
    }
};

exports.put = function (req, res, data, callback) {

    try {
        logger.debug(__filename + ' called put default/index.js');
        //logger.debug(__filename + ' data :', data);
        var $ = parser.load('<html>' + data + '</html>');
        //req 에서 변경데이타를 뽑아
        //virtual dom 에 적용하는 코드
        //...
        callback(null, $('html').html());
    } catch (e) {
        logger.error(e.stack);
        callback(e);
    }
}

exports.normalize = function (data) {
    //logger.debug(__filename + ' called normalize default/index.js');
    logger.debug(srcName + ' before data : ', data);
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
    $('option[selected]').removeAttr('selected');
    $('form[name="searchForm"]').removeAttr('id');
    $('Link[href="/AAPlus/favicon.ico"]').remove();
    $('input').removeAttr('type');
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

