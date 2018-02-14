var http = require('http')
var dd = require('./dd')

http.createServer(function (req, res) {
    var str = "\
    Lorem ipsum dolor \s\n sit amet, <b>consectetur</b> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\
    "
    var obj = {
        creator: "houssam",
        objects: {
            box: {
                color: "blue",
                size: [100, 300, 400],
                changeColor: function(color){ this.color = color }
            },
            test: [true, false],
            anotherTest: null,
            array: [undefined, null, {
                name: "houssam",
                is: "pancake",
                bio: str
            }]
        }
    }
    obj.circular = obj
    dd(res, obj)
}).listen(8080);
