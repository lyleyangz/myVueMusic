var fileModel = require('../models/file.js');
var formidable =  require('formidable');
var fs = require("fs");
var path = require('path')

exports.showIndex = function(req,res,next) {
    // node思想，在获取完成全部的文件夹以后，调用回调callback，拿到全部数据进行render
    fileModel.getPicsFolder(function(err,allPicArr){
        if(err){
            // res.render('err');
            next()
            return;
        }
        res.render('index',{
            ablums:allPicArr
        })
    })
}

exports.showAlbums  = function(req,res,next) {
    // 文件图片名称
    var albumsNames = req.params.albumsNames;
    fileModel.getAllPics(albumsNames,function(err,allPics){
        if(err){
            // res.render('err');
            next();
            return;
        }
        res.render('pics',{
            albumsNames:albumsNames,
            pics:allPics
        })
    })
}

// 上传页面路由
exports.showUpload = function(req,res) {
    fileModel.getPicsFolder(function(err,allPicArr){
        if(err){
            next();
            return;
        }
        res.render('upload',{
            ablums:allPicArr
        })
    })
}
// POST方法
exports.doPost = function(req,res,next) {
        var form = new formidable.IncomingForm();
        form.uploadDir = path.normalize(__dirname + '/../backups/') 
        form.parse(req, function(err,fields,files) {
            if(err){
                next();
                return;
            }
            var wenjianjia = fields.wenjianjia;
            var extname = path.extname(files.tupian.name)
            var oldpath = files.tupian.path;
            var newpath = path.normalize(__dirname + '/../uploads/' + wenjianjia + '/' + new Date().getTime() + extname)
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    next()
                    return 
                }
            })
            fileModel.getPicsFolder(function(err,allPicArr){
                if(err){
                    // res.render('err');
                    next()
                    return;
                }
                res.render('index',{
                    ablums:allPicArr
                })
            })
    })
}