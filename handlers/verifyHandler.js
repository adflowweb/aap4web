/**
 * User: @nadir93
 * Date: 13. 7. 16.
 * Time: 오후 1:04
 */
var logger = require('../logger'),
    util = require('../util');
var crypto = require('crypto');
var utils = require('util');
var oracle = require("oracle");
var poolModule = require('generic-pool');
var redis = require('redis').createClient()
var hostName = require('os').hostname();
var platform = process.platform;
var arch = process.arch;
var pid = process.pid;
var processID = pid + '@' + hostName;
var srcName = __filename.substring(__filename.lastIndexOf('/'));
var INSERT_LOG_SQL = "INSERT INTO log_v (txid, v_result, cl_ua, reg_date, uri_policy, cl_policy, cl_key, uri_key, filter_name, daemon_name) VALUES (:1, :2, :3, SYSDATE, 'V', 'Y', :4, :5, :6, :7)";
var INSERT_LOG_DETAIL_SQL = "INSERT INTO log_v_detail (txid, content_key, server_hash, client_hash, content_v_result, content_policy, reg_date) VALUES (:1, :2, :3, :4, :5, :6, SYSDATE)";
// , server_hash, client_hash, content_v_result, content_policy, reg_date    //, :3, :4, :5, :6, SYSDATE
var SELECT_POLICY_STATIC_SQL = "SELECT b.content_key, b.content_type, b.content_name, b.content_hash, b.reg_date, a.content_policy FROM content_policy a, content_info b where a.content_key = b.content_key";
var SELECT_POLICY_URI_SQL = "SELECT a.uri_key, a.uri_policy, b.uri_name, b.reg_date from url_policy a, url_info b where a.uri_key = b.uri_key";

var initData;
var pool;

var verifyHandler = function () {
    initData = { "hostname": "192.168.1.39", "user": "aap4web", "password": "aap4web1234", "database": "orcl" };
    pool = poolModule.Pool({
        name: 'oracle',
        min: 0,
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

    //oracle poller
    setInterval(function () {

        logger.debug(srcName + ' polling oracle ');
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            //content_policy
            conn.execute(SELECT_POLICY_STATIC_SQL, [], function (err, results) {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log('results : ', results);

                    results.forEach(function (value, i) {
                        console.log('value : ', value);
                        console.log('CONTENT_NAME : ', value.CONTENT_NAME);
                        console.log('CONTENT_HASH : ', value.CONTENT_HASH);
                        //redis insert
                        redis.hset('static', value.CONTENT_NAME, '{"content_hash":"' + value.CONTENT_HASH + '","content_policy":"' + value.CONTENT_POLICY + '"}', function (err) {
                            try {
                                if (err) {
                                    logger.error(err.stack);
                                    return;
                                } else {
                                    //logger.debug(srcName + ' key inserted ', reply);
                                }
                            } catch (e) {
                                logger.error(e.stack);
                            }
                        });
                    });
                }

                // return object back to pool
                pool.release(conn);
            });

            //uri_policy
            conn.execute(SELECT_POLICY_URI_SQL, [], function (err, results) {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log('results : ', results);

                    results.forEach(function (value, i) {
                        console.log('value : ', value);
                        console.log('URI_KEY : ', value.URI_KEY);
                        console.log('URI_POLICY : ', value.URI_POLICY);
                        //redis insert
                        redis.hset('uri', value.URI_NAME, '{"uri_key":"' + value.URI_KEY + '","uri_policy":"' + value.URI_POLICY + '"}', function (err) {
                            try {
                                if (err) {
                                    logger.error(err.stack);
                                    return;
                                } else {
                                    //logger.debug(srcName + ' key inserted ', reply);
                                }
                            } catch (e) {
                                logger.error(e.stack);
                            }
                        });
                    });
                }

                // return object back to pool
                pool.release(conn);
            });

        });
    }, 60000); // 60초 뒤에 또 실행
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
        //single quotation to double quotation
        var hash = JSON.parse(req.headers['hash'].replace(/[\']/g, '\"'));
        logger.debug(srcName + ' clientHash type ', typeof(hash));
        logger.debug(srcName + ' clientHash value ', hash.valueOf());
        logger.debug(srcName + ' main ', hash.main);

        //var length = 0;
        //for (var k in hash) if (hash.hasOwnProperty(k)) length++;
        //logger.debug(__filename + ' length ', length);

        var index = [];
        var transaction = {"txid": req.headers["txid"], "result": "S"};
        var details = [];

        // build the index
        for (var x in hash) {
            index.push(x);
        }
        logger.debug(srcName + ' index ', index);

        function verify(i, policy) {
            if (i < index.length) {
                var key = req.params.id;
                var hashKey = 'virtualpage';
                if (index[i] != 'main') {
                    key = index[i];
                    hashKey = 'static';
                }

                client.hget(hashKey, key, function (err, reply) {
                    try {
                        logger.debug(srcName + ' key', key);
                        //logger.debug(srcName + ' reply', reply);
                        if (err) {
                            logger.error('error : ', err);
                            details[i] = {"key": key, "result": "F"};
                            //res.send(err.message, 500);
                            //return;
                        }
                        // reply is null when the key is missing
                        if (!reply) {
                            details[i] = {"key": key, "result": "F"};
                            //res.send(404);
                            //return;
                        }

                        if (index[i] == 'main') {
                            //process main page
                            //logger.debug(srcName + ' reply : ', reply);
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
                                transaction.result = 'F';
                                details[i] = {"key": req.headers['virtual_page_uri'], "result": "F", "serverHash": serverHash, "clientHash": clientHash, "policy": "V"};
                                logger.info(srcName + ' not matched main session :', key);
                            } else {
                                details[i] = {"key": req.headers['virtual_page_uri'], "result": "S", "serverHash": serverHash, "clientHash": clientHash, "policy": "V"};
                                logger.info(srcName + ' matched main session :', key);
                            }
                        } else {
                            //else process static resource
                            logger.debug(srcName + ' reply : ', reply);
                            var data = JSON.parse(reply);
                            logger.debug(srcName + ' clientHash : ', hash[index[i]]);
                            logger.debug(srcName + ' content_policy : ', data.content_policy);

                            //policy
                            if (data.content_policy == 'V') {
                                //검증대상
                                if (hash[index[i]] != data.content_hash) {
                                    //res.send(505);
                                    //return;
                                    transaction.result = 'F';
                                    details[i] = {"key": key, "result": "F", "serverHash": data.content_hash, "clientHash": hash[index[i]], "policy": data.content_policy};
                                    logger.info(srcName + ' not matched', key);
                                } else {
                                    details[i] = {"key": key, "result": "S", "serverHash": data.content_hash, "clientHash": hash[index[i]], "policy": data.content_policy};
                                    logger.info(srcName + ' matched', key);
                                }
                            } else if (data.content_policy == 'M') {
                                //모니터대상
                                if (hash[index[i]] != data.content_hash) {
                                    //transaction.result = 'F';
                                    details[i] = {"key": key, "result": "F", "serverHash": data.content_hash, "clientHash": hash[index[i]], "policy": data.content_policy};
                                    logger.info(srcName + ' not matched', key);
                                } else {
                                    details[i] = {"key": key, "result": "S", "serverHash": data.content_hash, "clientHash": hash[index[i]], "policy": data.content_policy};
                                    logger.info(srcName + ' matched', key);
                                }
                            }
                        }
                    } catch (e) {
                        logger.error(e.stack);
                    }
                    verify(++i, policy);
                })
            } else {
                //최종 response
                if (transaction.result == 'S') {
                    res.send(200);
                } else {
                    res.send(505);
                }
                //logging
                logger.debug(srcName + ' transaction : ', transaction);
                logger.debug(srcName + ' details : ', details);

//////////////////임시코드 삭제할것!!
                if (!transaction.txid) {
                    transaction.txid = process.pid + '-' + guid();
                    logger.debug(srcName + ' temporary transaction : ', transaction);
                }

                var clientIP = req.headers['clientip'];
                if (!clientIP) {
                    clientIP = '192.168.1.86';
                    logger.debug(srcName + ' temporary clientIP : ', clientIP);
                }
//////////////////임시코드 삭제할것!!

                //db insert log_v
                pool.acquire(function (err, conn) {
                    try {
                        //conn.setAutoCommit(false);
                        if (err) {
                            logger.error('err : ', err);
                            return;
                        }

                        var arg = [transaction.txid, transaction.result, req.headers['user-agent'], crypto.createHash('md5').update(clientIP).digest("base64")
                            , crypto.createHash('md5').update(req.headers['virtual_page_uri']).digest("base64"), req.headers['filterid'], processID];
                        logger.debug(srcName + ' log_v args : ', arg);
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
                                            var args2 = [transaction.txid, crypto.createHash('md5').update(details[i].key).digest("base64"), details[i].serverHash, details[i].clientHash, details[i].result, details[i].policy];
                                            logger.debug(srcName + ' log_v_detail args : ', args2);
                                            conn.execute(INSERT_LOG_DETAIL_SQL, args2, function (err, results) {
                                                try {
                                                    if (err) {
                                                        logger.error(err.stack);
                                                        return;
                                                    } else {
                                                        logger.debug(srcName + ' logDetail inserted : ', results);
                                                        //test transaction
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
                                                } finally {
                                                    // return object back to pool
                                                    pool.release(conn);
                                                    logger.debug(srcName + ' pool.released ');
                                                }
                                                logDetail(++i);
                                            });
                                        } else {
                                            logger.debug(srcName + ' logDetail insert done ');
                                        }
                                    }

                                    logDetail(0);
                                }
                            } catch (e) {
                                logger.error(e.stack);
                            } finally {
                                // return object back to pool
                                //pool.release(conn);
                                //logger.debug(srcName + ' pool.released ');
                            }
                        });
                    } catch (e) {
                        logger.error(e.stack);
                    }
                });
            }
        }

        client.hget('uri', req.headers['virtual_page_uri'], function (err, reply) {
            try {
                logger.debug(srcName + ' reply : ', reply);
                var data = JSON.parse(reply);
                //policy
                if (data.uri_policy == 'V') {
                    logger.info(srcName + ' 검증대상 : ', req.headers['virtual_page_uri']);
                    verify(0, data.uri_policy);
                } else if (data.uri_policy == 'M') {
                    logger.info(srcName + ' 모니터대상 : ', req.headers['virtual_page_uri']);
                    verify(0, data.uri_policy);
                } else {
                    // 검증대상아님
                    logger.info(srcName + ' 검증대상아님 : ', req.headers['virtual_page_uri']);
                    res.send(200);
                }
            } catch (e) {
                logger.error(e.stack);
            }
        });
    } catch (e) {
        logger.error(e.stack);
        res.send(e.message, 500);
    }
};

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


