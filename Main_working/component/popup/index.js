// component/popup/index.js
import {getMyReward, getLotteryCount} from '../../api/member';
const widget = require("../../utils/widget");
Component({

    /**
     * 组件的属性列表
     */
    properties: {
      overlayVisiable: {
        type: Boolean,
        value: false,
        observer: function(newV, oldV) {
          
        }
      },
      pageType: {
        type: Number,
        value: 0
      },

      couponData: {
        type: Object,
        value: {}
      },

      couponMess: {
        type: String,
        value: ''
      },

      giftData: {
        type: Object,
        value: null
      }
    },

    observers: {
      'overlayVisiable, pageType': function (ov, pa) {
        if (ov && (pa === 1 || pa === 3)) {
          this.getMyRewardInfo();
          this.lotteryCount();
        }
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      residue: 0,
      payCount: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
      getMyRewardInfo: function() {
        let that = this;
        getMyReward({})
          .then(function(res) {
            that.setData({
              residue: res.residue
            })
          })
          .catch(function(res) {
            let msg = res.msg ? res.msg : "操作失败";
            widget.showToast(msg);
          })
      },

      lotteryCount: function() {
        let that = this;
        getLotteryCount(true)
          .then(function(res) {
            that.setData({
              payCount: res.payCount
            })
          })
          .catch(function () {
            
        });
      },

      jewelLottery: function(e) {
        let that = this;
        let {residue} = that.data;
        that.setData({
          overlayVisiable: false
        });
        if (residue >= 5) {
          that.triggerEvent('compoentfunc', {});
        }
      },

      jeweSubmit: function(e) {
        let that = this;
        let {residue} = that.data;
        that.setData({
          overlayVisiable: false
        });
        if (residue >= 8) {
          that.triggerEvent('compoentfunc', {});
        }
      },

      closeOverlay: function() {
        let that = this;
        that.setData({
          overlayVisiable: false
        });
      }
    }
})