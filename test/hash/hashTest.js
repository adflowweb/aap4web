/**
 * User: nadir93
 * Date: 13. 10. 11.
 * Time: 오전 10:45
 */
var crypto = require('crypto');
var should = require('should');
var AES = require("crypto-js/aes");
var CRYPTOJS = require("crypto-js");
var ENC = require("crypto-js/enc-hex");
var utils = require('util');


describe('describe test', function () {

    before(function (done) {
        done();
    });

    after(function (done) {
        done();
    });

    it('test#1', function (done) {
        var txid = "8829-e067f846-c592-c20a-dae7-7eceae2ed60a";
        var key = CRYPTOJS.md5(txid);
        //.digest("hex");
        console.log('key', key);
        var iv = crypto.createHash('md5').update(txid+key).digest("hex");
        console.log('iv',iv.toString());



        //var key = CRYPTOJS.MD5("txid");
        var message = 'Message';

        console.log('message', message);

        //var iv = new Buffer('101112131415161718191a1b1c1d1e1f');
        //var iv  = ENC.parse('101112131415161718191a1b1c1d1e1f');
        //var encrypted = CryptoJS.AES.encrypt("Message", key, { iv: iv });

        //var key = ENC.parse('000102030405060708090a0b0c0d0e0f');
        //var iv = ENC.parse('101112131415161718191a1b1c1d1e1f');

        //var words = ENC.parse('48656c6c6f2c20576f726c6421');
        //var hex   = ENC.stringify(words);


        //var iv = '0';
        //var encrypted = AES.encrypt(message, key);
        var encrypted = AES.encrypt(message, key, { iv: iv });
        console.log('encrypted : ', encrypted.toString());            // U2FsdGVkX1+iX5Ey7GqLND5UFUoV0b7rUJ2eEvHkYqA=
        console.log('iv : ', encrypted.iv.toString());
        //console.log('hex : ', hex.toString());
        var decrypted = AES.decrypt(encrypted, key);
        console.log('decrypted : ', decrypted);
        console.log('decrypted : ', hex2a(decrypted.toString()));
        done();
    });
});

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}