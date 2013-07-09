/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오후 1:53
 * To change this template use File | Settings | File Templates.
 */
function setup(app, handlers, redisClient) {
    //console.log('redis : ', redisClient);
    //route virtualpages
    var VIRTUALPAGES_PATH = '/v1/virtualpages/:id';
    app.post(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.post(req, res, redisClient);
    });
    app.put(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.put(req, res, redisClient);
    });
    app.get(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.get(req, res, redisClient);
    });
    app.delete(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.del(req, res, redisClient);
    });

    //route verificationuri
    var VERIFICATIONURI_PATH = '/v1/verificationuri';
    app.post(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.post(req, res, redisClient);
    });
    app.put(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.put(req, res, redisClient);
    });
    app.get(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.get(req, res, redisClient);
    });
    app.delete(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.delete(req, res, redisClient);
    });
}

exports.setup = setup;