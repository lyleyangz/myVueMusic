const spawn = require('child_process').spawn;
var bat = spawn('cmd.exe',['/c','my.bat']);
function sleep(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms));
  }
  async function test(){
    var temple=await sleep(1000);
    console.log(1111)
    return temple
  }
bat.stdout.on('data', (data) => {
    console.log(data,'第一');
  });
  bat.stderr.on('data', (data) => {
    test();
    var bufferVale = []
    for (const value of data) {
        bufferVale.push(value)
    }
    console.log(data.length,bufferVale.length,Buffer.byteLength(data, 'utf8'));
    // console.log(data.toString('utf8',0,30))
    // console.log(data)
  });
   
  bat.on('exit', (code) => {
    console.log(`${code}`);
  });