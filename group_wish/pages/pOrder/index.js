const widget = require('../../utils/widget');
const app = getApp();
const enums = require("../../utils/enums");
import {getUserProfile,orderList,ppOrderList} from '../../api/member';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      curTab: 1,
      isPP: false,
      page:1,
      limit: 10,
      sum: 0,
      done: '',
      orderData: [],
      orderStatusMap: enums.orderStatusMap,
      ppOrderStatusMap: enums.ppOrderStatusMap,
      tempId1: 'PpjE-KmPzYeh7yQ10FaJXe9Wfbe5l2R4a6Z-IQZLUl4',
      tempId2: 'q5uzRx7uN2fBU_55oTF2em97iJqQw-OAkQMnDorihD4',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      this.loadUserInfo();
    },

    getOrderList() {
      let that = this;
      let {page, limit, orderData, sum} = that.data;
      let currList = [];
      orderList({
        page: page,
        limit: limit
      })
        .then(function(res) {
          if (res.list) {
            res.list.forEach(function(item) {
              item.pp = item.pp.join('、');
            })
          }

          if (page === 1) {
            currList = res.list;
          } else {
            currList = orderData.concat(res.list);
          }
          let curLe = res.list ? res.list.length : 0;
          sum += curLe;
          page += 1;
          let doneType = sum === res.count ? 'done' : '';
          that.setData({
            done: doneType,
            page: page,
            sum: sum,
            orderData: currList
          });
        })
    },

    getPpOrderList() {
      let that = this;
      let {page, limit, orderData, sum} = that.data;
      let currList = [];
      ppOrderList({
        page: page,
        limit: limit
      })
        .then(function(res) {
          if (page === 1) {
            currList = res.list;
          } else {
            currList = orderData.concat(res.list);
          }
          let curLe = res.list ? res.list.length : 0;
          sum += curLe;
          page += 1;
          let doneType = sum === res.count ? 'done' : '';
          that.setData({
            done: doneType,
            page: page,
            sum: sum,
            orderData: currList
          });
        })
    },

    loadUserInfo(){
      let that = this;
      getUserProfile({}, true)
        .then(function(res) {
          that.setData({
            isPP: res.pp && res.pp.status === 1 ? true : false,
            curTab: res.pp && res.pp.status === 1 ? 2 : 1
          });
          if (res.pp && res.pp.status === 1) {
            that.getPpOrderList();
          } else {
            that.getOrderList();
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
      // this.setData({
      //   page: 1,
      //   sum: 0,
      //   done: ''
      // });
      // this.loadUserInfo();
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

    loadList: function() {
      let {done, curTab} = this.data;
      if (done !== 'done') {
        if (curTab == 1) {
          this.getOrderList();
        } else {
          this.getPpOrderList();
        }
      }
    },

    tabClick(e) {
      let data = e.currentTarget.dataset;
      let {tempId1, tempId2} = this.data;
      this.setData({
        curTab: data.tab,
        page: 1,
        sum: 0,
        orderData: []
      });
      if (data.tab == 1) {
        this.getOrderList();
      } else {
        this.getPpOrderList();
      }

      //订阅消息
      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          console.log(res);
          console.log(res.subscriptionsSetting.itemSettings);
          let setting = res.subscriptionsSetting.itemSettings;
          if (!(setting && setting[tempId1] === 'accept' && setting[tempId2] === 'accept')) {
            wx.requestSubscribeMessage({
              tmplIds: [tempId1, tempId2],
              success: function(res) {
                console.log(res);
              },
              fail: function(res) {
                console.log(res)
              }
            });
          }
        }
      })
    },

    goToDetail(e) {
      let data = e.currentTarget.dataset;
      let {curTab} = this.data;
      if (curTab == 1) {
        widget.location('/pages/pDetail/index?type=order&id=' + data.id);
      } else {
        widget.location('/pages/ppDetail/index?id=' + data.id);
      }
    }
})