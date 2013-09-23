/**
 * User: @nadir93
 * Date: 13. 7. 5
 * Time: 오후 12:18
 */
var util = require('util'),
    logger = require('../logger'),
    tidy = require('htmltidy').tidy,
    DEFAULT_INDEX_JS = '../routes/site/default/index.js',
    RESPONSE_MESSAGE = '{"error":{"code":400,"message":"virtual_page_uri header not found"}}';

var virtualPageHandler = function () {
};

var opts = {
    //doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    'sort-attributes': 'alpha'
}

virtualPageHandler.prototype = {
    //create virtualPage
    post: function (req, res, client) {
        try {
            //nonExistFunctionCall();
            if (!req.headers['virtual_page_uri']) {
                //reponseCode 400 : bad request
                res.send(RESPONSE_MESSAGE, 400);
                return;
            }

            var path = '../routes/site' + req.headers['virtual_page_uri'];
            logger.debug(__filename + ' path : ', path);

            try {
                var val = require(path).post(req, res);
            } catch (e) {
                logger.error(e.stack);
                val = require(DEFAULT_INDEX_JS).post(req, res);
            }

            //set page
//            client.set(req.params.id, val, function (err) {
//                try {
//                    if (err) {
//                        logger.error('error : ', err);
//                        res.send(err.message, 500);
//                    } else {
//                        logger.debug(__filename + ' stored data : ', val);
//                        res.send(200);
//                    }
//                } catch (e) {
//                    logger.error(e.stack);
//                    res.send(e.message, 500);
//                }
//            });

            tidy(val, opts, function (err, html) {
                //console.log(encodeURIComponent(html.replace(/[\n\r]/g, '').replace(/\s+/g, '')));
                var cleanedHtml = html.replace(/\/\/\<\!\[CDATA\[/g, '').replace(/\/\/\]\]\>/g, '').replace(/\<\!\[CDATA\[/g, '').replace(/\]\]\>/g, '').substring(html.indexOf('<head>'));
                cleanedHtml = cleanedHtml.substring(0, cleanedHtml.indexOf('</html>'));
                //.replace('//]]>/g',''));
                //$string = str_replace("//<![CDATA[","",$string);
                //$string = str_replace("//]]>","",$string);
                //console.log('value : ', html);

                //set page
                client.set(req.params.id, cleanedHtml, function (err) {
                    try {
                        if (err) {
                            logger.error('error : ', err);
                            res.send(err.message, 500);
                        } else {
//logger.debug(__filename + ' stored data : ', cleanedHtml);
                            res.send(200);
                        }
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
    },
    //modify virtualPage
    put: function (req, res, client) {
        try {
            if (!req.headers['virtual_page_uri']) {
                //reponseCode 400 : bad request
                res.send(RESPONSE_MESSAGE, 400);
                return;
            }

            var path = '../routes/site' + req.headers['virtual_page_uri'];
            logger.debug(__filename + ' path : ', path);
            client.get(req.params.id, function (err, reply) {
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                        return;
                    }

                    // reply is null when the key is missing
                    if (!reply) {
                        res.send(404);
                        return;
                    }

                    try {
                        var val = require(path).put(req, res, reply);
                    } catch (e) {
                        logger.error(e.stack);
                        val = require(DEFAULT_INDEX_JS).put(req, res, reply);
                    }


                    client.set(req.params.id, val, function (err) {
                        try {
                            if (err) {
                                logger.error('error : ', err);
                                res.send(err.message, 500);
                            } else res.send(200);
                        } catch (e) {
                            logger.error(e.stack);
                            res.send(e.message, 500);
                        }
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
        try {
            logger.debug(__filename + ' key : ', req.params.id);
            client.del(req.params.id, function (err) {
                //console.log(util.inspect(arguments))
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                    } else {
                        logger.debug(__filename + ' key deleted just to be sure');
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
    //read virtualPage
    get: function (req, res, client) {
        try {
            logger.debug(__filename + ' key : ', req.params.id);
            client.get(req.params.id, function (err, reply) {
                try {
                    if (err) {
                        logger.error('error : ', err);
                        res.send(err.message, 500);
                        return;
                    }

                    // reply is null when the key is missing
                    if (reply) {
                        res.send(reply);
                    } else res.send(404);
                } catch (e) {
                    logger.error(e.stack);
                    res.send(e.message, 500);
                }
            });
        } catch (e) {
            logger.error(e.stack);
            res.send(e.message, 500);
        }
    }
}

module.exports = virtualPageHandler;