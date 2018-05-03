var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');
var path = require('path');
var pool = require('./utilities/database');
var checkExtension = require('./utilities/methods');

server = http.createServer(function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        if (req.url === "/student") {
            req.on('data', function (data) {
                body += data;
                var post = qs.parse(body);
                pool.getConnection(function (err, con) {
                    if (err) throw err;
                    sql = "Select * from student where email = '" + post.username + "' and password = '" + post.password + "'";
                    con.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        if(result.length != 1){
                            html = "<html><h3>wrong email or password</h3></html>"
                            res.writeHead(404);
                            res.end();
                            console.log("Connected! wrong!!");    
                        }
                    })
                    con.release();
                });
            });
        }
        checkExtension(req, res, fs, path);
    }
    else {
        console.log("GET");
        console.log(req.url);
        checkExtension(req, res, fs, path);
    }
});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);