let fs = require('fs');
let qs = require('querystring');
let http = require('http');
// hash获取接口： 
const  baseUrl = 'http://songsearch.kugou.com/song_search_v2';
// MP3获取接口： ?r=play/getdata&hash=4BFDFA86BB283602D19F6E009E7B433C&album_id=2654758
const baseUrl2 = 'http://www.kugou.com';
var http_server_hash = function(keyword) {
    return new Promise((resolve,reject) =>{
        var data = keyword;
        data = qs.stringify(data);
        // var http_request = {
        //     host: 'http://songsearch.kugou.com/song_search_v2?keyword=shots&page=1&pagesize=1&userid=-1&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0',
        //     port: 3000,
        //     method: 'GET',
        //     path: '/song_search_v2?' + data
        // }
        var url = 'http://songsearch.kugou.com/song_search_v2?'+data+'&page=1&pagesize=1&userid=-1&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0'
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
var http_server = function(keyword,next) {
    return new Promise((resolve,reject)=>{
        http_server_hash(keyword).then((res)=>{
            res = JSON.parse(res);
            if(res.status==1){
                var hash={
                    hash:"",
                    album_id:"",
                    r:"play\/getdata",
                }
                var http_request = {
                    hostname:baseUrl2,
                    path:"/yy/index.php?"+qs.stringify(hash),
                    method:"get",
                    port:3000
                }
                if(res.data.lists.length>0){
                    hash.hash = res.data.lists[0].FileHash;
                    hash.album_id = res.data.lists[0].AlbumID;
                }
                http.request(http_request, function(_res) {
                    var content = '';
                    _res.setEncoding('utf-8');
                    _res.on('data', function(chunk) {
                        content += chunk;
                    });
                    _res.on('end',function(){
                        resolve(content)
                    });
                }).end();
            }
        })
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
    http:http_server
}