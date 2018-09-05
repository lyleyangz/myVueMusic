const express = require('express')
const router = express.Router();

var routerMethods = require('../controller/controller')
// 首页
router.get('/',routerMethods.showIndex);
// 处理这个莫名其妙的图标
router.get('/favicon.ico',routerMethods.showIndex);
// 文件夹
router.get('/:albumsNames',routerMethods.showAlbums);
// 所有get请求
router.get('/:type/get',routerMethods.deletePics)
// 所有post请求
router.post('/:type/post',routerMethods.doPost)
module.exports = router