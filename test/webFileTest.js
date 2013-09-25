/**
 * User: nadir93
 * Date: 13. 9. 24.
 * Time: 오후 3:54
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

    it('insert webfile', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            var args = [hashCode('/css/common.css'), '1', '/css/common.css', '441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8']
            conn.execute("INSERT INTO web_file (file_key, file_type, file_name, file_hash, reg_date) VALUES (:1, :2, :3, :4, SYSDATE)", args, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('results : ', results);
                }
                results.should.have.property('updateCount', 1);
                // return object back to pool
                pool.release(conn);
                done();
            });

        });

    });

    it('insert webfile', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            var args = [hashCode('/css/menu.css'), '1', '/css/menu.css', 'F1AA12FC1836AB9737B27DB696C36D4F6B9B906EC70D4586693BFB15AE9E8D36']
            conn.execute("INSERT INTO web_file (file_key, file_type, file_name, file_hash, reg_date) VALUES (:1, :2, :3, :4, SYSDATE)", args, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('results : ', results);
                }
                results.should.have.property('updateCount', 1);
                // return object back to pool
                pool.release(conn);
                done();
            });

        });

    });

    it('insert webfile', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            var args = [hashCode('/js/aap.js'), '1', '/js/aap.js', 'B98D57B8A43C088ADC9B67A2A4277684B75B787C22790A0BA76547EA14C0BB99']
            conn.execute("INSERT INTO web_file (file_key, file_type, file_name, file_hash, reg_date) VALUES (:1, :2, :3, :4, SYSDATE)", args, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('results : ', results);
                }
                results.should.have.property('updateCount', 1);
                // return object back to pool
                pool.release(conn);
                done();
            });

        });

    });

    it('insert webfile', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            var args = [hashCode('/js/script.js'), '1', '/css/common.css', '3F5AB479E8C992E1C1C6C7FBDDE321F1D47C1D47B8AA13588B0F33E30B3711BE']
            conn.execute("INSERT INTO web_file (file_key, file_type, file_name, file_hash, reg_date) VALUES (:1, :2, :3, :4, SYSDATE)", args, function (err, results) {
                if (err) {
                    console.log(err);
                } else {
                    //console.log('results : ', results);
                }
                results.should.have.property('updateCount', 1);
                // return object back to pool
                pool.release(conn);
                done();
            });

        });

    });

    it('select webfile', function (done) {
        this.timeout(10000);
        pool.acquire(function (err, conn) {
            if (err) {
                console.log('err : ', err);
                return;
            }

            conn.execute("select * from web_file", [], function (err, results) {
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

//    it('delete webfile', function (done) {
//        this.timeout(10000);
//        pool.acquire(function (err, conn) {
//            if (err) {
//                console.log('err : ', err);
//                return;
//            }
//
//            conn.execute("delete from web_file", [], function (err, results) {
//                if (err) {
//                    console.log(err);
//                } else {
//                    console.log('results : ', results);
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




