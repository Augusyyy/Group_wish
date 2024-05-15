const app = getApp();
const widget = require('../../utils/widget');
import {ppList} from '../../api/member';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      ppList: [],
      selectData: [],
      type: '',
      orderId: '',
      gc: '',
      mr: '',
      ot: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      this.getPpList();
      if (options.ids) {
        let arr = options.ids.split(',');
        let select = [];
        arr.forEach(function(item) {
          select.push(item*1);
        });
        this.setData({
          selectData: select
        });
      }
      if (options.orderId && options.type) {
        this.setData({
          type: options.type,
          orderId: options.orderId
        });
      }
      if (options.gc) {
        this.setData({
          gc: options.gc
        })
      }
      if (options.mr) {
        this.setData({
          mr: options.mr
        })
      }
      if (options.ot) {
        this.setData({
          ot: options.ot
        })
      }
    },

    getPpList() {
      let that = this;
      let params = {page:1, limit: 1000}
      ppList(params)
        .then(function(res){
          res.list.forEach(function(item) {
            item.heroes = item.heroes ? item.heroes.replace(new RegExp(',', 'g'), ' ') : '';
          });
          that.setData({
            ppList: res.list
          });
        })
        .catch(function(res){

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

    ppSelect(e) {
      let that = this;
      let data = e.currentTarget.dataset
      let {selectData} = that.data;
      if (selectData.indexOf(data.idx) > -1) {
        selectData.splice(selectData.indexOf(data.idx), 1);
      } else {
        if (selectData.length >= 4) {
          widget.showToast('最多可添加4个陪玩');
          return false;
        }
        selectData.push(data.idx);
      }
      that.setData({
        selectData: selectData
      });
    },

    ppOrder() {
      let that = this;
      let {selectData, type, orderId, gc, mr, ot} = that.data
      if (selectData.length === 0) {
        widget.showToast('请选择陪玩');
        return false;
      }

      let ids = selectData.toString();
      if (type && orderId) {
        widget.redirectTo('/pages/pDetail/index?ids=' + ids + '&type=' + type + '&id=' + orderId + '&gc=' + gc + '&mr=' + mr + '&ot=' + ot);
      } else {
        widget.redirectTo('/pages/pDetail/index?ids=' + ids + '&gc=' + gc + '&mr=' + mr + '&ot=' + ot);
      }
    }
})