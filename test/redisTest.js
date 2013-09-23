/**
 * User: nadir93
 * Date: 13. 9. 23.
 * Time: 오후 4:36
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
//var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
var url = 'http://127.0.0.1:3000';

describe('redis test', function () {
    it('redis 생성 테스트 : 응답코드 200', function (done) {
//            var body = {
//                uri: [
//                    {uri: '/test001/index.jsp', options: {'qryStr': 'key=value'}},
//                    {uri: '/test001/TestServlet', options: {'qryStr': 'key=value'}}
//                ]
//            };

        var body = {"/test001/index.js":"1234567890", "/test001/test.js":"12345678901111"};

        request(url)
            .post('/v1/redis')
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

//    it('redis 수정 테스트 : 응답코드 405', function (done) {
//        var body = {
//            uri: [
//                {uri: '/test001/index.jsp', options: {'qryStr': 'key=value&key2=value2'}},
//                {uri: '/test001/TestServlet', options: {'qryStr': 'key=value&key3=value3'}}
//            ]
//        };
//
//        request(url)
//            .put('/v1/verificationuri')
//            .send(body)
//            // end handles the response
//            .end(function (err, res) {
//                if (err) {
//                    throw err;
//                }
//                //console.log('response : ',res.text);
//                // this is should.js syntax, very clear
//                res.should.have.status(405);
//                done();
//            });
//    });

//    it('redis 가져오기 테스트 : 응답코드 200', function (done) {
//        request(url)
//            .get('/v1/verificationuri')
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

//    it('redis 삭제 테스트 : 응답코드 200', function (done) {
//        request(url)
//            .del('/v1/verificationuri')
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