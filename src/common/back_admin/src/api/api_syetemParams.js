import http from './fetch.js';

// 系统参数列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/listadmin',
        method: 'post',
        params: params
    });
}

// 增加
export function addParam (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/addparam',
        method: 'post',
        params: params
    });
}

// 编辑
export function editParam (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/editparam',
        method: 'post',
        params: params
    });
}

// 详情
export function singleParams (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/single',
        method: 'get',
        params: params
    });
}

// 删除
export function delParam (params = {}) {
    return http({
        url: '/service/app/v1/admin/sysparam/del',
        method: 'get',
        params: params
    });
}

// token配置列表
export function scoreList (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig',
        method: 'get',
        params: params
    });
}

// 配置详情
export function scoreDetail (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig/id',
        method: 'get',
        params: params
    });
}

export function updateScore (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig',
        method: 'patch',
        params: params
    });
}
export function updateStatus (params = {}) {
    return http({
        url: '/service/app/v1/admin/score/scoreconfig/status',
        method: 'patch',
        params: params
    });
}

