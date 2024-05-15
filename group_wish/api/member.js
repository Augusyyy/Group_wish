const http = require("../utils/http.js");
const api = require("../utils/api.js");
/**
 * 获取我的卡片
 * @param params
 * @param hideLoading
 * params = {
 *      loginName: '',//
 *      passwordMd5: '',//
 *  }
 */
export function getMyCards(params, hideLoading) {
    return http.request({
        url: api.MEMBER_COUPON,
        method: 'get',
        hideLoading:!!hideLoading,
        data: params?params:{}
    })
}

/**
 * 获取抽奖次数
 * @param {*} hideLoading 
 */
export function getLotteryCount(hideLoading) {
  return http.request({
    url: api.MEMBER_LOTTERY_COUNT,
    method: 'get',
    hideLoading:!!hideLoading,
    data: {}
  })
}

/**
 * 抽奖
 *  * @param {*} params 
 * @param {*} hideLoading 
 */
export function lotteryTurnOn(params, hideLoading) {
  return http.request({
    url: api.MEMBER_LOTTERY_ON,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 十连抽
 *  * @param {*} params 
 * @param {*} hideLoading 
 */
export function lotteryTurnOn1(params, hideLoading) {
  return http.request({
    url: api.MEMBER_LOTTERY_ON1,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 合成
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function compoundCard (params, hideLoading) {
  return http.request({
    url: api.MEMBER_COMPOUND,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取公告
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getNoticeList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_NOTICE_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取海报
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getPosterList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_POSTER_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取活动
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getActivityList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ACTIVITY_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 报名活动
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function activityJoin (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ACTIVITY_JOIN,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取用户信息
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getUserProfile (params, hideLoading) {
  return http.request({
    url: api.MEMBER_USER_PROFILE,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 更新用户信息
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function setUserProfile (params, hideLoading) {
  return http.request({
    url: api.MEMBER_UPDATE_PROFILE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取我的奖品
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getGifts (params, hideLoading) {
  return http.request({
    url: api.MEMBER_GET_GIFT,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取我的福利
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getMyReward (params, hideLoading) {
  return http.request({
    url: api.MEMBER_GET_REWARD,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 兑换宝石
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function exchangeJewe (params, hideLoading) {
  return http.request({
    url: api.MEMBER_JEWE_EXCHANGE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取我的宝石
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getMyJewe (params, hideLoading) {
  return http.request({
    url: api.MEMBER_MY_JEWE,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取奖品池
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getAllPrizes (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ALL_PRIZES,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 战力排行榜
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getTopList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_TOP_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 心愿币排行榜
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getCoinList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_COIN_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 心愿公益
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getWeList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_WE_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 战队申请
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function teamApply (params, hideLoading) {
  return http.request({
    url: api.MEMBER_APPLY,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 奖品兑换
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function giftExchange (params, hideLoading) {
  return http.request({
    url: api.MEMBER_GIFT_EXCHANGE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取所有战队成员
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getAllTeamMember (params, hideLoading) {
  return http.request({
    url: api.MEMBER_GET_ALL_TEAM,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 发布歌曲
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function publishMySing (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PUBLISH_SING,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 发布的歌曲列表
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getSingList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SING_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 删除发布的歌曲
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function singDelete (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SING_DELETE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 上传歌曲
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function uploadSing (params, hideLoading) {
  return http.request({
    url: api.MEMBER_UPLOAD_SING,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 歌曲列表
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function singDetailList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SING_DETAIL_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * K歌列表
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getSongList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_GET_SONG_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 打赏
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function singReward (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SING_REWARD,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 点歌打赏
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function songReward (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SONG_REWARD,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 活跃申请
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function activeApply (params, hideLoading) {
  return http.request({
    url: api.MEMBER_APPLY_ACTIVE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 活跃申请
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function signIn (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SIGN_IN,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 查看分组
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getGroup (params, hideLoading) {
  return http.request({
    url: api.MEMBER_GET_GROUP,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * banner列表
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function bannerList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_BANNER_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 点赞
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function kLikeSong (params, hideLoading) {
  return http.request({
    url: api.MEMBER_SONG_LIKE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 首页列表
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function homeList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_HOME_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 成为陪玩
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppApply (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_APPLY,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 陪玩列表
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 陪玩列表搜索
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppSearch (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_SEARCH,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 预约陪玩
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppOrder (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_ORDER,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 老板订单
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function orderList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ORDER_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 老板订单详情
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function orderInfo (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ORDER_INFO,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 陪玩订单
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppOrderList (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_ORDER_LIST,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 陪玩订单详情
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppOrderInfo (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_ORDER_INFO,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 陪玩接单
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppSetConfirm (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_CONFIRM,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 陪玩完成
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppSetDone (params, hideLoading) {
  return http.request({
    url: api.MEMBER_PP_DONE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 老板完成
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppOrderDone (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ORDER_DONE,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 取消订单
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function ppOrderCancel (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ORDER_CANCEL,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取战队URL
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getTeamUrl (params, hideLoading) {
  return http.request({
    url: api.MEMBER_TEAM_URL,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 领取新人红包
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getOnceReward (params, hideLoading) {
  return http.request({
    url: api.MEMBER_ONCE_REWARD,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 开通魔法签到
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function magicStart (params, hideLoading) {
  return http.request({
    url: api.MEMBER_MAGIC_START,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 魔法签到
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function magicIn (params, hideLoading) {
  return http.request({
    url: api.MEMBER_MAGIC_IN,
    method: 'post',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}

/**
 * 获取配置
 * @param {*} params 
 * @param {*} hideLoading 
 */
export function getConfig (params, hideLoading) {
  return http.request({
    url: api.GET_CONFIG,
    method: 'get',
    hideLoading:!!hideLoading,
    data: params?params:{}
  })
}