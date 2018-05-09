var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');
var path = require('path');
var pool = require('./utilities/database');
var checkExtension = require('./utilities/methods');

global.__name = undefined;
global.__SSN = undefined;
global.__departID = undefined;
global.__email = undefined;
global.__password = undefined;
global.__title = undefined;
global.__signinCategory = undefined;

found = '0';

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
                            console.log(found + '4');
                            found += '1';
                            console.log(found + '2');
                            console.log('data');
                            checkExtension(req, res, fs, path);
                            __name = result[0].Name;
                            __SSN = result[0].SSN;
                            __departID = result[0].DeptID;
                            __email = result[0].Email;
                            __password = result[0].Password;
                            __signinCategory = "student";
                        }
                        console.log('1');
                    })
                    console.log(found + '3');
                    if (found[found.length - 1] === '0') {
                        sql = "Select * from staff where email = '" + post.email + "' and password = '" + post.password + "'";
                        con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                            if (result.length === 1) {
                                console.log('data');
                                checkExtension(req, res, fs, path);
                                found += '1';
                                __name = result[0].Name;
                                __SSN = result[0].SSN;
                                __departID = result[0].DeptID;
                                __email = result[0].Email;
                                __password = result[0].Password;
                                __title = result[0].__title;
                                __signinCategory = "staff";
                            }
                            console.log('2');
                        });
                    } else if (found[found.length - 1] == '0') {
                        sql = "Select * from employee where email = '" + post.email + "' and password = '" + post.password + "'";
                        con.query(sql, function (err, result, fields) {
                            if (err) throw err;
                            if (result.length == 1) {
                                console.log('data');
                                checkExtension(req, res, fs, path);
                                found += '1';
                                __name = result[0].Name;
                                __SSN = result[0].SSN;
                                __email = result[0].Email;
                                __password = result[0].Password;
                                __signinCategory = "employee";
                            } else {
                                html = "<html><h3>wrong email or password</h3></html>";
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(html);
                            }
                            console.log('3');
                        });
                    }
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