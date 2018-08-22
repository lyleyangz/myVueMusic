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
// 删除对应文件夹下的一个文件或多个文件
exports.deleteFolderFile = function (folder,file,callback) {
    fs.exists('./uploads/' + folder + '/' + file, function (exists) {
        if(exists){
            var filePath = './uploads/' + folder + '/' + file;
            fs.unlink(filePath,function (err) {
                if(err){
                    callback(false)
                }
                callback(true)
            })
        }
    })
}
// 判断所有文件夹时候含有子文件
exports.perFolderHas = function (holders, callback) {
    var isHasHolder = [];
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
