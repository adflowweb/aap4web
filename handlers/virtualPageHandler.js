/**
 * User: @nadir93
 * Date: 13. 7. 5
 * Time: 오후 12:18
 */
var util = require('util'),
  logger = require('../logger'),
  DEFAULT_INDEX_JS = '../routes/site/default/index.js',
  RESPONSE_MESSAGE = '{"error":{"code":400,"message":"virtual_page_uri header not found"}}',
  srcName = __filename.substring(__filename.lastIndexOf('/')) + ' ',
  virtualPageHandler = function () {
  };

virtualPageHandler.prototype = {
  //create virtualPage
  post: function (req, res, client) {
    logger.debug(srcName + '가상페이지생성시작');
    try {
      if (!req.headers['virtual_page_uri']) {
        //reponseCode 400 : bad request
        //헤더값이 없을경우 에러리턴 코드:400
        logger.error(srcName + '가상페이지생성오류::notFound::virtual_page_uri');
        res.send(RESPONSE_MESSAGE, 400);
        return;
      }

      var path = '../routes/site' + req.headers['virtual_page_uri'];
      logger.debug(srcName + '가상페이지핸들러경로::', path);

      try {
        var handler = require(path);
        logger.debug(srcName + '가상페이지핸들러가존재함');
      } catch (e) {
        logger.error(e.message);
        handler = require(DEFAULT_INDEX_JS);
        logger.debug(srcName + '가상페이지핸들러가존재하지않음');
      }

      logger.debug(srcName + '가상페이지핸들러::', handler);
      handler.post(req, res, function (err, data) {
        try {
          if (err) {
            logger.error(srcName + '가상페이지생성중에러발생::', err.message);
            res.send(err.message, 500);
            return;
          }
          //logger.debug(srcName + ' data : ', data);
          //set page
          client.hset('virtualpage', req.params.id, data, function (err) {
            if (err) {
              logger.error(srcName + '가상페이지생성중에러발생::', err.message);
              res.send(err.message, 500);
              return;
            }
            res.send(200);
          });
        } finally {
          logger.debug(srcName + '가상페이지생성종료');
        }
      });
    } catch (e) {
      logger.error(srcName + '가상페이지생성중에러발생::', e.message);
      res.send(e.message, 500);
    }
  },
  //modify virtualPage
  put: function (req, res, client) {
    try {

      //logger.debug(srcName + ' req : ', req);

      if (!req.headers['virtual_page_uri']) {
        //reponseCode 400 : bad request
        res.send(RESPONSE_MESSAGE, 400);
        return;
      }

      var path = '../routes/site' + req.headers['virtual_page_uri'];
      logger.debug(srcName + ' path : ', path);
      logger.debug(srcName + ' req.params.id : ', req.params.id);
      client.hget('virtualpage', req.params.id, function (err, reply) {
        try {
          if (err) {
            logger.error('error : ', err.stack);
            res.send(err.message, 500);
            return;
          }

          // reply is null when the key is missing
          if (!reply) {
            res.send(404);
            return;
          }

          try {
            var handler = require(path);
          } catch (e) {
            logger.error(e.stack);
            handler = require(DEFAULT_INDEX_JS);
          }

          handler.put(req, res, reply, function (error, reply) {

            if (error) {
              logger.error('error : ', error.stack);
              res.send(err.message, 500);
              return;
            }

            // reply is null when the key is missing
            if (!reply) {
              res.send(404);
              return;
            }

            //logger.debug(srcName + ' reply : ', reply);
            logger.debug(srcName + ' req.params.id : ', req.params.id);
            client.set(req.params.id, reply, function (err) {
              try {
                if (err) {
                  logger.error('error : ', err.stack);
                  res.send(err.message, 500);
                } else res.send(200);
              } catch (e) {
                logger.error(e.stack);
                res.send(e.message, 500);
              }
            });
          });
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
  //delete virtualPage
  delete: function (req, res, client) {
    logger.debug(srcName + '가상페이지삭제시작');
    try {
      logger.debug(srcName + '삭제키::', req.params.id);
      client.hdel('virtualpage', req.params.id, function (err) {
        //console.log(util.inspect(arguments))
        if (err) {
          logger.error(srcName + '가상페이지삭제중에러발생::', err.message);
          res.send(err.message, 500);
          return;
        }
        logger.debug(srcName + '가상페이지가삭제되었습니다');
        res.send(200);
      });
    } catch (e) {
      logger.error(e.stack);
      res.send(e.message, 500);
    } finally {
      logger.debug(srcName + '가상페이지삭제종료');
    }
  },
  //read virtualPage
  get: function (req, res, client) {
    logger.debug(srcName + '가상페이지조회시작');
    try {
      logger.debug(srcName + '조회키::', req.params.id);
      client.hget('virtualpage', req.params.id, function (err, reply) {
        try {
          if (err) {
            logger.error(srcName + '가상페이지조회중에러발생::', err.message);
            res.send(err.message, 500);
            return;
          }
          // reply is null when the key is missing
          if (reply) {
            logger.debug(srcName + '전송데이타크기::', reply.length);
            res.send(reply);
          } else {
            logger.error(srcName + '전송할데이타가없음');
            res.send(404);
          }
        } finally {
          logger.debug(srcName + '가상페이지조회종료');
        }
      });
    } catch (e) {
      logger.error(srcName + '가상페이지조회중에러발생::', e.message);
      res.send(e.message, 500);
    }
  }
}

module.exports = virtualPageHandler;