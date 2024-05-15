/**
 * Created by luffy
 */

import http from "./http.js";
import api from "./api.js";
import widget from "./widget.js";
import string from "./string.js";
import cache from "./cache.js";

const basePath = 'wx_assets';

/**
 * 生成唯一id
 * @returns {string}
 */
function uuid() {
	let d = new Date().getTime();
	let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

/**
 * 生成新的名称
 * @returns {string}
 */
function toBuildPath(filePath) {
	let now = new Date();
	let pathArr = [];
	pathArr.push(now.getFullYear()+''+(now.getMonth()+1)+''+now.getDate());
	let filename = now.getHours()+''+now.getMinutes()+''+now.getSeconds()+uuid();
	if (filePath && filePath.lastIndexOf('.')) {
		filename+= filePath.substring(filePath.lastIndexOf('.'));
	}
	pathArr.push(filename);
	return pathArr.join('/');
}

function uploadFile(filePath){
	return  http.get( api.OSS_TOKEN, {}, true).then(function (res) {
		let {host, dir,policy, signature, accessId } = res;
		let path = dir+toBuildPath(filePath)
		return new Promise((resolve, reject) => {
			let options = {
				url: host,
				name: 'file',
				filePath: filePath,
				formData:{
					key:path,
					policy:policy,
					OSSAccessKeyId: accessId,
					signature:signature,
					success_action_status:200,
					// 'x-oss-security-token': securityToken // 使用STS签名时必传。
				},
				header: {
					// "Content-Type": "application/json; charset=UTF-8",
					// 'Content-Type': 'multipart/form-data',
				},
				success: (res) => {
					console.log(res);
					let url = host + '/'+path;
					resolve({
						host:host,
						path:'/'+path,
						url:url
					});

				},
				fail:function (res) {
					console.log(res);
					reject(res);
				}
			};
			widget.uploadFile(filePath, options)
		})
	}).catch(function (res) {
		widget.showToast(res.errMsg ? res.errMsg : string.TOKEN_FAILED);
		return res;
	});
}
//抛出wx.request的post,get,put,remove方法
module.exports = {
	uploadFile,
}
