// pages/banner/index.js
const {bannerList, getUserProfile} = require("../../api/member");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      curId: '',
      detailContent: '',
      userId: '',
      headerUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (options.page && options.id && options.url) {
        this.setData({
          detailContent: '<img mode="widthFit" style="width: 100vw" src="'+options.url+'"></img>'
        })
      }
      // app.checkAuth();
        this.setData({
          curId: options.bid
        });
        this.getBannerList();
        if (app.isLogin()) {
          this.loadUserInfo(); 
        }
    },

    loadUserInfo(){
      let that = this;
      getUserProfile({}, true)
        .then(function(res) {
          that.setData({
            userId: res.id
          });
        })
        .catch(function(res) {

        })
  },

    getBannerList: function() {
      let that = this;
      let {curId} = that.data;
      bannerList({page: 1, limit: 999})
        .then(function(res) {
          for (let i in res.list) {
            let item = res.list[i];
            if (item.id == curId) {
              that.setData({
                detailContent: item.content,
                headerUrl: item.header
              });
              break;
            }
          }
        })
        .catch({

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
      let {curId, userId} = this.data;
      return {
        path: 'pages/banner/index?page=banner&id='+userId+'&bid='+curId
      }
    },

    onShareTimeline() {
      let {curId, userId, headerUrl} = this.data;
      return {
        query: 'page=banner&id='+userId+'&bid='+curId+'&url='+headerUrl,
        imageUrl: headerUrl
      }
    }
})