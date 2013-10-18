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

exports.put = function (req, res, data, callback) {

    try {
        //logger.debug(srcName + ' data :', '<html>' + data + '</html>');
        var $ = parser.load('<html>' + data + '</html>');

        //var hash = JSON.parse(req.headers['hash'].replace(/[\']/g, '\"'));
        var events = JSON.parse(req.headers['event']);
        logger.debug(srcName + ' events : ', utils.inspect(events));
        //eval(events[0]);
        eval('x=10;y=20;sum($,x,y)');

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

        //req 에서 변경데이타를 뽑아
        //virtual dom 에 적용하는 코드
        //...
        if ($('html').html()) {
            callback(null, $('html').html());
        }
        else {
            callback(null, $('HTML').html());
        }
    } catch (e) {
        logger.error(e.stack);
        callback(e);
    }
}

function sum($, a, b) {
    console.log('a+b : ', a + b);
    $("#dynamicTable").append("<text>" + (a + b) + "</text>");
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