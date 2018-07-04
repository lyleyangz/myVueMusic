

/**
 * 截取url参数
 */
function getQueryString(name) {
    var _url = location.href.split('?')[1];
        if (_url) {
          let paramArr = _url.split('&');
          var codeStr = '';
          for (var i = 0; i < paramArr.length; i++) {
            var singleParam = paramArr[i].split('=');
            if (singleParam[0] === name) {
              codeStr = singleParam[1];
              return codeStr;
            }
          }
        }
}
export default getQueryString;