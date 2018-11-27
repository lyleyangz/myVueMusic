import http from './fetch.js';

// 现场监控列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/monitorVideo/queryMonitorVideoList',
        method: 'post',
        params: params
    });
}
// 添加现场监控
export function addMonitor (params = {}) {
    return http({
        url: '/service/app/v1/admin/monitorVideo/addMonitorVideo',
        method: 'post',
        params: params
    });
}
// 修改现场监控
export function editMonitor (params = {}) {
    return http({
        url: '/service/app/v1/admin/monitorVideo/editMonitorVideo',
        method: 'post',
        params: params
    });
}
// 修改现场监控
export function delMonitor (params = {}) {
    return http({
        url: '/service/app/v1/admin/monitorVideo/delMonitorVideo',
        method: 'get',
        params: params
    });
}