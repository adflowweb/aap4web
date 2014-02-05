/**
 * User: nadir93
 * Date: 14. 2. 4.
 */
var logger = require('../logger');
var srcName = __filename.substring(__filename.lastIndexOf('/'));
//var formidable = require('formidable');
var util = require('util');
var multiPartHandler = function () {
};

multiPartHandler.prototype = {

    post: function (req, res) {
        try {
            logger.debug(srcName + ' req::', util.inspect(req));

            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('{"success": true,"message": "file Sent"}');
            res.end();

            // 파일 전송 코드
            // txid로 폴더생성후 파일저장
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    },
    get: function(req, res) {
        // show a file upload form
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">'+
                '<input type="text" name="title"><br>'+
                '<input type="file" name="upload" multiple="multiple"><br>'+
                '<input type="submit" value="Upload">'+
                '</form>'
        );
    }
}

module.exports = multiPartHandler;