// pages/notice/index.js
const app = getApp();
const widget = require('../../utils/widget');
const {getNoticeList} = require("../../api/member");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      noticeList: []
    },

    getNoticeList: function() {
      let that = this;
      getNoticeList({
        page: 1,
        limit: 1000
      })
        .then(function(res) {
          // let list = [];
          // res.list.forEach(function(item) {
          //   list.push(item.content);
          // })
          that.setData({
            noticeList: res.list
          })
        })
        .catch(function(res) {

        })
    },

    goToDetail: function(e) {
      let data = e.currentTarget.dataset;
      let url = '/pages/noticeDetail/index?id=' + data.id + '&name=' + data.name;
      widget.location(url);
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