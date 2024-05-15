//app.js
var util = require('./utils/util.js');
var cache = require('./utils/cache.js');
var string = require('./utils/string.js');
var http = require('./utils/http');
var api = require('./utils/api');
var enums = require('./utils/enums');
var widget = require('./utils/widget');
const { SHARE_PAGE, SHARE_USER } = require('./utils/string.js');
const BannerType = enums.BannerType;
App({
    globalData: {
      system:{},//系统信息
    },
    onLaunch: function (options) {
        this.loadSystemInfo();
        let query = options.query;
        let page = query && query.page ? query.page : '';
        let id = query && query.id ? query.id : '';
        if (page && id && !this.isLogin()) {
          cache.set(string.SHARE_PAGE, page);
          cache.set(string.SHARE_USER, id);
        }
        wx.setInnerAudioOption({
          obeyMuteSwitch: false
        });
        wx.setKeepScreenOn({
          keepScreenOn: true
        });
        // cache.remove(string.JWT_TOKEN_KEY);
        // cache.remove(string.USER_GUIDE);
    },

    onLoad: function() {
      wx.hideShareMenu();
    },

    onShow: function () {
        // this.checkOpenId();
    },

    /**
     * 获取当前系统信息
     * @returns {boolean}
     */
    loadSystemInfo:function(){
        let that = this;
        if (that.globalData.system.version) {
            return false;
        }
        const res = wx.getSystemInfoSync()
        console.log(res);
        that.globalData.system = res;
        if (res.environment) {
            that.globalData.type = res.environment;
        }
    },
    /**
     *获取open id
     * @returns {*}
     */
    getOpenId: function () {
        return cache.get(string.OPEN_ID_KEY);
    },
    /**
     * 获取union id
     * @returns {*}
     */
    getUnionId: function () {
        return cache.get(string.UNION_ID_KEY);
    },
    /**
     * 获取user id
     * @returns {*}
     */
    getUserId: function () {
        return cache.get(string.USER_ID_KEY);
    },
    /**
     * 获取用户信息
     * @returns {*}
     */
    getUserInfo: function () {
        return cache.get(string.USER_INFO_KEY);
    },

    /**
     * 登录验证
     * @returns {boolean}
     */
    checkAuth: function () {
      // console.log(cache.get(string.JWT_TOKEN_KEY))
      // cache.remove(string.JWT_TOKEN_KEY);
      // cache.set(string.JWT_TOKEN_KEY, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODYxMDI0OTY1NSIsImtpZCI6IjEiLCJleHAiOjE3MDEyMzk4MzEsImlhdCI6MTY5ODY0NzgzMX0.cWdFYIVTW-pYkXfMeoHfPPlYkiuOmkVa-LqVLF9sB3k')
        if (!(this.isLogin())) {
            let url = '/pages/auth/index?callback=' + encodeURIComponent(util.getCurrentPageUrlWithArgs());
            widget.location(url);
            // wx.reLaunch({
            //   url: url,
            // })
            return false;
        } else if (!(this.isSetProfile())) {
          let url = '/pages/user/index?callback=' + encodeURIComponent(util.getCurrentPageUrlWithArgs());
          widget.location(url);
          // wx.reLaunch({
          //   url: url,
          // })
          return false;
        } else {
            return true;
        }
    },
    /**
     * 登录验证
     * @returns {boolean}
     */
    checkOpenId: function () {
        if (!this.getOpenId()) {
            this.login();
        } else {
            return true;
        }
    },
    /**
     * 检查小程序 session_key 是否过期
     */
    checkSession:function () {
        let that = this;
        widget.checkSession(function () {
            console.log('checkSession success');
        }, function () {
            console.log('checkSession failed');
            that.login();
        })
    },

    /**
     * 是否登录
     * @returns {boolean}
     */
    isLogin:function () {
        let token = cache.get(string.JWT_TOKEN_KEY);
        if (token) {
            return true;
        } else {
            return false;
        }

    },

    /**
     * 检查是否修改用户信息
     */
    isSetProfile: function() {
      let userInfo = cache.get(string.USER_INFO_KEY);
      if (userInfo.name === '微信用户' || userInfo.avatar.indexOf('zld-meidas.oss-cn-hangzhou') === -1) {
        return false;
      } else {
        return true;
      }
    },


    /**
     * 微信登录
     * @param successFunc
     * @param failFunc
     */
    login:function (successFunc, failFunc) {
        var that = this;
        let type = that.globalData.type;
        widget.wxLogin(type, {
            success: function (data) {
                if (data.code) {
                    http.get(api.GET_OPEN_ID, {code: data.code, type:type}, true).then(function(res) {
                        that.cacheUserInfo(res, true);
                        successFunc && successFunc(res);
                  }).catch(function (res) {
                        failFunc && failFunc(res);
                        widget.showToast('授权接口调用失败');
                    })
                }

            }
        })
    },
    loadConfigData(){
        let that = this;
        http.get(api.GET_CONFIG, {}, true).then(function(res) {
            let {serviceCall} = res;
            that.globalData.servicePhone = serviceCall;
        }).catch(function (res) {

        })
    },

    /**
     * 缓存用户信息
     * @param res
     * @param isBase
     */
    cacheUserInfo(res, isBase = false){
        let {openId, unionId, token} = res;
        if (openId) {
            cache.set(string.OPEN_ID_KEY, openId);
        }
        if (unionId) {
            cache.set(string.UNION_ID_KEY, unionId);
        }
        if (!isBase) {
            if (token) {
                cache.set(string.JWT_TOKEN_KEY, token);
                cache.set(string.USER_INFO_KEY, res);
            }
        }

    },

    /**
     * 删除缓存用户信息
     */
    clearUserInfo(){
        cache.remove(string.JWT_TOKEN_KEY);
        cache.remove(string.USER_INFO_KEY);
        cache.remove(string.OPEN_ID_KEY);
        cache.remove(string.UNION_ID_KEY);
    },

    /**
     * 活动或者banner 通用跳转
     * @param banner
     * @returns {boolean}
     */
    toBannerDetailPage(banner){
        let type = banner.type;
        let id = banner.redirectUrl;
        let bannerId = banner.id;
        let url = '';
        switch (type) {
            case BannerType.Good.id:
                if (!id) {
                    return false;
                }
                url = '/pages/product/index?id='+id;
                break;
            case BannerType.Image.id:
                url = '/pages/activity/index?id='+bannerId+'&type='+type;
                break;
            case BannerType.Page.id:
                url = '/pages/activity/index?id='+bannerId+'&type='+type;
                break;
            case BannerType.Addition.id:
                url = '/pages/activity/index?id='+bannerId+'&type='+type;
                break;
            case BannerType.Deadline.id:
                url = '/pages/activity/index?id='+bannerId+'&type='+type;
                break;
            case BannerType.Lottery.id:
                url = '/pages/lottery/index?id='+bannerId+'&type='+type;
                break;
        }
        console.log(url);
        if (url) {
            widget.location(url);
        }
    },
    onRoute(res){
        console.log('onRoute', res);
    }
})