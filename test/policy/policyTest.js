/**
 * User: nadir93
 * Date: 13. 10. 1.
 * Time: 오전 12:21
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var winston = require('winston');
var config = require('../../config');
var url = 'http://127.0.0.1:3000';

describe('policy test', function () {

    before(function (done) {
        done();
    });

    after(function (done) {
        done();
    });

    it('uri policy 가져오기 테스트 : 응답코드 200', function (done) {

        var key = 'uri';
        request(url)
            .get('/v1/policy/' + key)
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

    it('static resource policy 가져오기 테스트 : 응답코드 200', function (done) {

        var key = 'static';

        request(url)
            .get('/v1/policy/' + key)
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

//    it('static resource policy 가져오기 테스트 : 응답코드 200', function (done) {
//
//        var value = "1234567890";
//        var key = 'client';
//
//        request(url)
//            .get('/v1/policy/' + key)
//            .send(value)
//            // end handles the response
//            .end(function (err, res) {
//                if (err) {
//                    throw err;
//                }
//                //console.log('response : ',res.text);
//                // this is should.js syntax, very clear
//                res.should.have.status(200);
//                done();
//            });
//    });
});