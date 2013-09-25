/**
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 1:04
 */
var logger = require('../logger'),
    util = require('../util');
var utils = require('util');
var oracle = require("oracle");
var poolModule = require('generic-pool');
var hostName = require('os').hostname();
var platform = process.platform;
var arch = process.arch;
var pid = process.pid;
var processID = pid + '@' + hostName;
var srcName = __filename.substring(__filename.lastIndexOf('/'));
var INSERT_LOG_SQL = "INSERT INTO log_v (txid, v_result, cl_ua, reg_date, uri_policy, cl_policy, cl_key, uri_key, filter_name, daemon_name) VALUES (:1, :2, :3, SYSDATE, 'v', 'y', :4, :5, :6, :7)";
var INSERT_LOG_DETAIL_SQL = "INSERT INTO log_v_detail (txid, file_key, server_hash, client_hash, file_v_result, file_policy, reg_date) VALUES (:1, :2, :3, :4, :5, :6, SYSDATE)";

var initData;
var pool;

var verifyHandler = function () {
    initData = { "hostname": "192.168.1.39", "user": "aap4web", "password": "aap4web1234", "database": "orcl" };
    pool = poolModule.Pool({
        name: 'oracle',
        min: 2,
        // connection은 최대 50개까지 생성합니다.
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
            try {
                conn.close();
            } catch (e) {
                logger.error(e.stack);
            }
        }
    });
};

verifyHandler.prototype.get = function (req, res, client) {
    try {
        //logger.debug(srcName + ' req : ', req);
        logger.debug(srcName + ' req.url : ', req.url);
        logger.debug(srcName + ' key : ', req.params.id);
        logger.debug(srcName + ' txid : ', req.headers['txid']);
        logger.debug(srcName + ' hash : ', req.headers['hash']);
        logger.debug(srcName + ' clientip : ', req.headers['clientip']);
        logger.debug(srcName + ' filterid : ', req.headers['filterid']);
        logger.debug(srcName + ' user-agent : ', req.headers['user-agent']);
        logger.debug(srcName + ' virtual_page_uri : ', req.headers['virtual_page_uri']);
        //var hash = req.headers['hash'];

        //var hash = eval("(" + req.headers['hash'] + ")");
        var hash = JSON.parse(req.headers['hash'].replace(/[\']/g, '\"'));
        logger.debug(srcName + ' clientHash', typeof(hash));
        logger.debug(srcName + ' clientHash', hash.valueOf());
        logger.debug(srcName + ' clientHash', hash.main);

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
        logger.debug(srcName + ' index ', index);

        function verify(i) {
            if (i < index.length) {
                var key = req.params.id;
                if (index[i] != 'main') {
                    key = index[i];
                }

                client.get(key, function (err, reply) {
                    try {
                        logger.debug(srcName + ' key', key);
                        //logger.debug(srcName + ' reply', reply);
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
                            logger.debug(srcName + ' hash', hash.main);
                            //var clientHash = req.headers['hash'];
                            var clientHash = hash.main;
                            logger.debug(srcName + ' serverHash', serverHash);
                            logger.debug(srcName + ' clientHash', clientHash);
                            //검증
                            if (serverHash.toUpperCase() != clientHash.toUpperCase()) {
                                //res.send(505);
                                //return;
                                transaction.result = 'f';
                                details[i] = {"key": req.headers['virtual_page_uri'], "result": "f", "serverHash": serverHash, "clientHash": clientHash};
                                logger.info(srcName + ' not matched main session :', key);
                            }
                            else {
                                details[i] = {"key": req.headers['virtual_page_uri'], "result": "s", "serverHash": serverHash, "clientHash": clientHash};
                                logger.info(srcName + ' matched main session :', key);
                            }
                        }
                        else {
                            //else process static resource
                            logger.debug(srcName + ' value : ', hash[index[i]]);
                            if (hash[index[i]] != reply) {
                                //res.send(505);
                                //return;
                                transaction.result = 'f';
                                details[i] = {"key": key, "result": "f", "serverHash": reply, "clientHash": hash[index[i]]};
                                logger.info(srcName + ' not matched', key);
                            }
                            else {
                                details[i] = {"key": key, "result": "s", "serverHash": reply, "clientHash": hash[index[i]]};
                                logger.info(srcName + ' matched', key);
                            }
                        }
                    }
                    catch (e) {
                        logger.error(e.stack);
                    }
                    verify(++i);
                })
            }
            else {
                //최종 response
                if (transaction.result == 's') {
                    res.send(200);
                }
                else {
                    res.send(505);
                }
                //logging
                logger.debug(srcName + ' transaction : ', transaction);
                logger.debug(srcName + ' details : ', details);

                //임시코드 삭제할것!!
                if (!transaction.txid) {
                    transaction.txid = process.pid + '-' + guid();
                    logger.debug(srcName + ' temporary transaction : ', transaction);
                }

                //db insert log_v
                pool.acquire(function (err, conn) {
                    try {
                        //conn.setAutoCommit(false);
                        if (err) {
                            logger.error('err : ', err);
                            return;
                        }

                        var arg = [transaction.txid, transaction.result, req.headers['user-agent'], hashCode(req.headers['clientip'])
                            , hashCode(req.headers['virtual_page_uri']), req.headers['filterid'], processID];
                        logger.debug(srcName + ' args : ', arg);
                        conn.execute(INSERT_LOG_SQL, arg, function (err, results) {
                            try {
                                //logger.debug(srcName + ' conn : ', utils.inspect(conn));
                                if (err) {
                                    logger.error(err.stack);
                                    return;
                                } else {
                                    logger.debug(srcName + ' log inserted : ', results);

                                    function logDetail(i) {
                                        if (i < details.length) {
                                            //db insert log_v_detail
                                            arg = [transaction.txid, hashCode(details[i].key)
                                                , details[i].serverHash, details[i].clientHash, 's', 'v'];
                                            logger.debug(srcName + ' args : ', arg);
                                            conn.execute(INSERT_LOG_DETAIL_SQL, arg, function (err, results) {
                                                try {
                                                    if (err) {
                                                        logger.error(err.stack);
                                                        return;
                                                    } else {
                                                        logger.debug(srcName + ' logDetail inserted : ', results);
//                                                        conn.commit(function (err) {
//                                                            if (err) {
//                                                                logger.error(err);
//                                                                return;
//                                                            }
//                                                            logger.debug(srcName + ' commiting ');
//                                                            // transaction committed
//                                                        });
                                                    }
                                                } catch (e) {
                                                    logger.error(e.stack);
                                                }
                                                finally {
                                                    // return object back to pool
                                                    pool.release(conn);
                                                    logger.debug(srcName + ' pool.released ');
                                                }
                                                logDetail(++i);
                                            });
                                        }
                                        else {
                                            logger.debug(srcName + ' logDetail insert done ');
                                        }
                                    }

                                    logDetail(0);
                                }
                            }
                            catch (e) {
                                logger.error(e.stack);
                            }
                            finally {
                                // return object back to pool
                                //pool.release(conn);
                                //logger.debug(srcName + ' pool.released ');
                            }
                        });
                    }
                    catch (e) {
                        logger.error(e.stack);
                    }
                });
            }
        }

        verify(0);
    }

    catch
        (e) {
        logger.error(e.stack);
        res.send(e.message, 500);
    }
}
;

hashCode = function (str) {
    try {
        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    catch (e) {
        logger.error(e.stack);
        throw new Error('hashCodeFuncErr');
    }
}
//test code
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
//end

module.exports = verifyHandler;