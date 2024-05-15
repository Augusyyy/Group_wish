const app = getApp();
const widget = require('../../utils/widget');
const util = require('../../utils/util.js');
const {getGroup} = require("../../api/member");
const cache = require("../../utils/cache.js");
const string = require("../../utils/string");
Page({

    /**
     * 页面的初始数据
     */
    data: {
      activityData: {},
      groupData: [
        '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'
      ],
      curData: [],
      myGroup: 999,
      curGroup: 0,
      myId: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      let userInfo = cache.get(string.USER_INFO_KEY);
      if (userInfo && userInfo.id) {
        this.setData({
          myId: userInfo.id
        });
      }
      this.getGroupList();
    },

    getGroupList: function() {
      let that = this;
      let params = util.getCurrentPageQueryOptions();
      let {myId} = this.data;
      getGroup({
        page:1,
        limit: 999,
        activityId: params.id
      })
        .then(function(res) {
          that.setData({
            activityData: res.list ? res.list : [],
            curData: res.list ? res.list[0] : []
          });
          if (res.list) {
            for (let i in res.list) {
              for (let m in res.list[i].members) {
                let mem = res.list[i].members[m];
                if (mem.id === myId) {
                  that.setData({
                    curData: res.list[i],
                    myGroup: i*1,
                    curGroup: i*1,
                  });
                  break;
                }
              }
            }
          }
        })
        .catch(function(res) {

        })
    },

    showImg: function(e) {
      let data = e.currentTarget.dataset;
      console.log(data);
      wx.previewImage({
        urls: [data.url],
      })
    },

    tabClick: function(e) {
      let that = this;
      let {activityData} = that.data;
      let data = e.currentTarget.dataset;
      that.setData({
        curGroup: data.idx * 1,
        curData: activityData[data.idx]
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

    }
})