// component/kPop/index.js
const recorderManager = wx.getRecorderManager();
const widget = require('../../utils/widget');
const {uploadSing} = require("../../api/member");
const oss = require("../../utils/oss");
Component({

    /**
     * 组件的属性列表
     */
    properties: {
      curId: Number,
      kShow: {
        type: Boolean,
        value: false,
        observer: function(newV, oldV) {
          let {options} = this.data;
          if (newV) {
            // recorderManager.start(options);
            // this.recorderOnStop();
          } else {
            // recorderManager.pause();
            this.triggerEvent('closeEvent', {});
          }
        }
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      tempFile: '',
      duration: '',
      options: {
        duration: 600000,     //10分钟
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        frameSize: 1,
        format: 'wav'
      },
      start: false,
      touch: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
      kCancel: function() {
        let {start} = this.data;
        if (start) {
          this.setData({
            start: false
          });
          recorderManager.stop();
        } else {
          this.setData({
            kShow: false
          });
        }
      },

      kTouchS: function() {
        this.setData({
          touch: true
        })
      },

      kTouchE: function() {
        // console.log(222)
        // this.setData({
        //   touch: false
        // })
      },

      kStart: function() {
        let that = this;
        setTimeout(function() {
          let {options} = that.data;
          recorderManager.start(options);
          that.setData({
            start: true,
            touch: false
          });
        }, 80)
      },

      kDone: function() {
        let that = this;
        let {curId} = that.properties;
        recorderManager.stop();
        recorderManager.onStop((res) => {
          // let duration = parseInt(res.duration / 1000);
          // let m = parseInt(duration / 60);
          // let s = parseInt(duration % 60);
          // console.log(duration, m, s);
          // console.log(m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0'));
          let {start} = that.data;
          if (!start) {
            // that.setData({
            //   start: false
            // });
            return false;
          }
          that.setData({
            tempFile: res.tempFilePath,
            duration: res.duration
          });
          if (!curId) {
            wx.showModal({
              title: '请输入歌曲名',
              editable: true,
              placeholderText: '请输入歌曲名',
              complete: (res) => {
                if (res.confirm && res.content) {
                  that.uploadFun(res.content);
                } else {
                  that.setData({
                    kShow: false,
                    start: false
                  });
                }

                if (res.cancel) {
                  that.setData({
                    kShow: false,
                    start: false
                  });
                }
              }
            })
          } else {
            that.uploadFun();
          }
        })
      },

      uploadFun(name) {
        let that = this;
        let {tempFile, duration} = that.data;
        let {curId} = that.properties;
        wx.showLoading({
          title: '上传中',
        });
        let params = {};
        if (curId) {
          params.id = curId;
        } else if (name) {
          params.id = 0;
          params.name = name;
        }
        params.duration = duration;
        oss.uploadFile(tempFile).then(function (res) {
          wx.hideLoading();
          params.url = res.url;
          uploadSing(params)
            .then(function(res) {
              widget.showToast('上传成功', 'success');
              that.setData({
                kShow: false,
                start: false
              })
            })
            .catch()
        }); 
      },
    }
})