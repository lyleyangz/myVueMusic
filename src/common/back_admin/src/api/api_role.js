import http from './fetch.js';

// 角色列表
export function getRoleList (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/listRole',
        method: 'get',
        params: params
    });
}

// 添加角色
export function addRole (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/add',
        method: 'post',
        params: params
    });
}

// 编辑角色
export function updateRole (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/update',
        method: 'post',
        params: params
    });
}

// 权限详情
export function getPermissionInfo (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/getInfo',
        method: 'get',
        params: params
    });
}
// 权限编辑
export function updatePermission (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/updatePermission',
        method: 'post',
        params: params
    });
}