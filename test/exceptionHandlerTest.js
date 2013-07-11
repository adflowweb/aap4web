/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 11
 * Time: 오후 5:58
 * To change this template use File | Settings | File Templates.
 */

// Exception Handler 등록
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err.stack);
    // 추후 trace를 하게 위해서 err.stack 을 사용하여 logging하시기 바랍니다.
    // Published story에서 beautifule logging winston 참조
});
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 만약 여기서 자바스크립트 코드가 에러발생되었다고 가정시
    nonExistFunctionCall();
    res.end('Hello World\\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
