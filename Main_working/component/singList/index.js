// component/singList/index.js
const widget = require('../../utils/widget');
const {singReward, songReward, getMyReward, kLikeSong, singDelete} = require("../../api/member");
const app = getApp();
// const innerAudioContext = wx.createInnerAudioContext({
//   useWebAudioImplement: true
// });
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      avatar: String,
      memberName: String,
      name: String,
      url: String,
      curId: Number,
      status: Number,
      rewardType: Number,
      play: {
        type: null,
        observer: function(n, o) {
          if (n === 'start') {
            this.countDownStart();
          } else if (n === 'pause') {
            this.countDownPause();
          } else {
            this.countDownReset();
          }
        }
      },
      detail: Boolean,
      weType: Number,
      amount: Number,
      residue: Number,
      duration: null,
      createdAt: String,
      likeCount: Number,
      like: Number,
      myId: String,
      uploadId: String,
      kId: String
    },

    /**
     * 组件的初始数据
     */
    data: {
      isPlay: false,
      weShow: false,
      xyb: 0,
      inputVal: '',
      timeData: {},
      isDelete: false
    },

    attached: function() {
      let {weType, amount, residue, kId} = this.properties;
      if (weType === 2) {
        this.setData({
          inputVal: amount,
          xyb: residue / amount
        });
      }
    },

    /**
     * 组件的方法列表
     */
    methods: {
      countChange: function(e) {
        this.setData({
          timeData: {
            min: e.detail.minutes.toString().padStart(2, '0'),
            sec: e.detail.seconds.toString().padStart(2, '0')
          }
        })
      },

      countDownStart: function() {
        let {curId} = this.properties;
        let dom = this.selectComponent('.count-down-' + curId);
        if (dom) {
          dom.start();
        }
      },

      countDownPause: function() {
        let {curId} = this.properties;
        let dom = this.selectComponent('.count-down-' + curId);
        if (dom) {
          dom.pause();
        }
      },

      countDownReset: function() {
        let {curId} = this.properties;
        let dom = this.selectComponent('.count-down-' + curId);
        if (dom) {
          dom.reset();
        }
      },

      playAudio: function(e) {
        this.triggerEvent('playAudio', {});
        // this.setData({
        //   isPlay: true
        // })
        // let {innerAudioContext} = this.data;
        // let data = e.currentTarget.dataset;
        // innerAudioContext.src = data.url;
        // innerAudioContext.play();

        // innerAudioContext.onCanplay(function(res) {
        //   console.log('可播放');
        // })
      },

      kingReward: function(id, value) {
        let that = this;
        let params = {id: id}
        if (value) {
          params.value = value;
        }
        songReward(params)
          .then(function(res) {
            widget.showToast('打赏成功', 'success');
            that.triggerEvent('rewardSuccess', {value: value});
            that.weClose();
          })
          .catch(function(res) {
    
          })
      },

      reSubmit: function() {
        let that = this;
        let {rewardType, curId, weType} = this.properties;
        let {inputVal} = this.data;
        let reg = /(^[0-9]*$)/;
        if (inputVal && reg.test(inputVal)) {
          switch (weType){
            case 1:
              that.kingReward(curId, inputVal);
              break;
            case 2:
              that.kingReward(curId);
              break;
            case 3:
              singReward({id: curId, value: inputVal})
                .then(function(res) {
                  widget.showToast('打赏成功', 'success');
                  that.weClose();
                })
                .catch(function(res) {
  
                })
              break;
            default:
              break;
          }
        } else {
          widget.showToast('请输入正确的打赏心愿币');
          return false;
        }
      },

      rewardFun: function() {
        let that = this;
        let {weType} = that.data;
        that.setData({
          weShow: true
        });
        if (weType === 3) {
          getMyReward({}, true)
          .then(function(res) {
            that.setData({
              xyb: res.residue ? res.residue : 0
            });
          })
          .catch(function(res) {})
        }
      },

      weClose: function() {
        let {amount, residue, weType} = this.data;
        this.setData({
          weShow: false,
          inputVal: weType === 2 ? amount : ''
        })
      },

      inputChange: function(e) {
        this.setData({
          inputVal: e.detail.value
        })
      },

      likeSong: function() {
        let that = this;
        let data = that.properties;
        kLikeSong({id: data.curId})
          .then(function(res) {
            let like = data.like === 0 ? 1 : 0;
            that.setData({
              likeCount: data.like === 0 ? data.likeCount + 1 : data.likeCount - 1,
              like: like
            });
          })
          .catch(function(res) {

          })
      },

      kDelete(e) {
        let data = e.currentTarget.dataset;
        let that = this;
        console.log(data.id)
        widget.confirm(
          '提示',
          '是否确认删除？',
          function() {
            singDelete({id: data.id})
              .then(function(res) {
                widget.showToast('删除成功');
                that.setData({
                  isDelete: true
                })
              })
          }
        )
      }
    },

    detached: function() {

    }
})