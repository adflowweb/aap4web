/**
 * User: nadir93
 * Date: 13. 8. 23.
 * Time: 오후 12:41
 */
var parser = require('cheerio');
var fs = require('fs');

var rawHtml = fs.readFileSync('/Users/nadir93/Doc/Downloads/ASPN.html');

var $ = parser.load(rawHtml);
if ($('html').html()) {
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
    $('form[name="searchForm"]').removeAttr('method');
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