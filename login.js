http = require('http');
var fs = require('fs');
qs = require('querystring');
var mysql = require('mysql');
var path = require('path');
global.__basedir = "D:\\Study\\Test\\examination-system\\my_version";
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student_profile"
});

server = http.createServer(function (req, res) {

    //console.dir(req.param);

    if (req.method == 'POST') {
        console.log("POST");
        console.log(req.url);
        var body = '';
        req.on('data', function (data) {
            body += data;
            var post = qs.parse(body);
            con.connect(function (err) {
                if (err) throw err;
                sql = "Select * from students ";/*where email_address = '" + post.email + "' and passwrd = '" + post.password + "'";*/
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    //console.log(result);
                })
                console.log("Connected!");
            });
        });
        req.on('end', function () {
        });
        // res.writeHead(301, { "Location": "settings.html" });
        // res.redirect("../../pages/settings.html");
        // console.log(__basedir + '\\pages\\settings.html');
        if (req.url === "/") {
            fs.readFile(path.join(__dirname, 'pages', 'settings.html'), 'utf8', function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log("HTML");
                res.end(data);
            });
        } else if (req.url.match("\.css$")) {
            console.log("CSS");
            var cssPath = path.join(__basedir, 'resources', 'css', req.url);
            var fileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, { 'Content-Type': 'text/css' });
            fileStream.pipe(res);
        }
    }
    else {
        console.log("GET");
        console.log(req.url);
        if (req.url === "/") {
            console.log(path.join(__dirname, 'pages', 'settings.html'));
            fs.readFile(path.join(__dirname, 'pages', 'settings.html'), 'UTF-8', function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else if (req.url.match("\.css$")) {
            console.log("CSS");
            var cssPath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, { 'Content-Type': 'text/css' });
            fileStream.pipe(res);
        } else if (req.url.match("\.js$")) {
            console.log("js");
            var jsPath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(jsPath, "UTF-8");
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            fileStream.pipe(res);
        } else if (req.url.match("\.png$")) {
            console.log("image");
            var imagePath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { 'Content-Type': 'image/png' });
            fileStream.pipe(res);
        } else if (req.url.match("\.ttf$")) {
            console.log("font ttf");
            var fontPath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(fontPath);
            res.writeHead(200, { 'Content-Type': 'text' });
            fileStream.pipe(res);
        } else if (req.url.match("\.woff$")) {
            console.log("font woff");
            var fontPath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(fontPath);
            res.writeHead(200, { 'Content-Type': 'text' });
            fileStream.pipe(res);
        } else if (req.url.match("\.eot$")) {
            console.log("font eot");
            var fontPath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(fontPath);
            res.writeHead(200, { 'Content-Type': 'text' });
            fileStream.pipe(res);
        }
        



        //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
        // var html = fs.readFileSync('index.html');
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        // res.end(html);
    }
});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);