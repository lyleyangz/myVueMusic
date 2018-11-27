import http from './fetch.js';

// 轨迹列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/list',
        method: 'post',
        params: params
    });
}
// 添加轨迹
export function addProcess (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/addTrack',
        method: 'post',
        params: params
    });
}

// 编辑轨迹
export function editProcess (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/editTrack',
        method: 'post',
        params: params
    });
}
// 编辑详情
export function getDetailsById (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/single',
        method: 'get',
        params: params
    });
}
// 删除编辑
export function deleteEdit (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/del',
        method: 'get',
        params: params
    });
}
// 批量删除
export function deleteEdits (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/delBatch',
        method: 'get',
        params: params
    });
}

// 批次下拉列表
export function comboBoxBatch (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/comboBoxGoodsBatch',
        method: 'get',
        params: params
    });
}