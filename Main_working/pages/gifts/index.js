const {getGifts, giftExchange} = require("../../api/member");
const enums = require("../../utils/enums");
const LotteryLevelMap = enums.LotteryLevelMap;
const GiftStatus = enums.GiftStatus;
const GiftExchange = enums.GiftExchange;
const widget = require('../../utils/widget');
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      giftsMap: {},
      levelMap: LotteryLevelMap,
      giftStatusMap: GiftStatus,
      GiftExchange: GiftExchange
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      this.loadGift();
    },

    loadGift: function() {
      let that = this;
      getGifts({page: 1, limit: 999}, true)
        .then(function(res) {
          that.setData({
            giftsMap: res.list
          })
        })
        .catch(function(res) {

        })
    },

    exchange: function(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let {GiftExchange} = that.data;
      let price = GiftExchange[data.level];
      widget.confirm(
        '确认提示',
        '本次兑换' + price + '心愿币，将自动加入账户中',
        function() {
          giftExchange({id: data.id})
            .then(function(res) {
              widget.showToast('兑换成功');
              that.loadGift();
            })
            .catch(function(res) {
              let msg = res.msg ? res.msg : '操作失败';
              widget.showToast(msg);
            })
        }
      );
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
      // app.checkAuth();
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
      this.loadGift();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
})