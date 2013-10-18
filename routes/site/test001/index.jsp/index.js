/**
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:47
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
//    //console.log('req.rawBody : ', req.rawBody);
//
//    var $ = parser.load(req.rawBody);
//    //var xhr = req.headers['x-requested-with'];
//    //__dirname
//    //logger.debug(arguments.callee.toString());
//
//    logger.debug(__filename + ' req.xhr : ', req.xhr);
//    //$('head').append('<script>function formsummit(){return 1;}</script>');
//    $("h3").append("Login Example");
//    logger.debug(__filename + ' user id : ', req.params.id);
//    //client.set(req.params.id, '<html>' + $('html').html() + '</html>', client.print);
//    //logger.debug('modified : ', '<html>' + $('html').html() + '</html>');
//
//    if ($('html').html()) {
//        return '<html>' + $('html').html() + '</html>';
//    } else {
//        return '<HTML>' + $('HTML').html() + '</HTML>';
//    }


    try {

        //logger.debug('req.rawBody : ', req);
        var $ = parser.load('<html>' + req.rawBody + '</html>');

        //var testData = $('html').text().replace(/[\n\r]/g, '').replace(/\s+/g, '');
        //logger.debug(__filename + ' testData : ', testData);

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
