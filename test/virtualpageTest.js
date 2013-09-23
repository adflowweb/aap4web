/**
 * User: nadir93
 * Date: 13. 9. 23.
 * Time: 오전 10:44
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
//var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
var url = 'http://127.0.0.1:3000';

describe('검증서버\n\t\tenv : 127.0.0.1:3000\n\t\tfile : virtualpageTest.js', function () {

    //테스트 수행전 선행작업
    before(function (done) {
        done();
    });

    describe('가상페이지', function () {
        it('가상페이지 생성 테스트 : 응답코드 200', function (done) {
            var profile = {
                username: 'vgheri',
                password: 'test',
                firstName: 'Valerio',
                lastName: 'Gheri'
            };
            request(url)
                .post('/v1/virtualpages/1234567890')
                .set('virtual_page_uri', '/test001/index.jsp')
                .attach('nadir', './test/test.html')
                //.send(profile)
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

        it('가상페이지 수정 테스트 : 응답코드 200', function (done) {
            request(url)
                .put('/v1/virtualpages/1234567890')
                .set('virtual_page_uri', '/test001/TestServlet')
                //.send(profile)
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

        it('가상페이지 가져오기 테스트 : 응답코드 200', function (done) {
            request(url)
                .get('/v1/virtualpages/1234567890')
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

        it('가상페이지 삭제 테스트 : 응답코드 200', function (done) {
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
    });
});