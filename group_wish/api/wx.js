const http = require("../utils/http.js");
const api = require("../utils/api.js");

/**
 * 根据code 获取微信open_id
 * @param params
 * @param hideLoading
 */
export function wxOpenIdByCode(params, hideLoading) {
    return http.request({
        url: api.GET_OPEN_ID,
        method: 'get',
        hideLoading:!!hideLoading,
        params: params?params:{}
    })
}

