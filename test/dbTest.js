/**
 * User: nadir93
 * Date: 13. 9. 13.
 * Time: 오전 10:39
 */
var should = require('should');
var oracle = require("oracle");
var poolModule = require('generic-pool');

describe('orcle test', function () {
    var initData;
    var pool;

    before(function (done) {
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
        done();
    });


    after(function (done) {
        done();
    });

    it('oracle connection', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            // selecting rows
//            conn.execute("SELECT * FROM url_policy", [], function (err, results) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    console.log('results : ', results);
//                }
//
//                var result = [];
//                result.push('{"txid","11111111111"}');
//                result.push('{"txid","22222222222"}');
//                console.log('result : ', result);
//
//                // return object back to pool
//                pool.release(conn);
//                done();
//            });

//            conn.execute("INSERT INTO url_policy (uri_key, uri_name) VALUES ('" + hashCode('/test001/index.jsp') + "','/test001/index.jsp')", [], function (err, results) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    console.log('results : ', results);
//                }
//
//                var result = [];
//                result.push('{"txid","11111111111"}');
//                result.push('{"txid","22222222222"}');
//                console.log('result : ', result);
//
//                // return object back to pool
//                pool.release(conn);
//                done();
//            });

//            conn.execute("INSERT INTO cl_policy (cl_key, cl_ip) VALUES ('" + hashCode('192.168.1.86') + "','192.168.1.86')", [], function (err, results) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    console.log('results : ', results);
//                }
//
//                var result = [];
//                result.push('{"txid","11111111111"}');
//                result.push('{"txid","22222222222"}');
//                console.log('result : ', result);
//
//                // return object back to pool
//                pool.release(conn);
//                done();
//            });


            // selecting rows
            conn.execute("SELECT * FROM log_v", [], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('results : ', results);
                }

//                var result = [];
//                result.push('{"txid","11111111111"}');
//                result.push('{"txid","22222222222"}');
//                console.log('result : ', result);

                // return object back to pool
                pool.release(conn);
                done();
            });

        });


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

//this.timeout(150000);
//        var j = 0;
//        for (i = 0; i < 100000; i++) {
//            pool.acquire(function (err, conn) {
//                j++;
//                if (err) {
//                    console.log('err : ', err);
//                    return;
//                }
//                // selecting rows
//                conn.execute("SELECT * FROM serv_info", [], function (err, results) {
//                    if (err) {
//                        console.log(err);
//                    } else {
//                        //console.log('result : ', results);
//                    }
//                    // return object back to pool
//                    pool.release(conn);
//                    //console.log('j = ', j);
//                    if (j == 99999) {
//                        done();
//                    }
//                });
//            });
//        }
    });
});




