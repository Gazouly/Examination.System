var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');
var path = require('path');
var pool = require('./utilities/database');
var checkExtension = require('./utilities/methods');
server = http.createServer(function (req, res) {
    if (req.method == 'POST') {
        console.log("POST");
        var body = '';
        if (req.url === "/settings.html") {
            console.log("seetings");
            req.on('data', function (data) {
                body += data;
                var post = qs.parse(body);
                pool.getConnection(function (err, con) {
                    if (err) throw err;
                    sql = "Select * from student where email = '" + post.email + "' and password = '" + post.password + "'";
                    con.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        if (result.length == 1) {
                            console.log('data');
                            checkExtension(req, res, fs, path);
                        } else {
                            html = "<html><h3>wrong email or password</h3></html>";
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(html);
                        }
                    })
                    con.release();
                });
            });
        } else if (req.url === "/take-exam.html" || req.url === "/show-result.html" || req.url === "/add-exam.html" || req.url === "/stats.html" || req.url === "/add-student.html" || req.url === "/add-course.html" || req.url.match("\.del$") || req.url.match("\.add$")) {
            console.log("not settings");
            checkExtension(req, res, fs, path);
        } else {
            console.log(req.url);
            console.log("error");
            html = "<html><h3>Page not found</h3></html>";
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        }
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