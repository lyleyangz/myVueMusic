var fileModel = require('../models/file.js');
var formidable = require('formidable');
var fs = require("fs");
var path = require('path');
var qs = require('querystring')

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
            next();
            return;
        }
        res.render('pics', {
            id: 'clickId' + new Date().getTime(),
            albumsNames: albumsNames,
            pics: allPics
        })
    })
}
// 显示回收站的东西
exports.showRecycleBin = function (req, res, next) {
    fileModel.getRecycleBin('recycleBin', function (folder, Pics) {
        if (Pics.length == 0) {
            res.render('recycle', {
                isNull: false,
                pics: Pics
            })
            return
        }
        res.render('recycle', {
            isNull: true,
            pics: Pics
        })
    })
}
// 回收站彻底删除
exports.deletePics = function (req, res, next) {
    // 功能
    var type = req.params.type;
    // 文件夹
    var holdersName = req.params.holdersName;
    // 文件名
    var folderFileExt = req.params.holdersName + '_' + req.params.folderFileExt;
    // ejs渲染文件名
    var ejsRenderFileName = req.params.folderFileExt;
    // 以对象的形式发送文件全部信息
    var fileData = {
        holdersName: holdersName,
        realName: folderFileExt,
        ejsRenderFileName: ejsRenderFileName
    }
    // 根据功能执行不同操作（还原图片）（彻底删除图片）
    fileModel.DandRFiles(fileData, type, function (bol) {
        console.log('麻烦', bol)
        if (!bol) {
            res.render('recycle', {
                isNull: false
            })
            return
        }
        res.send("oo")
        // fileModel.getRecycleBin('recycleBin', function (folder, allPics) {
        //     if (allPics.length == 0) {
        //         res.render('recycle', {
        //             isNull:false
        //         })
        //         return
        //     }
        //     res.render('recycle', {
        //         isNull:true,
        //         pics: allPics
        //     })
        // })
    })
}
// 删除相册图片(移动到回收站而已)=> 结合到doPost
// exports.movePics = function (req, res, next) {
//     //创建空字符叠加数据片段
//     var data = '';

//     //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
//     req.on('data', function (chunk) {
//         // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
//         data += chunk;
//     });
//     req.on('end', function () {

//         //（1）.对url进行解码（url会对中文进行编码）
//         data = decodeURI(data);

//         /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

//         //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
//         //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
//         // var dataObject = qs.parse(data);
//         // console.log(dataObject);
//         var doFileName = (data).split('_')
//         // 文件名
//         var folderFileExt = data;
//         // 文件夹
//         var holdersName = doFileName[0];
//         // ejs渲染文件名
//         var ejsRenderFileName = doFileName[1];
//         // 以对象的形式发送文件全部信息
//         var fileData = {
//             holdersName: holdersName,
//             realName: folderFileExt,
//             ejsRenderFileName: ejsRenderFileName
//         }
//         fileModel.moveFolderFile(fileData, function (bol) {
//             if (!bol) {
//                 next();
//                 return;
//             }
//             // 响应文件夹删除完了，再次回到该文件夹
//             fileModel.getAllPics(fileData.holdersName, function (err, allPics) {
//                 if (err) {
//                     next();
//                     return;
//                 }
//                 res.render('pics', {
//                     id: 'clickId' + new Date().getTime(),
//                     albumsNames: fileData.holdersName,
//                     pics: allPics
//                 })
//             })
//         })
//     });
// }
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
    // 图片移动
    if (req.url === '/move/post' && req.method === 'POST') {
        //创建空字符叠加数据片段
        var data = '';

        //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        });
        req.on('end', function () {

            //（1）.对url进行解码（url会对中文进行编码）
            data = decodeURI(data);

            /**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */

            //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
            //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
            // var dataObject = qs.parse(data);
            // console.log(dataObject);
            var doFileName = (data).split('_')
            // 文件名
            var folderFileExt = data;
            // 文件夹
            var holdersName = doFileName[0];
            // ejs渲染文件名
            var ejsRenderFileName = doFileName[1];
            // 以对象的形式发送文件全部信息
            var fileData = {
                holdersName: holdersName,
                realName: folderFileExt,
                ejsRenderFileName: ejsRenderFileName
            }
            fileModel.moveFolderFile(fileData, function (bol) {
                if (!bol) {
                    next();
                    return;
                }
                // 响应文件夹删除完了，再次回到该文件夹
                fileModel.getAllPics(fileData.holdersName, function (err, allPics) {
                    if (err) {
                        next();
                        return;
                    }
                    res.render('pics', {
                        id: 'clickId' + new Date().getTime(),
                        albumsNames: fileData.holdersName,
                        pics: allPics
                    })
                })
            })
        });
    }
    // 文件上传
    if (req.url === '/upload/post' && req.method === 'POST') {
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
            // 不能上传空文件
            if(!wenjianjia || !extname || !oldpath){
                res.send("不能上传空文件")
                return 
            }
            var newpath = path.normalize(__dirname + '/../uploads/' + wenjianjia + '/' + wenjianjia + '_' + new Date().getTime() + extname)
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
                res.render('upload', {
                    ablums: allPicArr
                })
            })
        })
    }

}