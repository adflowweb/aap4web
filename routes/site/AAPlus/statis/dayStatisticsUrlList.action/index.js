/**
 * User: nadir93
 * Date: 2014. 2. 12.
 * Time: 오전 11:37
 */
var parser = require('cheerio'),
  crypto = require('crypto'),
  tidy = require('htmltidy').tidy,
  logger = require('../../../../../logger'),
  srcName = __filename.substring(__filename.lastIndexOf('/')) + ' ',
  opts = {
    //doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    'sort-attributes': 'alpha'
  }

exports.post = function (req, res, callback) {
  logger.debug(srcName + '가상페이지핸들러시작');
  try {
    //logger.debug(__filename + ' called post default/index.js');
    //logger.debug('req.xhr : ', req.xhr);
    //logger.debug('req.rawBody : ', req.rawBody);
    var $ = parser.load('<html>' + req.rawBody + '</html>');

    logger.debug(srcName + '처리전데이타::', $('html').html());

    //var testData = $('html').text().replace(/[\n\r]/g, '').replace(/\s+/g, '');
    //logger.debug(__filename + ' testData : ', testData);

    var str = '<script language="javascript" src="/AAPlus/js/fs_front_menu_gnbD_web.js"><div id="gnb">';
    str += '<ul><li class="r1"><a href="#" onclick='
    str += '"javascript:goPage(';
    str += "'/dashboard/dashboardMain.action'";
    str += ');"';
    str += '><img alt="대시보드" class="menu_on" src="/AAPlus/images/content/topmenu_btn01_off.gif"></a></li>';
    str += '<li class="r2"><a href="#" onclick=';
    str += '"javascript:goPage(';
    str += "'/system/userManageList.action'";
    str += ');"';
    str += '><img alt="시스템" class="menu_on" src="/AAPlus/images/content/topmenu_btn02_off.gif"></a></li>';
    str += '<li class="r3"><a href="#" onclick=';
    str += '"javascript:goPage(';
    str += "'/policystandard/urlList.action'";
    str += ');"';
    str += '><img alt=\"정책" class="menu_on" src=\"/AAPlus/images/content/topmenu_btn04_off.gif"></a></li>\<li class="r4"><a href="#" onclick=';
    str += '"javascript:goPage(';
    str += "'/operation/urlVerificationList.action'";
    str += ');"';
    str += '><img alt="운영관리"class="menu_on" src="/AAPlus/images/content/topmenu_btn05_off.gif"></a></li>';
    str += '<li class="r5"><a href="#" onclick=';
    str += '"javascript:goPage(';
    str += "'/statis/dayStatisticsUrlList.action'";
    str += ');"';
    str += '><img alt="통계 및 이력" class="menu_on" src="/AAPlus/images/content/topmenu_btn06_off.gif"></a></li></ul></div>';
    $('#fs_navigation').html(str);

    logger.debug(__filename + '자바스크립트처리후데이타::', $('html').html());
    tidy($('html').html(), opts, function (err, html) {
      if (err) {
        logger.error(__filename + '타이디처리중에러발생::', err.message);
        callback(err);
        return;
      }

      logger.debug(__filename + '타이디처리후데이타::', html);
      //console.log(encodeURIComponent(html.replace(/[\n\r]/g, '').replace(/\s+/g, '')));
      var cleanedHtml = html.replace(/\/\/\<\!\[CDATA\[/g, '').replace(/\/\/\]\]\>/g, '').replace(/\<\!\[CDATA\[/g, '').replace(/\]\]\>/g, '').substring(html.indexOf('<head>'));
      cleanedHtml = cleanedHtml.substring(0, cleanedHtml.indexOf('</html>'));
      //logger.debug(srcName + ' cleanedHtml : ', cleanedHtml);
      //.replace('//]]>/g',''));
      //$string = str_replace("//<![CDATA[","",$string);
      //$string = str_replace("//]]>","",$string);
      //console.log('value : ', html);

      logger.debug(__filename + '최종처리데이타::', cleanedHtml);
      callback(null, cleanedHtml);
    });
  } catch (e) {
    logger.error(e.stack);
    callback(e);
  }
};

exports.put = function (req, res, data, callback) {

  try {
    logger.debug(__filename + ' called put default/index.js');
    //logger.debug(__filename + ' data :', data);
    var $ = parser.load('<html>' + data + '</html>');
    //req 에서 변경데이타를 뽑아
    //virtual dom 에 적용하는 코드
    //...
    callback(null, $('html').html());
  } catch (e) {
    logger.error(e.stack);
    callback(e);
  }
}

exports.normalize = function (data) {
  //logger.debug(__filename + ' called normalize default/index.js');
  logger.debug(__filename + '처리전데이타::', data);
  var $ = parser.load('<html>' + data + '</html>');
  $('meta').remove(); //remove meta tag
  $('param').remove(); //remove param tag
  $('link[rel="stylesheet"]').remove(); //remove param tag
  $('*[style]').removeAttr('style'); //remove style attr
  $('*[value]').removeAttr('value'); //remove value attr
  $('*[type]').removeAttr('type'); //remove type attr
  //$('*[selected]').removeAttr(); //remove selected attr
  //$('img[@src$=.png']).removeAtrr('src');
  //console.log("test : ",);
  $('img[src$=".png"]').removeAttr('src');
  $('option[selected]').removeAttr('selected');
  $('option[selected]').removeAttr('selected');
  $('form[name="searchForm"]').removeAttr('id');
  $('Link[href="/AAPlus/favicon.ico"]').remove();
  $('input').removeAttr('type');
  //$('*[rel]').removeAttr('rel');

  //logger.debug(__filename + ' before data : ', data);

  //var msg = $('html').text();
  var msg = $('html').html();
  //logger.debug(srcName + ' $("html").html() : ', msg);

  logger.debug(__filename + '처리후데이타::', msg);
  //testCode
  //msg = msg.replace(/style=\"[\w\#\'\(\)\-\.\,\/\:\;\_\s]*\"|value=\"\w+\"|type=\"[\w\/]+\"/g, '');
  //msg = msg.replace(/\<meta\scontent=[\w\"\#\(\)\-\.\,\/\:\;\_\s\=]*\/\>/g, '');
  //msg = msg.replace(/\<param\s[\w\=\"\'\s\r\n\/\.\,]*\/\>/g, '');
  //logger.debug(srcName + ' test data : ', msg);
  //testEnd
  var normalizedData = encodeURIComponent(msg.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
  //encodeURIComponent(data.replace(/[\n\r]/g, '').replace(/\s+/g, ''));
  //logger.debug(srcName + ' normalizedData : ', normalizedData);
  logger.debug(__filename + '최종데이타::', normalizedData);
  return normalizedData;
};

