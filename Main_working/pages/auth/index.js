const string = require('../../utils/string');
const api = require('../../utils/api');
const http = require('../../utils/http');
const widget = require('../../utils/widget');
const app = getApp();
import {login, shareInfo} from '../../api/account';
import cache from '../../utils/cache';
Page({
    data: {
        callback:'/pages/discover/index',
        loading:false,
        agreement:true,
        wxCode: '',
        avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
    },

    onLoad:function (options) {
        wx.hideHomeButton();
        if (options.callback) {
            this.setData({
                'callback':'/'+decodeURIComponent(options.callback)
            });
        }
    },

    loginCancel: function() {
      // wx.reLaunch({
      //   url: '/pages/home/index',
      // });
      wx.navigateBack();
    },

    getWxUserProfile: function (e) {
      let that = this;
      wx.login({
        success: (res) => {
          if (res.code) {
            that.setData({
              wxCode: res.code
            })
          } else {
            
          }
        }
      })
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          let {wxCode} = that.data;
          let params = {
            code: wxCode,
            signature: res.signature,
            rawData: res.rawData,
            encryptedData: res.encryptedData,
            iv: res.iv
          }
          let page = cache.get(string.SHARE_PAGE);
          let id = cache.get(string.SHARE_USER);
          if (id && page) {
            params.shareId = id;
          }
          login(params)
            .then(function(res) {
              app.cacheUserInfo(res);
              widget.showToast(string.LOGIN_SUCCESS, 'success');
              if (page && id) {
                shareInfo({page: page, id: id})
                  .then(function(res) {
                    cache.remove(string.SHARE_USER);
                    cache.remove(string.SHARE_PAGE);
                    setTimeout(function () {
                      let pages = getCurrentPages();
                      if (pages && pages.length) {
                        wx.navigateBack();
                      } else {
                        widget.switchTab('/pages/home/index');
                      }
                    }, 1000);
                  })
                  .catch(function(res) {
                    widget.showToast((res && res.msg) ? res.msg : string.FAILED);
                  })
              } else {
                setTimeout(function () {
                  let pages = getCurrentPages();
                  if (pages && pages.length) {
                    wx.navigateBack();
                  } else {
                    widget.switchTab('/pages/home/index');
                  }
                }, 1000);
              }
            })
            .catch(function(res) {
              widget.showToast((res && res.msg) ? res.msg : string.FAILED);
            })
        }
      })
    },
    /**
     * 绑定手机号
     * @param code
     */
    bindPhone : function(code) {
        let params = {
            code:code,
            openId:app.getOpenId(),
            unionId:app.getUnionId(),
        };
        http.get(api.LOGIN, params).then(function(res){
            app.cacheUserInfo(res);
            widget.showToast(string.LOGIN_SUCCESS, 'success');
            setTimeout(function () {
                widget.switchTab('/pages/discover/index');
            }, 2000);
        }).catch(function (res) {
            widget.showToast((res && res.msg) ? res.msg : string.FAILED);
        });
    },
});
