/**
 * User: nadir93
 * Date: 13. 8. 13.
 * Time: 오후 6:16
 */
var tidy = require('htmltidy').tidy;
var fs = require('fs');

var rawHtml = fs.readFileSync('/Users/nadir93/Doc/Downloads/sample002.html');



tidy(rawHtml, function(err, html) {
    //console.log(encodeURIComponent(html.replace(/[\n\r]/g, '').replace(/\s+/g, '')));
    console.log(html);
});