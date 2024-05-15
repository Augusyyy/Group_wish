const app = getApp();
const widget = require('../../utils/widget');
const {getActivityList, activityJoin} = require("../../api/member");

Page({
    data: {
        activityList: []
    },

    getActivityList: function() {
      let that = this;
      getActivityList({
        page:1,
        limit: 1000
      })
        .then(function(res) {
          that.setData({
            activityList: res.list
          })
        })
        .catch(function(res) {

        })
    },

    goToDetail: function(e) {
      let data = e.currentTarget.dataset;
      let url = '/pages/detail/index?id=' + data.id + '&name=' + data.name;
      widget.location(url);
    },

    onLoad: function (options) {
        // app.checkAuth();
        this.getActivityList();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    onHide:function () {
        
    },
    onUnload:function () {
        
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh () {
      this.getActivityList();
    },

    activityJoin: function(e) {
      let that = this;
      let {info} = e.currentTarget.dataset;
      let {activityList} = this.data;
      activityJoin({
        id: info.id
      })
        .then(function(res) {
          widget.showToast('报名成功', 'success');
          activityList.forEach(function(item) {
            if (item.id === info.id) {
              item.status = 1
            }
          });
          that.setData({
            activityList:activityList
          });
        })
        .catch(function(res) {

        })
    }
})
