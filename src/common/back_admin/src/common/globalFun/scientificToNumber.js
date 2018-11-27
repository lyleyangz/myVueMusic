// 转化科学计数法
const scientificToNumber = function (num) {
    //处理非数字
    if(isNaN(num)){return num};
    
    //处理不需要转换的数字
    var str = ''+num;
    if(!/e/i.test(str)){return num;};
    
    return (num).toFixed(18).replace(/\.?0+$/, "");
}
export default scientificToNumber;