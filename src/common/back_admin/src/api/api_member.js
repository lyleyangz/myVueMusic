import http from './fetch.js';

// 用户管理列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/user/list',
        method: 'get',
        params: params
    });
}

// 启用禁用
export function forbidden (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/user/forbidden',
        method: 'post',
        params: params
    });
}