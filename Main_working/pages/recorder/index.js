const app = getApp();
const widget = require('../../utils/widget');
const {uploadSing} = require("../../api/member");
const recorderManager = wx.getRecorderManager();
const oss = require("../../utils/oss");
import {WaveView} from '../../utils/waveview';

Page({
    data: {
      singId: '',
      singName: '',
      tempFile: '',
      options: {
        duration: 600000,     //10分钟
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        frameSize: 1,
        format: 'wav'
      },
      isStart: 'none',
      innerAudioContext: '',
      time: 0,
      timeStr: '00:00',
      timeInterval: '',
      waveView: '',
    },

    onLoad: function (options) {
      let that = this;
        app.checkAuth();
        if (options.id && options.name) {
          this.setData({
            singId: options.id,
            singName: options.name
          });
        }
        this.setData({
          tempFile: '',
          innerAudioContext: wx.createInnerAudioContext({
            useWebAudioImplement: true
          })
        });

        // let query = wx.createSelectorQuery();
        // query.select('#re_wave')
        //   .fields({node: true, size: true})
        //   .exec((res) => {
        //     let canvas = res[0].node;
        //     let waveView = new WaveView({
        //       elem: canvas,
        //       width: wx.getSystemInfoSync().windowWidth,
        //       height: 100,
        //       scale: 1
        //     });
        //     that.setData({
        //       waveView: waveView
        //     })
        //   })
    },

    start: function() {
      let that = this;
      let {options, timeInterval, time, waveView} = this.data;
      recorderManager.start(options);

      recorderManager.onFrameRecorded(function(res) {
        // if (waveView) {
        //   waveView.input();
        // }
      });

      if (timeInterval) {
        clearInterval(timeInterval);
      }
      timeInterval = setInterval(function() {
        time += 1;
        let m = parseInt(time / 60);
        let s = parseInt(time % 60);
        that.setData({
          timeStr: m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0')
        })
      }, 1000);
      this.setData({
        isStart: 'start',
        timeInterval: timeInterval
      });
    },

    pause: function() {
      let that = this;
      recorderManager.pause();
      this.setData({
        isStart: 'pause'
      });
      recorderManager.onPause((res) => {
        console.log(res);
        that.setData({
          tempFile: res.tempFilePath
        })
      })
    },

    resume: function() {
      recorderManager.resume();
      this.setData({
        isStart: 'start'
      });
    },

    stop: function() {
      let that = this;
      let {timeInterval} = that.data;
      if (timeInterval) {
        clearInterval(timeInterval);
      }
      recorderManager.stop();
      this.setData({
        timeInterval: '',
        time: 0,
        isStart: 'none'
      });
      recorderManager.onStop((res) => {
        console.log(res);
        that.setData({
          tempFile: res.tempFilePath
        })
      })
    },

    tryAudio: function() {
      let {tempFile, innerAudioContext} = this.data;
      innerAudioContext.src = tempFile;
      innerAudioContext.play();
    },

    publishSing: function() {
      let that = this;
      let {tempFile, singId} = that.data;
      if (!tempFile) {
        widget.showToast('请录音后再上传曲目');
        return false;
      }
      if (!singId) {
        wx.showModal({
          title: '请输入歌曲名',
          editable: true,
          placeholderText: '请输入歌曲名',
          complete: (res) => {
            if (res.confirm && res.content) {
              that.uploadFun(res.content);
            }
          }
        })
      } else {
        that.uploadFun();
      }
    },

    uploadFun(name) {
      let that = this;
      let {tempFile, singId} = that.data;
      wx.showLoading({
        title: '上传中',
      });
      let params = {};
      if (singId) {
        params.id = singId;
      } else if (name) {
        params.id = 0;
        params.name = name;
      }
      oss.uploadFile(tempFile).then(function (res) {
        wx.hideLoading();
        params.url = res.url;
        uploadSing(params)
          .then(function(res) {
            widget.showToast('上传成功', 'success');
            setTimeout(function() {
              widget.navigateBack();
            }, 500);
          })
          .catch()
      }); 
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      
    },

    onHide:function () {
        
    },
    onUnload:function () {
      let {innerAudioContext, timeInterval} = this.data;
        if (innerAudioContext) {
          innerAudioContext.destroy();
        }
        if (timeInterval) {
          clearInterval(timeInterval);
        }
    }
})
