const {getAllPrizes} = require("../../api/member");
const enums = require("../../utils/enums");
const LotteryLevelMap = enums.LotteryLevelMap;
const GiftStatus = enums.GiftStatus;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      giftsMap: {},
      levelMap: LotteryLevelMap,
      giftStatusMap: GiftStatus
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      app.checkAuth();
      // this.loadGift();
    },

    loadGift: function() {
      let that = this;
      getAllPrizes({}, true)
        .then(function(res) {
          console.log(res)
          that.setData({
            giftsMap: res.list
          })
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
      // this.loadGift();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
})