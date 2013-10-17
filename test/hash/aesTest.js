/**
 * User: nadir93
 * Date: 13. 10. 14.
 * Time: 오후 7:08
 */

var crypto = require('crypto');


var should = require('should');

describe('aes test', function () {

    before(function (done) {
        done();
    });


    after(function (done) {
        done();
    });

    it('test#1', function (done) {

//        var secret = crypto.randomBytes(16)
//            , source = crypto.randomBytes(16)
//            , cipher = crypto.createCipheriv("aes128", secret, secret) // or createCipher
//            , decipher = crypto.createDecipheriv("aes128", secret, secret);
//
//
//        cipher.setAutoPadding(false);
//        decipher.setAutoPadding(false);
//
//        var step = cipher.update(source);
//        var end = decipher.update(step);
//
//        console.log('secret : ', secret);
//        console.log('source : ', source.toString('binary'));
//        console.log('source : ', source);
//        console.log('step : ', step);
//        console.log('end', end);

        var password = '8829-e067f846-c592-c20a-dae7-7eceae2ed60a';

        var input = 'Message';
        console.log('input : ', input);

        var encrypt = function (input, password, callback) {
            var m = crypto.createHash('md5');
            m.update(password)
            var key = m.digest('hex');
            console.log('key : ', key);
            var newKey = new Buffer(key, 'hex');
            console.log('newKey : ', newKey.toString('hex'));

            m = crypto.createHash('md5');
            m.update(password + key)
            var iv = m.digest('hex');
            console.log('iv : ', iv);
            console.log('iv.slice : ', iv.length);
            var newIV = new Buffer(iv, 'hex');
            console.log('newIV : ', newIV);


            var data = new Buffer(input, 'utf8').toString('binary');

            var cipher = crypto.createCipheriv('aes-256-cbc', newKey.toString('hex'), newIV);
            var encrypted = cipher.update('Message', 'binary') + cipher.final('binary');
            var encoded = new Buffer(encrypted, 'binary').toString('base64');
            console.log('encoded : ', encoded);

            callback(encoded);
        };

        var decrypt = function (input, password, callback) {
            // Convert urlsafe base64 to normal base64
            var input = input.replace(/\-/g, '+').replace(/_/g, '/');
            // Convert from base64 to binary string
            var edata = new Buffer(input, 'base64').toString('binary')

            // Create key from password
            var m = crypto.createHash('md5');
            m.update(password)
            var key = m.digest('hex');

            // Create iv from password and key
            m = crypto.createHash('md5');
            m.update(password + key)
            var iv = m.digest('hex');
            var newIV = new Buffer(iv, 'hex');

            // Decipher encrypted data
            var decipher = crypto.createDecipheriv('aes-256-cbc', key, newIV);
            var decrypted = decipher.update(edata, 'binary') + decipher.final('binary');
            var plaintext = new Buffer(decrypted, 'binary').toString('utf8');

            callback(plaintext);
        };

        encrypt(input, password, function (encoded) {
            console.log('encoded : ', encoded);
            decrypt(encoded, password, function (output) {
                console.log('decoded : ', output);
            });
        });

//            var txid = '8829-e067f846-c592-c20a-dae7-7eceae2ed60a';
//
//            var input = 'Message';
//            console.log('input : ', input);
//
//
//            var m = crypto.createHash('md5');
//            m.update(txid)
//            var key = m.digest('hex');
//            console.log('key : ', key);
//
//            m = crypto.createHash('md5');
//            m.update(txid + key)
//            var iv = m.digest('hex');
//            console.log('iv : ', iv);
//
//            var cipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0, 16));
//            var crypted = cipher.update(input, 'utf8', 'hex');
//            crypted += cipher.final('hex');
//            console.log(crypted);


//            console.log('',typeof new Buffer('testkey', 'utf8').toString('binary')/*new Buffer("Hello World").toString('base64')*/);
//            //SGVsbG8gV29ybGQ=
//            console.log(new Buffer("SGVsbG8gV29ybGQ=", 'base64').toString('utf-8'))
//            //Hello World


            done();
        }
    )
    ;
});



