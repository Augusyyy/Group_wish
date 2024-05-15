// pages/notice/index.js
const app = getApp();
const {getPosterList} = require("../../api/member");
const widget = require("../../utils/widget");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      noticeList: []
    },

    shareImg: function() {
      let that = this;
      let {noticeList} = that.data;
      let url = noticeList ? noticeList[0] : '';
      if (url) {
        widget.showLoading();
        wx.downloadFile({
          url: url,
          success: (res) => {
            widget.hideLoading();
            wx.showShareImageMenu({
              path: res.tempFilePath,
            })
          },
          fail: () => {
            widget.hideLoading();
          }
        })
      }
    },

    getNoticeList: function() {
      let that = this;
      getPosterList({
        page: 1,
        limit: 1000
      })
        .then(function(res) {
          let list = [];
          res.list.forEach(function(item) {
            list.push(item.content);
          })
          that.setData({
            noticeList: list
          })
        })
        .catch(function(res) {

        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // app.checkAuth();
      this.getNoticeList();
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

    }
})