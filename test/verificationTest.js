/**
 * User: nadir93
 * Date: 13. 9. 23.
 * Time: 오전 10:45
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
//var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
var url = 'http://127.0.0.1:3000';

describe('verify', function () {

    //테스트 수행전 선행작업

    before(function (done) {

        //가상페이지 생성
        request(url)
            .post('/v1/virtualpages/1234567890')
            .set('virtual_page_uri', '/test001/index.jsp')
            .attach('nadir', './test/test.html')
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.status(200);
                done();
            });
    });

    before(function (done) {
        var body = {"/test001/index.jsp":"1234567890"};

        request(url)
            .post('/v1/verificationuri')
            .send(body)
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //console.log('response : ',res.text);
                // this is should.js syntax, very clear
                res.should.have.status(200);
                done();
            });
    });

    after(function (done) {
        request(url)
            .del('/v1/virtualpages/1234567890')
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //console.log('response : ',res.text);
                // this is should.js syntax, very clear
                res.should.have.status(200);
                done();
            });
    });

    it('검증테스트 : 응답코드 200', function (done) {
        var body = {
            uri: [
                {uri: '/test001/index.jsp', options: {'qryStr': 'key=value'}},
                {uri: '/test001/TestServlet', options: {'qryStr': 'key=value'}}
            ]
        };

        request(url)
            .get('/v1/verify/1234567890')
            .set('txid', "'"+Math.floor((Math.random()*10000000)+1)+"'")
            .set('filterID', '1234@192.168.1.86')
            .set('hash', '{"/test001/index.js":"1234567890","main":"e4466dfd970b339e7875a15057f24d9528f3e7fc83aa632ab767f4f7489b3198"}')
            .set('User-Agent', 'mochaTestClient')
            .set('clientIP', '192.168.1.86')
            //.send(body)
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //console.log('response : ',res);
                // this is should.js syntax, very clear
                res.should.have.status(200);
                done();
            });
    });
});
