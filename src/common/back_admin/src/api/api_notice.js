import http from './fetch.js';

// 公告列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/notice/list',
        method: 'get',
        params: params
    });
}
// 添加公告
export function addNotice (params = {}) {
    return http({
        url: '/service/app/v1/notice',
        method: 'post',
        params: params
    });
}
// 编辑公告
export function editNotice (params = {}) {
    return http({
        url: '/service/app/v1/notice/update',
        method: 'post',
        params: params
    });
}
// 单个查询公告
export function getNoticeById (params = {}) {
    return http({
        url: '/service/app/v1/notice',
        method: 'get',
        params: params
    });
}
// 删除公告
export function deleteNotice (params = {}) {
    return http({
        url: '/service/app/v1/notice/delete',
        method: 'post',
        params: params
    });
}
