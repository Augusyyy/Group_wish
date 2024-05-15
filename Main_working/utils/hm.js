import cache from "./cache";
import string from "./string";
/**
 * hm
 */
module.exports =  {
    SecKillId : 2147483647,
    TopId : 2147483646,

    types:{
        //页面
        home:'首页',
        Search:'搜索列表页',
        product:'商品详情页',
        user:'个人中心页',
        MyPoint:'我的积分页',
        PointDetail:'积分详情页',
        address:'地址管理页',
        Cart:'购物车页',
        Pay:'支付页',
        order:'我的订单页',
        OrderHistory:'历史订单页',
        OrderDetail:'订单详情页',
        qa:'常见问题页',
        rule:'平台规则页',
        setting:'修改密码页',
        policy:'积分政策页',
        Car:'积分购车页',
        Lottery:'抽奖页',
        activity:'活动页',
        category:'分类页面',
        SecKill:'秒杀列表',
        Top:'榜单列表',

        //特殊统计
        ActivityOnlyScanEvent:'活动页-未点击商品',
        ActivityJoinCartEvent:'活动页-加入购物车',
        ActivityToBuyEvent:'活动页-立即购买',
        ActivityDetailEvent:'活动页-商品详情',

        //事件
        SearchBtn:'关键词搜索',
        JoinCartBtn:'加入购物车',
        ToBuyBtn:'立即购买',
        BuyBtn:'结算按钮',
        PayBtn:'提交订单',
        ConfirmOrderBtn:'确认收货',
        CancelOrderBtn:'取消订单',
        CarApplyBtn:'积分购车',
        PointExchangeBtn:'积分转赠',
        CategoryBtn:'分类点击',
        BrandBtn:'品牌点击',
    },
    track : function (key, params) {
        let data = {
            name:key,
            delay:0,
            h5:1,
        };
        let now = new Date().getTime();
        let pageInTime = cache.get(string.CACHE_PAGE_IN_TIME);
        if (pageInTime) {
            data.delay = now - pageInTime;
        }
        if (typeof params !== 'undefined') {
            for (let k in params) {
                data[k] = params[k];
            }
        }
    },
}