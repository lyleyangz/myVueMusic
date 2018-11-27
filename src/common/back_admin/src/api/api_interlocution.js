import http from './fetch.js';

// 百问百答列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/question/list',
        method: 'get',
        params: params
    });
}

// 增加
export function addInterlocution(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/addQuestion',
        method: 'post',
        params: params
    });
}

// 编辑
export function updateInterlocution(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/update',
        method: 'post',
        params: params
    });
}
// 删除
export function deleteInterlocution(params = {}) {
    return http({
        url: '/service/app/v1/admin/question/delete',
        method: 'get',
        params: params
    });
}
// 详情
export function interlocutionInfo(params = {}) {
    return http({
        url: '/service/app/v1/user/question/info',
        method: 'get',
        params: params
    });
}