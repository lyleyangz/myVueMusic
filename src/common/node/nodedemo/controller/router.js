var fileModel = require('../models/file.js')

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