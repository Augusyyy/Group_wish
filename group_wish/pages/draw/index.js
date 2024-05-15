const widget = require("../../utils/widget");
const {lotteryTurnOn, getLotteryCount, lotteryTurnOn1} = require("../../api/member");
const app = getApp();
Page({
    data: {
        curTab: 1,
        tenShow: false,
        tenList: [],
        jeweVisible: false,
        couponData: {},
        couponMess: '',
        loading:false,
        products: [],
        wheelWidth: '350px',
        wheelHeight: '350px',
        prizes: [],
        prizesMap: [
          {
            id: 100,
            value: '100%',
          },
          {
            id: 90,
            value: '90%',
          },
          {
            id: 80,
            value: '80%'
          },
          {
            id: 70,
            value: '70%'
          },
          {
            id: 60,
            value: '60%'
          },
          {
            id: 50,
            value: '50%'
          },
          {
            id: 40,
            value: '40%'
          },
          {
            id: 30,
            value: '30%'
          },
          {
            id: 20,
            value: '20%'
          },
          {
            id: 10,
            value: '10%'
          }
        ],
        buttons: [
            {
                radius: '25%',
                fonts: [{
                    text: '点击\n' +
                        '抽奖',
                    width: '30px',
                    fontColor: '#fa4043',
                    lineHeight: '20px',
                    top: '-60%',
                    fontSize: '20px'
                }],
                imgs: [{
                    src: '/images/lottery/pointer.png',
                    width: '150%',
                    top: '-200%'
                }]
            },
        ],
        blocks: [
            {
                padding:'30px',
                imgs: [
                    {
                        src: '/images/lottery/circle-bg.png',
                        width: '100%',
                        height: '100%',
                        rotate: true,
                    }
                ]
            },
        ],
        defaultStyle: {
            fontColor: '#913229',
            fontSize: '15px',
            fontWeight: 700,
        },
        defaultConfig: {
            offsetDegree: 0,
            speed:15,
        },
        prize:'',//中奖奖品
        count:0,//抽奖数量
        totalCount: 0,
        pageType: 2,
        payCount: 0,
        freeResidueCount: 0,
        freeCount: 0,
    },

    onLoad: function () {
      // app.checkAuth();
      this.updatePrizesData();
      if (app.isLogin()) {
        this.lotteryCount();
      }
      // let windowInfo = wx.getWindowInfo();
      // let screenHeight = windowInfo.screenHeight;
      // let screenWidth = windowInfo.screenWidth;
      // that.setData({
      //   wheelHeight: (screenHeight * 0.4) + 'px',
      //   wheelWidth: (screenWidth * 0.85) + 'px'
      // });
    },

     /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      
    },

    onShow:function () {
      if (app.isLogin()) {
        this.lotteryCount();
      }
    },

    lotteryCount: function() {
      let that = this;
      getLotteryCount(true)
        .then(function(res) {
          let count = res.count;
          let freeCount = res.freeCount ? res.freeCount : 0;
          let payCount = res.payCount ? res.payCount : 0;
          let total = freeCount + count;
          that.setData({
            count: res.count,
            totalCount: res.totalCount ? res.totalCount : 0,
            payCount: payCount,
            freeResidueCount: res.freeResidueCount,
            freeCount: res.freeCount
          })
        })
        .catch(function () {
          
      });
    },

    updatePrizesData (){
      let that = this;
      let prizes = [];
      let {prizesMap} = that.data;
      prizesMap.forEach(function(item, idx) {
          prizes.push({
              fonts: [
                          {
                              text: item.value,
                              fontSize: '20px',
                              fontColor: idx % 2 === 0 ? '#fb8101' : '#ffffff',
                              lineHeight: '25px',
                              lengthLimit: '80%',
                              top: '10%'
                          }
                      ],
              imgs: [
                  {
                      src: idx % 2 === 0 ? '/images/lottery/font-2.png' : '/images/lottery/font-1.png',
                      width: '40%',
                      top: '48%'
                  }
              ]
          })
      });
      that.setData({
        prizes:prizes
      });
  },
  // 抽奖结束会触发end回调
  startCallback() {
    if (!app.checkAuth()) {
      return false;
    }
      let that = this;
      let {loading, prizes, count, payCount, freeCount, freeResidueCount, curTab} = this.data;
      if (loading) {
          return;
      }
      if (prizes.length<1) {
          return;
      }
      let total = count + freeResidueCount;
      let num = curTab === 1 ? 1 : 10;
        if (total < num) {
            // if (payCount > 0) {
              
            // } else {
            //   widget.showToast('您当下抽奖次数为0次，无法抽奖');
            //   return;
            // }
            if (curTab === 2) {
              widget.showToast('抽奖次数不足');
              return false;
            } else {
              that.setData({
                jeweVisible: true,
                pageType: 3
              }); 
            }
        } else {
          that.lotteryOn();
        }
  },

  jewelLottery: function() {
    let that = this;
    that.lotteryOn();
  },

  lotteryOn: function() {
    let that = this;
    let {loading, prizes, count, prizesMap, curTab, freeResidueCount} = this.data;
    if (loading) {
        return;
    }
    let myLucky = this.selectComponent('#myLuckyDialog').lucky;
    if (prizes.length<1) {
        return;
    }

    // 调用抽奖组件的play方法开始游戏
    that.setData({
      loading:true
  });
    if (curTab === 1) {
      lotteryTurnOn()
      .then(function (res) {
          // setTimeout(function () {
          //     that.setData({
          //         loading:false
          //     });
          // }, 300);
          let prizeId = res.coupon && res.coupon.id ? res.coupon.id : '';
          let prize = '';
          let stopIdx = null;
          let emptyIdx = null;
          let name = res.coupon && res.coupon.name ? res.coupon.name : '';
          if (prizeId) {
              prizesMap.forEach(function (product, idx) {
                  if (product.id === prizeId) {
                      stopIdx = idx;
                      prize = product;
                  }
              })
          } else {
              stopIdx = emptyIdx;
          }

          if (stopIdx !== null) {
              myLucky.play();
              // let nCount = count - 1;
              // nCount = nCount > 0 ? nCount : 0;
              setTimeout(function () {
                  myLucky.stop(stopIdx);
                  setTimeout(function () {
                      that.setData({
                          prize:prize,
                          jeweVisible: true,
                          pageType: 2,
                          couponData: res.coupon,
                          couponMess: res.message,
                          loading: false
                      });
                      that.lotteryCount();
                      // if (name) {
                      //   widget.showToast('恭喜您抽中' + name + '一张');
                      // }
                  }, 2500);
              }, 3000);
          }

      })
      .catch(function (res) {
        let msg = res.msg ? res.msg : '操作失败';
        widget.showToast(msg);
          setTimeout(function () {
              that.setData({
                  loading:false
              });
          }, 300);
          that.lotteryCount();
      });
    } else {
      lotteryTurnOn1()
      .then(function (res) {
          let list = res.list;
          let prizeId = res.list[0] && res.list[0].coupon && res.list[0].coupon.id ? res.list[0].coupon.id : '';
          let prize = '';
          let stopIdx = null;
          let emptyIdx = null;
          if (prizeId) {
              prizesMap.forEach(function (product, idx) {
                  if (product.id === prizeId) {
                      stopIdx = idx;
                      prize = product;
                  }
              })
          } else {
              stopIdx = emptyIdx;
          }

          if (stopIdx !== null) {
              myLucky.play();
              setTimeout(function () {
                  myLucky.stop(stopIdx);
                  setTimeout(function () {
                      that.setData({
                          prize:prize,
                          tenShow: true,
                          tenList: res.list,
                          loading: false
                      });
                      that.lotteryCount();
                  }, 2500);
              }, 3000);
          }

      })
      .catch(function (res) {
        let msg = res.msg ? res.msg : '操作失败';
        widget.showToast(msg);
          setTimeout(function () {
              that.setData({
                  loading:false
              });
          }, 300);
          that.lotteryCount();
      });
    }
  },
  
  tabClick(e) {
    let that = this;
    let data = e.currentTarget.dataset;
    that.setData({
      curTab: data.tab * 1
    })
  },

  tenClose() {
    this.setData({
      tenShow: false
    })
  }
})