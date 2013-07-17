/**
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오후 1:53
 */
exports.setup = function (app, handlers, client) {
    //route virtualpages
    var VIRTUALPAGES_PATH = '/v1/virtualpages/:id';

    app.post(VIRTUALPAGES_PATH, function (req, res) {
        handlers['virtualpages']['post'](req, res, client);
    });

    app.put(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.put(req, res, client);
    });

    app.get(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.get(req, res, client);
    });

    app.delete(VIRTUALPAGES_PATH, function (req, res) {
        handlers.virtualpages.delete(req, res, client);
    });

    //route verificationuri
    var VERIFICATIONURI_PATH = '/v1/verificationuri';

    app.post(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.post(req, res, client);
    });

    app.put(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.put(req, res, client);
    });

    app.get(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.get(req, res, client);
    });

    app.delete(VERIFICATIONURI_PATH, function (req, res) {
        handlers.verificationuri.delete(req, res, client);
    });

    //route verify
    var VERIFY_PATH = '/v1/verify/:id';

    app.post(VERIFY_PATH, function (req, res) {
        handlers.verifyHandler.post(req, res, client);
    });

    app.put(VERIFY_PATH, function (req, res) {
        res.send(405);
    });

    app.get(VERIFY_PATH, function (req, res) {
        res.send(405);
    });

    app.delete(VERIFY_PATH, function (req, res) {
        res.send(405);
    });
};
