var express = require("express");
var app = express();

var router = require('./controller/router.js')
// 设置模板引擎
app.set('view engine','ejs');

// 路由设置,静态页面
app.use(express.static('./public'));
app.use(express.static('./uploads'));

//首页
app.get('/',router.showIndex);
//相册
app.get('/:albumsNames',router.showAlbums);
app.use(function(req,res){
    res.render('err')
})

app.listen(3000,'127.0.0.1')