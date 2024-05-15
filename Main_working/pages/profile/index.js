const widget = require('../../utils/widget');
const {logout} = require("../../api/account");
const oss = require("../../utils/oss");
const {getUserProfile, setUserProfile} = require("../../api/member");
//获取应用实例
const app = getApp();
Page({
    data: {
        user: {},
        menus:[
            {name:'我的心愿卡', url:'/pages/cards/index'},
            {name:'我的奖品', url:'/pages/gifts/index'},
            {name:'我的心愿币', url:'/pages/reward/index'},
            {name:'我的陪玩币', url:'/pages/pAmount/index'}
            // {name:'活跃提交', url:'/pages/active/index'},
            // {name:'每日签到', url:'/pages/sign/index'},
        ],
        wxAvatar: '',
        wxName: '',
        elite: '',
    },
    onLoad: function () {
        
    },
    onShow:function () {
        // this.loadUserInfo();
        // if (!app.checkAuth) {
        //   return false;
        // }
        if (app.isLogin()) {
          this.loadUserInfo();
        }
    },

    userNameUpdate: function() {
      let that = this;
      let {wxName, avatarUrl} = that.data;
      wx.showModal({
        title: '修改名字',
        editable: true,
        placeholderText: '请输入名字',
        content: wxName,
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            if (wxName !== res.content) {
              that.updateUserProfile(res.content, avatarUrl);
              that.setData({
                wxName: res.content
              })
            }
          }
        }
      })
    },

    onChooseAvatar(e) {
      console.log(e);
      let that = this;
      let {wxName} = that.data;
      const { avatarUrl } = e.detail;

      oss.uploadFile(avatarUrl).then(function (res) {
        console.log(res);
        let {url} = res;
        if (url) {
          that.setData({
            avatarUrl:url
          });
          that.updateUserProfile(wxName, url);
        }
      });
    },

    updateUserProfile(wxName, url) {
      let params = {
        name: wxName,
        avatar: url
      }
      setUserProfile(params)
        .then(function(res) {

        })
        .catch(function(res) {

        })
    },

    loadUserInfo(){
        let that = this;
        getUserProfile({}, true)
          .then(function(res) {
              let name = res.name ? res.name : "微信用户";
              let url = res.avatar ? res.avatar : "/images/avatar.png";
              that.setData({
                wxName: name,
                avatarUrl: url,
                elite: res.elite
              })
          })
          .catch(function(res) {

          })
    },
    /**
     * 退出
     */
    toDetail:function (e) {
        let {info:{type, url}} = e.currentTarget.dataset;
        if (type === 'logout') {
            widget.confirm('提示', '您确定退出吗？', function () {
                logout({}).then(function (res) {
                    app.clearUserInfo();
                    widget.reLaunch('/pages/login/index');
                });
            });
            return false;
        }
        if (url) {
          console.log(url)
            widget.location(url);
        }

    }
})
