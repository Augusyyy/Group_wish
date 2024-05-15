let utils = require('./util.js');
let app = wx;
let api = require("./api.js");
const cache = require("./cache.js");
const string = require("./string.js");

module.exports = {
	/**
	 * 显示消息提示框
	 * @param title  提示的内容
	 * @param type 图标可选值success / fail / loading / none
	 * @param opts 其他参数
	 */
	showToast: function (title, type, opts) {
		let options = {
			title: title,
			icon: type ? type : 'none',
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.showToast(options);
	},
	alert: function (title, content, successFunc, cancelFunc, opts) {
		let options = {
			title: title,
			content: content ? content : '',
			showCancel: false,
			success(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					utils.isFunction(successFunc) ? successFunc(res) : '';
				} else if (res.cancel) {
					console.log('用户点击取消');
					utils.isFunction(cancelFunc) ? cancelFunc(res) : '';
				}
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.showModal(options);
	},
	confirm: function (title, content, successFunc, cancelFunc, opts) {
		let options = {
			title: title,
			content: content ? content : '',
			showCancel: true,
			success(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					utils.isFunction(successFunc) ? successFunc(res) : '';
				} else if (res.cancel) {
					console.log('用户点击取消');
					utils.isFunction(cancelFunc) ? cancelFunc(res) : '';
				}
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.showModal(options);
	},
	showActionSheet: function (list, successFunc, cancelFunc, opts) {

		let options = {
			itemList: list,
			success(res) {
				console.log(res);
				utils.isFunction(successFunc) ? successFunc(res) : '';
			},
			fail(res) {
				console.log(res);
				utils.isFunction(cancelFunc) ? cancelFunc(res) : '';
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.showActionSheet(options);

	},
	location: function (path, successFunc, opts) {
		let options = {
			url: path,
			success: function (res) {
				utils.isFunction(successFunc) ? successFunc(res) : '';
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.navigateTo(options);
	},
	redirectTo: function (path, successFunc, opts) {
		let options = {
			url: path,
			success: function (res) {
				utils.isFunction(successFunc) ? successFunc(res) : '';
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.redirectTo(options);
	},
	reLaunch: function (path, successFunc, opts) {
		let options = {
			url: path,
			success: function (res) {
				utils.isFunction(successFunc) ? successFunc(res) : '';
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.reLaunch(options);
	},
	switchTab: function (path, successFunc, opts) {
		let options = {
			url: path,
			success: function (res) {
				utils.isFunction(successFunc) ? successFunc(res) : '';
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.switchTab(options);
	},
	navigateBack: function (delta, successFunc, opts) {
		let options = {
			delta: delta ? delta : 1
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.navigateBack(options);
	},
	showLoading: function (title, opts) {
		let options = {
			title: title ? title : '加载中',
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.showLoading(options);
	},
	hideLoading: function (opts) {
		let options = {};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.hideLoading(options);
	},
	/**
	 * 打开坐标点
	 * @param lat
	 * @param lng
	 * @param scale
	 * @param opts
	 */
	openLocation: function (lat, lng, scale, opts) {
		let options = {
			latitude: lat,
			longitude: lng,
			scale: scale ? scale : 18
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.openLocation(options);
	},
	/**
	 * 选择坐标点
	 * @param opts
	 */
	chooseLocation: function (opts) {
		let options = {};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.chooseLocation(options);
	},

	/**
	 * 复制文本
	 * @param text
	 * @param successFunc
	 * @param opts
	 */
	copyText: function (text, successFunc, opts) {
		let options = {
			data: data.text,
			success(res) {
				utils.isFunction(successFunc) ? successFunc(res) : '';
			}
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.setClipboardData(options);
	},
	/**
	 * 拨打电话
	 * @param phone
	 * @param opts
	 */
	makePhoneCall: function (phone, opts) {
		let options = {
			phoneNumber: phone
		};
		if (typeof opts === 'object') {
			Object.assign(options, opts);
		}
		app.makePhoneCall(options);
	},
	/**
	 * 上传文件
	 * @param file
	 * @param opts
	 * @returns {*|Promise<any>}
	 */
	uploadFile: function (file, opts) {
		let that = this;
		let options = {
			url: api.UPLOAD_MEDIA,
			name: 'file',
			filePath: file,
			formData:{
				// 'x-oss-security-token': securityToken // 使用STS签名时必传。
			},
			header: {
				// "Content-Type": "application/json; charset=UTF-8",
				// 'Content-Type': 'multipart/form-data',
				'Authorization': cache.get(string.JWT_TOKEN_KEY),
			},
			success: (res) => {
				console.log(res);
			},
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		console.log(options);
		return app.uploadFile(options);
	},

	/**
	 * 选择图片
	 * @param successFunc
	 */
	chooseImage: function (successFunc) {
		let options = {
			count: 9,
			mediaType: ['image'],
			sizeType: ['compressed'],
			success: (res) => {
				console.log(res.filePaths);
				successFunc && successFunc(res)
			},
		};
		app.chooseImage(options);
	},

	/**
	 * 预览图片
	 * @param urls
	 * @param idx
	 */
	previewImage: function (urls, idx) {
		let options = {
			current: idx ? idx : 0,
			urls: urls
		};
		app.previewImage(options);
	},
	/**
	 * 压缩图片
	 * @param urls
	 * @param opts
	 */
	compressImage: function (urls, opts) {
		let options = {
			filePaths: urls,
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.compressImage(options);
	},
    wxLogin:function (type, opts) {
        let options = {
        };
        if (typeof opts === "object") {
            Object.assign(options, opts);
        }
        if (this.isQyWx()) {
            app.qy.login(options);
        } else {
            app.login(options);
        }
    },
	checkSession:function (successFunc,failFunc, opts) {
        let options = {
			success () {
				//session_key 未过期，并且在本生命周期一直有效
				successFunc && successFunc();
			},
			fail () {
				// session_key 已经失效，需要重新执行登录流程
				failFunc && failFunc();
			}
        };
        if (typeof opts === "object") {
            Object.assign(options, opts);
        }
        if (this.isQyWx()) {
            app.qy.checkSession(options);
        } else {
            app.checkSession(options);
        }
    },
	canIUse:function (command) {
		if (this.isQyWx()) {
			app.qy.canIUse(command);
		} else {
			app.canIUse(command);
		}
	},
	isQyWx:function () {
		const sysInfo = app.getSystemInfoSync()
		let res = false;
		if (sysInfo.environment && sysInfo.environment === 'wxwork') {
			res = true;
		}
		return res;
	},
	/**
	 * 设置页面标题
	 * @param title
	 * @param opts
	 */
	setNavigationBarTitle:function (title, opts) {
		let options = {
			title: title
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.setNavigationBarTitle(options)
	},
	/**
	 * 下载文件
	 * @param url
	 * @param successFunc
	 * @param opts
	 */
	downloadFile: function(url, successFunc, opts) {
		let options = {
			url: url,
			success: (res) => {
				successFunc && successFunc(res)
			},
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.downloadFile(options);
	},
	/**
	 * 保存
	 * @param path
	 * @param successFunc
	 * @param opts
	 */
	saveFile: function(path, successFunc, opts) {
		let options = {
			tempFilePath: path,
			success: (res) => {
				successFunc && successFunc(res)
			},
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.saveFile(options);
	},
	/**
	 * 打开文件
	 * @param path
	 * @param successFunc
	 * @param opts
	 */
	openDocument: function(path, successFunc, opts) {
		let options = {
			filePath: path,
			success: (res) => {
				successFunc && successFunc(res)
			},
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.openDocument(options);
	},
	/**
	 * 打开文件
	 */
	requestPayment: function(opts) {
		let options = {
			timeStamp:'',
			nonceStr:'',
			package:'',
			paySign:'',
			signType:'',
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.requestPayment(options);
	},

	/**
	 * 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
	 */
	pageScrollTo: function(scrollTop = 0, opts) {
		let options = {
			scrollTop: scrollTop,
			duration: 300
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.pageScrollTo(options);
	},

	/**
	 * 下拉刷新
	 */
	startPullDownRefresh: function() {
		app.startPullDownRefresh();
	},

	/**
	 * 停止刷新
	 */
	stopPullDownRefresh: function() {
		app.stopPullDownRefresh();
	},

	/**
	 * 停止刷新
	 */
	showShareMenu: function(scrollTop = 0, opts) {
		let options = {
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		};
		if (typeof opts === "object") {
			Object.assign(options, opts);
		}
		app.showShareMenu();
	},
}