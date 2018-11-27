
function phoneNumCheck(val){
    var check = /^1[34578]\d{9}$/;
    if(check.test(val)){
        return false
    }else{
        return true
    }
}
export default phoneNumCheck;