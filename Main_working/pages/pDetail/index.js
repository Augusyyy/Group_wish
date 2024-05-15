const widget = require('../../utils/widget');
const app = getApp();
const cache = require('../../utils/cache.js');
const string = require('../../utils/string.js');
import {getUserProfile,ppSearch,ppOrder,orderInfo,ppOrderDone,ppOrderCancel} from '../../api/member';
import { orderStatusMap, ppOrderStatusMap } from '../../utils/enums';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      amount: 0,
      games: '',
      myRank: '',
      orderTime: '',
      timeShow: false,
      currentTime: new Date().getTime(),
      ids: '',
      ppData: [],
      curStatus: 99,
      ppId: [],
      deleteId: [],
      addId: [],
      orderId: '',
      totalAmount: 0,
      statusStr: '',
      weShow: false,
      ppMap: ppOrderStatusMap,
      cShow: false,
      cStrTitle: '',
      cStrText: '',
      cStrEnd: '',
      cancelShow: false,
      cS: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      if (!app.checkAuth()) {
        return false;
      }
      let configSwitch = cache.get(string.CONFIG_SWITCH);
      this.setData({
        cS: configSwitch
      });
      let that = this;
      if (options && options.type && options.type === 'order') {
        let arr = options.ids ? options.ids.split(',') : [];
        this.getOrderInfo(options.id, arr);
      } else {
        if (options && options.ids) {
          this.setData({
            ids: options.ids
          });
          this.getPpList();
        }
      }
      this.loadUserInfo();
      setTimeout(function() {
        if (options.gc) {
          that.setData({
            games: options.gc
          })
        }
        if (options.mr) {
          that.setData({
            myRank: options.mr
          })
        }
        if (options.ot) {
          that.setData({
            orderTime: options.ot
          })
        }
      }, 700);
    },

    getOrderInfo(id, add) {
      let that = this;
      orderInfo({id: id})
        .then(function(res) {
          let ids = [];
          let addId = [];
          res.pp.forEach(function(item) {
            item.heroes = item.heroes ? item.heroes.replace(new RegExp(',', 'g'), ' | ') : '';
            ids.push(item.id);
          });
          that.setData({
            orderId: res.id,
            myRank: res.rank,
            games: res.totalGameCount,
            orderTime: res.time,
            currentTime: new Date(res.time).getTime(),
            ppData: res.pp,
            curStatus: res.status,
            ppId: ids,
            ids: ids.toString(),
            addId: addId,
            totalAmount: res.totalAmount ? res.totalAmount : 0,
            statusStr: '订单' + orderStatusMap[res.status].name
          });
          if (add && add.length > 0) {
            add.forEach(function(a) {
              if (ids.indexOf(a*1) === -1) {
                addId.push(a);
              }
            });
            that.getPpList(addId);
          }
        })
    },

    getPpList(add) {
      let that = this;
      let {ids, ppData} = that.data;
      let params = {
        ids: add && add.length ? add.toString() : ids
      }
      let curData = [];
      ppSearch(params)
        .then(function(res) {
          if (res.list) {
            res.list.forEach(function(item) {
              item.heroes = item.heroes ? item.heroes.replace(new RegExp(',', 'g'), ' | ') : ''
            });
          }
          if (add && add.length) {
            curData = ppData.concat(res.list ? res.list : []);
          } else {
            curData = res.list ? res.list : [];
          }
          that.setData({
            ppData: curData
          });
        })
    },

    loadUserInfo(){
      let that = this;
      getUserProfile({}, true)
        .then(function(res) {
          that.setData({
            amount: res.ppAmount,
            cashback: res.cashback ? res.cashback : 0,
            cash: res.residue ? res.residue : 0
          });
        })
        .catch(function(res) {

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

    },

    timeClick: function() {
      let {curStatus} = this.data;
      if (curStatus === 99 || curStatus === 0) {
        this.setData({
          timeShow: true
        });
      }
    },

    timeConfirm: function(value) {
      let date = new Date(value.detail).Format('yyyy/MM/dd hh:mm');
      this.setData({
        timeShow: false,
        currentTime: value.detail,
        orderTime: date
      });
    },

    timeCancel: function() {
      this.setData({
        timeShow: false
      });
    },

    ppClose: function(e) {
      let that = this;
      let {ids, curStatus, addId, ppData} = that.data;
      let data = e.currentTarget.dataset;
      let arr = ids.split(',');
      if (arr.indexOf(data.id + '') > -1) {
        if (curStatus === 99) {
          arr.splice(arr.indexOf(data.id + ''), 1);
          that.setData({
            ids: arr.toString()
          });
          that.getPpList();
        } else if (curStatus === 0) {
          widget.confirm('提示', '是否确认删除', function() {
            let {myRank, orderTime, games, orderId} = that.data;
            let params = {
              id: orderId,
              rank: myRank,
              deleteIds: [data.id],
              totalGameCount: games,
              time: new Date(orderTime).getTime() / 1000
            }
            ppOrder(params)
              .then(function(res) {
                widget.showToast('删除成功');
                that.getOrderInfo(orderId);
              });
          });
        }
      } else {
        console.log(data.id, addId,ppData);
        addId.splice(addId.indexOf(data.id + ''), 1);
        let curData = [];
        ppData.forEach(function(item, key) {
          if (item.id != data.id) {
            curData.push(item);
          }
        });
        console.log(curData);
        that.setData({
          addId: addId,
          ppData: curData
        });
      }
    },

    goChoose: function() {
      let that = this;
      let {ids, curStatus, orderId, games, myRank, orderTime} = that.data;
      if (curStatus !== 99 && curStatus !== 0) {
        return false;
      }
      let arr = ids.split(',');
      if (arr.length >=4) {
        widget.showToast('最多可添加4个陪玩');
        return false;
      }
      if (curStatus === 99) {
        widget.redirectTo('/pages/pChoose/index?ids=' + ids + '&gc=' + games + '&mr=' + myRank + '&ot=' + orderTime);
      } else if (curStatus === 0) {
        widget.redirectTo('/pages/pChoose/index?ids=' + ids + '&type=order&orderId=' + orderId + '&gc=' + games + '&mr=' + myRank + '&ot=' + orderTime);
      }
    },

    ppOrder: function() {
      let that = this;
      let {myRank, orderTime, ids, games} = that.data;
      if (!myRank) {
        widget.showToast('请输入您的段位');
        return false;
      }
      if (!orderTime) {
        widget.showToast('请选择您的预约时间');
        return false;
      }
      if (!games || games == 0) {
        widget.showToast('请输入游戏局数');
        return false;
      }
      if (games > 10) {
        widget.showToast('最多可邀请10局');
        return false;
      }
      if (!ids) {
        widget.showToast('请添加陪玩');
        return false;
      }
      let params = {
        ids: ids.split(','),
        time: new Date(orderTime).getTime() / 1000,
        rank: myRank,
        totalGameCount: games
      }
      ppOrder(params)
        .then(function(res) {
          // widget.showToast('操作成功');
          // setTimeout(function() {
          //   widget.redirectTo('/pages/pOrder/index');
          // }, 500);
          let message = res.message;
          let arr = message.split('，');
          that.setData({
            cShow: true,
            cStrTitle: arr[0],
            cStrText: arr[1],
            cStrEnd: arr[2]
          })
        })
        .catch(function(res) {
          // let message = res.msg;
          // let arr = message.split('，');
          // that.setData({
          //   cShow: true,
          //   cStrTitle: arr[0],
          //   cStrText: arr[1],
          //   cStrEnd: arr[2]
          // })
        })
    },

    cSubmit() {
      widget.redirectTo('/pages/pOrder/index');
    },

    ppOrderUpdate() {
      let that = this;
      let {myRank, orderTime, orderId, games, addId} = that.data;
      console.log(orderId);
      let params = {
        id: orderId,
        rank: myRank,
        addIds: [],
        totalGameCount: games,
        time: new Date(orderTime).getTime() / 1000
      }
      if (addId && addId.length) {
        params.addIds = addId
      }
      ppOrder(params)
        .then(function(res) {
          widget.showToast('操作成功');
          setTimeout(function() {
            widget.redirectTo('/pages/pOrder/index');
          }, 500);
        });
    },

    orderDone() {
      let {amount, totalAmount} = this.data;
      if (totalAmount > amount) {
        widget.showToast('心愿币不足，请联系管理员充值后再结账');
        return false;
      }
      this.setData({
        weShow: true
      });
    },

    reSubmit() {
      let that = this;
      let {orderId} = that.data;
      ppOrderDone({id: orderId})
        .then(function(res) {
          widget.showToast('操作成功');
          that.getOrderInfo(orderId);
          that.loadUserInfo();
        });
        that.weClose();
    },

    weClose() {
      this.setData({
        weShow: false
      });
    },

    ppOrderCancel() {
      let that = this;
      that.setData({
        cancelShow: true
      })
    },

    ccClose() {
      this.setData({
        cancelShow: false
      });
    },

    ccSubmit() {
      let that = this;
      let {orderId} = that.data;
      ppOrderCancel({id: orderId})
        .then(function(res) {
          widget.showToast('操作成功');
          that.getOrderInfo(orderId);
        });
        that.ccClose();
    }
})