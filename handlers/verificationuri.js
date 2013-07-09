/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오전 10:27
 * To change this template use File | Settings | File Templates.
 */

exports.post = function (req, res, redisClient) {
//    var path = './site'+req.headers['request_uri_origin'];
//    console.log('path : ', path);
//    require(path).post(req, res, client);
};

exports.put = function (req, res, redisClient) {
//    var path = './site'+req.headers['request_uri_origin'];
//    console.log('path : ', path);
//    require(path).put(req, res, client);
};

exports.delete = function (req, res, redisClient) {
//    res.send({id: req.params.id, name: "The Name", description: "description"});
};

exports.get = function (req, res, redisClient) {
//    res.send({id: req.params.id, name: "The Name", description: "description"});
    res.send({'uri': [{'uri':'/test001/index.jsp','queryStr':{'action':'doPost'}},{'uri':'/test001/TestServlet','queryStr':{'action':'doGet'}}]});
};
