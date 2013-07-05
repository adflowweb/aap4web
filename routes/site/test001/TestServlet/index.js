/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 2:57
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto');

exports.put = function (req, res, client) {
    console.log('req.headers : ', req.headers);
    console.log('----------------------------------------------');

    client.get(req.params.id, function (err, reply) {
        // reply is null when the key is missing
        //console.log('reply : ', reply);
        var $ = parser.load(reply);

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

        //console.log('<html>' + $('html').html() + '</html>');
        client.set(req.params.id, '<html>' + $('html').html() + '</html>', redis.print);

        var responseData = $('html').html().replace(/[\n\r]/g, '').replace(/\s+/g, '');
        console.log('response data : ', responseData);
        console.log('----------------------------------------------');
        //var key = 'abcdeg'

        //console.log('hash : ', crypto.createHash('sha1').update('this is test').digest('hex'));
        var bytes = Buffer.byteLength(responseData, 'utf8');
        var hex = '';
        console.log(responseData.length + " characters, " + bytes + " bytes");
        for (var i = 0; i < bytes; i++) {
            hex += responseData.charCodeAt(i).toString(16);
            //console.log('hex : ', hex);
        }
        console.log('encoded string : ', hex);

        //console.log('hash : ', crypto.createHmac('sha1', key).update('<html>'+$('html').html()+'</html>').digest('hex'));
        console.log('hash : ', crypto.createHash('sha1').update(hex).digest('hex'));
    });
    res.end('ok');
}