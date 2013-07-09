/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 12:18
 * To change this template use File | Settings | File Templates.
 */

exports.post = function (req, res, redisClient) {
    var path = './site' + req.headers['request_uri_origin'];
    console.log('path : ', path);
    require(path).post(req, res, redisClient);
};

exports.put = function (req, res, redisClient) {
    var path = './site' + req.headers['request_uri_origin'];
    console.log('path : ', path);
    require(path).put(req, res, redisClient);
};

exports.delete = function (req, res, redisClient) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};

exports.get = function (req, res, redisClient) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};
