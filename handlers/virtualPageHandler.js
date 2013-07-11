/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 12:18
 * To change this template use File | Settings | File Templates.
 */
var parser = require('cheerio'),
    crypto = require('crypto');

module.exports = function () {
    this.post = function (req, res, redisClient) {
        if (req.headers['request_uri_origin']) {
            var path = '../routes/site' + req.headers['request_uri_origin'];
            console.log('path : ', path);
            var val = require(path).post(req, res);
            //console.log('ret : ',ret);
            //set page
            redisClient.set(req.params.id, val, redisClient.print);
            //testCode
            testHtml(val);
            res.end('ok');
        } else {
            res.send("Not found", 404);
        }
    };

    this.put = function (req, res, redisClient) {
        if (!req.headers['request_uri_origin']) {
            res.send("Not found", 404);
            return;
        }

        var path = '../routes/site' + req.headers['request_uri_origin'];
        console.log('path : ', path);
        redisClient.get(req.params.id, function (err, reply) {
            // reply is null when the key is missing
            //console.log('reply : ', reply);
            //var $ = parser.load(reply);
            if (reply == null) {
                res.send("Not found", 404);
                return;
            }

            var val = require(path).put(req, res, reply);
            //console.log('response data : ', val);
            //console.log('<html>' + $('html').html() + '</html>');
            try {
                redisClient.set(req.params.id, val, redisClient.print);
            }
            catch (err) {
                console.log('err', err);
                res.send("Error", 500);
                return;
            }
            //testCode
            testHtml(val);
            res.end('ok');
        });
    };

    this.delete = function (req, res, redisClient) {
        res.send({id: req.params.id, name: "The Name", description: "description"});
    };
    this.get = function (req, res, redisClient) {
        res.send({id: req.params.id, name: "The Name", description: "description"});
    };

    function testHtml(html) {
        var $ = parser.load(html);
        var responseData = $('html').html().replace(/[\n\r]/g, '').replace(/\s+/g, '');
        console.log('response data : ', responseData);
        console.log('----------------------------------------------');
        var enc = encodeURIComponent(responseData);
        //var key = 'abcdeg'
        //console.log('hash : ', crypto.createHash('sha1').update('this is test').digest('hex'));
        //var bytes = Buffer.byteLength(responseData, 'utf8');
        //var hex = '';
        //console.log(responseData.length + " characters, " + bytes + " bytes");
        //for (var i = 0; i < bytes; i++) {
        //    hex += responseData.charCodeAt(i).toString(16);
        //    //console.log('hex : ', hex);
        //}
        console.log('encoded string : ', enc);
        //console.log('hash : ', crypto.createHmac('sha1', key).update('<html>'+$('html').html()+'</html>').digest('hex'));
        console.log('hash : ', crypto.createHash('sha1').update(enc).digest('hex'));
        //res.end('<html>'+$('html').html()+'</html>');
    }
}