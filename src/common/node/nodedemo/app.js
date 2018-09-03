var express = require("express");
var app = express();
var path = require('path')

var controller = require('./controller/controller')

var recycleBinRouter = require('./routes/recycle');
var foldersdeleteRouter = require('./routes/foldersdelete');
var uploadRouter = require('./routes/upload')

// 设置模板引擎
app.set('view engine','ejs');

// 路由设置,静态页面
app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.use(express.static('./recycleBin'));



//首页
// app.get('/',controller.showIndex);
//相册
// app.use('/:albumsNames',foldersdeleteRouter);
// use适用主页面拥有子功能
// get则是单一页面
app.use('/',foldersdeleteRouter);
// 回收站
app.use('/recycleBin',recycleBinRouter);
// 回收站删除和还原
// post页面路由
app.use('/upload',uploadRouter)
// app.post('/post',controller.doPost)
// 404页面
app.use(function(req,res){
    res.render('err')
})

app.listen(3000,'127.0.0.1')