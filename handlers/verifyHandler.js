/**
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 1:04
 */
var logger = require('../logger'),
    util = require('../util');
var oracle = require("oracle");
var poolModule = require('generic-pool');

var initData;
var pool;

var verifyHandler = function () {
    initData = { "hostname": "192.168.1.39", "user": "aap4web", "password": "aap4web1234", "database": "orcl" };
    pool = poolModule.Pool({
        name: 'oracle',
        // connection은 최대 10개까지 생성합니다.
        max: 50,
        // 생성된 connection은 30초 동안 유휴 상태(idle)면 destory됩니다.
        idleTimeoutMillis: 30000,
        log: false,
        create: function (callback) {
            oracle.connect(initData, function (err, conn) {
                callback(err, conn);
            });
        },
        destroy: function (conn) {
            conn.close();
        }
    });
};

verifyHandler.prototype.get = function (req, res, client) {
    try {
        logger.debug(__filename + ' key : ', req.params.id);
        logger.debug(__filename + ' txid : ', req.headers['txid']);
        logger.debug(__filename + ' hash : ', req.headers['hash']);
        //var hash = req.headers['hash'];

        //var hash = eval("(" + req.headers['hash'] + ")");
        var hash = JSON.parse(req.headers['hash'].replace(/[\']/g, '\"'));
        logger.debug(__filename + ' clientHash', typeof(hash));
        logger.debug(__filename + ' clientHash', hash.valueOf());
        logger.debug(__filename + ' clientHash', hash.main);

        //var length = 0;
        //for (var k in hash) if (hash.hasOwnProperty(k)) length++;
        //logger.debug(__filename + ' length ', length);

        var index = [];
        var transaction = {"txid": req.headers["txid"], "result": "s"};
        var details = [];

        // build the index
        for (var x in hash) {
            index.push(x);
        }
        logger.debug(__filename + ' index ', index);

        function verify(i) {
            if (i < index.length) {
                var key = req.params.id;
                if (index[i] != 'main') {
                    key = index[i];
                }

                client.get(key, function (err, reply) {
                    logger.debug(__filename + ' key', key);

                    if (err) {
                        logger.error('error : ', err);
                        details[i] = {"key": key, "result": "f"};
                        //res.send(err.message, 500);
                        //return;
                    }
                    // reply is null when the key is missing
                    if (!reply) {
                        details[i] = {"key": key, "result": "f"};
                        //res.send(404);
                        //return;
                    }

                    if (index[i] == 'main') {
                        //process main page
                        //logger.debug(__filename + ' reply : ', reply);
                        //정규화
                        var nornalizedData = util.normalize(reply);
                        //hash
                        var serverHash = util.hash(nornalizedData);
                        logger.debug(__filename + ' hash', hash.main);
                        //var clientHash = req.headers['hash'];
                        var clientHash = hash.main;
                        logger.debug(__filename + ' serverHash', serverHash);
                        logger.debug(__filename + ' clientHash', clientHash);
                        //검증
                        if (serverHash.toUpperCase() != clientHash.toUpperCase()) {
                            //res.send(505);
                            //return;
                            transaction.result = 'f';
                            details[i] = {"key": "main", "result": "f"};
                        }
                        else {
                            details[i] = {"key": "main", "result": "s"};
                        }
                    }
                    else {
                        //else process static resource
                        logger.debug(__filename + ' value : ', hash[index[i]]);
                        if (hash[index[i]] != reply) {
                            //res.send(505);
                            //return;
                            transaction.result = 'f';
                            details[i] = {"key": key, "result": "f"};
                        }
                        else {
                            details[i] = {"key": key, "result": "s"};
                        }
                    }
                    verify(++i);
                })
            }
            else {
                //최종 response
                //result[0].result = 's';
                if (transaction.result == 's') {
                    res.send(200);
                }
                else {
                    res.send(505);
                }
                //logging
                logger.debug(__filename + ' transaction : ', transaction);
                logger.debug(__filename + ' details : ', details);

                pool.acquire(function (err, conn) {
                    if (err) {
                        console.log('err : ', err);
                        return;
                    }

                    // selecting rows

                    conn.execute("INSERT INTO log_v (txid, v_result, cl_ua, cl_key, uri_key) VALUES ('" + hashCode(transaction.txid) + "','" + transaction.result + "', 'testBrowser'," + hashCode('192.168.1.86') + "," + hashCode('/test001/index.jsp') + ")", [], function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('results : ', results);
                        }

                        var result = [];
                        result.push('{"txid","11111111111"}');
                        result.push('{"txid","22222222222"}');
                        console.log('result : ', result);

                        // return object back to pool
                        pool.release(conn);
                    });
                });

            }
        }

        verify(0);

    } catch (e) {
        logger.error(e.stack);
        res.send(e.message, 500);
    }
};

hashCode = function (str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


module.exports = verifyHandler;