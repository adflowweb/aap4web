/**
 * User: nadir93
 * Date: 13. 7. 18.
 * Time: 오전 9:50
 */
var should = require('should')
    , request = require('supertest')
    , httpUrl = 'http://192.168.1.19:8080'
    , verificationUrl = 'http://192.168.1.19:3000'
    , cookie;

describe('webTest', function () {
    before(function (done) {
        request(httpUrl)
            .get('/notice_list.do')
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //console.log('cookie : ', res.headers['set-cookie']);
                cookie = res.headers['set-cookie'];
                // this is should.js syntax, very clear
                res.should.have.status(200);
                done();
            });
    });

    after(function (done) {
        var sessionID = cookie[0].split(';')[0].split('=')[1];
        //console.log('sessionID : ', sessionID);
        request(verificationUrl)
            .del('/v1/virtualpages/' + sessionID)
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

    describe('verify', function () {

        it('should return code 200 trying to verify hashValue', function (done) {
            request(httpUrl)
                .get('/notice_content.do?board_ndx=939&rowNum=11&cnt=21')
                .set('cookie', cookie)
                .set('hash', 'fe8a4261f96a7fb71f1d88b05478acf469fdf10f')
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

