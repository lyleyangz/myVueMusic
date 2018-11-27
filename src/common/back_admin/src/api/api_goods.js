import http from './fetch.js';


// 分类列表
export function classLfyList (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/classLfyList',
        method: 'get',
        params: params
    });
}

// 分类下拉列表
export function comboBoxClassLfy (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/comboBoxGoodsClass',
        method: 'get',
        params: params
    });
}

// 新增分类
export function addClassLfy (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/addClassLfy',
        method: 'post',
        params: params
    });
}

// 修改分类
export function updateClassLfy (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/updateClassLfy',
        method: 'post',
        params: params
    });
}


// 批次列表
export function batchList (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/batchList',
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
// 添加批次
export function addBatch (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/addBatch',
        method: 'post',
        params: params
    });
}


// 商品列表
export function goodsList (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/goodsList',
        method: 'get',
        params: params
    });
}
// 添加商品
export function addGoods (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/addGoods',
        method: 'post',
        params: params
    });
}

// 模板列表
export function templetList (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/goodsTemplateList',
        method: 'get',
        params: params
    });
}
// 模板下拉列表
export function comboBoxTemplate (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/comboBoxGoodsTemplate',
        method: 'get',
        params: params
    });
}
// 添加模板
export function addTemplet (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/addGoodsTemplate',
        method: 'post',
        params: params
    });
}
// 删除模板
export function delTemplet (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/delGoodsTemplate',
        method: 'get',
        params: params
    });
}

// 模板详情
export function getTempletDetail (params = {}) {
    return http({
        url: '/service/app/v1/admin/product/getInfo',
        method: 'get',
        params: params
    });
}


export function getTrackByBatch (params = {}) {
    return http({
        url: '/service/app/v1/admin/track/tracksbatch',
        method: 'get',
        params: params
    });
}
