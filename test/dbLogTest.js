/**
 * User: nadir93
 * Date: 13. 9. 24.
 * Time: 오후 4:25
 */
var should = require('should');
var oracle = require("oracle");
var poolModule = require('generic-pool');

describe('log_v table test', function () {
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

//    it('insert log_v', function (done) {
//        this.timeout(10000);
//        pool.acquire(function (err, conn) {
//            if (err) {
//                console.log('err : ', err);
//                return;
//            }
//
//            conn.execute("INSERT INTO log_v (txid, v_result, cl_ua, reg_date, uri_policy, cl_policy, cl_key, uri_key, filter_name, daemon_name) VALUES (:1, :2, :3, SYSDATE, 'v', 'y', :4, :5, :6, :7)", [1234567890, 's', 'mocha', hashCode('192.168.1.86'), hashCode('/test001/index.jsp'), '1234@hostName', '2345@hostName'], function (err, results) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    //console.log('results : ', results);
//                }
//                //results.should.have.property('updateCount', 1);
//                // return object back to pool
//                pool.release(conn);
//                done();
//            });
//
//        });
//
//    });

    it('select log_v', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            conn.execute("select * from log_v", [], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('results : ', results);
                }
                //results.should.be.a('object');
                // return object back to pool
                pool.release(conn);
                done();
            });

        });
    });

//    it('delete log_v', function (done) {
//        this.timeout(10000);
//        pool.acquire(function (err, conn) {
//            if (err) {
//                console.log('err : ', err);
//                return;
//            }
//
//            conn.execute("delete from log_v", [], function (err, results) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    //console.log('results : ', results);
//                }
//                //results.should.have.property('updateCount', 1);
//                // return object back to pool
//                pool.release(conn);
//                done();
//            });
//
//        });
//    });


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
});




