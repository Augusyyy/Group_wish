const enums = require("./enums");
const env = require("./env");

/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) {
	var weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	var amPm = ['上午', '下午'];
	var o = {
		"M+": this.getMonth() + 1,                 //月份
		"d+": this.getDate(),                    //日
		"h+": this.getHours(),                   //小时
		"m+": this.getMinutes(),                 //分
		"s+": this.getSeconds(),                 //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds(),             //毫秒
		"a": this.getHours() >= 12 ? amPm[1] : amPm[0],             //毫秒
		"w": weekMap[this.getDay()]             //星期
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
/**
 * 获取时间错
 * @returns {number}
 */
Date.prototype.timestamp = function () {
	return Math.floor(this.getTime() / 1000);
};

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

/**
 * 判断目标是否是函数
 * @param {mixed} val
 * @returns {boolean}
 */
function isFunction(val) {
	return typeof val === 'function';
}

function isEmptyObject(e) {
	var t;
	for (t in e)
		return !1;
	return !0
}

/*获取当前页url*/
function getCurrentPageUrl() {
	var pages = getCurrentPages()    //获取加载的页面
	var currentPage = pages[pages.length - 1]    //获取当前页面的对象
	var url = currentPage.route    //当前页面url
	return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
	var pages = getCurrentPages()    //获取加载的页面
	var currentPage = pages[pages.length - 1]    //获取当前页面的对象
	var url = currentPage.route    //当前页面url
	var options = currentPage.options    //如果要获取url中所带的参数可以查看options

	//拼接url的参数
	var urlWithArgs = url + '?'
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

	return urlWithArgs
}

function getCurrentPageQueryOptions() {
  var pages = getCurrentPages()    //获取加载的页面
	var currentPage = pages[pages.length - 1]    //获取当前页面的对象
	var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  
  return options;
}

/*获取当前页带参数的path*/
function getCurrentPageQueryPath() {
	var pages = getCurrentPages()    //获取加载的页面
	var currentPage = pages[pages.length - 1]    //获取当前页面的对象
	var url = currentPage.route    //当前页面url
	var options = currentPage.options    //如果要获取url中所带的参数可以查看options

	//拼接url的参数
	var urlWithArgs = '';
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

	return urlWithArgs
}


const playCtrl = {
	getState: (p) => wx.getBackgroundAudioPlayerState({
		success: (res) => {
			p.success && p.success(res)
		}
	}),
	pause: () => wx.pauseBackgroundAudio(),
	play: (p) => wx.playBackgroundAudio({
		dataUrl: p.url,
		title: p.title
	})
}

//点是否在多边形内
function isInPolygon(checkPoint, polygonPoints) {
	var counter = 0;
	var i;
	var xinters;
	var p1, p2;
	var pointCount = polygonPoints.length;
	p1 = polygonPoints[0];

	for (i = 1; i <= pointCount; i++) {
		p2 = polygonPoints[i % pointCount];
		if (
			checkPoint.longitude > Math.min(p1.longitude, p2.longitude) &&
			checkPoint.longitude <= Math.max(p1.longitude, p2.longitude)
		) {
			if (checkPoint.latitude <= Math.max(p1.latitude, p2.latitude)) {
				if (p1.longitude != p2.longitude) {
					xinters =
						(checkPoint.longitude - p1.longitude) *
						(p2.latitude - p1.latitude) /
						(p2.longitude - p1.longitude) +
						p1.latitude;
					if (p1.latitude == p2.latitude || checkPoint.latitude <= xinters) {
						counter++;
					}
				}
			}
		}
		p1 = p2;
	}
	if (counter % 2 == 0) {
		return false;
	} else {
		return true;
	}
}

function calcDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = lat1 * Math.PI / 180.0;
	var radLat2 = lat2 * Math.PI / 180.0;
	var a = radLat1 - radLat2;
	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
		Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137;// EARTH_RADIUS;
	s = (Math.round(s * 10000) / 10000) * 1000;
	return s;
}


function centerPoint(lat1, lng1, lat2, lng2) {
	return {
		latitude: new Number((lat1 + lat2) / 2.0).toFixed(6) * 1,
		longitude: new Number((lng1 + lng2) / 2.0).toFixed(6) * 1
	};
}


/**
 * 扁平数组转换为树形结构
 * @param list
 * @param parentKey
 * @param childrenKey
 * @returns {Array}
 */
function listToTree(list, parentKey, childrenKey) {
	parentKey = parentKey ? parentKey : 'parent_id';
	childrenKey = childrenKey ? childrenKey : 'children';
	let map = {}, node, tree = [], i;
	for (i = 0; i < list.length; i++) {
		map[list[i].id] = list[i];
		list[i][childrenKey] = [];
	}
	for (i = 0; i < list.length; i += 1) {
		node = list[i];
		if (map[node[parentKey]]) {
			map[node[parentKey]][childrenKey].push(node);
		} else {
			tree.push(node);
		}
	}
	return tree;
}


function getCharLength(str) {
	if (str == null) return 0;
	if (typeof str != "string") {
		str += "";
	}
	return str.replace(/[^\x00-\xff]/g, "01").length;
}


function objectToMap(map, id, name) {
	var res = {};
	id = id ? id : 'id';
	name = name ? name : 'name';
	for (var key in map) {
		res[map[key][id]] = map[key][name];
	}
	return res;
}

function objectToArray(map) {
	var res = [];
	for (var key in map) {
		res.push(map[key]);
	}
	return res;
}

/**
 * 手机号打码显示
 * @param phone
 * @returns {string|string}
 */
function maskPhone(phone){
	let res = phone ? phone.toString() : '';
	if (res.length) {
		res = res.substr(0,3) +'****'+ res.substr(7,4);
	}
	return res;
}

function diffTimeByStr(dateStr){
	let res = '';
	let timestamp = new Date(dateStr.replace(/-/g, '/'));
	var mistiming = Math.round((Date.now() - timestamp) / 1000);
	var arr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
	var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
	for (let i = 0; i < arrn.length; i++) {
		let inm = Math.floor(mistiming / arrn[i]) ;
		if (inm > 0 ) {
			return  res =  inm + arr[i] + '前';
		}
	}
	return  res;
}

function convertHtmlToText (inputText) {
	var returnText = "" + inputText;
	returnText = returnText.replace(/<\/div>/ig, '\r\n');
	returnText = returnText.replace(/<\/li>/ig, '\r\n');
	returnText = returnText.replace(/<li>/ig, '  *  ');
	returnText = returnText.replace(/<\/ul>/ig, '\r\n');
	//-- remove BR tags and replace them with line break
	returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

	//-- remove P and A tags but preserve what's inside of them
	returnText=returnText.replace(/<p.*?>/gi, "\r\n");
	returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

	//-- remove all inside SCRIPT and STYLE tags
	returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
	returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
	//-- remove all else
	returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

	//-- get rid of more than 2 multiple line breaks:
	returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

	//-- get rid of more than 2 spaces:
	returnText = returnText.replace(/ +(?= )/g,'');

	//-- get rid of html-encoded characters:
	returnText=returnText.replace(/&nbsp;/gi," ");
	returnText=returnText.replace(/&amp;/gi,"&");
	returnText=returnText.replace(/&quot;/gi,'"');
	returnText=returnText.replace(/&lt;/gi,'<');
	returnText=returnText.replace(/&gt;/gi,'>');

	return returnText;
}

/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
function formatRichText(html){
	let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
		match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin:0;vertical-align: middle;"');
	return newContent;
}

const GoodsOrderStatus = enums.GoodsOrderStatus;
/**
 * 精品订单状态列表生成
 * @param order
 */
function goodsOrderToSteps(order){
	let steps = [
	];
	let map = {
	}
	map[GoodsOrderStatus.UnPaid.id] = 'createdAt';
	map[GoodsOrderStatus.Paid.id] = 'payAt';
	map[GoodsOrderStatus.Delivered.id] = 'deliverAt';
	map[GoodsOrderStatus.Finished.id] = 'finishAt';
	map[GoodsOrderStatus.Cancel.id] = 'cancelAt';
	for (let k in GoodsOrderStatus) {
		let os = GoodsOrderStatus[k];
		let mk = map[os.id];
		if (mk && order[mk]) {
			steps.push({
				status:os.id,
				name:os.name,
				at:order[mk],
			})
		}
	}
	return steps;
}

function objectToQueryParamsStr(params){
	const query = Object.entries(params)
		.reduce((result, entry) => {
			result.push(entry.join('='))
			return result
		}, []).join('&')
	return `?${query}`
}


function toOrderStatusTitle(status) {
	let OrderStatus = enums.OrderStatus;
	let res = '';
	if (status === 1) {
		status = OrderStatus.Create.id;
	}
	for (let pk in OrderStatus) {
		if (status === OrderStatus[pk].id) {
			res = OrderStatus[pk].name;
		}
	}
	return res;
}

function treeToList(tree, childrenKey) {
	childrenKey = childrenKey ? childrenKey : 'children';
	var queen = [];
	var out = [];
	queen = queen.concat(tree);
	while(queen.length) {
		var first = queen.shift();
		if (first[childrenKey]) {
			queen = queen.concat(first[childrenKey]);
			delete first[childrenKey];
		}
		out.push(first);
	}
	return out;
}

//资源前缀处理
function prefix(url) {
	if (url && !url.startsWith('http')) {
		return env.IMG_HOST+url
	} else {
		return url
	}
}

module.exports = {
	playCtrl: playCtrl,
	isFunction: isFunction,
	isEmptyObject: isEmptyObject,
	calcDistance: calcDistance,
	getCurrentPageUrl: getCurrentPageUrl,
	isInPolygon: isInPolygon,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  getCurrentPageQueryOptions: getCurrentPageQueryOptions,
	getCurrentPageQueryPath: getCurrentPageQueryPath,
	centerPoint: centerPoint,
	listToTree: listToTree,
	getCharLength: getCharLength,
	objectToMap: objectToMap,
	maskPhone: maskPhone,
	diffTimeByStr: diffTimeByStr,
	objectToArray: objectToArray,
	formatRichText: formatRichText,
	goodsOrderToSteps: goodsOrderToSteps,
	objectToQueryParamsStr: objectToQueryParamsStr,
	toOrderStatusTitle: toOrderStatusTitle,
	treeToList: treeToList,
	prefix: prefix,
	convertHtmlToText:convertHtmlToText
}
