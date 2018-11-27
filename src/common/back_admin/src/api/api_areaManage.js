import http from './fetch.js';

// 场地列表 (下拉列表)
export function comboBoxLocationsRef (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/locationsRef',
        method: 'get',
        params: params
    });
}
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/listAdmin',
        method: 'post',
        params: params
    });
}
// 场地添加第一步
export function addfirst (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/partOne',
        method: 'post',
        params: params
    });
}
// 场地添加第二步
export function addTwo (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/partTwo',
        method: 'post',
        params: params
    });
}
// 添加场地
export function add (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/add',
        method: 'post',
        params: params
    });
}
export function edit (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/edit',
        method: 'post',
        params: params
    });
}

export function detail (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/single',
        method: 'get',
        params: params
    });
}

export function del (params = {}) {
    return http({
        url: '/service/app/v1/admin/site/del',
        method: 'get',
        params: params
    });
}