const app = getApp();
const widget = require('../../utils/widget');
const {getSongList} = require("../../api/member");
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true
});

Page({
    data: {
      singList: [],
      page:1,
      limit: 10,
      sum: 0,
      done: '',
      curIdx: '',
      kShow: false,
      curTab: 1,
      myId: '',
    },

    onLoad: function (options) {
      // app.checkAuth();
      let that = this;
      if (app.isLogin()) {
        this.singList();
        let userInfo = app.getUserInfo();
        that.setData({
          myId: userInfo.id
        });
      }

      innerAudioContext.onCanplay(function() {
        // let {singList} = that.data;
        console.log('can play')
        let {singList, curIdx} = that.data;
        singList[curIdx].play = 'start';
        that.setData({
          singList: singList
        })
      });
      innerAudioContext.onPlay(function() {
        console.log('start');
      });
      innerAudioContext.onStop(function() {
        console.log('on stop');
      });
      innerAudioContext.onEnded(function() {
        console.log('停止');
        let {singList, curIdx} = that.data;
        singList[curIdx].play = 'none';
        that.setData({
          singList: singList
        })
      });
      innerAudioContext.onPause(function() {
        console.log('onPause');
      });
  },

    singList: function() {
      let that = this;
      let {page, limit, singList, sum, curTab} = that.data;
      let currList = [];
      getSongList({
        page:page,
        limit: limit,
        type: curTab
      })
        .then(function(res) {
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
            sum: sum
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

    playAudio: function(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let {singList} = this.data;

      singList.forEach(function(item) {
        item.play = 'none';
      });
      if (innerAudioContext.src && innerAudioContext.src === data.url) {
        if (innerAudioContext.paused) {
          innerAudioContext.play();
          singList[data.idx].play = 'start';
        } else {
          innerAudioContext.pause();
          singList[data.idx].play = 'pause';
        }
        // singList[data.idx].play = 'pause';
      } else {
        innerAudioContext.src = data.url;
        innerAudioContext.play();
        singList[data.idx].play = 'loading';
      }
      this.setData({
        singList: singList,
        curIdx: data.idx
      });

      return false;
      innerAudioContext.onStop(function() {
        console.log('on stop', data.idx);
      });
      innerAudioContext.onEnded(function() {
        console.log('停止');

        // singList[data.idx].play = 'none';
        // that.setData({
        //   singList: singList
        // });
      });
      return false;

      innerAudioContext.onPause(function() {
        console.log('on pause', data.idx);
      });

      innerAudioContext.onPlay(function() {
        console.log('on play')
      });

      innerAudioContext.onCanplay(function() {
        console.log(data.idx);
        let {singList} = that.data;
        singList[data.idx].play = 'pause';
        that.setData({
          singList: singList
        });
      });

      innerAudioContext.onEnded(function() {
        console.log('停止');
        singList[data.idx].play = 'none';
        that.setData({
          singList: singList
        });
      });

      innerAudioContext.onError(function() {
        console.log('错误');
      });
    },

    gotoRecorder: function() {
      // let url = '/pages/recorder/index';
      // widget.location(url);
      if (!app.checkAuth()) {
        return false;
      }
      this.setData({
        kShow: true
      })
    },

    closeEvent: function() {
      this.setData({
        page: 1,
        sum: 0,
      });
      this.singList();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      if (app.isLogin()) {
        this.setData({
          page: 1,
          sum: 0,
          // innerAudioContext: wx.createInnerAudioContext({
          //   useWebAudioImplement: true
          // })
        });
        this.singList();
      }
    },

    onHide:function () {
        
    },
    onUnload:function () {
      if (innerAudioContext) {
        innerAudioContext.stop();
        innerAudioContext.offCanplay();
        innerAudioContext.offEnded();
        innerAudioContext.offStop();
      }
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh () {
      this.singList();
    },

    tabClick(e) {
      let data = e.currentTarget.dataset;
      this.setData({
        curTab: data.tab,
        page: 1,
        sum: 0,
        singList: []
      });
      if (app.isLogin()) {
        this.singList();
      }
    },
})
