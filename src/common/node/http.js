const http = require("http");
const fs = require("fs");
const qs = require('querystring');
const path = require('path');
const Url = require('url')
// http.createServer((req,res)=> {
//     // fs.readFile(appHtml,'utf-8',(err,data)=> {
//     //     if(err){
//     //         res.writeHead(500, {'Context-Type': 'text/plain'});
//     //         res.end('specify file not exists! or server error!');
//     //         console.log('文件html不存在，检查路径！')
//     //     }else{
//             res.writeHead(200, {'Context-Type': 'text/html'});
//     //     }

//     // })
//     var getData = {
//         rankid:8888,
//         page:1,
//         json:true
//     }
    
//     var content = qs.stringify(getData)
//     var options = {
//         hostname:'m.kugou.com',
//         path:'/rank/info/?'+ content,
//         port:80,
//         methods:"GET"
//     }
//     var htmlData = ''
//     http.request(options,(res)=> {
//         res.on('data',(data)=>{
//             htmlData = data.toString();
//         })
//         res.on('end',function(){
//             htmlData = qs.parse(htmlData);
//             console.log('响应的数据',htmlData)
//             console.log('响应结束********');
//         });
//     })
//     req.on('error', function(e){
//         console.log('Error: '+ e.message)
//     })
//     res.write(htmlData,true);
//     res.end(htmlData,false);

//     // req.write(htmlData);
//     // req.end();
// }).listen(9080);
http.createServer((req,res)=> {
    var pathname =  Url.parse(req.url).pathname;
    if(req.url == '/favicon.ico'){
        return;
    }
    if(pathname.indexOf('.') == -1){
        pathname += '/test.html';
    }
    var fileUrl = './'+path.normalize("./nodeRouter/" + pathname)
        fs.readFile(fileUrl,function(err,data){
            if(err){
                res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
                res.end("404,页面没找到！")
            }
            var mimeName = path.extname(pathname);
            var mime = getMine(mimeName) || 'text/plain';
            res.writeHead(200, {'Context-Type': mime });
            res.end(data);
        })
}).listen(9080,'127.0.0.1');

function getMine(exeName){
    switch(exeName){
        case '.html':
            return 'text/html';
            break;
        case '.css':
            return 'text/css';
            break;
        case '.js':
            return 'application/x-javascript';
            break;
    }
}
console.log('are you run ?')