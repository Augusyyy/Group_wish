const app = getApp();
const widget = require('../../utils/widget');
const {singDetailList, songReward} = require("../../api/member");
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: true
});

Page({
    data: {
      singList: [],
      page:1,
      limit: 10,
      sum: 0,
      done: '',
      curId: '',
      name: '',
      member: '',
      partString: '',
      endTime: '',
      type: '',
      amount: '',
      residue: '',
      isMe: '',
      endTimestamp: '',
      avatar: '',
      curIdx: '',
      myId: '',
    },

    onLoad: function (options) {
      let that = this;
      // app.checkAuth();
      let userInfo = app.getUserInfo();
      this.setData({
        curId: options.sid,
        name: options.name,
        partString: options.part,
        member: options.member,
        endTime: options.time,
        type: options.type * 1,
        amount: options.amount * 1,
        residue: options.residue * 1,
        isMe: options.me,
        endTimestamp: options.timestamp,
        avatar: options.avatar,
        myId: userInfo.id
      })
      // this.singList();
      innerAudioContext.onCanplay(function() {
        // let {singList} = that.data;
        console.log('can play')
        let {singList, curIdx} = that.data;
        singList[curIdx].play = 'start';
        that.setData({
          singList: singList
        })
      });
      innerAudioContext.onStop(function() {
        console.log('on stop');
      });
      innerAudioContext.onEnded(function() {
        console.log('停止');
        let {singList, curIdx} = that.data;
        singList[curIdx].play = 'none';
        that.setData({
          singList: singList
        })
      });
      innerAudioContext.onPause(function() {
        console.log('onPause');
      });
  },

  closeEvent: function() {
    this.setData({
      page: 1,
      sum: 0
    });
    this.singList();
  },

    singList: function() {
      let that = this;
      let {page, limit, singList, sum, curId} = that.data;
      let currList = [];
      singDetailList({
        id: curId,
        page:page,
        limit: limit
      })
        .then(function(res) {
          if (page === 1) {
            currList = res.list;
          } else {
            currList = singList.concat(res.list);
          }
          let curLe = res.list ? res.list.length : 0;
          sum += curLe;
          page += 1;
          let doneType = sum === res.count ? 'done' : '';
          that.setData({
            singList: currList,
            done: doneType,
            page: page,
            sum: sum
          });
        })
        .catch(function(res) {
          console.log(res)
        })
    },

    loadList: function() {
      let {done} = this.data;
      if (done !== 'done') {
        this.singList();
      }
    },

    playAudio: function(e) {
      let that = this;
      let data = e.currentTarget.dataset;
      let {singList} = this.data;

      singList.forEach(function(item) {
        item.play = 'none';
      });
      if (innerAudioContext.src && innerAudioContext.src === data.url) {
        if (innerAudioContext.paused) {
          innerAudioContext.play();
          singList[data.idx].play = 'start';
        } else {
          innerAudioContext.pause();
          singList[data.idx].play = 'pause';
        }
        // singList[data.idx].play = 'pause';
      } else {
        innerAudioContext.src = data.url;
        innerAudioContext.play();
        singList[data.idx].play = 'loading';
      }
      this.setData({
        singList: singList,
        curIdx: data.idx
      });
    },

    rewardSuccess: function(e) {
      let that = this;
      let target = e.currentTarget.dataset;
      let value = e.detail.value;
      let {singList, residue, amount} = that.data;
      for (let i in singList) {
        if (i == target.idx) {
          singList[i].status = 1;
          break;
        }
      }
      
      if (value) {
        residue -= value;
      } else {
        residue -= amount;
      }
      that.setData({
        singList: singList,
        residue: residue,
        amount: amount
      });
    },

    rewardFun: function(id, value, idx) {
      let that = this;
      let {singList, type, amount, residue} = that.data;
      let params = {id};
      if (value) {
        params.value = value;
      }
      songReward(params)
        .then(function(res) {
          widget.showToast('打赏成功', 'success');
          for (let i in singList) {
            if (i == idx) {
              singList[i].status = 1;
              break;
            }
          }
          if (type === 1) {
            residue -= value;
          } else {
            residue -= amount;
          }
          that.setData({
            singList: singList,
            residue: residue,
            amount: amount
          });

        })
        .catch(function(res) {
    
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      this.setData({
        page: 1,
        sum: 0
      });
      this.singList();
    },

    onHide:function () {
        
    },
    onUnload:function () {
      if (innerAudioContext) {
        innerAudioContext.stop();
        innerAudioContext.offCanplay();
        innerAudioContext.offEnded();
        innerAudioContext.offStop();
      }
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh () {
      this.singList();
    },

    onShareAppMessage() {
      let {myId,curId,name,partString,member,endTime,type,amount,residue,isMe,endTimestamp,avatar} = this.data;
      return {
        path: 'pages/singDetail/index?page=sing_detail&id='+myId+'&sid='+curId+'&name=' + name + '&member=' + member + '&part=' + partString + '&time=' + endTime + '&type=' + type + '&amount=' + amount + '&residue=' + residue + '&me=' + isMe + '&timestamp=' + endTimestamp + '&avatar=' + avatar
      }
    },
})
