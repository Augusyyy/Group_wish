const {getMyReward} = require("../../api/member");
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      myTotal: 0,
      rewardList:[],
      page: 1,
      limit: 10,
      total: 0,
      load: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      this.loadReward();
    },

    loadReward: function() {
      let that = this;
      let {rewardList, page, limit, load} = that.data;
      if (load !== 'done') {
        getMyReward({page: page, limit: limit, type: 1}, false)
        .then(function(res) {
          page += 1;
          if (res.list.length > 0) {
            let array = rewardList.concat(res.list);
            let doneType = res.list.length === limit ? '' : 'done';
            that.setData({
              page: page,
              total: res.count,
              myTotal: res.residue ? res.residue : 0,
              rewardList: array,
              load: doneType
            })
          } else {
            that.setData({
              load: 'done',
              myTotal: res.residue ? res.residue : 0,
            })
          }
        })
        .catch(function(res) {

        })
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
      this.loadReward();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
})