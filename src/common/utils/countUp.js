// IncrementingInit => 递增的初始值
// IncrementingEnd => 递增的numberMax值
// IncrementVariable => 要递增的变量
// _ => this
const countUp = function(IncrementingInit,IncrementingEnd,IncrementVariable,_) {
    let IncrementingValue = IncrementingEnd - IncrementingInit;
    let perSpeed;
    let yu = IncrementingValue%10 === 0 ? 0:IncrementingValue%10;
    perSpeed = yu > 0 ? (IncrementingValue - (IncrementingValue%10))/10 : IncrementingValue/10;
    const timer = setInterval(()=> {
        if(yu > 0 && IncrementingEnd - yu <= _[IncrementVariable]){
            clearInterval(timer);
            _[IncrementVariable] = IncrementingEnd;
            return
        }
        if(yu == 0 && _[IncrementVariable] >= IncrementingEnd){
            clearInterval(timer);
            _[IncrementVariable] = IncrementingEnd;
            return
        }
        if(IncrementingValue > 0 ){
            _[IncrementVariable] += perSpeed;
        }else{
            _[IncrementVariable] -= perSpeed;
        }
    },100)
}
export default countUp;