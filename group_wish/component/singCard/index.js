// component/singCard/index.js
const enums = require("../../utils/enums");
const RewardType = enums.RewardType;
const widget = require('../../utils/widget');
const app = getApp();
Component({

    /**
     * 组件的属性列表
     */
    properties: {
      avatar: String,
      curId: Number,
      name: String,
      member: String,
      partString: String,
      endTime: String,
      endTimestamp: Number,
      isMe: Boolean,
      type: Number,
      amount: Number,
      residue: Number,
      btn: Number,
      detail: Number,
      showBtn: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
      curTime: new Date().getTime(),
      rewardType: RewardType,
      kShow: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
      goToDetail: function() {
        let data = this.properties;
        if (data.detail) {
          let url = '/pages/singDetail/index?sid=' + data.curId + '&name=' + data.name + '&member=' + data.member + '&part=' + data.partString + '&time=' + data.endTime + '&type=' + data.type + '&amount=' + data.amount + '&residue=' + data.residue + '&me=' + data.isMe + '&timestamp=' + data.endTimestamp + '&avatar=' + data.avatar;
          widget.location(url);
        }
      },

      goToRecorder: function(e) {
        // let data = e.currentTarget.dataset;
        // let url = '/pages/recorder/index?id=' + data.id + '&name=' + data.name;
        // widget.location(url);

        if (!app.checkAuth()) {
          return false;
        }
        let that = this;
        that.setData({
          kShow: true
        });
      },

      closeEvent: function() {
        this.triggerEvent('closeEvent', {})
      }
    }
})