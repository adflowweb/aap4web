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
    return '<html>' + $('html').html() + '</html>';
};

exports.put = function (req, res, data) {
    logger.debug(__filename + ' called put default/index.js');
    var $ = parser.load(data);
    //req 에서 변경데이타를 뽑아
    //virtual dom 에 적용하는 코드
    //...
    return  '<html>' + $('html').html() + '</html>';
}

