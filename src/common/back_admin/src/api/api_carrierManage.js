import http from './fetch.js';

export function carrierList (params = {}) {
    return http({
        url: '/service/app/v1/driver/list',
        method: 'get',
        params: params
    });
}

export function addCarrier (params = {}) {
    return http({
        url: '/service/app/v1/driver',
        method: 'post',
        params: params
    });
}

export function detailCarrier (params = {}) {
    return http({
        url: '/service/app/v1/driver',
        method: 'get',
        params: params
    });
}

export function updateCarrier (params = {}) {
    return http({
        url: '/service/app/v1/driver/update',
        method: 'post',
        params: params
    });
}

export function delCarrier (params = {}) {
    return http({
        url: '/service/app/v1/driver/delete',
        method: 'post',
        params: params
    });
}
