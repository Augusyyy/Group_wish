const widget = require("../../utils/widget");
const string = require("../../utils/string");
const cache = require("../../utils/cache.js");
const oss = require("../../utils/oss");
var util = require("../../utils/util.js");
const app = getApp();
const {setUserProfile} = require("../../api/member");
Page({
	eventChannel:null,
	data: {
		id:'',
		name:'',
		avatar:'',
		loading:false,
	},

	onLoad: function () {
    // app.checkAuth();
		let user = app.getUserInfo();
		this.setData({
			id:user.id,
			name:user.name ? user.name : '',
			avatar:user.avatar ? user.avatar : '',
    });
    wx.hideHomeButton();
  },

	/**
	 * 发布
	 * @returns {boolean}
	 */
	save: function (e) {
		let nickName = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)

		let that = this;
		let {loading, avatar,name, id} = that.data;
		if (loading) {
			return false;
    }
		let params = {
			name: nickName ? nickName.name : name,
			avatar: avatar,
    };
		if (!params.name.length) {
			widget.showToast(string.NAME_REQUIRED);
			return false;
    }
    
    if (params.name === '微信用户' || params.avatar.indexOf('thirdwx.qlogo.cn') > -1) {
      widget.showToast('请修改头像和昵称');
			return false;
    }

		that.setData({
			loading: true
    });
    setUserProfile(params)
      .then(function(res) {
        widget.showToast(string.SAVE_SUCCESS, null, {
          success: function () {
            let user = app.getUserInfo();
            user.name = params.name;
            user.avatar = params.avatar;
            cache.set(string.USER_INFO_KEY, user);
            let url = '/pages/home/index?callback=' + encodeURIComponent(util.getCurrentPageUrlWithArgs());
            setTimeout(function () {
              wx.reLaunch({
                url: url,
              })
            }, 300);
          }
        });
        that.setData({
          loading: false
        });
      })
      .catch(function(res) {
        that.setData({
          loading: false
        });
      })
	},

	/**
	 * 输入框监听
	 * @param e
	 */
	onInputChange(e){
		let {target:{id},detail:val} = e;
    console.log(id, val);
		let opts = {};
    opts[id] = typeof val === 'string' ? val.replace(/\s/g, '') : val;
		this.setData(opts);
  },

	onChooseAvatar(e){
		let that = this;
		const { avatarUrl } = e.detail
		console.log(e);
		oss.uploadFile(avatarUrl).then(function (res) {
			console.log(res);
			let {url} = res;
			if (url) {
				that.setData({
					avatar:url
				});
			}
		});
	},

	/**
	 * 上传图片
	 */
	uploadImg: function (e) {
		console.log(e);
		let that = this;
		const { file } = e.detail;
		// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
		oss.uploadFile(file).then(function (res) {
			console.log(res);
			let {url} = res;
			if (url) {
				that.setData({
					avatar:url
				});
			}
		});
	},

	/**
	 * 退出
	 */
	logout:function () {
		widget.confirm('提示', '您确定退出吗？', function () {
			  app.clearUserInfo();
				widget.reLaunch('/pages/auth/index');
		})
	},
});