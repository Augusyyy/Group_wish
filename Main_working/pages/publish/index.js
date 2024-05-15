const util = require('../../utils/util.js');
const widget = require('../../utils/widget');
import {publishMySing} from '../../api/member';
const app = getApp();
const cache = require('../../utils/cache.js');
const string = require('../../utils/string.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
      name: '',
      type: '',
      price: '',
      total: '',
      endTime: '',
      part: [],
      partString: '',
      partShow: false,
      typeShow: false,
      typeColumns: ['打赏', '固定心愿币'],
      defaultType: '',
      timeShow: false,
      currentTime: new Date().getTime() + 24*60*60*3*1000,
      priceText: '请输入心愿币',
      cS: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      app.checkAuth();
      let configSwitch = cache.get(string.CONFIG_SWITCH);
      this.setData({
        cS: configSwitch
      });
    },

    publishSing: function(e) {
      let that = this;
      let field = e.detail.value;
      if (field) {
        let {defaultType, part, currentTime} = that.data;
        if (!field.name) {
          widget.showToast('请输入歌曲名');
          return false;
        }
        if (!field.type) {
          widget.showToast('请设定方式');
          return false;
        }
        if (!field.price) {
          widget.showToast('请输入心愿币');
          return false;
        }
        if (defaultType == 1 && !field.total) {
          widget.showToast('请输入获奖人数');
          return false;
        }
        if (!field.endTime) {
          widget.showToast('请设定结束时间');
          return false;
        }

        let params = field;
        params.type = defaultType + 1;
        params.endTime = currentTime;
        params.part = part;

        publishMySing(params)
          .then(function(res) {
            widget.showToast('发布成功', 'success');
            setTimeout(function() {
              widget.navigateBack();
            }, 500);
          })
          .catch(function(res) {
            let msg = res.msg ? res.msg : '发布失败';
            widget.showToast(msg);
          })
      }
    },

    typeClick: function() {
      this.setData({
        typeShow: true
      })
    },

    typeCancel: function(e) {
      this.setData({
        typeShow: false
      })
    },

    typeConfirm: function(e) {
      const {value, index} = e.detail;
      let text = index === 0 ? '请输入心愿币总额' : '请输入每个人获得的心愿币'
      this.setData({
        typeShow: false,
        type: value,
        defaultType: index,
        priceText: text
      })
    },

    timeClick: function() {
      this.setData({
        timeShow: true
      });
    },

    timeConfirm: function(value) {
      let date = new Date(value.detail).Format('yyyy-MM-dd hh:mm');
      this.setData({
        timeShow: false,
        currentTime: value.detail,
        endTime: date
      });
    },

    timeCancel: function() {
      this.setData({
        timeShow: false
      });
    },

    partClick: function() {
      this.setData({
        partShow: true
      });
    },

    partCancel: function() {
      this.setData({
        partShow: false
      });
    },

    partConfirm: function(data) {
      this.setData({
        partShow: false,
        part: data.detail.ids,
        partString: data.detail.names ? data.detail.names.join('，') : ''
      });
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

    onShareAppMessage() {
      let userInfo = app.getUserInfo();
      return {
        path: 'pages/publish/index?page=publish&id='+userInfo.id
      }
    }
})