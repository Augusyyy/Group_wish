import {treeToList} from '../../utils/util'
Page({
	data: {
		id:'',
		loading:false,
		logistics:{},
		steps: [],
	},
	onLoad: function (options) {
		let {id} = options;
		this.setData({
			id:id?id:'',
		});
		this.loadDataByEventChannel();
	},
	onShow: function () {
		// let list = [
		// 	{
		// 		member:{name:'路飞'},
		// 		dipanCode:'dc000001',
		// 		point:'10000',
		// 		revokePoint:'8000',
		// 		presents:[
		// 			{
		// 				member:{name:'路飞'},
		// 				dipanCode:'dc000002',
		// 				point:'20000',
		// 				revokePoint:'1000'
		// 			}
		// 		]
		// 	}
		// ];
		// this.setData({
		// 	steps: treeToList(list, 'presents'),
		// });
	},

	/**
	 * 加载上一个页面传递数据
	 */
	loadDataByEventChannel(){
		let that = this;
		this.eventChannel = this.getOpenerEventChannel();
		if (this.eventChannel && this.eventChannel.on) {
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			this.eventChannel.on('acceptDataFromOpenerPage', function (data) {
				console.log('接受到数据', data);
				let {presents} = data;
				that.setData({
					steps: treeToList(presents, 'presents'),
				});
			})
		}
	},
});
