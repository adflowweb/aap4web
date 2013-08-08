/**
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 5:07
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('./logger');

exports.normalize = function (data) {
    logger.debug(__filename + ' before data : ', data);
    var normalizedData = encodeURIComponent(data.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
    logger.debug(__filename + ' normalizedData : ', normalizedData);
    return normalizedData;
};

exports.hash = function (data) {
    logger.debug(__filename + ' before data : ', data);
    var hash = crypto.createHash('sha256').update(data).digest('hex');
    logger.debug(__filename + ' hash : ', hash);
    //res.end('<html>'+$('html').html()+'</html>');
    return hash;
};