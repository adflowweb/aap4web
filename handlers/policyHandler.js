/**
 * User: nadir93
 * Date: 13. 10. 1.
 * Time: 오전 12:42
 */
var logger = require('../logger'),
  srcName = __filename.substring(__filename.lastIndexOf('/')) + ' ',
  utils = require('util'),
  policyHandler = function () {
  };

policyHandler.prototype = {
  post: function (req, res, client) {
    try {
      logger.debug(srcName + 'method::post::start');
      //logger.debug(srcName + ' req : ', req);
      logger.debug(srcName + 'req.url::', req.url);
      logger.debug(srcName + 'req.rawBody::', req.rawBody);
      var data = JSON.parse(req.rawBody);
      logger.debug(srcName + 'data::', utils.inspect(data));

      //testCode
      //            for (var key in data) {
      //                if (data.hasOwnProperty(key)) {
      //                    logger.debug(key + " -> " + JSON.stringify(data[key]));
      //                    logger.debug(key + " -> " + data[key]);
      //                }
      //            }
      //            Object.keys(data).forEach(function (key) {
      //                var val = data[key];
      //                logger.debug(' key :', key);
      //                logger.debug(' val :', val);
      //            });
      //testEnd
      logger.debug(srcName + 'JSON.stringify(data)::', JSON.stringify(data));

      if (req.url == '/v1/policy/uri/unknown') {
        var key = 'unknownUri';
      } else {
        var key = req.url.substring(req.url.lastIndexOf('/v1/policy') + 11);
      }

      logger.debug(srcName + 'key::', key);
      for (var k in data) {
        if (data.hasOwnProperty(k)) {

          if (data[k] instanceof Object) {
            var value = JSON.stringify(data[k]);

          } else {
            value = data[k];
          }
          logger.debug(srcName + k + " -> " + value);


          //redis insert
          client.hset(key, k, value, function (err) {
            try {
              if (err) {
                logger.error(err.stack);
                res.send(err.message, 500);
                return;
              } else {
                logger.debug(srcName + 'keySet');
                res.send(200);
              }
            } catch (e) {
              logger.error(e.stack);
              res.send(e.message, 500);
            }
          });

        }
      }
      //            client.hmset(key, data, function (err, reply) {
      //                try {
      //                    if (err) {
      //                        logger.error(err.stack);
      //                        res.send(err.message, 500);
      //                        return;
      //                    } else {
      //                        logger.debug(srcName + ' key inserted ', reply);
      //                        res.send(200);
      //                    }
      //                } catch (e) {
      //                    logger.error(e.stack);
      //                    res.send(e.message, 500);
      //                }
      //            });
    } catch (e) {
      logger.error(e.stack);
      res.send(e.message, 500);
    }
  },
  put: function (req, res, client) {
    try {
      logger.debug(srcName + 'req.rawBody::', req.rawBody);
      client.set('uri', req.rawBody, function (err) {
        try {
          if (err) {
            logger.error('error : ', err);
            res.send(err.message, 500);
          } else {
            logger.debug(srcName + 'keySetjustToBeSure');
            res.send(200);
          }
        } catch (e) {
          logger.error(e.stack);
          res.send(e.message, 500);
        }
      });
    } catch (e) {
      logger.error(e.stack);
      res.send(e.message, 500);
    }
  },
  delete: function (req, res, client) {
    try {
      client.del('uri', function (err) {
        try {
          if (err) {
            logger.error('error : ', err);
            res.send(err.message, 500);
          } else {
            logger.debug(srcName + ' key deleted just to be sure');
            //console.log(util.inspect(arguments))
            res.send(200);
          }
        } catch (e) {
          logger.error(e.stack);
          res.send(e.message, 500);
        }
      });
    } catch (e) {
      logger.error(e.stack);
      res.send(e.message, 500);
    }
  },
  get: function (req, res, client) {
    logger.debug(srcName + '정책조회시작');
    try {
      logger.debug(srcName + '정책요구URL::', req.url);
      var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      logger.debug(srcName + '요청자IP::', ip);

      var uri = req.url.substring(req.url.lastIndexOf('/v1/policy') + 11);
      logger.debug(srcName + '정책요구URI::', uri);
      if (uri == 'uri' || uri == 'content') {
        //hgetall
        client.hgetall(uri, function (err, reply) {
          try {
            if (err) {
              logger.error(srcName + '정책조회중에러발생::', err.message);
              res.send(err.message, 500);
              return;
            }
            if (reply) {
              logger.debug(srcName + uri + '조회데이타::', reply);
              res.send(reply);
            } else {
              logger.debug(srcName + uri + '데이타가존재하지않음');
              res.send(404);
            }
          } finally {
            logger.debug(srcName + '정책조회종료');
          }
        });
      } else if (uri.indexOf('/') > 0) {
        var field = uri.substring(uri.indexOf('/'));
        var key = uri.substring(0, uri.indexOf('/'));
        logger.debug(srcName + '키::', key);
        logger.debug(srcName + '값::', field);
        //hget
        client.hget(key, field, function (err, reply) {
          try {
            if (err) {
              logger.error(srcName + '정책조회중에러발생::', err.message);
              res.send(err.message, 500);
              return;
            }
            if (reply) {
              logger.debug(srcName + '조회데이타::', reply);
              res.send(reply);
              //res.send('{"' + field + '":"' + reply + '"}');
            } else {
              logger.debug(srcName + '데이타가존재하지않음');
              res.send(404);
            }
          } finally {
            logger.debug(srcName + '정책조회종료');
          }
        });
      } else {
        //                        if (uri) {
        //                            //hgetall
        //                            client.hgetall(uri, function (err, reply) {
        //                                try {
        //                                    if (err) {
        //                                        logger.error(err.stack);
        //                                        res.send(err.message, 500);
        //                                        return;
        //                                    }
        //                                    if (reply) {
        //                                        logger.debug(srcName + ' reply : ', reply);
        //                                        res.send(reply);
        //                                    } else {
        //                                        logger.debug(srcName + ' not found ');
        //                                        res.send(404);
        //                                    }
        //                                } catch (e) {
        //                                    logger.debug(e.stack);
        //                                    res.send(e.message, 500);
        //                                }
        //                            });
        //                        } else {
        logger.debug(srcName + '모든정책조회(URI,CONTENT,UNKNOWNURI)');

        var pollingData = ['uri', 'content', 'unknownUri'];
        var result = [];

        function getHash(i) {
          if (i < pollingData.length) {
            //hgetall
            client.hgetall(pollingData[i], function (err, reply) {
              if (err) {
                logger.error(srcName + '정책조회중에러발생::', err.message);
              }
              if (reply) {
                logger.debug(srcName + '조회데이타::', reply);
                result.push(reply);
              } else {
                logger.debug(srcName + '데이타가존재하지않음');
              }
              getHash(++i);
            });
          } else {
            logger.debug(srcName + '모든정책조회데이타전송::', result);
            res.send({'uri': result[0], "content": result[1]});
            logger.debug(srcName + '정책조회종료');
          }
        }

        getHash(0);
        // }
      }
    } catch (e) {
      logger.error(srcName + '정책조회중에러발생::', e.message);
      res.send(e.message, 500);
    }
  }
}

module.exports = policyHandler;