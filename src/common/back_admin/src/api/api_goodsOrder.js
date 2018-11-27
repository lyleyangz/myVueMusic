import http from './fetch.js';
// 列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/order/list',
        method: 'post',
        params: params
    });
}

// 详情
export function details (params = {}) {
    return http({
        url: '/service/app/v1/admin/order/singleinfo',
        method: 'get',
        params: params
    });
}
// 发货
export function sendGoods (params = {}) {
    return http({
        url: '/service/app/v1/admin/order/sendexpress',
        method: 'post',
        params: params
    });
}

// 快递详情
export function expressInfo (params = {}) {
    return http({
        url: '/service/app/v1/admin/order/expressinfo',
        method: 'get',
        params: params
    });
}