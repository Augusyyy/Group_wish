const widget = require('../../utils/widget');
const app = getApp();
const enums = require("../../utils/enums");
import {ppOrderInfo,ppSetConfirm,ppSetDone} from '../../api/member';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      title: '',
      ppOrderStatusMap: enums.ppOrderStatusMap,
      rank: '',
      time: '',
      price: '',
      status: '',
      curStatus: '',
      orderId: '',
      weShow: false,
      confirmStr: '',
      popStatus: 1,
      updateStatus: '',
      games: '',
      inputVal: '',
      parentStatus: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.getOrderInfo(options.id)
    },

    getOrderInfo(id) {
      let that = this;
      ppOrderInfo({id: id})
        .then(function(res) {
          that.setData({
            title: enums.ppOrderStatusMap[res.status].title,
            rank: res.member.name + ' | ' + res.rank,
            time: res.time,
            price: res.price,
            status: enums.ppOrderStatusMap[res.status].name,
            curStatus: res.status,
            parentStatus: res.parentStatus ? res.parentStatus : 99,
            orderId: res.id,
            games: res.totalGameCount ? res.totalGameCount : 0
          })
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

    ppConfirm(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let str = data.status == -1 ? '拒绝订单' : '接单';
      that.setData({
        confirmStr: str,
        popStatus: 1,
        updateStatus: data.status,
        weShow: true
      });
    },

    ppDone(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let str = data.status == -2 ? '是否确认放鸽子，确认后将扣除2心愿币' : '陪玩订单';
      that.setData({
        confirmStr: str,
        popStatus: 2,
        updateStatus: data.status,
        weShow: true,
        inputVal: ''
      });
    },

    inputChange: function(e) {
      this.setData({
        inputVal: e.detail.value*1
      })
    },

    weClose() {
      this.setData({
        weShow: false
      })
    },

    reSubmit() {
      let that = this;
      let {popStatus, updateStatus,orderId,inputVal,games} = that.data;

      if (popStatus === 2) {
        let params = {id: orderId, status: updateStatus};
        if (updateStatus == 2) {
          if (!inputVal) {
            widget.showToast('请输入完成局数');
            return false;
          }
          if (inputVal > games) {
            widget.showToast('完成局数超过了订单局数');
            return false;
          }
          params.games = inputVal;
        }
        ppSetDone(params)
          .then(function(res) {
            widget.showToast('操作成功');
            that.getOrderInfo(orderId);
          })
      } else {
        let params = {id: orderId, status: updateStatus}
        ppSetConfirm(params)
          .then(function(res) {
            widget.showToast('操作成功');
            that.getOrderInfo(orderId);
          })
      }
      that.weClose();
    }
})