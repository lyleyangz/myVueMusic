var fileModel = require('../models/file.js');
var formidable = require('formidable');
var fs = require("fs");
var path = require('path')

// 显示相册文件夹
exports.showIndex = function (req, res, next) {
    // node思想，在获取完成全部的文件夹以后，调用回调callback，拿到全部数据进行render
    fileModel.getPicsFolder(function (err, allPicArr) {
        if (err) {
            // res.render('err');
            next()
            return;
        }
        // 对相册是否含有文件做处理
        var allPicsData = [];
        fileModel.perFolderHas(allPicArr, function (isHasHolder) {
            allPicsData = isHasHolder;
            res.render('index', {
                ablums: allPicsData
            })
        });
    })
}

// 显示对应文件夹的内容文件
exports.showAlbums = function (req, res, next) {
    // 文件图片名称
    var albumsNames = req.params.albumsNames;
    fileModel.getAllPics(albumsNames, function (err, allPics) {
        if (err) {
            // res.render('err');
            next();
            return;
        }
        res.render('pics', {
            albumsNames: albumsNames,
            pics: allPics
        })
    })
}
// 删除文件夹里的文件
exports.deletePics = function (req, res, next) {
    var folder = req.params.holdersName;
    var folderFileExt = (req.params.folderFileExt).split(folder)[1];
    fileModel.deleteFolderFile(folder,folderFileExt, function (bol) {
        if (!bol) {
            next();
            return;
        }
        fileModel.getAllPics(folder, function (err, allPics) {
            if (err) {
                next();
                return;
            }
            res.render('pics', {
                albumsNames: folder,
                pics: allPics
            })
        })
    })
}
// 上传页面路由
exports.showUpload = function (req, res) {
    fileModel.getPicsFolder(function (err, allPicArr) {
        if (err) {
            next();
            return;
        }
        res.render('upload', {
            ablums: allPicArr
        })
    })
}
// POST方法
exports.doPost = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + '/../backups/')
    form.parse(req, function (err, fields, files) {
        if (err) {
            next();
            return;
        }
        var wenjianjia = fields.wenjianjia;
        var extname = path.extname(files.tupian.name)
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + '/../uploads/' + wenjianjia + '/' + new Date().getTime() + extname)
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                next()
                return
            }
        })
        // 文件上传成功之后，返回主页面
        fileModel.getPicsFolder(function (err, allPicArr) {
            if (err) {
                // res.render('err');
                next()
                return;
            }
            var allPicsData = [];
            fileModel.perFolderHas(allPicArr, function (isHasHolder) {
                allPicsData = isHasHolder;
                res.render('index', {
                    ablums: allPicsData
                })
            });
        })
    })
}