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
    //console.log($('html').toArray());
    //console.log($.html());
    console.log($('html').text().replace(/[\n\r]/g, '').replace(/\s+/g, ''));
    //console.log($('html').text());
}
