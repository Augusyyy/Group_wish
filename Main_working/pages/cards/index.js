// pages/cards/index.js
const widget = require('../../utils/widget');
//获取应用实例
const app = getApp();
import {getMyCards} from '../../api/member';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (!app.checkAuth()) {
          return false;
        }
        this.loadCard();
    },

    loadCard: function() {
      let that = this;
      getMyCards({
        page: 1,
        limit: 9999
      }, true).then(function(res) {
        let coupons = [];
        if (res.list) {
          res.list.forEach(function(item) {
            let value = item.coupon;
            value.coupon_status = item.status;
            coupons.push(value);
          })
        }
        that.setData({
          coupons: coupons
        })
      }).catch(function () {
        widget.stopPullDownRefresh();
      });
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

    },

    toDetail: function() {
      widget.location('/pages/compose/index');
    }
})