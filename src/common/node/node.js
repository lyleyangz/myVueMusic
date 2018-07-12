const http = require("http");

http.createServer((req,res)=> {
    res.writeHead(200,{"Content-Type":"text/plain;utf-8"})
    res.end("node响应完成！")
}).listen(9090);

console.log('开始node之旅！')