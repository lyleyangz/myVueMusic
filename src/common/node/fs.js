const fs = require('fs');
 
// 删除文件 
// fs.unlink(path,(err)=> {
//     console.log(err)
// })
// 查询文件状态access
// fs.access('./2.txt',(err)=> {
//     console.log(`access:   ${err}`);
// })

//重命名文件
// fs.rename('./2.txt','./3.txt',(err)=> {
//   console.log('重命名完成');
//   fs.stat('./3.txt',(err,stats)=> {
//     console.log(`文件属性: ${JSON.stringify(stats)}`);
// })
// })

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
// fs.existsSync(path)判断是否包含某文件/文件夹 
// readdirSync(path)返回一个指定目录下所有文件组成的数组对象 
// fs.removeSync(path)删除指定的目录 
// fs.statSync(path)获取文件信息,返回一个数组对象 
// 其中Sync是同步,上面的是同步方法
const url = '../node.txt';
console.log('文件位置路径：',__dirname,'文件全路径：',__filename)
// console.log(Buffer.from(url));
let buf = Buffer.from(url);
// console.log(buf,buf.toString())
fs.open(Buffer.from(url), 'w+', (err, fd) => {
    if (err) throw err;
    console.log('这是文件描述符：',fd)
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
