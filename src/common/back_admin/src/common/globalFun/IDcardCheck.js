//身份证号正则验证
function IDcardCheck(val){
    var check18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;  //大陆18位
    var check15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/; //大陆15位
    var TW = /^[A-Z][0-9]{9}/; //台湾
    var HK = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(([0−9aA])|([0-9aA]))$/;  //香港
    var AM = /^[1|5|7][0-9]{6}\([0-9Aa]\)/; //澳门
       if(check18.test(val)||check15.test(val)||HK.test(val)||AM.test(val)||TW.test(val)){
           return true;
       }else{
           return false;
       }
}
export default IDcardCheck;