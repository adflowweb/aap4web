/**
 * User: nadir93
 * Date: 13. 10. 1.
 * Time: 오후 2:42
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
            var SELECT_POLICY_URI_SQL = "SELECT a.uri_key, a.uri_policy, b.uri_name, b.reg_date from url_policy a, url_info b where a.uri_key = b.uri_key";

            // selecting rows
            conn.execute(SELECT_POLICY_URI_SQL, [], function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('results : ', results);
                }

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
    });
});
