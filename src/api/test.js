import http from './fetch.js';

export function aaa(params = {}) {
    http.httpHash({
        url: '/aaab',
        method: 'get',
        params:params
    });
}