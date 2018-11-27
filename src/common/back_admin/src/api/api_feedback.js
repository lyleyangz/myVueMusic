import http from './fetch.js';

// 处理反馈意见
export function dealFeedback (params = {}) {
    return http({
        url: '/service/app/v1/admin/suggest/dispose',
        method: 'post',
        params: params
    });
}
// 获取意见列表
export function getFeedbackList (params = {}) {
    return http({
        url: '/service/app/v1/admin/suggest/listadmin',
        method: 'post',
        params: params
    });
}
// 意见详情
export function detailsFeedback (params = {}) {
    return http({
        url: '/service/app/v1/admin/suggest/single',
        method: 'get',
        params: params
    });
}
