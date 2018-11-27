/**
 * 数组移动
 */

function arrMove(arr,fromIndex,toIndex){
    var from = arr[fromIndex];
    var to = arr[toIndex];
    arr[toIndex] = from;
    arr[fromIndex] = to;
    return JSON.parse(JSON.stringify(arr));
}
export default arrMove;