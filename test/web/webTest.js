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

describe('web test #1\n\t\tget session /notice_list.do \n\t\tverify /notice_content.do?board_ndx=939&rowNum=11&cnt=21\n\t\tdelete virtualpage. \n\t\tenv : 192.168.1.19:8080& 192.168.1.19:3000 \n\t\tfile : webTest.js', function () {
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
            // async 호출이기 때문에 시간차로 인해 before 수행되기전에
            // 먼저 수행되어 404(notFound)가 발생할 수 있으므로 setTimeout(sleep 500ms) 추가 ?????
            //setTimeout(function () {
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
            //}, 500);
        });
    });
});

