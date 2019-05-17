let fs = require('fs');
let qs = require('querystring');
let http = require('http');
// hash获取接口： 
const  baseUrl = 'http://songsearch.kugou.com/song_search_v2';
// MP3获取接口： ?r=play/getdata&hash=4BFDFA86BB283602D19F6E009E7B433C&album_id=2654758
const baseUrl2 = 'http://www.kugou.com';
var http_server_hash = function(keyword) {
    return new Promise((resolve,reject) =>{
        // var http_request = {
        //     host: 'http://songsearch.kugou.com/song_search_v2?keyword=shots&page=1&pagesize=1&userid=-1&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0',
        //     port: 3000,
        //     method: 'GET',
        //     path: '/song_search_v2?' + data
        // }
        var url = 'http://songsearch.kugou.com/song_search_v2?'+keyword+'&page=1&pagesize=1&userid=-1&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0'
        http.get(url, function(_res) {
            var content = '';
            _res.setEncoding('utf-8');
            _res.on('data', function(chunk) {
                content += chunk;
            });
            _res.on('end',function(){
                resolve(content)
            });
        }).end();

    })
}
var http_server = function(hash) {
    return new Promise((resolve,reject)=>{
        // http_server_hash(keyword).then((res)=>{
            // res = JSON.parse(res);
            // if(res.status==1){
            //     var hash={
            //         r:"play\/getdata",
            //         hash:"",
            //         album_id:"",
            //     }
            //     if(res.data.lists.length>0){
            //         hash.hash = res.data.lists[0].FileHash;
            //         hash.album_id = res.data.lists[0].AlbumID;
            //     }
                var http_request = {
                    hostname:baseUrl2,
                    path:"/yy/index.php?"+qs.stringify(hash),
                    method:"GET",
                    port:3000,
                    // headers:{
                    //     // "Accept":"application/json, text/javascript, */*; q=0.01",
                    //     // "Accept-Encoding":"gzip, deflate",
                    //     // "Accept-Language":"zh-CN,zh;q=0.8",
                    //     // "Connection":"keep-alive",
                    //     // "Content-Length":hash.length,
                    //     "Content-Type":"application/json; charset=UTF-8",
                    //     // "Cookie":"imooc_uuid=6cc9e8d5-424a-4861-9f7d-9cbcfbe4c6ae; imooc_isnew_ct=1460873157; loginstate=1; apsid=IzZDJiMGU0OTMyNTE0ZGFhZDAzZDNhZTAyZDg2ZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjkyOTk0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGNmNmFhMmVhMTYwNzRmMjczNjdmZWUyNDg1ZTZkMGM1BwhXVwcIV1c%3DMD; PHPSESSID=thh4bfrl1t7qre9tr56m32tbv0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1467635471,1467653719,1467654690,1467654957; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467655022; imooc_isnew=2; cvde=577a9e57ce250-34",
                    //     // "Host":"www.imooc.com",
                    //     // "Origin":"http://www.imooc.com",
                    //     "Referer":baseUrl2,
                    //     // "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2763.0 Safari/537.36",
                    //     // "X-Requested-With":"XMLHttpRequest",
                    // }
              
                }
                var url = baseUrl2+"/yy/index.php?"+qs.stringify(hash)+"&t="+ (new Date()).getTime().toString();
                http.get(url, function(_res) {
                    // console.log('状态码:' + _res.statusCode)
	                // console.log('响应头:' + JSON.stringify(_res.headers))
                    var content1 = '';
                    _res.setEncoding('utf-8');
                    // _res.setHeader(200 ,{'Cache-Control': 'no-cache'})
                    _res.on('data', function(chunk) {
                        console.log(chunk)
                        content1 += chunk;
                    });
                    _res.on('end',function(){
                        resolve(content1)
                    });
                }).end();
            // }
        // })
    })
    // var data = params;
    // data = qs.stringify(data);
    // var http_request = {
    //     host: 'http://songsearch.kugou.com',
    //     port: 80,
    //     path: '/song_search_v2?' + data
    // }
    // http.request(http_request, function(_res) {
    //     var content = '';
    //     _res.setEncoding('utf-8');
    //     _res.on('data', function(chunk) {
    //         content += chunk;
    //     });
    //     _res.on('end',function(){
    //         next()
    //     });
    // }).end();
}
module.exports={
    http_server:http_server,
    http_hash:http_server_hash
}