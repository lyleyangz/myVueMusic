var fs = require("fs");

exports.getPicsFolder = function(callback) {
    fs.readdir("./uploads",function(err,files){
        if(err){
            callback('么有找到UPLOADS的文件路径',null)
        }
        var picArr = [];

        (function iterator(i){
            if(i == files.length){
                callback(null,picArr);
                return;
            }
            fs.stat('./uploads/' + files[i],function(err,stats){
                if(err){
                    callback("找不到"+file[i]+"这张图片!",null)
                }
                if(stats.isDirectory()){
                    picArr.push(files[i])
                }
                iterator(i + 1);
            })
        })(0);
    })
}
exports.getAllPics = function(albumsNames,callback) {
    fs.readdir("./uploads/" + albumsNames,function(err,files){
        if(err){
            callback('么有找到'+albumsNames+'文件',null);
            return;
        }
        var pics = [];

        (function iterator(i){
            if(i == files.length){
                callback(null,pics);
                return;
            }
            fs.stat('./uploads/' + albumsNames + '/' + files[i],function(err,stats){
                if(err){
                    callback("找不到"+file[i]+"这张图片!",null);
                    return;
                }
                if(stats.isFile()){
                    pics.push(files[i])
                }
                iterator(i + 1);
            })
        })(0);
    })
}
