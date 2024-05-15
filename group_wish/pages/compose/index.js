// pages/syn/index.js
import {getMyCards, compoundCard, exchangeJewe, getMyJewe} from '../../api/member';
//获取应用实例
const app = getApp();
const widget = require("../../utils/widget");
const enums = require("../../utils/enums");
const LotteryLevelMap = enums.LotteryLevelMap;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      jeweVisible: false,
      jeweId: '',
      pageType: '',
      currentJewel: [],
      couponData: {},
      giftData: {},
      jewelData: [],
      groupBtnMap: {
        1: {box: {}},
        2: {box: {}},
        3: {box: {}},
        4: {box: {}},
        5: {box: {}},
      },
      cardsMap: {
        100: {
          id: 100,
          value: 100,
          count: 0
        },
        90: {
          id: 90,
          value: 90,
          count: 0
        },
        80: {
          id: 80,
          value: 80,
          count: 0
        },
        70: {
          id: 70,
          value: 70,
          count: 0
        },
        60: {
          id: 60,
          value: 60,
          count: 0
        },
        50: {
          id: 50,
          value: 50,
          count: 0
        },
        40: {
          id: 40,
          value: 40,
          count: 0
        },
        30: {
          id: 30,
          value: 30,
          count: 0
        },
        20: {
          id: 20,
          value: 20,
          count: 0
        },
        10: {
          id: 10,
          value: 10,
          count: 0
        }
      },
      cardsIdMap: {
        10: [],
        20: [],
        30: [],
        40: [],
        50: [],
        60: [],
        70: [],
        80: [],
        90: [],
        100: [],
      },
      clickCount: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      // app.checkAuth();
      if (app.isLogin()) {
        this.getAllCards();
        this.getJewe();
      }
      this.animation1 = wx.createAnimation();
      this.animation2 = wx.createAnimation();
      this.animation3 = wx.createAnimation();
      this.animation4 = wx.createAnimation();
      this.animation5 = wx.createAnimation();
      this.animation6 = wx.createAnimation();
      this.animation7 = wx.createAnimation();
      this.animation8 = wx.createAnimation();
      this.animation9 = wx.createAnimation();
      this.animation10 = wx.createAnimation();
      this.animation11 = wx.createAnimation();
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
      this.setData({
        cardsMap: {
          100: {
            id: 100,
            value: 100,
            count: 0
          },
          90: {
            id: 90,
            value: 90,
            count: 0
          },
          80: {
            id: 80,
            value: 80,
            count: 0
          },
          70: {
            id: 70,
            value: 70,
            count: 0
          },
          60: {
            id: 60,
            value: 60,
            count: 0
          },
          50: {
            id: 50,
            value: 50,
            count: 0
          },
          40: {
            id: 40,
            value: 40,
            count: 0
          },
          30: {
            id: 30,
            value: 30,
            count: 0
          },
          20: {
            id: 20,
            value: 20,
            count: 0
          },
          10: {
            id: 10,
            value: 10,
            count: 0
          }
        }
      })
      if (app.isLogin()) {
        this.getAllCards();
        this.getJewe();
      }
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

    aniFun: function() {
      this.animation1.translate(25, -100).step({timingFunction: 'ease-in'}).translate(0, -150).opacity(0).step()
        .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation2.translate(75, -110).step({timingFunction: 'ease-in', duration: 600}).translate(50, -180).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation3.translate(-55, -120).step({timingFunction: 'ease-in', duration: 900}).translate(0, -180).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation4.translate(-95, -120).step({timingFunction: 'ease-in'}).translate(-95, -165).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation5.translate(-125, -135).step({timingFunction: 'ease-in', duration: 500}).translate(-125, -165).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation6.translate(-185, -123).step({timingFunction: 'ease-in', duration: 700}).translate(-185, -183).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation7.translate(55, -111).step({timingFunction: 'ease-in', duration: 1000}).translate(55, -183).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation8.translate(75, -140).step({timingFunction: 'ease-in', duration: 700}).translate(75, -203).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation9.translate(95, -118).step({timingFunction: 'ease-in', duration: 800}).translate(95, -193).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation10.translate(-75, -130).step({timingFunction: 'ease-in', duration: 1000}).translate(-75, -203).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.animation11.translate(-175, -121).step({timingFunction: 'ease-in', duration: 700}).translate(-175, -203).opacity(0).step()
      .translate('-50%', '-50%').opacity(1).step({duration: 0});

      this.setData({
        animation1: this.animation1.export(),
        animation2: this.animation2.export(),
        animation3: this.animation3.export(),
        animation4: this.animation4.export(),
        animation5: this.animation5.export(),
        animation6: this.animation6.export(),
        animation7: this.animation7.export(),
        animation8: this.animation8.export(),
        animation9: this.animation9.export(),
        animation10: this.animation10.export(),
        animation11: this.animation11.export()
      });
    },

    compoundCard: function() {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let {groupBtnMap, cardsIdMap, jeweId, clickCount} = that.data;
      let ids = [];
      let des = {};
      for(let i in groupBtnMap) {
        let item = groupBtnMap[i];
        if (item.box.id) {
          let id = cardsIdMap[item.box.id].splice(0, 1);
          ids.push(id[0])
          if (!des[item.box.id]) {
            des[item.box.id] = []
          }
          des[item.box.id].push(id[0])
        }
      }
      clickCount += 1;
      that.setData({
        clickCount: clickCount
      });
      if (ids.length > 0) {
        that.setData({
          clickCount: 0
        });
        let params = {
          ids: ids
        }
        if (jeweId) {
          params.memberJewelId = jeweId
        }
        compoundCard(params)
          .then(function(res) {
            if (res.gift) {
              let name = LotteryLevelMap[res.gift.level];
              res.gift.levelName = name;
            }
            that.setData({
              jeweId: '',
              pageType: 2,
              jeweVisible: true,
              couponData: res.coupon,
              giftData: res.gift
            });
            // let text = '恭喜您合成一张' + res.coupon.name;
            // widget.showToast(text, 'none', {duration: 2500});
            that.setMapEmpty();
            that.getAllCards();
          })
          .catch(function(res) {
            let msg = res.msg ? res.msg : "操作失败";
            widget.showToast(msg);
            for (let i in des) {
              des[i].forEach(function(item) {
                cardsIdMap[i].push(item);
              })
            }
            that.setData({
              cardsIdMap: cardsIdMap
            })
            // that.setMapEmpty();
            // that.getAllCards();
          })
      }
      if (clickCount >= 10) {
        that.aniFun();
        that.setData({
          clickCount: 0
        });
      }
    },

    /**
     * 数据清空
     */
    setMapEmpty: function() {
      this.setData({
        groupBtnMap: {
          1: {box: {}},
          2: {box: {}},
          3: {box: {}},
          4: {box: {}},
          5: {box: {}},
        },
        cardsMap: {
          100: {
            id: 100,
            value: 100,
            count: 0
          },
          90: {
            id: 90,
            value: 90,
            count: 0
          },
          80: {
            id: 80,
            value: 80,
            count: 0
          },
          70: {
            id: 70,
            value: 70,
            count: 0
          },
          60: {
            id: 60,
            value: 60,
            count: 0
          },
          50: {
            id: 50,
            value: 50,
            count: 0
          },
          40: {
            id: 40,
            value: 40,
            count: 0
          },
          30: {
            id: 30,
            value: 30,
            count: 0
          },
          20: {
            id: 20,
            value: 20,
            count: 0
          },
          10: {
            id: 10,
            value: 10,
            count: 0
          }
        },
      cardsIdMap: {
          10: [],
          20: [],
          30: [],
          40: [],
          50: [],
          60: [],
          70: [],
          80: [],
          90: [],
          100: [],
        }
      });
    },

    getJewe: function(type) {
      let that = this;
      getMyJewe()
        .then(function(res) {
          if (type) {
            let current =  res.list.splice(0, 1);
            that.setData({
              jeweId: current[0].id,
              currentJewel: current,
              jewelData: res.list
            })
          } else {
            that.setData({
              jewelData: res.list
            })
          }
        })
        .catch()
    },

    getAllCards: function() {
      let that = this;
      let {cardsMap, cardsIdMap} = that.data;
      let params = {
        page: 1,
        limit: 9999
      }
      getMyCards(params, true)
        .then(function(res) {
          if (res.list) {
            res.list.forEach(function(item) {
              if (item.status === 0) {
                let id = item.coupon.id;
                cardsMap[id].count += 1;
                cardsIdMap[id].push(item.id);
              }
            })
            that.setData({
              cardsMap: cardsMap,
              cardsIdMap: cardsIdMap
            })
          }
        })
        .catch()
    },

    deleteCard: function(e) {
      let that = this;
      let {info, idx} = e.currentTarget.dataset;
      let {cardsMap, groupBtnMap} = this.data;
      if (info.box.id) {
        let id = info.box.id;
        groupBtnMap[idx].box = {};
        cardsMap[id].count += 1;
        that.setData({
          cardsMap: cardsMap,
          groupBtnMap: groupBtnMap
        })
      }
    },

    addCard: function(e) {
      let that = this;
      let {info} = e.currentTarget.dataset;
      let {cardsMap, groupBtnMap} = this.data;
      if (info.count > 0) {
        cardsMap[info.id].count -= 1;
        for (let i in groupBtnMap) {
          let item = groupBtnMap[i];
          if (!item.box.id) {
            item.box = {
              id: info.id,
              value: info.value
            }
            break;
          }
        }
        that.setData({
          cardsMap: cardsMap,
          groupBtnMap: groupBtnMap
        })
      }
    },

    addJewel: function() {
      app.checkAuth();
      let that = this;
      let {jeweId, jewelData} = that.data;
      if (!jeweId && jewelData.length > 0) {
        let current =  jewelData.splice(0, 1);
        that.setData({
          jeweId: current[0].id,
          currentJewel: current,
          jewelData: jewelData
        })
      } else if (!jeweId && jewelData.length === 0) {
        that.jewePop();
      }
    },

    deleteJewel: function() {
      let that = this;
      let {currentJewel, jewelData} = that.data;
      jewelData.push(currentJewel[0])
      that.setData({
        jeweId: '',
        currentJewel: [],
        jewelData: jewelData
      })
    },

    jeweBuy: function() {
      let that = this;
      exchangeJewe()
        .then(function(res) {
          that.getJewe(true);
        })
        .catch(function(res) {
          let msg = res.msg ? res.msg : "操作失败";
            widget.showToast(msg);
        })
    },

    jewePop: function(e) {
      if (!app.checkAuth()) {
        return false;
      }
      let that = this;
      let {jeweId} = that.data;
      if (!jeweId) {
        that.setData({
          jeweVisible: true,
          pageType: 1
        })
      }
    },

    goToPrizes: function() {
      widget.location('/pages/prizes/index');
    }
})