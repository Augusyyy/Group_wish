const oss = require("../../utils/oss");
const widget = require('../../utils/widget');
const app = getApp();
import {ppApply, getUserProfile} from '../../api/member';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      tempId: 'czje_Ho4ObGhT4GSNARc5KLNQ-p60suzyyeKZlkVkZw',
      tempId1: 'PpjE-KmPzYeh7yQ10FaJXe9Wfbe5l2R4a6Z-IQZLUl4',
      tempId2: 'q5uzRx7uN2fBU_55oTF2em97iJqQw-OAkQMnDorihD4',
      positions: {
        'topLaneInfo':{
          name: '对抗路',
          key: 'topLaneInfo',
          value: ''
        },
        'botLaneInfo': {
          name: '发育路',
          key: 'botLaneInfo',
          value: ''
        },
        'midLaneInfo': {
          name: '中路',
          key: 'midLaneInfo',
          value: ''
        },
        'jungleInfo': {
          name: '打野',
          key: 'jungleInfo',
          value: ''
        },
        'supportInfo': {
          name: '辅助',
          key: 'supportInfo',
          value: ''
        }
      },
      positionUrls: [],
      heroes: '',
      heroUrls: [],
      peak: '',
      peakUrl: [],
      ppAudit: 99,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      this.loadUserInfo();
    },
    
    loadUserInfo(){
      let that = this;
      let {positions} = that.data;
      getUserProfile({}, true)
        .then(function(res) {
          if (res.pp) {
            for (let i in res.pp) {
              if (positions[i]) {
                positions[i].value = res.pp[i];
              }
            }
            that.setData({
              ppAudit: res.pp.status,
              positions: positions,
              positionUrls: res.pp.rankUrls,
              heroes: res.pp.heroes,
              heroUrls: res.pp.heroUrls,
              peak: res.pp.peak,
              peakUrl: [res.pp.peakUrl],
              price: res.pp.price
            });
          }
        })
        .catch(function(res) {

        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    deleteImg: function(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let {positionUrls, heroUrls, peakUrl} = that.data;
      
      switch(data.field) {
        case 'position':
          positionUrls.splice(data.key, 1);
          that.setData({
            positionUrls: positionUrls
          });
          break;
        case 'hero':
          heroUrls.splice(data.key, 1);
          that.setData({
            heroUrls: heroUrls
          });
          break;
        case 'peak':
          peakUrl.splice(data.key, 1);
          that.setData({
            peakUrl: peakUrl
          });
          break;
        default:
          break;
      }
    },

    chooseImage: function(e) {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let data = e.currentTarget.dataset;
      let field = data.field;
      let {positionUrls, heroUrls, peakUrl,ppAudit} = that.data;
      if (ppAudit === 0 || ppAudit === 1) {
        return false;
      }
      let urlList = [];
      switch (field) {
        case 'position':
          urlList = positionUrls;
          if (urlList.length === 5) {
            widget.showToast('最多上传五张图片');
            return false;
          }
          break;
        case 'hero':
          urlList = heroUrls;
          if (urlList.length === 5) {
            widget.showToast('最多上传五张图片');
            return false;
          }
          break;
        case 'peak':
          urlList = peakUrl;
          if (urlList.length === 1) {
            widget.showToast('最多上传一张图片');
            return false;
          }
          break;
        default:
          break;
      }
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'back',
        success(res) {
          wx.showLoading({
            title: '上传中',
          })
          res.tempFiles.forEach(function(item) {
            oss.uploadFile(item.tempFilePath).then(function (res) {
              urlList.push(res.url);
              switch (field) {
                case 'position':
                  that.setData({
                    positionUrls: urlList
                  });
                  break;
                case 'hero':
                  that.setData({
                    heroUrls: urlList
                  });
                  break;
                case 'peak':
                  that.setData({
                    peakUrl: urlList
                  });
                  break;
                default:
                  break;
              }
              wx.hideLoading();
            }); 
          });
        }
      })
    },

    ppSubmit: function(e) {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let field = e.detail.value;
      if (field) {
        let {positionUrls, heroUrls, peakUrl, tempId, tempId1, tempId2} = that.data;
        if (!field.botLaneInfo && !field.jungleInfo && !field.midLaneInfo && !field.supportInfo && !field.topLaneInfo) {
          widget.showToast('请至少输入一条段位信息');
          return false;
        }
        if (positionUrls.length === 0) {
          widget.showToast('请至少上传一张段位图');
          return false;
        }
        if (!field.heroes) {
          widget.showToast('请输入擅长英雄');
          return false;
        }
        if (heroUrls.length === 0) {
          widget.showToast('请至少上传一张英雄主页图');
          return false;
        }
        if (!field.peak) {
          widget.showToast('请输入巅峰赛最高分');
          return false;
        }
        if (!peakUrl.length === 0) {
          widget.showToast('请上传巅峰赛截图');
          return false;
        }

        let params = field;
        params.heroes = params.heroes.replace(new RegExp('，', 'g'), ',');
        params.positionUrls = positionUrls;
        params.heroUrls = heroUrls;
        params.peakUrl = peakUrl[0];
        console.log(params);
        wx.getSetting({
          withSubscriptions: true,
          success(res) {
            // let setting = res.subscriptionsSetting.itemSettings;
            let showS = true;
            // if (setting && setting[tempId]) {
            //   showS = false;
            // }
            if (showS) {
              wx.requestSubscribeMessage({
                tmplIds: [tempId, tempId1, tempId2],
                success: function(res) {
                  that.forPPApply(params);
                },
                fail: function(res) {
                  console.log(res)
                }
              })
            } else {
              that.forPPApply(params);
            }
          }
        })
      }
    },

    forPPApply: function(params) {
      let that = this;
      ppApply(params).then(function(res) {
        widget.showToast('提交成功，请等待审核');
        that.loadUserInfo();
      }).catch(function(res){
        let msg = res.msg ? res.msg : '操作失败';
        widget.showToast(msg);
      })
    },
})