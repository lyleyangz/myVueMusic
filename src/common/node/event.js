var EventEmitter = require('events').EventEmitter;

var event = new EventEmitter();

event.setMaxListeners(100)
function funName(data){
    console.log('【'+ data + '】')
}

event.on('emitEvent',funName)

event.on('emitEvent',function(data){
    console.log('【'+ data + '】')
})
event.on('emitEvent',function(data){
    console.log('【'+ data + '】')
})
event.on('emitEvent',function(data){
    console.log('【'+ data + '】')
})
event.on('emitEvent',function(data){
    console.log('【'+ data + '】')
})
event.on('emitEvent',function(data){
    console.log('【'+ data + '】')
})
// 移除单个需要有名函数
event.removeListener("emitEvent",funName)
event.removeAllListeners("emitEvent")
event.emit("emitEvent",'数据进来了')