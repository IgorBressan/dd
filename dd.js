var fs = require('fs')
var template = require('lodash.template')
var stringify = require('json-stringify-safe')

module.exports = function(res, x, expanded = false) {
    fs.readFile('dd.html', function(err, data) {
        fs.readFile('jquery.min.js', function(err, jquery) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            var compiled = template(data)
            var str = compiled({
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
                expanded: expanded
            })
            res.write(str)
            res.end()
        })
    });
}
