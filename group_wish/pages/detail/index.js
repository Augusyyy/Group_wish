const app = getApp();
const widget = require('../../utils/widget');
const util = require('../../utils/util.js');
const {getActivityList, activityJoin, getGroup, getUserProfile} = require("../../api/member");
const cache = require('../../utils/cache.js');
const string = require('../../utils/string.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      activitData: {},
      curId: '',
      cS: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // app.checkAuth();
      let configSwitch = cache.get(string.CONFIG_SWITCH);
      this.setData({
        cS: configSwitch
      });
    },

    loadUserInfo(){
      let that = this;
      getUserProfile({}, true)
        .then(function(res) {
          that.setData({
            curId: res.id
          })
        })
        .catch(function(res) {

        })
      },

    getActivity: function() {
      let that = this;
      let params = util.getCurrentPageQueryOptions();
      getActivityList({
        page:1,
        limit: 999
      })
        .then(function(res) {
          if (res.list && res.list.length > 0) {
            let data = {};
            for(let i in res.list) {
              let item = res.list[i];
              if (item.id === params.id*1) {
                data = item;
                break;
              }
            }
            that.setData({
              activitData:data
            })
          }
        })
        .catch(function(res) {

        })
    },

    activityJoin: function(e) {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let {activitData} = this.data;
      activityJoin({
        id: activitData.id
      })
        .then(function(res) {
          widget.showToast('报名成功', 'success');
          activitData.joinStatus = 1;
          that.setData({
            activitData:activitData
          });
        })
        .catch(function(res) {

        })
    },

    goToGroup: function(e) {
      if (!app.checkAuth()) {
        return false;
      }
      let data = e.currentTarget.dataset;
      getGroup({
        page:1,
        limit: 999,
        activityId: data.id
      }, true)
        .then(function(res) {
          if (!res.list || res.list.length === 0) {
            widget.showToast('尚未分组，请耐心等待');
          } else {
            let my = false;
            for (let i in res.list) {
              let item = res.list[i];
              if (item.myGroup === 1) {
                my = true;
                break;
              }
            }
            if (my) {
              let url = '/pages/activityGroup/index?id=' + data.id;
              widget.location(url);
            } else {
              widget.showToast('很遗憾，本次活动报名失败，期待下次参与');
            }
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
      this.getActivity();
      if (app.isLogin()) {
        this.loadUserInfo();
      }
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

    onShareAppMessage() {
      let {curId} = this.data;
      return {
        path: 'pages/detail/index?page=detail&id='+curId
      }
    }
})