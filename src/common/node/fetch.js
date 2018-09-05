// 传统http爬虫
// const http = require("http");
// var cherrio = require("cheerio")
//  var url = 'http://www.imooc.com/learn/866'
//  http.get(url,(res)=> {
//     var html = '';
//     res.on('data',(data)=> {
//         html += data;
//     })
//     res.on('end',()=> {
//         console.log(html)
//     })
//  }).on('error',(err)=> {
//     console.log("抓取失败",err)
//  })

// express爬虫
var express = require('express'); 
var app = express(); 
var request = require('request'); 
var cheerio = require('cheerio'); 
app.get('/', function(req, res){ 
    request('http://www.cnblogs.com', function (error, response, body) { 
        if (!error && response.statusCode == 200) { 
            //返回的body为抓到的网页的html内容 
            var $ = cheerio.load(body); 
            //当前的$符相当于拿到了所有的body里面的选择器 
            var navText=$('.post_nav_block').html(); 
            //拿到导航栏的内容 
            res.send(navText); 
        } 
    }) 
}); 
app.listen(3000);