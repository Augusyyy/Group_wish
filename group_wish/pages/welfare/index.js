const app = getApp();
const widget = require('../../utils/widget');
const {getWeList, getUserProfile} = require("../../api/member");
// const bgmManager = wx.getBackgroundAudioManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      topList: [],
      page:1,
      limit: 10,
      done: '',
      // innerAudioContext: '',
      imgShow: false,
      curImg: '',
      userInfo: '',
      letterType: 0,
      letter1: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20231219/224533.gif',
      letter2: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20231219/224941.gif',
      curL1: '',
      curL2: '',
      letterClass: {
        1: 'letter-open',
        2: 'letter-hide'
      },
      letterBtnClass: {
        1: 'btn-open',
        2: 'btn-hide'
      },
      textClass: {
        1: 'text-open',
        2: 'text-hide'
      },
      textType: 0,
      hideType: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
      // app.checkAuth();
      this.getTopList();
      this.letter();
      // this.setData({
      //   innerAudioContext: wx.createInnerAudioContext()
      // });
      // let {innerAudioContext} = this.data;
      innerAudioContext.src = 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20231213/150048.mp3';
      innerAudioContext.play();
      innerAudioContext.onEnded(function() {
        innerAudioContext.play();
      });
      // innerAudioContext.onPause(function() {
      //   wx.showToast({
      //     title: '暂停了',
      //   })
      // })
      wx.onAudioInterruptionBegin((res) => {
        innerAudioContext.play();
      });
      wx.onAudioInterruptionEnd((res) => {
        innerAudioContext.play();
      });
      // bgmManager.title = '背景音乐';
      // bgmManager.duration = 0;
      // bgmManager.src = 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20231213/150048.mp3';
    },

    letter: function() {
      let that = this;
      let {letterType, letter1, letter2} = this.data;
      switch (letterType) {
        case 0:
          setTimeout(function() {
            that.setData({
              letterType: 1,
              curL1: letter1 + '?' + new Date().getTime(),
              hideType: false
            });
            setTimeout(function() {
              that.setData({
                textType: 1,
              });
            }, 2000)
          }, 500);
          break;
        case 1:
          that.setData({
            textType: 2,
          })
          setTimeout(function() {
            that.setData({
              letterType: 2,
              curL2: letter2 + '?' + new Date().getTime(),
              hideType: true
            });
          }, 800);
          setTimeout(function() {
            that.setData({
              hideType: true
            });
          }, 1500);
          break;
        case 2:
          that.setData({
            letterType: 1,
            curL1: letter1 + '?' + new Date().getTime(),
            hideType: false
          });
          setTimeout(function() {
            that.setData({
              textType: 1,
            })
          }, 2500)
          break;
      }
    },

    getTopList: function() {
      let that = this;
      let {page, limit, topList} = that.data;
      let params = {
        page: page,
        limit: limit
      }
      let currList = [];
      getWeList(params)
        .then(function(res) {
          if (page === 1) {
            currList = res.list;
          } else {
            currList = topList.concat(res.list);
          }
          page += 1;
          let doneType = res.list && res.list.length === limit ? '' : 'done';
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

    imgView: function(e) {
      let data = e.currentTarget.dataset;
      let {letterType} = this.data;
      if (letterType === 2) {
        // wx.previewImage({
        //   urls: data.url,
        // })
        this.setData({
          imgShow: true,
          curImg: data.url
        });
      }
    },

    imgClose: function() {
      this.setData({
        imgShow: false,
        curImg: ''
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
      // this.getUserInfo();
    },

    getUserInfo: function() {
      let that = this;
      getUserProfile()
        .then(function(res) {
          that.setData({
            userInfo: res
          });
        })
        .catch()
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
      if (innerAudioContext) {
        innerAudioContext.stop();
      }
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