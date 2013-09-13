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
            max: 100,
            // 생성된 connection은 30초 동안 유휴 상태(idle)면 destory됩니다.
            idleTimeoutMillis: 30000,
            log: false,
            create: function (callback) {
                oracle.connect(initData, function (err, conn) {
                    callback(err, conn);
                });
            },
            destroy: function (con) {
                conn.close();
            }
        });
        done();
    });


    after(function (done) {
        done();
    });

    it('oracle connection', function (done) {
        this.timeout(150000);
        var j = 0;
        for (i = 0; i < 100000; i++) {
            pool.acquire(function (err, conn) {
                j++;
                if (err) {
                    console.log('err : ', err);
                    return;
                }
                // selecting rows
                conn.execute("SELECT * FROM serv_info", [], function (err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        //console.log('result : ', results);
                    }
                    // return object back to pool
                    pool.release(conn);
                    //console.log('j = ', j);
                    if (j == 99999) {
                        done();
                    }
                });
            });
        }
    });
});




