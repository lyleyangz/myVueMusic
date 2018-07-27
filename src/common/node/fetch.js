const http = require("http");
var cherrio = require("cheerio")
 var url = 'http://www.imooc.com/learn/866'
 http.get(url,(res)=> {
    var html = '';
    res.on('data',(data)=> {
        html += data;
    })
    res.on('end',()=> {
        console.log(html)
    })
 }).on('error',(err)=> {
    console.log("抓取失败",err)
 })
// http.createServer((req,res)=> {
//     res.writeHead(200,{"Content-Type":"text/plain;utf-8"})
//     res.end("node响应完成！")
// }).listen(9090);

// console.log('开始node之旅！')