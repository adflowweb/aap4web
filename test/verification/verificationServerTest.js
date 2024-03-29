/**
 * User: nadir93
 * Date: 13. 7. 18.
 * Time: 오전 9:50
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
//var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../../config');
var url = 'http://127.0.0.1:3000';

describe('verificationServer\n\t\tenv : 127.0.0.1:3000\n\t\tfile : verificationServerTest.js', function () {
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {
        // In our tests we use the test db
        //mongoose.connect(config.db.mongodb);
        done();
    });

    describe('virtualpage', function () {
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

        it('should return code 200 trying to modify virtualpage', function (done) {
            // once we have specified the info we want to send to the server via POST verb,
            // we need to actually perform the action on the resource, in this case we want to
            // POST on /api/profiles and we want to send some info
            // We do this using the request object, requiring supertest!
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
                    //console.log('response : ',res.text);
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
                    //console.log('response : ',res.text);
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

    describe('verification uri', function () {
        it('should return code 200 trying to create verificationURI', function (done) {
//            var body = {
//                uri: [
//                    {uri: '/test001/index.jsp', options: {'qryStr': 'key=value'}},
//                    {uri: '/test001/TestServlet', options: {'qryStr': 'key=value'}}
//                ]
//            };

            var body = {'/test001/index.jsp': {options: {'qryStr': 'key=value'}}, '/test001/TestServlet': {options: {'qryStr': 'key=value'}}};

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

        it('should return code 405 trying to modify verificationURI', function (done) {
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
                    //console.log('response : ',res.text);
                    // this is should.js syntax, very clear
                    res.should.have.status(405);
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
                    //console.log('response : ',res.text);
                    // this is should.js syntax, very clear
                    res.should.have.status(200);
                    done();
                });
        });

//        it('should return code 200 trying to delete verificationURI', function (done) {
//            request(url)
//                .del('/v1/verificationuri')
//                // end handles the response
//                .end(function (err, res) {
//                    if (err) {
//                        throw err;
//                    }
//                    //console.log('response : ',res.text);
//                    // this is should.js syntax, very clear
//                    res.should.have.status(200);
//                    done();
//                });
//        });
    });

    describe('verify', function () {
        it('should return code 200 trying to create virtualpage', function (done) {
            request(url)
                .post('/v1/virtualpages/1234567890')
                .set('virtual_page_uri', '/test001/index.jsp')
                .attach('nadir', './test/test.html')
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

        it('should return code 200 trying to verifiy', function (done) {
            var body = {
                uri: [
                    {uri: '/test001/index.jsp', options: {'qryStr': 'key=value'}},
                    {uri: '/test001/TestServlet', options: {'qryStr': 'key=value'}}
                ]
            };

            request(url)
                .get('/v1/verify/1234567890')
                .set('hash', '{"main":"749daf510e1d0bc47670ea6c261ef18e8d6d312311946d71d83815fee7ff5d7e","/site/default/test.js":"XXXXXXXXXXXXXXXXXXXXXX"}')
                .send(body)
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
});