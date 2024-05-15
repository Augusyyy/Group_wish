const http = require("../utils/http.js");
const api = require("../utils/api.js");
/**
 * 登录
 * @param params
 * @param hideLoading
 */
export function login(params, hideLoading) {
    return http.request({
        url: api.LOGIN,
        method: 'get',
        hideLoading:!!hideLoading,
        data: params?params:{}
    })
}

/**
 * 分享数据
 * @param params
 * @param hideLoading
 */
export function shareInfo(params, hideLoading) {
  return http.request({
      url: api.SHARE_INFO,
      method: 'post',
      hideLoading:!!hideLoading,
      data: params?params:{}
  })
}