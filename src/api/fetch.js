import axios from "axios"
import qs from "qs"
import { Toast } from 'mint-ui'


// 根据域名判断请求的接口
const baseUrl = location.href.includes('localhost')? '': '';

// 允许带上cookie?
// axios.defaults.withCredentials = true;

const instance = axios.create({
    timeout: 1000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials:true
});


// 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法
    if (!res.data.success && res.data.errCode) {
        Toast(returnErrorStr(res.data.errCode));
        return {
            success: false,
            data: res.data.data
        };
    }
    return res.data;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.setItem('isLogin', 'false');
            return {
                success: false,
                notLogin: true
            };
        } else {
            Toast('系统繁忙');
            return {
                success: false
            };
        }
    } else {
        Toast('连接失败');
        return {
            success: false
        };
    }
    
    // 对响应错误做处理
    // return Promise.reject(error);
});
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function http(data = {url: '', method: '', params: {}}) {
    if (data.method === "post") {
        return axios.post(baseUrl + data.url, fParams);
        // get
    } else if (data.method === "get") {
        return axios.get(baseUrl + data.url, {
            params: data.params
        })
    }
}
function returnErrorStr(errCode){
    switch(errCode) {
        case '404':
        return '无效资源';

        default:
        break;
    }
}
export default http;