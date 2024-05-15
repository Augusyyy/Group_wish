const app = getApp();
const widget = require('../../utils/widget');
const util = require('../../utils/util.js');
const {getNoticeList, getUserProfile} = require("../../api/member");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      activitData: {},
      curId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // app.checkAuth();
      this.getActivity();
      if (app.isLogin()) {
        this.loadUserInfo(); 
      }
    },

    loadUserInfo(){
      let that = this;
      getUserProfile({}, true)
        .then(function(res) {
          that.setData({
            curId: res.id
          });
        })
        .catch(function(res) {

        })
    },

    getActivity: function() {
      let that = this;
      let params = util.getCurrentPageQueryOptions();
      getNoticeList({
        page:1,
        limit: 999
      })
        .then(function(res) {
          let data = res.list && res.list[0] ? res.list[0] : [];
          that.setData({
            activitData:data
          })
          // if (res.list && res.list.length > 0) {
          //   let data = {};
          //   for(let i in res.list) {
          //     let item = res.list[i];
          //     if (item.id === params.id*1) {
          //       data = item;
          //       break;
          //     }
          //   }
            
          // }
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

    onShareAppMessage() {
      let {curId} = this.data;
      return {
        path: 'pages/apply/index?page=notice_detail&id='+curId
      }
    }
})