/**
 * User: nadir93
 * Date: 13. 7. 18.
 * Time: 오전 9:50
 */
var should = require('should')
    , request = require('supertest')
    , url = 'http://192.168.1.19:8080';

describe('webTest', function () {
    before(function (done) {
        // In our tests we use the test db
        done();
    });

    describe('create', function () {
        it('should return code 200 trying to create virtualPage', function (done) {
            //var verificationData = {
            //    url: '3399cb41c8b4f4bce3ef39cb2d3ed4dd4b1371a9'
            //};

            request(url)
                .get('/notice_list.do')
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('verify', function () {
        it('should return code 200 trying to verify hashValue', function (done) {
            //var verificationData = {
            //    url: '3399cb41c8b4f4bce3ef39cb2d3ed4dd4b1371a9'
            //};

            request(url)
                .get('/notice_content.do?board_ndx=939&rowNum=11&cnt=21')
                .set('hash', '196a6cb103d8ae81928ef706f75497e7ffd7cdc1')
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.status(200);
                    done();
                });
        });
    });
});