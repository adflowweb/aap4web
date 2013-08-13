/**
 * User: nadir93
 * Date: 13. 8. 13.
 * Time: 오후 2:38
 */
var htmlparser = require("htmlparser");
var fs = require('fs');
var sys = require('sys');

var rawHtml = fs.readFileSync('/Users/nadir93/Doc/Downloads/sample01.html');

//var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if (error) {
                //[...do something for errors...]
            } else {
                //[...parsing done, do something...]   }
            }
        }, { verbose: false, ignoreWhitespace: true, enforceEmptyTags: false }
    )
    ;
var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
sys.puts(sys.inspect(handler.dom, false, null));