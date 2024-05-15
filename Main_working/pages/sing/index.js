const app = getApp();
const widget = require('../../utils/widget');
const {getSingList, getUserProfile} = require("../../api/member");

Page({
    data: {
      singList: [],
      page:1,
      limit: 10,
      sum: 0,
      done: '',
      myId: '',
      myName: '',
      curTime: '',
    },

    singList: function() {
      let that = this;
      let {page, limit, singList, myId, sum} = that.data;
      let currList = [];
      getSingList({
        page:page,
        limit: limit
      })
        .then(function(res) {
          res.list.forEach(function(item) {
            if (item.part) {
              let part = [];
              let ids = [];
              item.part.forEach(function(p) {
                part.push(p.name);
                ids.push(p.id);
              });
              item.partString = part.join('，');
              item.partIds = ids;
              if (ids.indexOf(myId) > -1) {
                item.isMe = true;
              }
            } else {
              item.isMe = true;
            }
          });
          console.log(res.list);
          if (page === 1) {
            currList = res.list;
          } else {
            currList = singList.concat(res.list);
          }
          let curLe = res.list ? res.list.length : 0;
          sum += curLe;
          page += 1;
          let doneType = sum === res.count ? 'done' : '';
          that.setData({
            singList: currList,
            done: doneType,
            page: page,
            sum: sum,
            curTime: new Date().getTime()
          });
        })
        .catch(function(res) {
          console.log(res)
        })
    },

    loadList: function() {
      let {done} = this.data;
      if (done !== 'done') {
        this.singList();
      }
    },

    publishSing: function() {
      if (!app.checkAuth()) {
        return false;
      }
      let url = '/pages/publish/index';
      widget.location(url);
    },

    onLoad: function (options) {
        // app.checkAuth();
        // this.getProfile();
        // this.singList();
    },

    getProfile: function() {
      let that = this;
      getUserProfile()
        .then(function(res) {
          that.setData({
            myId: res.id,
            myName: res.name
          });
          that.singList();
        })
        .catch()
    },

    goToRecorder: function(e) {
      let data = e.currentTarget.dataset;
      let url = '/pages/recorder/index?id=' + data.id + '&name=' + data.name;
      widget.location(url);
    },

    goToDetail: function(e) {
      let data = e.currentTarget.dataset;
      let url = '/pages/singDetail/index?id=' + data.id + '&name=' + data.name + '&member=' + data.member + '&part=' + data.part + '&time=' + data.time;
      widget.location(url);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.setData({
        page: 1,
        sum: 0
      });
      if (app.isLogin()) {
        this.getProfile();
      }
    },

    onHide:function () {
        
    },
    onUnload:function () {
        
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh () {
      this.singList();
    }
})
