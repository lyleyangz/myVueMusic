import http from './fetch.js';

// 获取图片验证码
export function getValCode (params = {}) {
    return http({
        url: '/service/app/v1/user/getQR',
        method: 'get',
        params: params
    });
}
// 登录
export function login (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/login',
        method: 'post',
        params: params
    });
}

export function getUserAuth (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/getPermission',
        method: 'get',
        params: params
    });
}
