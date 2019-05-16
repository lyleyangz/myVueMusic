var express = require('express');
var fs = require('fs');
var path = require('path');
var URL = require('url')
var bodyParser = require('body-parser');
var app = express();
// 
var http = require('./http/http')
// 注册users接口
var users = require('./routes/users');
app.use('/users', users);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

// 访问单页
app.get('/api', function (req, res) {
  var  params = URL.parse(req.url).query;
  http.http(params).then((response)=>{
    res.send(response)
  })
  // var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
});

// 监听
app.listen(3000, function () {
  console.log('success listen...3000');
});