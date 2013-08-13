/**
 * User: nadir93
 * Date: 13. 8. 13.
 * Time: 오전 10:31
 */
var jsdom = require('jsdom'),
    logger = require('../../../logger');

exports.post = function (req, res) {

    var document = jsdom.jsdom(req.rawBody, jsdom.level(2, "html"));
    var window = document.parentWindow;

    logger.debug(__filename + ' jsdom level2 html: ', window.document.innerHTML);

//    var window = jsdom.jsdom(req.rawBody, jsdom.level(1, "core")).parentWindow;
//
//    jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
//        //window.$("body").append('<div class="testing">Hello World, It works</div>');
//
//        logger.debug(__filename + ' jsdom : ', window.$('html').html());
//    });

//////    var document = jsdom(req.rawBody);
//////    var window = document.parentWindow;
//////
//////    logger.debug(__filename + ' jsdom : ', window.document.documentElement.innerHTML);
//////
//////    return window.document.documentElement.innerHTML;


//    logger.debug(__filename + ' called post default/index_jsdom.js');
//    //logger.debug('req.xhr : ', req.xhr);
//    //logger.debug('req.rawBody : ', req.rawBody);
//
//    var window = jsdom.jsdom(req.rawBody).createWindow();
//    //logger.debug(__filename + ' jsdom : ', window.document.documentElement.innerHTML);
//    //return window.document.documentElement.innerHTML
//
//
//
//    jsdom.jQueryify(window, function(){
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
//    });


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

