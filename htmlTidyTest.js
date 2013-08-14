/**
 * User: nadir93
 * Date: 13. 8. 13.
 * Time: 오후 6:16
 */
var tidy = require('htmltidy').tidy;
var fs = require('fs');

var rawHtml = fs.readFileSync('/Users/nadir93/Doc/Downloads/sample002.html');

var opts = {
    //doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    'sort-attributes':'alpha'
    //'output-xml': true,
    //'escape-cdata': false
}


tidy(rawHtml, opts, function (err, html) {
    //console.log(encodeURIComponent(html.replace(/[\n\r]/g, '').replace(/\s+/g, '')));
    console.log('cleaned html : ', html.replace(/\/\/\<\!\[CDATA\[/g, '').replace(/\/\/\]\]\>/g, '').replace(/\<\!\[CDATA\[/g, '').replace(/\]\]\>/g, ''));
    //.replace('//]]>/g',''));
    //$string = str_replace("//<![CDATA[","",$string);
    //$string = str_replace("//]]>","",$string);
    //console.log(html);
});