/**
 * User: nadir93
 * Date: 13. 8. 23.
 * Time: 오후 1:24
 */
var jsdom = require('jsdom');
var fs = require('fs');
var rawHtml = fs.readFileSync('/Users/nadir93/Doc/Downloads/sample002.html');

//var document = jsdom.jsdom(rawHtml);
//var window = document.parentWindow;

var window = jsdom.jsdom(rawHtml).parentWindow;

jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
    //window.$("body").append('<div class="testing">Hello World, It works</div>');

    //console.log(window.$(".testing").text());
    console.log(window.$('body').text());
});


//console.log(__filename + ' jsdom : ', window.document.text());