var fs = require('fs')
var template = require('lodash.template')
var stringify = require('json-stringify-safe')
var path = require('path')

var setHeader = require('setheader');

module.exports = function(x, res) {

    var html_path = path.resolve(__dirname, './dd.html')
    var jquery_path = path.resolve(__dirname, './jquery.min.js')

    res.header('Content-Type', 'text/html')

    fs.readFile(html_path, function(err, data) {

        fs.readFile(jquery_path, async function(err, jquery) {
            var compiled = await template(data)
            var str = await compiled({
                jquery: jquery,
                x: stringify(
                    x,
                    function(k, v){
                        var type = typeof v
                        if(type === "function"){
                            return "dd_function"
                        }
                        if(type === "undefined"){
                            return "dd_undefined"
                        }
                        return v
                    },
                    4,
                    function(k, v) {
                        return "dd_circular"
                    }
                ),
                expanded: true
            })
            return res.send(str)
        })

    });
}
