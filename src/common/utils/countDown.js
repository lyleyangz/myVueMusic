const countDown = function ({time = 0, beforeColdingFun = () => {}, coldingFun = () => {}, afterColdingFun = () => {}, isColding = false}) {
    if (!isColding) {
        beforeColdingFun();
        let sum = time;
        const interval =  setInterval(() => {
            sum --;
            coldingFun(sum);
            if (sum <= 0) {
                clearInterval(interval);
                afterColdingFun();
            }
        }, 1000);
    }
}
export default countDown;