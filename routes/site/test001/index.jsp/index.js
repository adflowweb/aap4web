/**
 * User: nadir93
 * Date: 13. 8. 13.
 * Time: 오전 10:31
 */
var jsdom = require('jsdom'),
    logger = require('../../../../logger');

exports.post = function (req, res) {
    logger.debug(__filename + ' called post default/index_jsdom.js');
    //logger.debug('req.xhr : ', req.xhr);
    //logger.debug('req.rawBody : ', req.rawBody);

    var window = jsdom.jsdom(req.rawBody).createWindow();
    logger.debug(__filename + ' jsdom : ', window.document.documentElement.innerHTML);
    return window.document.documentElement.innerHTML
};