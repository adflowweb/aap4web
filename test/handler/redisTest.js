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
var config = require('../../config');
var url = 'http://127.0.0.1:3000';

describe('redis test', function () {
    it('redis 생성 테스트 : 응답코드 200', function (done) {
//            var body = {
//                uri: [
//                    {uri: '/test001/index.jsp', options: {'qryStr': 'key=value'}},
//                    {uri: '/test001/TestServlet', options: {'qryStr': 'key=value'}}
//                ]
//            };

        var body = {"/test001/index.js": "1234567890", "/test001/test.js": "12345678901111", "/css/common.css": "441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8", "/css/menu.css": "F1AA12FC1836AB9737B27DB696C36D4F6B9B906EC70D4586693BFB15AE9E8D36", "/js/aap.js": "B98D57B8A43C088ADC9B67A2A4277684B75B787C22790A0BA76547EA14C0BB99", "/js/script.js": "3F5AB479E8C992E1C1C6C7FBDDE321F1D47C1D47B8AA13588B0F33E30B3711BE"};

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

    it('redis 가져오기 테스트 : 응답코드 200', function (done) {
        request(url)
            .get('/v1/redis/test001/index.js')
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

    it('redis 삭제 테스트 : 응답코드 200', function (done) {

        var body = ['/test001/index.js', '/test001/test.js', '/css/common.css', '/css/menu.css', '/js/aap.js', '/js/script.js'];

        request(url)
            .del('/v1/redis')
            .send(body)
            // end handles the response
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //console.log('response : ', res.text);
                // this is should.js syntax, very clear
                res.should.have.property('text', '6');
                //res.should.have.status(200);
                done();
            });
    });

    it('redis 가져오기 테스트 : 응답코드 200', function (done) {
        request(url)
            .get('/v1/redis/test001/index.js')
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
});