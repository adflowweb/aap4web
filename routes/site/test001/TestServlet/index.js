/**
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:57
 */
var parser = require('cheerio'),
    crypto = require('crypto'),
    logger = require('../../../../logger');

exports.put = function (req, res, data) {
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

exports.POST = function (req, res, data) {
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