/**
 * User: nadir93
 * Date: 13. 10. 15.
 * Time: 오후 1:46
 */

var should = require('should');
var crypto = require('crypto');

describe('describe test', function () {

    before(function (done) {
        done();
    });


    after(function (done) {
        done();
    });

    it('test#1', function (done) {

//        var text = "441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8";
//        var txid = '8829-e067f846-c592-c20a-dae7-7eceae2ed60a';
//
//        var m = crypto.createHash('md5');
//        m.update(txid);
//        var key = m.digest('hex');
//        console.log('key : ', key);
//        var newKey = new Buffer(key, 'hex');
//        console.log('newKey : ', newKey.toString('hex'));
//
//        var cipher = crypto.createCipher('aes-128-ecb', key);
//        var crypted = cipher.update(text, 'utf8', 'hex')
//        crypted += cipher.final('hex')
//        console.log('crypted : ', crypted);

//        var encryption_key = '8829-e067f846-c592-c20a-dae7-7eceae2ed60a';
//        var m = crypto.createHash('md5');
//        m.update(encryption_key)
//        var key = m.digest('hex');
//        console.log('key : ', key);
//        var newKey = new Buffer(key, 'hex');
//        console.log('newKey : ', newKey);
//
//
//        var decipher = crypto.createDecipher('aes-128-ecb', key);
//
//        chunks = []
//        chunks.push(decipher.update(new Buffer('aeQYrRazwBVOLwKw+2XKBhVTkw6UtHrfgLIdDcxZXZh0waBiADunhWpVsvB2CyOvEwqy/bOoSV008wRmak89WB1C749gKpiWJCVPxxZHQf8=', "base64").toString("binary")));
//        chunks.push(decipher.final('binary'));
//        var txt = chunks.join("");
//        txt = new Buffer(txt, "binary").toString("utf-8");
//        console.log('txt : ', txt);

        var txid = '8829-e067f846-c592-c20a-dae7-7eceae2ed60a';

        var m = crypto.createHash('md5');
        m.update(txid);
        var key = m.digest('hex');
        console.log('key : ', new Buffer(key, 'hex').toString('hex'));
//
//        var c = crypto.createCipheriv("aes-128-ecb", new Buffer(key, 'hex'), "");
//        //var c = crypto.createCipheriv("aes-128-ecb", new Buffer("99CB281CF391679FAC5304C2E8F271A1", "hex").toString("binary"), "");
//
//        var s = c.update("441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8");
//        //var s = c.update(new Buffer("69e418ad16b3c0154e2f02b0fb65ca061553930e94b47adf80b21d0dcc595d9874c1a062003ba7856a55b2f0760b23af130ab2fdb3a8495d34f304666a4f3d581d42ef8f602a989624254fc7164741ff", "hex"));
//        console.log('result : ', new Buffer(s + c.final(), "binary").toString('hex'));


//        var cipher = crypto.createCipher('aes-128-ecb', new Buffer(key, 'hex'))
//        var text = "441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8";
//        var crypted = cipher.update(text, 'utf8', 'hex')
//        crypted += cipher.final('hex')
//        console.log('crypted : ', crypted);
//now crypted contains the hex representation of the ciphertext


//        function convertCryptKey(strKey) {
//            var newKey = new Buffer([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
//            strKey = new Buffer(strKey);
//            for(var i=0;i<strKey.length;i++) newKey[i%16]^=strKey[i];
//            return newKey;
//        }

        var c = crypto.createCipheriv("aes-128-ecb", new Buffer(key, 'hex'), "");
        var crypted = c.update('441EDBA0E5AC63E3B36B8D10E85CDCBC6A7A1B1B18E818411422A75F98F9A2C8', 'utf8', 'hex') + c.final('hex');
        console.log('crypted : ', new Buffer(crypted,'hex').toString('base64'));

        var dc = crypto.createDecipheriv("aes-128-ecb", new Buffer(key, 'hex'), "");
        var decrypted = dc.update(crypted, 'hex', 'utf8') + dc.final('utf8');
        console.log('decrypted : ', decrypted);

        done();
    });
});