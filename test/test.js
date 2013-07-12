/**
 * Created with JetBrains WebStorm.
 * User: nadir
 * Date: 13. 7. 8
 * Time: 오후 5:26
 * To change this template use File | Settings | File Templates.
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
//var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../config');
var url = 'http://127.0.0.1:3000';

describe('Routing', function () {
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {
        // In our tests we use the test db
        //mongoose.connect(config.db.mongodb);
        done();
    });

    describe('virtualpages', function () {
        it('should return code 200 trying to create virtualpage', function (done) {
            var profile = {
                username: 'vgheri',
                password: 'test',
                firstName: 'Valerio',
                lastName: 'Gheri'
            };
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .post('/v1/virtualpages/1234567890')
                .set('request_uri_origin', '/test001/index.jsp')
                .attach('nadir', './test/test.html')
                //.send(profile)
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

        it('should return code 200 trying to modify virtualpage', function (done) {
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .put('/v1/virtualpages/1234567890')
                .set('request_uri_origin', '/test001/TestServlet')
                //.send(profile)
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

        it('should return code 200 trying to get virtualpage', function (done) {
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .get('/v1/virtualpages/1234567890')
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

        it('should return code 200 trying to delete virtualpage', function (done) {
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .del('/v1/virtualpages/1234567890')
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

//        it('should correctly update an existing account', function(done){
//            var body = {
//                firstName: 'JP',
//                lastName: 'Berd'
//            };
//            request(url)
//                .put('/api/profiles/vgheri')
//                .send(body)
//                .expect('Content-Type', /json/)
//                .expect(200) //Status code
//                .end(function(err,res) {
//                    if (err) {
//                        throw err;
//                    }
//                    // Should.js fluent syntax applied
//                    res.body.should.have.property('_id');
//                    res.body.firstName.should.equal('JP');
//                    res.body.lastName.should.equal('Berd');
//                    res.body.creationDate.should.not.equal(null);
//                    done();
//                });
//        });
    });

    describe('verificationURI', function () {
        it('should return code 200 trying to create verificationURI', function (done) {
            var body = {
                uri: [
                    {uri: '/test001/index.jsp', options: {'qryStr': 'key=value'}},
                    {uri: '/test001/TestServlet', options: {'qryStr': 'key=value'}}
                ]
            };

            request(url)
                .post('/v1/verificationuri')
                .send(body)
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

        it('should return code 200 trying to modify verificationURI', function (done) {
            var body = {
                uri: [
                    {uri: '/test001/index.jsp', options: {'qryStr': 'key=value&key2=value2'}},
                    {uri: '/test001/TestServlet', options: {'qryStr': 'key=value&key3=value3'}}
                ]
            };

            request(url)
                .put('/v1/verificationuri')
                .send(body)
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

        it('should return code 200 trying to get verificationURI', function (done) {
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
            request(url)
                .get('/v1/verificationuri')
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

        it('should return code 200 trying to delete verificationURI', function (done) {
            request(url)
                .del('/v1/verificationuri')
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