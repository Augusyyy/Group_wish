const app = getApp();
const widget = require('../../utils/widget');
const {getTopList} = require("../../api/member");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      top1: {},
      top2: {},
      top3: {},
      topList: [],
      page:1,
      limit: 10,
      done: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // app.checkAuth();
      this.getTopList();
    },

    getTopList: function() {
      let that = this;
      let {page, limit, topList} = that.data;
      let params = {
        page: page,
        limit: limit
      }
      getTopList(params)
        .then(function(res) {
          let top1 = '';
          let top2 = '';
          let top3 = '';
          let currList = [];
          if (page === 1) {
            for (let i in res.list) {
              let item = res.list[i];
              switch(i) {
                case '0':
                  top1 = item;
                  break;
                case '1':
                  top2 = item;
                  break;
                case '2':
                  top3 = item;
                  break;
                default:
                  currList.push(item);
                  break;
              }
            }
            that.setData({
              top1: top1,
              top2: top2,
              top3: top3
            })
          } else {
            currList = topList.concat(res.list);
          }
          page += 1;
          let doneType = res.list.length === limit ? '' : 'done';
          that.setData({
            topList: currList,
            done: doneType,
            page: page
          });
        })
        .catch()
    },

    loadList: function() {
      let {done} = this.data;
      if (done !== 'done') {
        this.getTopList();
      }
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