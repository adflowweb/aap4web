/**
 * User: nadir93
 * Date: 13. 10. 22.
 * Time: 오후 5:27
 */
var utils = require('util');
var oracle = require("oracle");
var poolModule = require('generic-pool');
var redis = require('redis').createClient();
var srcName = __filename.substring(__filename.lastIndexOf('/'));
var INSERT_LOG_SQL = "INSERT INTO log_v (txid, v_result, cl_ua, reg_date, uri_policy, cl_policy, cl_key, uri_key, filter_name, daemon_name) VALUES (:1, :2, :3, SYSDATE, :4, 'Y', :5, :6, :7, :8)";
var INSERT_LOG_DETAIL_SQL = "INSERT INTO log_v_detail (txid, content_key, server_hash, client_hash, content_v_result, content_policy, reg_date) VALUES (:1, :2, :3, :4, :5, :6, SYSDATE)";
var SELECT_POLICY_CONTENT_SQL = "SELECT b.content_key, b.content_type, b.content_name, b.content_hash, b.reg_date, a.content_policy FROM content_policy a, content_info b where a.content_key = b.content_key";
var SELECT_POLICY_URI_SQL = "SELECT a.uri_key, a.uri_policy, b.uri_name, b.reg_date from url_policy a, url_info b where a.uri_key = b.uri_key";

var initData;
var pool;


initData = { "hostname": "192.168.1.40", "user": "aap4web", "password": "aap4web1234", "database": "orcl" };
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

    console.log(srcName + ' acquire db conn ');
    pool.acquire(function (err, conn) {
        if (err) {
            logger.error(err.stack);
            return;
        }

        //content_policy
        console.log(srcName + ' polling content_policy ');
        conn.execute(SELECT_POLICY_CONTENT_SQL, [], function (err, reply) {
            try {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(srcName + ' reply : ', reply);

                    reply.forEach(function (value, i) {
                        //logger.debug(srcName + ' value : ', value);
                        //logger.debug(srcName + ' CONTENT_NAME : ', value.CONTENT_NAME);
                        //logger.debug(srcName + ' CONTENT_HASH : ', value.CONTENT_HASH);
                        //redis insert
                        redis.hset('content', value.CONTENT_NAME, '{"content_hash":"' + value.CONTENT_HASH + '","content_policy":"' + value.CONTENT_POLICY + '"}', function (err) {
                            try {
                                if (err) {
                                    console.log(err.stack);
                                    return;
                                } else {
                                    //logger.debug(srcName + ' key inserted ', reply);
                                }
                            } catch (e) {
                                console.log(e.stack);
                            }
                        });
                    });
                }
            } catch (e) {
                console.log(e.stack);
            }
        });

        //uri_policy
        console.log(srcName + ' polling uri_policy ');
        conn.execute(SELECT_POLICY_URI_SQL, [], function (err, reply) {
            try {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(srcName + ' reply : ', reply);

                    reply.forEach(function (value, i) {
                        //logger.debug(srcName + ' value : ', value);
                        //logger.debug(srcName + ' URI_KEY : ', value.URI_KEY);
                        //logger.debug(srcName + ' URI_POLICY : ', value.URI_POLICY);
                        //redis insert
                        redis.hset('uri', value.URI_NAME, '{"uri_key":"' + value.URI_KEY + '","uri_policy":"' + value.URI_POLICY + '"}', function (err) {
                            try {
                                if (err) {
                                    console.log(err.stack);
                                    return;
                                } else {
                                    //logger.debug(srcName + ' key inserted ', reply);
                                }
                            } catch (e) {
                                console.log(e.stack);
                            }
                        });
                    });
                }
            } catch (e) {
                console.log(e.stack);
            } finally {
                // return object back to pool
                pool.release(conn);
            }
        });
    });
}, 5000); // 10초 마다 실행
