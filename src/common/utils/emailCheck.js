
function emailCheck(val){
    var check = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if(!check.test(val)){
        return false
    }else{
        return true
    }
}
export default emailCheck;