/**
 * User: nadir93
 * Date: 13. 10. 15.
 * Time: 오후 5:53
 */
var should = require('should');
var crypto = require('crypto');
var utils = require('util');

describe('aes128ecb test', function () {

    before(function (done) {
        done();
    });


    after(function (done) {
        done();
    });

    it('aes128ecb', function (done) {

        var m1 = '31yzirrd3bxCx9NokmzTiGEfH7nrZQEstJgoGCDFVoM=';
        console.log('base64>hex : ', new Buffer(m1, 'base64').toString('hex'));


        var txid = '8829-e067f846-c592-c20a-dae7-7eceae2ed60a';
        var text = '441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8';
        console.log('text : ', text);
        var m = crypto.createHash('md5');
        m.update(txid);
        var key = m.digest('binary');
        console.log('\t\tkey : ', new Buffer(key, 'binary').toString('hex'));
        var c = crypto.createCipheriv("aes-128-ecb", key, "");
        var crypted = c.update(text, 'utf8', 'base64') + c.final('base64');
        console.log('\t\tcrypted(base64) : ', crypted);
        console.log('\t\tcrypted(hex) : ', new Buffer(crypted, 'base64').toString('hex'));
        var dc = crypto.createDecipheriv("aes-128-ecb", key, "");
        var decrypted = dc.update(crypted, 'base64', 'utf8') + dc.final('utf8');
        console.log('\t\tdecrypted : ', decrypted);
        //crypted.should.eql('69e418ad16b3c0154e2f02b0fb65ca061553930e94b47adf80b21d0dcc595d9874c1a062003ba7856a55b2f0760b23af130ab2fdb3a8495d34f304666a4f3d581d42ef8f602a989624254fc7164741ff');
        done();
    });
});