/**
 * User: nadir93
 * Date: 13. 10. 10.
 * Time: 오후 3:36
 */
var should = require('should');
var oracle = require("oracle");
//var poolModule = require('generic-pool');

describe('orcle test', function () {
    var initData;
    var pool;

    before(function (done) {
//        initData = { "hostname": "192.168.1.39", "user": "aap4web", "password": "aap4web1234", "database": "orcl" };
//        pool = poolModule.Pool({
//            name: 'oracle',
//            // connection은 최대 10개까지 생성합니다.
//            max: 50,
//            // 생성된 connection은 30초 동안 유휴 상태(idle)면 destory됩니다.
//            idleTimeoutMillis: 30000,
//            log: false,
//            create: function (callback) {
//                oracle.connect(initData, function (err, conn) {
//                    callback(err, conn);
//                });
//            },
//            destroy: function (conn) {
//                conn.close();
//            }
//        });
        done();
    });


    after(function (done) {
        done();
    });

    it('oracle connection', function (done) {

        this.timeout(150000);

        var connectData = { "hostname": "192.168.1.39", "port": 1521, "user": "aap4web", "password": "aap4web1234", "database": "orcl"  };

        var i = 0;
        console.log('i : ', i);
        //oracle poller
        //setInterval(function () {
        try {
            console.log('connecting... ');
            oracle.connect(connectData, function (err, connection) {
                if (err) {
                    console.log('nadir05 : ', err);
                    return;
                } else {
                    console.log('nadir06 : ', connection);
                }
                console.log('connected');
                try {
                    // selecting rows
                    connection.execute("SELECT * FROM person", [], function (err, results) {
                        if (err) {
                            console.log('nadir01 : ', err);
                        } else {
                            console.log('nadir02 : ', results);
                        }

                        connection.close(); // call this when you are done with the connection
                        if (i == 10) {
                            done();
                        }
                        i++;
                        console.log('i : ', i);

                    });
                } catch (e) {
                    console.log('nadir03 : ', e.stack);
                }
            });
        } catch (e) {
            console.log('nadir04 : ', e.stack);
        }
        //}, 10000); // 10초 마다 실행

    });
});




