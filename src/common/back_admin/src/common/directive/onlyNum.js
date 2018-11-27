import Vue from 'vue'
//只对input生效
export default function (el,obj,b) {
    var input = el;
    input.onkeyup = function (event) {
        var keyCode = event.keyCode;
        if(keyCode>=37 && keyCode<=40){
            return false;
        }
        var param = obj.expression || 0;
        if(input.value.length==1){
            input.value = input.value.replace(/[^1-9]/g,"");
        }else{
            if(param == 0){
                input.value = input.value.replace(/[^\d]/g, "");
            }else{
                var re =new RegExp("^\\d*(\\.?\\d{0,"+param+"})","g");
                input.value = input.value.match(re) || null;   
            }
        }
    };
}