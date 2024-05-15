// pages/cards/index.js
const widget = require('../../utils/widget');
//获取应用实例
const app = getApp();
import {getUserProfile, signIn, getMyReward, magicStart, magicIn} from '../../api/member';
const oss = require("../../utils/oss");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        signDay: 0,
        curDay: 0,
        residue: 0,
        dayList: [],
        resShow: false,
        resMsg: null,
        resPrice: null,
        resType: '',
        dayDetail: [],
        curTab: 1,
        magic: {},
        signTotal: 0,
        signPTotal: 0,
        mW: 0,
        curMDay: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // app.checkAuth();
        let width = app.globalData.system.screenWidth;
        let boxW = ((width - 120) / 7).toFixed(0);
        this.setData({
          mW: boxW
        });
    },

    loadReward: function() {
      let that = this;
      getMyReward({page: 1, limit: 5}, false)
        .then(function(res) {
          that.setData({
            residue: res.residue
          });
        })
        .catch(function(res) {

        })
    },

    magicPass () {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      widget.confirm(
        '提示',
        '是否确认开通魔法签到',
        function() {
          magicStart()
            .then(function(res) {
              widget.showToast('开通成功');
              that.loadUserInfo();
            })
        }
      )
    },

    signIn: function(e) {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let {curTab} = that.data;
      if (curTab === 1) {
        signIn()
        .then(function(res) {
          if (res.message) {
            that.setData({
              resMsg: res.message
            });
          }
          if (res.price) {
            let type = '';
            if (res.type && res.type === 1) {
              type = '心愿币';
            } else if (res.type && res.type === 2) {
              type = '陪玩币';
            }
            that.setData({
              resPrice: res.price,
              resType: type
            });
          }
          that.setData({
            resShow: true
          });
        })
        .catch();
      } else {
        let {curMDay} = that.data;
        that.getMagicIn(curMDay);
      }
    },

    magicBc(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      console.log(data);
      if (data.day === 0 && data.status === 0) {
        widget.confirm(
          '提示',
          '是否确认补签',
          function() {
            that.getMagicIn(data.id);
          }
        )
      }
    },

    getMagicIn(id) {
      let that = this;
      let params = id ? {id: id} : {}
      magicIn(params)
      .then(function(res) {
        if (res.message) {
          that.setData({
            resMsg: res.message
          });
        }
        if (res.price) {
          let type = '';
            if (res.type && res.type === 1) {
              type = '心愿币';
            } else if (res.type && res.type === 2) {
              type = '陪玩币';
            }
          that.setData({
            resPrice: res.price,
            resType: type
          });
        }
        that.setData({
          resShow: true
        });
      })
    },

    resClose: function() {
      let that = this;
      that.setData({
        resShow: false,
      });
      setTimeout(function() {
        that.setData({
          resMsg: null,
          resPrice: null,
          resType: ''
        });
      }, 500);
      that.loadUserInfo();
      that.loadReward();
    },

    loadUserInfo(){
      let that = this;
      let dayList = [];
      getUserProfile({}, true)
        .then(function(res) {
          let day = res.signDay;
          let cur = res.checkInDay;
          for(let i = 0; i < day; i++) {
            dayList.push({
              day: i,
              check: i >= cur ? 'not' : 'yes'
            });
          }
          let detail = {};
          if (res.signDetail) {
            res.signDetail.forEach(function(item) {
              detail[item.key] = item.value;
            });
          }
          let magic = res.magicSign ? res.magicSign : {};
          if (!magic.details) {
            magic.details = that.setMagic();
          }
          if (res.magicSign.details) {
            for (let i in res.magicSign.details) {
              let ii = res.magicSign.details[i];
              if (ii.day == 1) {
                that.setData({
                  curMDay: ii.id
                });
                break;
              }
            }
          }
          console.log(res);
          that.setData({
            signDay: day,
            curDay: cur,
            dayList: dayList,
            dayDetail: detail,
            signTotal: res.signTotal ? res.signTotal : 0,
            signPTotal: res.signPTotal ? res.signPTotal : 0,
            magic: magic
          });
        })
        .catch(function(res) {

        })
  },

  goToMy: function() {
    let url = '/pages/reward/index';
    widget.location(url);
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
      if (app.isLogin()) {
        this.loadReward();
        this.loadUserInfo();
      } else {
        let day = 7;
        let cur = 0;
        let dayList = [];
        for(let i = 0; i < day; i++) {
          dayList.push({
            day: i,
            check: i >= cur ? 'not' : 'yes'
          });
        }
        let magic = {
          details: this.setMagic()
        };
        this.setData({
            signDay: 7,
            curDay: 0,
            dayList: dayList,
            dayDetail: {},
            magic: magic
          });
      }
    },

    setMagic() {
      let days = 30;
      let arr = [];
      for (let i = 1; i <= days; i++) {
        arr.push({
          id: i,
          key: i,
          value: 0,
          status: 0,
          day: 2
        })
      }
      return arr;
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    tabClick(e) {
      let data = e.currentTarget.dataset;
      this.setData({
        curTab: data.cur*1
      })
    }
})