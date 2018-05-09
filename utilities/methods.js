var pool = require('../utilities/database');
var qs = require('querystring');

function checkPage(req, res, data) {
    if (req.url === "/add-student.html") {
        sql = "Select * from student ";
    } else if (req.url === "/add-course.html") {
        sql = "Select Course_ID, Course_name, Midterm_degree, Final_degree from course ";
    } else if (req.url === "/add-question.html" || req.url === "/new-exam.html" || req.url === "/show-result.html" || req.url === "/take-exam.html" || req.url === "/stats.html") {
        sql = "select * from course";
    }
    console.log(req.url);

    function setResHtml(sql, cb) {
        pool.getConnection((err, con) => {
            if (err) throw err;
            con.query(sql, (err, res, cols) => {
                if (err) throw err;

                var table = ''; //to store html table
                var options = "";

                //create html table with data from res.
                if (req.url === "/settings.html") {

                } else if (req.url === "/new-exam.html") {
                    for (var i = 0; i < res.length; i++) {
                        options += '<option value="' + res[i].Course_ID + '">' + res[i].Course_name + '</option>\n'
                    }
                    data = data.replace('{${coursesOptions}}', options);
                    options = "";
                } else if (req.url === "/show-result.html") {
                    for (var i = 0; i < res.length; i++) {
                        options += '<option value="' + res[i].Course_ID + '">' + res[i].Course_name + '</option>\n'
                    }
                    data = data.replace('{${coursesOptions}}', options);
                    options = "";
                } else if (req.url === "/add-exam.html") {
                    for (var i = 0; i < res.length; i++) {
                        options += '<option value="' + res[i].Course_ID + '">' + res[i].Course_name + '</option>\n'
                    }
                    data = data.replace('{${coursesOptions}}', options);
                    options = "";
                } else if (req.url === "/take-exam.html") {
                    for (var i = 0; i < res.length; i++) {
                        options += '<option value="' + res[i].Course_ID + '">' + res[i].Course_name + '</option>\n'
                    }
                    data = data.replace('{${coursesOptions}}', options);
                    options = "";
                } else if (req.url === "/stats.html") {
                    for (var i = 0; i < res.length; i++) {
                        options += '<option value="' + res[i].Course_ID + '">' + res[i].Course_name + '</option>\n'
                    }
                    data = data.replace('{${coursesOptions}}', options);
                    options = "";
                } else if (req.url === "/stats.html") {

                } else if (req.url === "/add-student.html") {
                    for (var i = 0; i < res.length; i++) {
                        table += '<tr><td>' + (i + 1) + '</td><td>' + res[i].Name + '</td><td>' + res[i].Email + '</td><td><input class="btn-danger" type="submit" value="Delete" onclick="del(this)" name="' + res[i].SSN + '"></td></tr>';
                        //console.log(table);
                    }
                    table = '<form name="students-table" method="POST"><table class="table-scroll small-first-col text-center"><thead><tr><th>No.</th><th>Name</th><th>Email</th><th>Delete</th></tr><thead><tbody class="body-half-screen">' + table + '</tbody></table></form>';
                    data = data.replace('{${studentsTable}}', table);
                } else if (req.url === "/add-course.html") {
                    for (var i = 0; i < res.length; i++) {
                        table += '<tr><td>' + res[i].Course_ID + '</td><td>' + res[i].Course_name + '</td><td>' + res[i].Midterm_degree + '</td><td>' + res[i].Final_degree + '</td><td><input class="btn-danger" type="submit" value="Delete" onclick="del(this)" name="' + res[i].Course_ID + '"></td></tr>';
                    }
                    table = '<form name="courses-table" method="POST"><table class="table-scroll small-first-col text-center"><thead><tr><th>ID</th><th>Course Name</th><th>Midterm</th><th>Final</th><th>Delete</th></tr><thead><tbody class="body-half-screen">' + table + '</tbody></table></form>';
                    data = data.replace('{${coursesTable}}', table);
                } else if (req.url === "/add-questions.html") {
                    for (var i = 0; i < res.length; i++) {
                        options += '<option value="' + res[i].Course_ID + '">' + res[i].Course_name + '</option>\n'
                    }
                    data = data.replace('{${coursesOptions}}', options);
                    options = "";
                }

                con.release(); //Done with mysql connection

                return cb();
            });
        });
    }
    setResHtml(sql, resql => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(data, 'utf-8');
        res.end();
    });
}

function checkExtension(req, res, fs, path) {
    if (req.url.match("\.del$")) {
        console.log('del');
        var url = req.url.substring(1, req.url.length - 4);
        url = url.replace(/_/g, " ");
        url = url.replace(/Course ID/g, "Course_ID");
        console.log(url);
        pool.getConnection((err, con) => {
            if (err) throw err;
            con.query(url, (err, res, cols) => {
                if (err) throw err;
                con.release();
            })
        });
        if (url.search('student') != -1)
            req.url = '/add-student.html';
        else if (url.search('course') != -1)
            req.url = '/add-course.html';

        fs.readFile(path.join(__dirname, '..', 'pages', req.url), 'UTF-8', function (err, data) {
            checkPage(req, res, data);
        });
        console.log(url);
    } else if (req.url.match("\.add$")) {
        console.log('add');
        var url = req.url.substring(1, req.url.length - 4);
        url = url.replace(/_/g, " ");
        url = url.replace(/q bank/g, "q_bank");
//        url = url.replace(/%22null%22/g, "null");
        console.log(url);
        pool.getConnection((err, con) => {
            if (err) throw err;
            con.query(url, (err, res, cols) => {
                if (err) throw err;
                con.release();
            })
        });
        if (url.search('student') != -1)
            req.url = '/add-student.html';
        else if (url.search('course') != -1)
            req.url = '/add-course.html';
        else if (url.search('q_bank') != -1)
            req.url = '/add-questions.html';

        fs.readFile(path.join(__dirname, '..', 'pages', req.url), 'UTF-8', function (err, data) {
            checkPage(req, res, data);
        });
    } else if (req.url.match("\.html$")) {
        fs.readFile(path.join(__dirname, '..', 'pages', req.url), 'UTF-8', function (err, data) {
            checkPage(req, res, data);
        });
    } else if (req.url.match("\.css$")) {
        //console.log("CSS");
        var cssPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { 'Content-Type': 'text/css' });
        fileStream.pipe(res);
    } else if (req.url.match("\.js$")) {
        //console.log("js");
        var jsPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(jsPath, "UTF-8");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        fileStream.pipe(res);
    } else if (req.url.match("\.png$")) {
        //console.log("image");
        var imagePath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        fileStream.pipe(res);
    } else if (req.url.match("\.ttf$")) {
        //console.log("font ttf");
        var fontPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { 'Content-Type': 'text' });
        fileStream.pipe(res);
    } else if (req.url.match("\.woff$")) {
        //console.log("font woff");
        var fontPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { 'Content-Type': 'text' });
        fileStream.pipe(res);
    } else if (req.url.match("\.eot$")) {
        //console.log("font eot");
        var fontPath = path.join(__dirname, '..', req.url);
        var fileStream = fs.createReadStream(fontPath);
        res.writeHead(200, { 'Content-Type': 'text' });
        fileStream.pipe(res);
    }
}




//     if (req.url === "/add-student.html") {
//         sql = "Select * from student ";
//     } else if (req.url === "/add-course.html") {
//         sql = "Select Course_ID, Course_name, Midterm_degree, Final_degree from course ";
//     }
//     console.log(req.url);

//     function setResHtml(sql, cb) {
//         pool.getConnection((err, con) => {
//             if (err) throw err;
//             con.query(sql, (err, res, cols) => {
//                 if (err) throw err;

//                 var table = ''; //to store html table

//                 //create html table with data from res.
//                 if (req.url === "/settings.html") { } else if (req.url === "/show-result.html") {

//                 } else if (req.url === "/take-exam.html") {

//                 } else if (req.url === "/show-result.html") {

//                 } else if (req.url === "/add-exam.html") {

//                 } else if (req.url === "/stats.html") {

//                 } else if (req.url === "/add-student.html") {
//                     for (var i = 0; i < res.length; i++) {
//                         table += '<tr><td>' + (i + 1) + '</td><td>' + res[i].Name + '</td><td>' + res[i].Email + '</td><td><input class="btn-danger" type="button" value="Delete" onclick="del(this)" name="' + res[i].SSN + '"></td></tr>';
//                         //console.log(table);
//                     }
//                     table = '<form name="students-table" method="POST"><table class="table-scroll small-first-col text-center"><thead><tr><th>No.</th><th>Name</th><th>Email</th><th>Delete</th></tr><thead><tbody class="body-half-screen">' + table + '</tbody></table></form>';
//                     data = data.replace('{${studentsTable}}', table);
//                 } else if (req.url === "/add-course.html") {
//                     for (var i = 0; i < res.length; i++) {
//                         table += '<tr><td>' + res[i].Course_ID + '</td><td>' + res[i].Course_name + '</td><td>' + res[i].Midterm_degree + '</td><td>' + res[i].Final_degree + '</td><td><input class="btn-danger" type="button" value="Delete" onclick="del(this)" name="' + res[i].Course_ID + '"></td></tr>';
//                     }
//                     table = '<form name="courses-table" method="POST"><table class="table-scroll small-first-col text-center"><thead><tr><th>ID</th><th>Course Name</th><th>Midterm</th><th>Final</th><th>Delete</th></tr><thead><tbody class="body-half-screen">' + table + '</tbody></table></form>';
//                     data = data.replace('{${coursesTable}}', table);
//                 }

//                 con.release(); //Done with mysql connection

//                 return cb();
//             });
//         });
//     }
//     setResHtml(sql, resql => {
//         res.writeHead(200, {
//             'Content-Type': 'text/html; charset=utf-8'
//         });
//         res.write(data, 'utf-8');
//         res.end();
//     });
// }

// function checkExtension(req, res, fs, path) {
//     if (req.url.match("\.del$")) {
//         var url = req.url.substring(1, req.url.length - 4);
//         url = url.replace(/_/g, " ");
//         url = url.replace(/Course ID/g, "Course_ID");
//         console.log(url);
//         pool.getConnection((err, con) => {
//             if (err) throw err;
//             con.query(url, (err, res, cols) => {
//                 if (err) throw err;
//                 con.release();
//             })
//         });
//         if (url.search('student') != -1)
//             req.url = '/add-student.html';
//         else if (url.search('course') != -1)
//             req.url = '/add-course.html';

//         fs.readFile(path.join(__dirname, '..', 'pages', req.url), 'UTF-8', function (err, data) {
//             checkPage(req, res, data);
//         });
//         console.log(url);
//     } else if (req.url.match("\.add$")) {
//         var url = req.url.substring(1, req.url.length - 4);
//         url = url.replace(/_/g, " ");
//         console.log(url);
//         pool.getConnection((err, con) => {
//             if (err) throw err;
//             con.query(url, (err, res, cols) => {
//                 if (err) throw err;
//                 con.release();
//             })
//         });
//         if (url.search('student') != -1)
//             req.url = '/add-student.html';
//         else if (url.search('course') != -1)
//             req.url = '/add-course.html';

//         fs.readFile(path.join(__dirname, '..', 'pages', req.url), 'UTF-8', function (err, data) {
//             checkPage(req, res, data);
//         });
//         console.log(url);
//     } else if (req.url.match("\.html$")) {
//         fs.readFile(path.join(__dirname, '..', 'pages', req.url), 'UTF-8', function (err, data) {
//             checkPage(req, res, data);
//         });
//     } else if (req.url.match("\.css$")) {
//         //console.log("CSS");
//         var cssPath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(cssPath, "UTF-8");
//         res.writeHead(200, {
//             'Content-Type': 'text/css'
//         });
//         fileStream.pipe(res);
//     } else if (req.url.match("\.js$")) {
//         //console.log("js");
//         var jsPath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(jsPath, "UTF-8");
//         res.writeHead(200, {
//             'Content-Type': 'text/javascript'
//         });
//         fileStream.pipe(res);
//     } else if (req.url.match("\.png$")) {
//         //console.log("image");
//         var imagePath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(imagePath);
//         res.writeHead(200, {
//             'Content-Type': 'image/png'
//         });
//         fileStream.pipe(res);
//     } else if (req.url.match("\.jpg$")) {
//         //console.log("image");
//         var imagePath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(imagePath);
//         res.writeHead(200, {
//             'Content-Type': 'image/jpg'
//         });
//         fileStream.pipe(res);
//     } else if (req.url.match("\.ttf$")) {
//         //console.log("font ttf");
//         var fontPath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(fontPath);
//         res.writeHead(200, {
//             'Content-Type': 'text'
//         });
//         fileStream.pipe(res);
//     } else if (req.url.match("\.woff$")) {
//         //console.log("font woff");
//         var fontPath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(fontPath);
//         res.writeHead(200, {
//             'Content-Type': 'text'
//         });
//         fileStream.pipe(res);
//     } else if (req.url.match("\.eot$")) {
//         //console.log("font eot");
//         var fontPath = path.join(__dirname, '..', req.url);
//         var fileStream = fs.createReadStream(fontPath);
//         res.writeHead(200, {
//             'Content-Type': 'text'
//         });
//         fileStream.pipe(res);
//     }
// }


module.exports = checkExtension
