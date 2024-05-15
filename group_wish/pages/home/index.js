const {getUserProfile, bannerList, homeList, getTeamUrl, getOnceReward, getConfig} = require("../../api/member");
const widget = require("../../utils/widget");
const cache = require('../../utils/cache.js');
const string = require('../../utils/string.js');
const app = getApp();
Page({
    data: {
        version: 1,
        loading: true,

        // activityMap: {
        //   'ksub': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231217_17511462.png',
        //   'compose': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14495313.png',
        //   'draw': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14494357.png',
        //   'kk': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_16244788.png',
        //   'activity': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14503127.png',
        //   'welfare': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14512439.png',
        //   'fight': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14510147.png',
        //   'coin': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14511244.png',
        //   'poster': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14501767.png',
        //   'notice': 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14500692.png',
        // },
        activityMap: [],

        banners: {}, // 轮播图列表

        userInfo: {},
        // unTeamPage: ['kk', 'fight', 'coin'],
        unTeamPage: [],
        signTop: 0,
        signLeft: 0,
        teamTop: 0,
        teamLeft: 0,
        onceTop: 0,
        onceLeft: 0,
        appData: [],
        teamUrl: '',
        weShow: false,
        userOnce: null,
        userTeam: false,
        homeReward: false,
        homeSign: false,
        guideShow: false,
        guideIdx: 0,
        guideMap: [
          {
            id: 'draw',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20240110/150721.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'compose',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20240110/154947.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'activity',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14503127.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'pp',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20240102/143039.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'active',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20240110/171143.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'kk',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_16244788.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'welfare',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_14512439.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'reward',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20240110/171457.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
          {
            id: 'sign',
            image: 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/zz/20240110/162859.png',
            top: 0,
            left: 0,
            width: 0,
            height: 0
          },
        ],
    },
    onLoad: function () {
      // app.checkAuth();
      // this.loadUserInfo();
      wx.showTabBar();
      wx.hideShareMenu({
        menus: ['shareAppMessage']
      });
      let ug = cache.get(string.USER_GUIDE);
      if (!ug) {
        this.setGuide(); 
      }
    },

    setGuide() {
      let that = this;
      setTimeout(function() {
        let query = wx.createSelectorQuery();
        let {guideMap} = that.data;
        for (let i in guideMap) {
          if (guideMap[i].top === 0) {
            query.select('#' + guideMap[i].id).boundingClientRect(function(rect) {
              guideMap[i].top = rect.top.toFixed(2)*1;
              guideMap[i].left = rect.left.toFixed(2)*1;
              guideMap[i].width = rect.width.toFixed(2)*1;
              guideMap[i].height = rect.height.toFixed(2)*1;
            }).exec();
          }
        }
        setTimeout(function() {
          that.setData({
            guideShow: true,
            guideIdx: 0,
            guideMap: guideMap
          });
          wx.hideTabBar();
        }, 100)
      }, 900);
    },

    getHomeConfig() {
      let that = this;
      let {version} = that.data;
      getConfig({version: version})
        .then(function(res) {
          cache.set(string.CONFIG_SWITCH, res.switch);
          that.setData({
            homeReward: res.reward ? true : false,
            homeSign: res.sign ? true : false
          })
        })
    },

    onShow:function () {
      // let ug = cache.get(string.USER_GUIDE);
      // if (!ug) {
      //   this.setGuide(); 
      // }
      // app.checkAuth();
        this.getBannerList();
        this.getHomeList();
        this.getTeamCode();
        this.getHomeConfig();
        this.setData({
          userTeam: false,
          userOnce: {
            status: 0,
            min: 1,
            max: 2
          }
        });
      if (app.isLogin()) {
        this.loadUserInfo();
      }

      // let ug = cache.get(string.USER_GUIDE);
      // if (!ug) {
      //   this.setGuide(); 
      // }

      let appData = app.globalData;
      let sH = appData.system.windowHeight - 54;
      let sW = appData.system.windowWidth;
      this.setData({
        signTop: sH - 100,
        signLeft: sW - 100,
        teamTop: sH - 80,
        teamLeft: 0,
        onceTop: sH - 190,
        onceLeft: sW - 80
      });
    },

    getTeamCode() {
      let that = this;
      getTeamUrl()
        .then(function(res) {
          that.setData({
            teamUrl: res.url ? res.url : ''
          });
        })
    },

    getHomeList: function() {
      let that = this;
      let {version} = that.data;
      homeList({version: version}, true)
        .then(function(res) {
          that.setData({
            activityMap: res.list
          })
        })
        .catch(function() {

        })
    },

    getBannerList: function() {
      let that = this;
      bannerList({page: 1, limit: 999})
        .then(function(res) {
          that.setData({
            banners: res.list
          })
        })
        .catch({

        })
    },

    goToBanner: function(e) {
      let data = e.currentTarget.dataset;
      if (data.id && data.jump) {
        widget.location('/pages/banner/index?bid=' + data.id);
      }
    },

    goToPage: function(e) {
      let data = e.currentTarget.dataset;
      let {userInfo, unTeamPage} = this.data;
      if (!userInfo.team && unTeamPage.indexOf(data.page) > -1) {
        widget.showToast('您不是战队成员，无法使用此功能');
        return false;
      } else {
        widget.location('/pages/'+data.page+'/index');
      }
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh () {
        
    },

    loadUserInfo(){
      let that = this;
      getUserProfile({}, true)
        .then(function(res) {
          that.setData({
            userInfo: res,
            userOnce: res.once,
            userTeam: res.team ? true : false
          });
            // if (!res.team) {
            //   if (!activityMap.apply) {
            //     activityMap.apply = 'https://zld-meidas.oss-cn-hangzhou.aliyuncs.com/upload/medias/202312/20231215_1451596.png';
            //     that.setData({
            //       activityMap: activityMap
            //     })
            //   }
            // }
        })
        .catch(function(res) {

        })
  },
    /**
     * 监听右上角菜单“分享到朋友圈”按钮的行为，并自定义分享内容。
     * 注意：只有定义了此事件处理函数，右上角菜单才会显示“分享到朋友圈”按钮
     * @returns {{path: string, promise: *, title: string}}
     */
    onShareTimeline(){
        // return {
        //     title: '少女的心愿',
        //     query: '',//自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分
        //     imageUrl:'/images/logos.png'//自定义图片路径，可以是本地文件或者网络图片。支持 PNG 及 JPG，显示图片长宽比是 1:1。	默认使用小程序 Logo

        // }
    },

    touchMove(e) {
      let touches = e.touches[0];
      let id = e.currentTarget.id;
      let x = touches.clientX;
      let y = touches.clientY;
      let appData = app.globalData;
      let sH = appData.system.windowHeight;
      let sW = appData.system.windowWidth;
      let maxLeft = sW - 100;
      let maxTop = sH - 100;
      let tMaxLeft = sW - 80;
      let tMaxTop = sH - 70;
      let oMaxLeft = sW - 80;
      let oMaxTop = sH - 80;
      if (id === 'home_sign') {
        if (x < 0) {
          x = 0;
        } else if (x > maxLeft) {
          x = maxLeft
        }
        if (y < 0) {
          y = 0;
        } else if (y > maxTop) {
          y = maxTop
        }
        this.setData({
          signTop: y,
          signLeft: x
        });
      } else if (id === 'home_team') {
        if (x < 0) {
          x = 0;
        } else if (x > tMaxLeft) {
          x = tMaxLeft
        }
        if (y < 0) {
          y = 0;
        } else if (y > tMaxTop) {
          y = tMaxTop
        }
        this.setData({
          teamTop: y,
          teamLeft: x
        });
      } else if (id === 'home_once') {
        if (x < 0) {
          x = 0;
        } else if (x > oMaxLeft) {
          x = oMaxLeft
        }
        if (y < 0) {
          y = 0;
        } else if (y > oMaxTop) {
          y = oMaxTop
        }
        this.setData({
          onceTop: y,
          onceLeft: x
        });
      }
    },

    imgView() {
      let {teamUrl} = this.data;
      if (teamUrl) {
        wx.previewImage({
          urls: [teamUrl],
        });
      } else {

      }
    },

    homeOnce() {
      this.setData({
        weShow: true
      })
    },

    weClose() {
      this.setData({
        weShow: false
      })
    },

    onceReward() {
      if (!app.checkAuth()) {
        this.setData({
          weShow: false
        })
        return false;
      }
      let {userInfo} = this.data;
      let that = this;
      // if (!userInfo.team) {
      //   widget.showToast('进战队后可领取奖励');
      //   return false;
      // }
      getOnceReward()
        .then(function(res) {
          that.loadUserInfo();
        })
    },

    onShareAppMessage() {
      let {userInfo} = this.data;
      return {
        path: 'pages/home/index?page=home_reward&id='+userInfo.id
      }
    },

    guideClose() {
      let {guideIdx, guideMap} = this.data;
      if (guideIdx === guideMap.length - 1) {
        this.setData({
          guideShow: false
        });
        wx.showTabBar();
        cache.set(string.USER_GUIDE, 'ojbk');
      } else {
        this.setData({
          guideIdx: guideIdx += 1
        });
      }
    }
})