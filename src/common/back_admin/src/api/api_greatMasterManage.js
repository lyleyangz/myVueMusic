import http from './fetch.js';

// 珠宝大师列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/master/list',
        method: 'post',
        params: params
    });
}
// 添加珠宝大师
export function addMaster (params = {}) {
    return http({
        url: '/service/app/v1/admin/master/addMaster',
        method: 'post',
        params: params
    });
}
// 编辑珠宝大师
export function editMaster (params = {}) {
    return http({
        url: '/service/app/v1/admin/master/editMaster',
        method: 'post',
        params: params
    });
}
// 删除珠宝大师
export function delMaster (params = {}) {
    return http({
        url: '/service/app/v1/admin/master/del',
        method: 'get',
        params: params
    });
}
// 查单个珠宝大师
export function getInfoById (params = {}) {
    return http({
        url: '/service/app/v1/admin/master/single',
        method: 'get',
        params: params
    });
}
export function comboBoxGreatMaster (params = {}) {
    return http({
        url: '/service/app/v1/admin/master/refList',
        method: 'get',
        params: params
    });
}

