/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 9
 * Time: 오전 10:27
 * To change this template use File | Settings | File Templates.
 */
var VERIFICATIONURI = 'verificationURI';
module.exports = function () {
    this.post = function (req, res, client) {
        console.log('req.rawBody : ', req.rawBody);
        client.set(VERIFICATIONURI, req.rawBody, function (err) {
            try {
                if (err) {
                    console.log('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                console.log('key set just to be sure');
                res.end();
            } catch (e) {
                console.log(e.stack);
                res.send(e.message, 500);
            }
        });
    };

    this.put = function (req, res, client) {
        console.log('req.rawBody : ', req.rawBody);
        client.set(VERIFICATIONURI, req.rawBody, function (err) {
            try {
                if (err) {
                    console.log('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                console.log('key set just to be sure');
                res.end();
            } catch (e) {
                console.log(e.stack);
                res.send(e.message, 500);
            }
        });
    };

    this.delete = function (req, res, client) {
//    res.send({id: req.params.id, name: "The Name", description: "description"});
        client.del(VERIFICATIONURI, function (err) {
            try {
                if (err) {
                    console.log('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                console.log('key deleted just to be sure');
                //console.log(util.inspect(arguments))
                res.send(200);
            } catch (e) {
                console.log(e.stack);
                res.send(e.message, 500);
            }
        });
    };

    this.get = function (req, res, client) {
        client.get(VERIFICATIONURI, function (err, reply) {
            try {
                if (err) {
                    console.log('error : ', err);
                    res.send(err.message, 500);
                    return;
                }
                if (reply == null) {
                    res.send(404);
                    return;
                }
                console.log('reponse : ', reply);
                res.send(reply);
            } catch (e) {
                console.log(e.stack);
                res.send(e.message, 500);
            }
        });
    };
}
