/**
 * User: nadir93
 * Date: 2014. 2. 12.
 * Time: 오후 12:47
 */
var parser = require('cheerio');
var fs = require('fs');

//var rawHtml = fs.readFileSync('/Users/nadir93/Doc/Downloads/ASPN.html');
var rawHtml = fs.readFileSync('/Users/nadir93/downloads/test.dom');
//console.log('rawHtml : ', rawHtml.toString());
var $ = parser.load(rawHtml);
if ($('html').html()) {

    var str = "";
    str += '<script language="javascript" src="/AAPlus/js/fs_front_menu_gnbD_web.js">';
    str += '<div id="gnb">';
    str += '<ul>';
    str += '<li class="r1"><a href="#" onclick=';
    str += '\'javascript:goPage("/dashboard/dashboardMain.action");\'><img alt=';
    str += '"대시보드" class="menu_on" src=';
    str += '"/AAPlus/images/content/topmenu_btn01_off.gif"></a></li>';
    str += '<li class="r2"><a href="#" onclick=';
    str += '\'javascript:goPage("/system/userManageList.action");\'><img alt=';
    str += '"시스템" class="menu_on" src=';
    str += '"/AAPlus/images/content/topmenu_btn02_off.gif"></a></li>';
    str += '<li class="r3"><a href="#" onclick=\'javascript:goPage("/policystandard/urlList.action");\'><img alt=\"정책" class="menu_on" src=\"/AAPlus/images/content/topmenu_btn04_off.gif"></a></li>\<li class="r4"><a href="#" onclick=';
    str += '\'javascript:goPage("/operation/urlVerificationList.action");\'><img alt="운영관리"class="menu_on" src="/AAPlus/images/content/topmenu_btn05_off.gif"></a></li>';
    str += '<li class="r5"><a href="#" onclick=\'javascript:goPage("/statis/dayStatisticsUrlList.action");\'><img alt="통계 및 이력" class="menu_on" src="/AAPlus/images/content/topmenu_btn06_off.gif"></a></li></ul></div>';

    $('#fs_navigation').html(str);

//    <div id="gnb">
//        <ul>
//            <li class="r1"><a href="#" onclick=
//            'javascript:goPage("/dashboard/dashboardMain.action");'><img alt=
//                "대시보드" class="menu_on" src=
//                "/AAPlus/images/content/topmenu_btn01_off.gif"></a></li>
//                <li class="r2"><a href="#" onclick=
//                'javascript:goPage("/system/userManageList.action");'><img alt=
//                    "시스템" class="menu_on" src=
//                    "/AAPlus/images/content/topmenu_btn02_off.gif"></a></li>
//                    <li class="r3"><a href="#" onclick=
//                    'javascript:goPage("/policystandard/urlList.action");'><img alt=
//                        "정책" class="menu_on" src=
//                        "/AAPlus/images/content/topmenu_btn04_off.gif"></a></li>
//                        <li class="r4"><a href="#" onclick=
//                        'javascript:goPage("/operation/urlVerificationList.action");'><img alt="운영관리"
//                            class="menu_on" src=
//                            "/AAPlus/images/content/topmenu_btn05_off.gif"></a></li>
//                            <li class="r5"><a href="#" onclick=
//                            'javascript:goPage("/statis/dayStatisticsUrlList.action");'><img alt="통계 및 이력"
//                                class="menu_on" src=
//                                "/AAPlus/images/content/topmenu_btn06_off.gif"></a></li>
//                            </ul>
//                        </div>





                    //    $('meta').remove(); //remove meta tag
//    $('param').remove(); //remove param tag
//    $('link[rel="stylesheet"]').remove(); //remove param tag
//    $('*[style]').removeAttr('style'); //remove style attr
//    $('*[value]').removeAttr('value'); //remove value attr
//    $('*[type]').removeAttr('type'); //remove type attr
    //$('*[selected]').removeAttr(); //remove selected attr
    //$('img[@src$=.png']).removeAtrr('src');
    //console.log("test : ",);
//    $('img[src$=".png"]').removeAttr('src');
    console.log($('option[selected]'));
//    $('option[selected]').removeAttr('selected');
    console.log($('option[selected]'));
//    $('option[selected]').removeAttr('selected');
//    $('form[name="searchForm"]').removeAttr('method');
//    $('link[href="/AAPlus/favicon.ico"]').remove();
//    $('input').removeAttr('type');
    //$('*[src]').removeAttr('src'); //remove selected attr
    //$('*[rel]').removeAttr('rel');
    //console.log($('html').toArray());
    //console.log($.html());
    //console.log($('html').text().replace(/[\n\r]/g, '').replace(/\s+/g, ''));
    //console.log($('html').text());


    //var msg = $('html').html().replace(/style=\"[\w\#\'\(\)\-\.\,\/\:\;\_\s]*\"|value=\"\w+\"|type=\"[\w\/]+\"/g, '');
    var msg = $('html').html();
    //msg = msg.replace(/\<meta\scontent=[\w\"\#\(\)\-\.\,\/\:\;\_\s\=]*\/\>/g, '');
    //msg = msg.replace(/\<param\s[\w\=\"\'\s\r\n\/\.\,]*\/\>/g, '');
    console.log('msg : ', msg)

}



