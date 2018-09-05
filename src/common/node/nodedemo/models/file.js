var fs = require("fs");

// 获取uploads下所有的文件夹信息
exports.getPicsFolder = function (callback) {
    fs.readdir("./uploads", function (err, files) {
        if (err) {
            callback('么有找到UPLOADS的文件路径', null)
        }
        var picArr = [];

        (function iterator(i) {
            if (i == files.length) {
                callback(null, picArr);
                return;
            }
            fs.stat('./uploads/' + files[i], function (err, stats) {
                if (err) {
                    callback("找不到" + file[i] + "这张图片!", null)
                }
                if (stats.isDirectory()) {
                    picArr.push(files[i])
                }
                iterator(i + 1);
            })
        })(0);
    })
}

// 获取对应文件夹下的所有文件信息
exports.getAllPics = function (albumsNames, callback) {
    fs.readdir("./uploads/" + albumsNames, function (err, files) {
        if (err) {
            callback('么有找到' + albumsNames + '文件', null);
            return;
        }
        var pics = [];

        (function iterator(i) {
            if (i == files.length) {
                callback(null, pics);
                return;
            }
            fs.stat('./uploads/' + albumsNames + '/' + files[i], function (err, stats) {
                if (err) {
                    callback("找不到" + file[i] + "这张图片!", null);
                    return;
                }
                if (stats.isFile()) {
                    pics.push(files[i])
                }
                iterator(i + 1);
            })
        })(0);
    })
}
// 获取回收站的文件
exports.getRecycleBin = function (folders,callback) {
    fs.readdir("./" + 'recycleBin',function (err,files) {
        var newPics = []
        if(err){
            callback('recycleBin',[]);
            return
        }
        for(let i = 0;i < files.length; i++){
            var oldPicNames = files[i];
            var picFolders = oldPicNames.split("_")[0];
            var picNames = oldPicNames.split("_")[1];
            newPics.push({
                folder:picFolders,
                picName:picNames,
                oldPicName:oldPicNames
            })
            // 没必要改名字
            // fs.rename("./" +folder + '/' + oldPicNames,"./" +folder + '/' + picNames, function (err) {
            //     if(err){
            //         return
            //     }
            // })
        }
        callback('recycleBin',newPics)
    })
}
// 删除对应文件夹下的一个文件或多个文件（移动到回收站=？ 回收站有还原和彻底删除的功能的）
exports.moveFolderFile = function (fileData,callback) {
    fs.exists('./uploads/' + fileData.holdersName + '/' + fileData.realName, function (exists) {
        if(exists){
            var filePath = './uploads/' + fileData.holdersName + '/' + fileData.realName;
            // 回收站新文件命名格式为  被删除文件夹名称+文件本来的名称+格式
            var newPath =  './recycleBin/' + fileData.realName;
            // 在回收站创建新的文件夹，以便指明被删除的图片是来自那个相册（暂时废弃逻辑）
            // var createdFloder = './recycleBin/' + folder;
            // fs.mkdirSync(createdFloder);
            fs.rename(filePath,newPath,function (err) {
                if(err){
                    callback(false);
                    return
                }
                callback(true)
            })
        }
    })
}
// 回收站彻底删除(delete)/和还原(reduction)功能
exports.DandRFiles = function (fileData,type,callback) {
    if(type === 'delete'){
        fs.exists('./recycleBin/' + fileData.realName,function (exists) {
            if(exists){
                fs.unlink('./recycleBin/' + fileData.realName,function (err) {
                    if(err){
                        callback(false);
                        return
                    }
                    callback(true)
                })
            }
        })
    }
    if(type === 'reduction'){
        fs.exists('./recycleBin/' +  fileData.realName,function (exists) {
            if(exists){
                var oldPath = './recycleBin/' +  fileData.realName;
                var newPath = './uploads/' + fileData.foldersName + '/' +  fileData.realName;
                fs.rename(oldPath,newPath,function(err) {
                    if(err){
                        callback(false);
                        return;
                    }
                    callback(true)
                })
            }
        })
    }
}
// 判断所有文件夹时候含有子文件
exports.perFolderHas = function (holders, callback) {
    var isHasHolder = [];
    // 迭代器遍历
    (function iterator(i) {
        if (i == holders.length) {
            callback(isHasHolder);
            return;
        }
        fs.readdir('./uploads/' + holders[i], function (err, files) {
            if (err) {
                callback(null)
                return
            }
            isHasHolder.push({
                holder: holders[i],
                holderLen: files.length
            })
            iterator(i + 1);
        })
    })(0);
}
