import http from './fetch.js';

// 溯源商品统计
export function getCountGoods (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/statistics',
        method: 'get',
        params: params
    });
}
// NFC统计
export function getNFC (params = {}) {
    return http({
        url: '/service/app/v1/admin/statistics/nfc',
        method: 'post',
        params: params
    });
}

// NFC统计
export function getCountNFC (params = {}) {
    return http({
        url: '/service/app/v1/admin/statistics/wmcount',
        method: 'get',
        params: params
    });
}

// 登录日志
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser/loginhistory',
        method: 'get',
        params: params
    });
}