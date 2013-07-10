/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 5
 * Time: 오후 12:18
 * To change this template use File | Settings | File Templates.
 */
module.exports = function () {
    this.post = function (req, res, redisClient) {
        if (req.headers['request_uri_origin']) {
            var path = '../routes/site' + req.headers['request_uri_origin'];
            console.log('path : ', path);
            require(path).post(req, res, redisClient);
        } else {
            res.send("Not found", 404);
        }
    };

    this.put = function (req, res, redisClient) {
        if (req.headers['request_uri_origin']) {
            var path = '../routes/site' + req.headers['request_uri_origin'];
            console.log('path : ', path);
            require(path).put(req, res, redisClient);
        }
        else {
            res.send("Not found", 404);
        }
    };

    this.delete = function (req, res, redisClient) {
        res.send({id: req.params.id, name: "The Name", description: "description"});
    };
    this.get = function (req, res, redisClient) {
        res.send({id: req.params.id, name: "The Name", description: "description"});
    };

}