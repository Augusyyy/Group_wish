// pages/cards/index.js
const widget = require('../../utils/widget');
//获取应用实例
const app = getApp();
import {getUserProfile, activeApply} from '../../api/member';
const oss = require("../../utils/oss");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        urlList: [],
        auditData: '',
        tempId: 'czje_Ho4ObGhT4GSNARc5KLNQ-p60suzyyeKZlkVkZw',
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
      getUserProfile({}, true)
        .then(function(res) {
          if (res.active && res.active.status !== 1) {
            that.setData({
              urlList: res.active.urls,
              auditData: res.active
            })
          }
        })
        .catch(function(res) {

        })
  },

    chooseImg: function() {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let {urlList, auditData} = that.data
      if (auditData && auditData.status !== 2) {
        return false;
      }
      if (urlList.length === 5) {
        widget.showToast('最多上传五张图片');
        return false;
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
              console.log(res);
              urlList.push(res.url);
              that.setData({
                urlList: urlList
              });
              wx.hideLoading();
            }); 
          });
        }
      })
    },

    deleteImg: function(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let {urlList} = that.data;
      urlList.splice(data.key, 1);
      that.setData({
        urlList: urlList
      })
    },


    teamApply: function() {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let {tempId} = that.data;

      let {urlList} = that.data;
      if (urlList.length <= 0) {
        widget.showToast('请上传活跃截图');
			  return false;
      }

      let params = {
        urls: urlList
      }

      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          let setting = res.subscriptionsSetting.itemSettings;
          let showS = true;
          // if (setting && setting[tempId]) {
          //   showS = false;
          // }
          if (showS) {
            wx.requestSubscribeMessage({
              tmplIds: [tempId],
              success: function(res) {
                that.forTeamApply(params);
              },
              fail: function(res) {
                console.log(res)
              }
            })
          } else {
            that.forTeamApply(params);
          }
        }
      })
    },

    forTeamApply: function(params) {
      let that = this;
      activeApply(params).then(function(res) {
        widget.showToast('提交成功，请等待审核');
        that.loadUserInfo();
      }).catch(function(res){
        let msg = res.msg ? res.msg : '操作失败';
        widget.showToast(msg);
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
      this.loadCard();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
})