import axios from "axios"
import qs from "qs"
import { resolve } from "upath";
// 接口说明http://songsearch.kugou.com/song_search_v2? = 主链接
// keyword=thatgirl  = 搜索关键词
// &page=1           =  翻页（下一页）
// pagesize=1        =  页面数据量
// &userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0   =  不明！不清楚！不知道！（懵逼三连）
// http://songsearch.kugou.com/song_search_v2?keyword=thatgirl&page=1&pagesize=1&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0

// hash = 获取hash资源
// ed  http://www.kugou.com/yy/index.php?r=play/getdata&hash=723715E13ECCC9AB7AFC154BA7E1CC3B&album_id=1820815
// 根据域名判断请求的接口
// hash获取接口： 
const  baseUrl = 'http://songsearch.kugou.com/song_search_v2';
// MP3获取接口： 
const baseUrl2 = 'http://www.kugou.com/yy/index.php';
// 代理
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
// 未知参数对象
const unKnowObj = {
    userid: -1,
    platform: 'WebFilter',
    tag: 'em',
    filter: 2,
    iscorrection: 1,
    privilege_filter: 0
}

// 允许带上cookie?
// axios.defaults.withCredentials = true;

const instance = axios.create({
    timeout: 1000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials:true
});

// 添加request拦截器，设置请求头
// axios.interceptors.request.use((config)=> {
//     // console.log(config)
//     config.headers = {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// })
// 添加response响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法
    if (!res.data.success && res.data.errCode) {
        // Toast(returnErrorStr(res.data.errCode));
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
            // Toast('系统繁忙');
            return {
                success: false
            };
        }
    } else {
        // Toast('连接失败');
        return {
            success: false
        };
    }
    
    // 对响应错误做处理
    // return Promise.reject(error);
});
var http = {
    httpHash:httpHash,
    httpSource:httpSource
}
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function httpHash(data = {method: '', params: {}}) {
    Object.assign(data.params, unKnowObj);
    if (data.method === "post") {
        // post未配置
        // get
    } else if (data.method === "get") {
        return axios.get(API_PROXY + baseUrl,{params:data.params})
    }
}
function httpSource(data = {hash:'',album_id:''}) {
    return axios.get(API_PROXY + baseUrl2+'?r=play/getdata&hash='+data.hash+'&album_id='+ data.album_id)
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