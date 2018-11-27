import http from './fetch.js';

// 用户管理列表
export function getUserList (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser/list',
        method: 'get',
        params: params
    });
}
// 单个用户信息查询
export function getUserInfo (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser',
        method: 'get',
        params: params
    });
}

// 添加用户
export function addUserInfo (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser',
        method: 'post',
        params: params
    });
}

// 编辑用户
export function editUserInfo (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser/update',
        method: 'post',
        params: params
    });
}

// 禁用用户
export function  forbiddenStatus (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser/forbidden',
        method: 'post',
        params: params
    });
}

// 启用用户
export function enableStatus (params = {}) {
    return http({
        url: '/service/app/v1/user/admin/adminuser/enable',
        method: 'post',
        params: params
    });
}

// 启用用户
export function getRoleList (params = {}) {
    return http({
        url: '/service/app/v1/admin/role/comboBoxRole',
        method: 'get',
        params: params
    });
}