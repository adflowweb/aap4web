/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 12:18
 * To change this template use File | Settings | File Templates.
 */
var parser = redis = require('redis'),
    client = redis.createClient();

//redis error
client.on('error', function (err) {
    console.log("Error " + err);
});

//redis ready
client.on('ready', function () {
    console.log("redis server ready");
});


exports.post = function (req, res) {
    var path = './site'+req.headers['request_uri_origin'];
    console.log('path : ', path);
    require(path).post(req, res, client);
};

exports.put = function (req, res) {
    var path = './site'+req.headers['request_uri_origin'];
    console.log('path : ', path);
    require(path).put(req, res, client);
};

exports.delete = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};

exports.get = function (req, res) {
    res.send({id: req.params.id, name: "The Name", description: "description"});
};
