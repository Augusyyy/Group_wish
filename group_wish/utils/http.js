let string = require('./string.js');
let cache = require('./cache.js');
let utils = require('../utils/util.js');
let widget = require('../utils/widget.js');
// wx.request封装
const requestService = (url, data, method, hideLoading) => {
    if (!hideLoading) {
        widget.showLoading();
    }
    let token = cache.get(string.JWT_TOKEN_KEY);
    let openId = cache.get(string.OPEN_ID_KEY);
    var header = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': token,
        'open-id': openId,
    };
    return new Promise((resolve, reject) => {
        if (method.toLowerCase() === 'get') {
            // return false;
            url+= utils.objectToQueryParamsStr(data);
        }
        wx.request({
            url: url,
            method: method,
            header: header,
            data: method.toLowerCase() === 'get' ? data : JSON.stringify(data),
            //如果是GET,GET自动让数据成为query String,其他方法需要让options.data转化为字符串
            complete: (res) => {
                // console.log(res);
                // 关闭等待
                if (!hideLoading) {
                    widget.hideLoading();
                }
                let httpStatusCode = res.statusCode;

                // 进行状态码判断并处理
                if (httpStatusCode === 200) {
                    //结果状态码
                    let result = res.data;
                    let resultStatusCode = result.code;
                    let resultData = result.data;
                    let errorMsg = result.msg ? result.msg : '服务器错误';
                    switch (resultStatusCode)
                    {
                        //请求成功
                        case 0:
                            resolve(resultData);
                            break;
                        //重新登录
                        case -10001:
                            reject(res);
                            cache.remove(string.JWT_TOKEN_KEY);
                            let authUrl = '/pages/auth/index?callback='+utils.getCurrentPageUrlWithArgs();
                            widget.location(authUrl);
                            break;
                        //维护模式
                        case -10002:
                            widget.location('/pages/maintain/index');
                            break;
                        //错误提示
                        default:
                            if (!hideLoading) {
                                widget.showToast(errorMsg);
                            }
                            reject(result);
                            break;
                    }
                } else {
                    if (!hideLoading) {
                        widget.showToast('请求失败');
                    }
                    reject(res);
                }
            },
            success(request) {
                
            },
            fail: function(e) {
                if (e && e.errMsg && e.errMsg.indexOf('ssl hand shake error') !== -1) {
                    widget.alert('升级提示', '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。');
                }
            }
        })
    })
}
//封装get方法
const get = (url, data = {}, hideLoading) => {
    return requestService(url, data, 'GET', hideLoading)
}
//封装post方法
const post = (url, data ={}, hideLoading) => {
    return requestService(url, data, 'POST', hideLoading)
}
//封装put方法
const put = (url, data = {}, hideLoading) => {
    return requestService(url, data, 'PUT', hideLoading)
}
//封装remove方法
// 不能声明DELETE（关键字）
const remove = (url, data = {}, hideLoading) => {
    return requestService(url, data, 'DELETE', hideLoading)
}

//自定义请求
const request =  (opts) => {
    return requestService(opts.url, opts.data ? opts.data : opts.params, opts.method, opts.hideLoading)
}
//抛出wx.request的post,get,put,remove方法
module.exports = {
    request,
    get,
    post,
    put,
    remove
}