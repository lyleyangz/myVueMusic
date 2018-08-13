const fs = require('fs');
const url = '../node.txt';
const urlTxt = './3.txt';

// 删除文件 
// fs.unlink(path,(err)=> {
//     console.log(err)
// })
// 查询文件状态access
// fs.access('./2.txt',(err)=> {
//     console.log(`access:   ${err}`);
// })
// 查询文件是否存在
// fs.exists(urlTxt, function( exists ){
//     console.log(typeof exists ) ;
//  }) ;

//重命名文件
// fs.rename('./2.txt','./3.txt',(err)=> {
//   console.log('重命名完成');
//   fs.stat('./3.txt',(err,stats)=> {
//     console.log(`文件属性: ${JSON.stringify(stats)}`);
// })
// })

// open(path,file status flags/)
// fs.open("./3.txt",'r',(err,fd)=> {
//     console.log(fd)
// })
// 读取文件内容
// fs.readFile('../node.txt','utf-8',function(err,data){
// 	if(err){
// 		console.error(err);
// 	}
// 	else{
// 		console.log(data);
// 	}
// });
// var contentText1 = fs.readFileSync(url,'utf-8');
// var contentText2 = fs.readFileSync(urlTxt,'utf-8');
// 递增失败！原因在55行
 var upNum = 1;
 var contentAll;
 var contentText1
 var contentText2;
// console.log(contentText1,'  '+contentAll,contentText2);
fs.readFile(url,'utf8',function(err,data){
    if(err){
        console.log(err)
    }
    // 向目标文件添加内容（一种奇葩的做法）
    // contentText1 = data;
    // fs.readFile(urlTxt,'utf8',function(err,data){
    //     if(err){
    //         console.log(err)
    //     }
    //     contentText2 = data;
    //     contentAll = contentText1 + contentText2;
    //     upNum ++;
    //     if(contentAll){
    //         // node是运行js，会把upNum重置，所以一直是初始值
    //         fs.writeFile(urlTxt,`${contentAll},这是区别递增的数据：${(upNum+=1)}`,'utf8',function(err){
    //             if(err){
    //                 throw err;
    //             }else{
    //                 fs.readFile(urlTxt,'utf-8',(err,data)=> {
    //                     if(err){
    //                         console.log("URLTXT读取失败！")
    //                     } 
    //                     console.log("URLTXT读取的内容："+data)
    //                 })
    //             }
    //         })
    //     }else{
    //         contentText1 ?  console.log("URL一号读取失败！"): console.log("URL2号读取失败！")
    //     }
    // })
    // 向目标文件append内容
    fs.appendFile(urlTxt,data,(err)=> {
        fs.readFile(urlTxt,'utf8',(err,data)=> {
            console.log(data,'appendFile函数')
        })
    })
})
// 监听文件变化
// fs.watchFile(urlTxt,function(curr,prev){
//     console.log("监听到了！！");
//     // 当前的文件状态
//     console.log(curr);
//     // 之前的文件状态
//     console.log(prev);
// })
// // 查询文件状态
// fs.stat(urlTxt,(err,data)=> {
//     if(err){
//         // 1234567
//         console.log(err)
//     }
//     console.log(data)
// })
// fs.existsSync(path)判断是否包含某文件/文件夹 
// readdirSync(path)返回一个指定目录下所有文件组成的数组对象 
// fs.removeSync(path)删除指定的目录 
// fs.statSync(path)获取文件信息,返回一个数组对象 
// 其中Sync是同步,上面的是同步方法
// console.log('文件位置路径：',__dirname,'文件全路径：',__filename)
// console.log(Buffer.from(url));
// let buf = Buffer.from(url);
// console.log(buf,buf.toString())
// fs.open(Buffer.from(url), 'w+', (err, fd) => {
//     if (err) throw err;
//     console.log('这是文件描述符：',fd);
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });

  
