const api = require("./api");

module.exports = {
    //登录类型
    LoginType: {
        Password: {id: 1, name: '密码登录'},
        Captcha: {id: 2, name: '验证码登录'},
        Register: {id: 3, name: '注册'},
        Reset: {id: 4, name: '忘记密码'},
    },

    //分享的页面
    sharePage: {
      'apply': '战队申请',
      'banner': 'banner',
      'detail': '活动详情',
      'notice_detail': '公告详情',
      'publish': '点歌',
      'home_reward': '首页红包',
      'sing_detail': '任务歌曲列表'
    },

    /**
     * 搜索类型
     */
    SearchType: {
        Activity: {id: 1, name: '活动专区'},
    },

    /**
     * 订单状态
     */
    OrderStatus: {
        Create: {id: 0, name: '已下单', type: 'warning'},
        Commit: {id: 1, name: '已下单', type: 'primary'},//已确认
        Paid: {id: 2, name: '已支付', type: 'primary'},
        Deliver: {id: 3, name: '已发货', type: 'success'},
        Archive: {id: 4, name: '订单完成', type: 'success'},//已归档
        Finish: {id: 9, name: '订单完成', type: 'success'},
        Cancel: {id: -1, name: '已退回', type: 'danger'},
    },

    /**
     * 积分类型
     * 0、充值，1、赠送，2、收到赠送，3、消费，4、回退，5、取消订单，6、后台取消订单，7、过期积分，8、积分购车 10积分撤销 明细
     */
    PointType: {
        RECHARGE: {id: 0, name: '充值', type: 'success', suffix:'+'},
        PRESENT: {id: 1, name: '赠送', type: 'danger', suffix:'-'},
        PRESENTED: {id: 2, name: '收到赠送', type: 'success', suffix:'+'},
        CONSUME: {id: 3, name: '消费', type: 'danger', suffix:'-'},
        SEND_BACK: {id: 4, name: '回退', type: 'success', suffix:'+'},
        CANCEL_CONSUME: {id: 5, name: '取消订单', type: 'success', suffix:'+'},
        ADMIN_CANCEL_CONSUME: {id: 6, name: '后台取消订单', type: 'success', suffix:'+'},
        EXPIRED: {id: 7, name: '过期积分', type: 'danger', suffix:'-'},
        BuyCar: {id: 8, name: '积分购车', type: 'danger', suffix:'-'},
        BuyCarCancel: {id: 9, name: '积分购车取消', type: 'success', suffix:'+'},
        BatchCancel: {id: 10, name: '积分撤销', type: 'danger', suffix:'-'},
    },

    /**
     * 资料审核状态
     */
    AuditStatus: {
        Waiting: {id: 0, name: '待审核', type: 'info'},
        Success: {id: 1, name: '通过', type: 'success'},
        Failed: {id: -1, name: '不通过', type: 'danger'},
    },

    /**
     * 电话审核状态
     */
    TelStatus: {
        Waiting: {id: 0, name: '待审核', type: 'info'},
        Success: {id: 1, name: '通过', type: 'success'},
        Failed: {id: -1, name: '不通过', type: 'danger'},
        // Unknown: {id: 3, name: '未接通', type: 'warning'},
    },

    /**
     * 返款状态
     */
    RebateStatus: {
        Waiting: {id: 0, name: '待确认', type: 'info'},
        Confirmed: {id: 1, name: '已确认', type: 'success'},
        // Failed: {id: -1, name: '已拒绝', type: 'danger'},
    },

    /**
     * 抽奖状态
     */
    LotteryStatus: {
        Off: {id: -1, name: '未开启'},
        Normal: {id: 0, name: '不可抽奖'},
        Lottery: {id: 1, name: '可抽奖'},
        ConfirmAddress: {id: 2, name: '待确认收货地址'},
    },

    /**
     * 抽奖显示类型
     */
    LotteryType: {
        Normal: {id: 0, name: '不可抽奖'},
        Intro: {id: 1, name: '活动介绍'},
        BingGo: {id: 2, name: '中奖状态'},
        Thanks: {id: 3, name: '未中奖状态'},
        Lottery: {id: 4, name: '抽奖状态'},
    },

    /**
     * 奖品等级
     */
    Award: {id: 0, name: '特等奖'},

    GiftExchange: {
      '13': 3,
      '12': 5,
      '11': 12,
      '10': 16,
      '9': 30
    },

    GiftStatus: {
      '0': '可使用',
      '1': '已核销',
      '-1': '已删除'
    },

    LotteryLevelMap: [
      '特等奖',
      '一等奖',
      '二等奖',
      '三等奖',
      '四等奖',
      '五等奖',
      '六等奖',
      '七等奖',
      '八等奖',
      '九等奖',
      '十等奖',
      '十一等奖',
      '十二等奖',
      '十三等奖',
    ],

    RewardType: [
      '',
      '打赏',
      '固定心愿币'
    ],

    ppOrderStatusMap: {
      '0': {name: '待确认', style: 'p-s-0', title: '您有订单待确认！'},
      '1': {name: '已接单', style: 'p-s-1', title: '订单进行中...'},
      '2': {name: '已完成', style: 'p-s-2', title: '订单已完成'},
      '3': {name: '已结算', style: 'p-s-6', title: '订单已结算'},
      '-1': {name: '已拒绝', style: 'p-s-3', title: '已拒绝！'},
      '-2': {name: '爽约', style: 'p-s-4', title: '已放鸽子！'},
      '-3': {name: '已取消', style: 'p-s-5', title: '订单已取消！'}
    },
    orderStatusMap: {
      '0': {name: '进行中', style: 'o-s-0'},
      '1': {name: '已完成', style: 'o-s-1'},
      '2': {name: '已结算', style: 'o-s-2'},
      '-1': {name: '已取消', style: 'o-s-3'}
    },
};