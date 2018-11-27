import http from './fetch.js';
// 列表
export function getList (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/listadmin',
        method: 'post',
        params: params
    });
}

// 添加
export function addGoods (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/add',
        method: 'post',
        params: params
    });
}
// 编辑
export function editGoods (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/edit',
        method: 'post',
        params: params
    });
}
// 详情
export function detailGoods (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/single',
        method: 'get',
        params: params
    });
}
// 上下架
export function updown (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/updown',
        method: 'post',
        params: params
    });
}
// 审核
export function verify (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/check',
        method: 'post',
        params: params
    });
}

// 修改审核状态
export function updataVerify (params = {}) {
    return http({
        url: '/service/app/v1/admin/store/subexamine',
        method: 'post',
        params: params
    });
}

// 商品名称下拉
export function goodsList (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/comboBoxGoodsGo',
        method: 'get',
        params: params
    });
}