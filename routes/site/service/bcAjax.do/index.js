/**
 * User: nadir93
 * Date: 13. 10. 28.
 * Time: 오후 5:49
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    tidy = require('htmltidy').tidy,
    logger = require('../../../../logger');
var srcName = __filename.substring(__filename.lastIndexOf('/'));

exports.put = function (req, res, data, callback) {

    try {
        logger.debug(__filename + ' called put service/bcAjax.do/index.js');
        logger.debug(__filename + ' event :', req.headers['event']);
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