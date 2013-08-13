/**
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:47
 */
var jsdom = require('jsdom').jsdom,
    crypto = require('crypto'),
    logger = require('../../../../logger');


exports.post = function (req, res) {

    var document = jsdom(req.rawBody);
    var window = document.parentWindow;

    logger.debug(__filename + ' jsdom : ', window.document.documentElement.innerHTML);

    return window.document.documentElement.innerHTML;

    //var window = jsdom.jsdom(req.rawBody).createWindow();
    //logger.debug(__filename + ' jsdom : ', window.document.documentElement.innerHTML);
    //return window.document.documentElement.innerHTML


//    jsdom.jQueryify(window, function () {
//        logger.debug(__filename + ' jquery version : ', window.$().jquery);
//        // console.log(window.document.innerHTML);
//        logger.debug(__filename + ' jsdom : ', window.$('html').html());
//        // console.log(window.location);
//        //res.end("<html>"+window.$('html').html()+"</html>")
//        if (window.$('html').html()) {
//            return window.$('html').html();
//        }
//        else {
//            //return '<HTML>' + $('HTML').html() + '</HTML>';
//            return window.$('HTML').html();
//        }
//    });html


};
