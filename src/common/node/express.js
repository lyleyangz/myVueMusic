// var http = require("http");

// var app = http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.end("Hello world!");
// });

// app.listen(3000, "localhost");




// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//     console.log(req)
//     // console.log(res)
//   res.send('我我我我我');
// });

// app.listen(3000);



var express = require("express");
var http = require("http");
var qs = require('querystring')

var express = express();
// 对所有路径都有效 
express.all("*", function (request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    next();
});
express.get("/",function (request, response, next) {
    console.log(request.url)
    let showReponseData = [];
    for (const key in response) {
        // showReponseData.push(key+'  =>  '+response[key])
        console.log(key)
    }
    let Response = qs.stringify(response)
    if (request.url == "/") {
        response.end('内容是：' + Response);
    } else {
        next();
    }
});

// express.get(function (request, response, next) {
//     if (request.url == "/about") {
//     } else {
//         next();
//     }
// });

express.get('*',function (request, response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 error!\n");
});

http.createServer(express).listen(3000);