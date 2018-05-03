function checkExtension(req, res, fs, path) {
    if (req.url === "/") {
        fs.readFile(path.join(__dirname, '..', 'pages', 'settings.html'), 'UTF-8', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
            console.log(data);
        });
    } else if (req.url.match("\.css$")) {
        console.log("CSS");
        var cssPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(res);
    } else if (req.url.match("\.js$")) {
        console.log("js");
        var jsPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(jsPath, "UTF-8");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        fileStream.pipe(res);
    } else if (req.url.match("\.png$")) {
        console.log("image");
        var imagePath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fileStream.pipe(res);
    } else if (req.url.match("\.ttf$")) {
        console.log("font ttf");
        var fontPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { 'Content-Type': 'text' });
        fileStream.pipe(res);
    } else if (req.url.match("\.woff$")) {
        console.log("font woff");
        var fontPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { 'Content-Type': 'text' });
        fileStream.pipe(res);
    } else if (req.url.match("\.eot$")) {
        console.log("font eot");
        var fontPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { 'Content-Type': 'text' });
        fileStream.pipe(res);
    }
}

module.exports = checkExtension