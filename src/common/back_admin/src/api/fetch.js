import axios from "axios"
import qs from "qs"
import iview from "iview"
import errMes from '../common/locale/errMes'


// 提示框设置
iview.Message.config({
    top: 400,
    duration: 3
})

// 根据域名判断请求的接口
// const baseUrl = '/open';
const baseUrl = '/jewel-openapi';


// 允许带上cookie
axios.defaults.withCredentials = true;
const instance = axios.create({
    timeout: 1000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});
// 请求拦截器
axios.interceptors.request.use((config) => {
    let loginKey = localStorage.getItem('token');
    if (loginKey) {
        config.headers['token'] = loginKey;
    }
    // let loginKey = localStorage.getItem('COM_systemLoginKey');
    // if (loginKey) {
    //     config.headers['food-token'] = loginKey;
    // }
    return config;
});
// 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法    
    var code = res.data.code;
    if (code != 200) {
        if (code == 1103) {
            iview.Message.warning('您未登录,即将返回登录界面');
            setTimeout(() => {
                location.replace('#/login');
            }, 1000);
            return {
                success: false,
                notLogin: true
            };
        } else {
            iview.Message.error(returnErrorStr(code));
            return {
                success: false,
                data: res.data.data
            };
        }

    }
    return res.data;
}, (error) => {
    // if (error.response) {
    //     if (error.response.status === 404) {
    //         location.href = '#/404';
    //     }
    // } else {
    //     location.href = '#/404';
    // }

    return Promise.reject(error);
});
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function http(data = {
    url: '',
    method: '',
    params: ''
}, withQs = false) {

    var loginUrl = /^((?!login).)*$/;
    if (loginUrl.test(data.url)) {
        axios.defaults.headers["token"] = sessionStorage.getItem("token");
        axios.defaults.headers["userAccount"] = sessionStorage.getItem("userName");

    }

    if (data.method === "post") {
        const fParams = withQs ? qs.stringify(data.params) : data.params;
        return axios.post(baseUrl + data.url + `?t=${Math.random()}`, fParams);
        // get
    } else if (data.method === "get") {
        return axios.get(baseUrl + data.url + `?t=${Math.random()}`, {
            params: data.params
        })
    }else if (data.method === "patch") {
        return axios.patch(baseUrl + data.url + `?t=${Math.random()}`, data.params)
    }
};

function returnErrorStr(errCode) {
    switch (errCode) {
        case '1001':
            return '新增失败';
        case '1002':
            return '删除失败';
        case '1003':
            return '编辑失败';
        case '1101':
            return '用户账号已存在';
        case '1102':
            return '用户已被禁用，无法登陆';
        case '1201':
            return '名称已存在';
        default:
            return errMes.default;
            break;
    }
}
export default http;