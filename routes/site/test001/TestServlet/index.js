/**
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:57
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('../../../../logger');
var utils = require('util');
var srcName = __filename.substring(__filename.lastIndexOf('/'));

exports.put = function (req, res, data) {
    //console.log('req.headers : ', req.headers);
    //console.log('----------------------------------------------');

    try {
        //logger.debug(srcName + ' data :', '<html>' + data + '</html>');
        var $ = parser.load('<html>' + data + '</html>');

        //var hash = JSON.parse(req.headers['hash'].replace(/[\']/g, '\"'));
        var events = JSON.parse(req.headers['event']);
        logger.debug(srcName + ' events : ', utils.inspect(events));

        $("#msg").text("Validation Success");
        $("#dynamicTable").append("<caption>" + "ChanTable" + "</caption>");
        $("#dynamicTable").append("<tbody>");
        $("#dynamicTable").append("<tr>");
        $("#dynamicTable").append("<td>A</td>");
        $("#dynamicTable").append("<td>B</td>");
        $("#dynamicTable").append("<td>C</td>");
        $("#dynamicTable").append("</tr>");
        $("#dynamicTable").append("<tr>");
        $("#dynamicTable").append("<td>D</td>");
        $("#dynamicTable").append("<td>E</td>");
        $("#dynamicTable").append("<td>F</td>");
        $("#dynamicTable").append("</tr>");
        $("#dynamicTable").append("<tr>");
        $("#dynamicTable").append("<td>G</td>");
        $("#dynamicTable").append("<td>H</td>");
        $("#dynamicTable").append("<td>I</td>");
        $("#dynamicTable").append("</tr>");
        $("#dynamicTable").append("</tbody>");

        return  $('html').html();
    } catch (e) {
        logger.error(e.stack);
    }
}

exports.post = function (req, res, data) {
    //console.log('req.headers : ', req.headers);
    //console.log('----------------------------------------------');
    var $ = parser.load(data);

    $("#msg").text("Validation Success");
    $("#dynamicTable").append("<caption>" + "ChanTable" + "</caption>");
    $("#dynamicTable").append("<tbody>");
    $("#dynamicTable").append("<tr>");
    $("#dynamicTable").append("<td>A</td>");
    $("#dynamicTable").append("<td>B</td>");
    $("#dynamicTable").append("<td>C</td>");
    $("#dynamicTable").append("</tr>");
    $("#dynamicTable").append("<tr>");
    $("#dynamicTable").append("<td>D</td>");
    $("#dynamicTable").append("<td>E</td>");
    $("#dynamicTable").append("<td>F</td>");
    $("#dynamicTable").append("</tr>");
    $("#dynamicTable").append("<tr>");
    $("#dynamicTable").append("<td>G</td>");
    $("#dynamicTable").append("<td>H</td>");
    $("#dynamicTable").append("<td>I</td>");
    $("#dynamicTable").append("</tr>");
    $("#dynamicTable").append("</tbody>");

    return  '<html>' + $('html').html() + '</html>';
}