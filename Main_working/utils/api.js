let env = require('./env.js');
const BaseApi = env.BASE_API_HOST_DEV;

module.exports = {
    //微信相关
    GET_OPEN_ID: BaseApi + "/open/open_id_by_code",

    /**
     * MEMBER
     */
    MEMBER_COUPON: BaseApi + '/member/member_coupon',
    MEMBER_LOTTERY_ON: BaseApi + '/member/lottery',
    MEMBER_LOTTERY_ON1: BaseApi + '/member/lottery2',
    MEMBER_LOTTERY_COUNT: BaseApi + '/member/lottery_count',
    MEMBER_COMPOUND: BaseApi + '/member/compound',
    MEMBER_NOTICE_LIST: BaseApi + '/open/notice',
    MEMBER_POSTER_LIST: BaseApi + '/open/poster',
    MEMBER_ACTIVITY_LIST: BaseApi + '/open/activity',
    MEMBER_ACTIVITY_JOIN: BaseApi + '/member/join_activity',
    MEMBER_USER_PROFILE: BaseApi + '/member/get_profile',
    MEMBER_UPDATE_PROFILE: BaseApi + '/member/update_profile',
    MEMBER_GET_GIFT: BaseApi + '/member/get_gift',

    MEMBER_GET_REWARD: BaseApi + '/member/get_my_reward',
    MEMBER_JEWE_EXCHANGE: BaseApi + '/member/exchange_jewel',
    MEMBER_MY_JEWE: BaseApi + '/member/get_my_jewel',
    MEMBER_ALL_PRIZES: BaseApi + '/member/get_all_prizes',

    MEMBER_TOP_LIST: BaseApi + '/open/fight_list',
    MEMBER_COIN_LIST: BaseApi + '/open/coin_list',
    MEMBER_WE_LIST: BaseApi + '/open/welfare_list',
    MEMBER_APPLY: BaseApi + '/member/apply_for_team',
    MEMBER_APPLY_ACTIVE: BaseApi + '/member/apply_for_active',
    MEMBER_GIFT_EXCHANGE: BaseApi + '/member/gift_exchange',

    MEMBER_GET_ALL_TEAM: BaseApi + '/member/get_all_member',
    MEMBER_PUBLISH_SING: BaseApi + '/member/publish_sing',
    MEMBER_SING_LIST: BaseApi + '/member/get_sing_list',
    MEMBER_SING_DELETE: BaseApi + '/member/song_delete',
    MEMBER_UPLOAD_SING: BaseApi + '/member/upload_sing',
    MEMBER_SING_DETAIL_LIST: BaseApi + '/open/upload_list',
    MEMBER_GET_SONG_LIST: BaseApi + '/member/get_song_list',
    MEMBER_SING_REWARD: BaseApi + '/member/sing_reward',
    MEMBER_SONG_REWARD: BaseApi + '/member/song_reward',

    MEMBER_SIGN_IN: BaseApi + '/member/sign_in',

    MEMBER_GET_GROUP: BaseApi + '/member/get_group_list',

    MEMBER_BANNER_LIST: BaseApi + '/open/banner_list',
    MEMBER_SONG_LIKE: BaseApi + '/member/k_sing_like',
    MEMBER_HOME_LIST: BaseApi + '/open/get_home_list',

    MEMBER_PP_APPLY: BaseApi + '/member/pp_apply',
    MEMBER_PP_LIST: BaseApi + '/member/get_pp_list',
    MEMBER_PP_SEARCH: BaseApi + '/member/search_pp_list',
    MEMBER_PP_ORDER: BaseApi + '/member/pp_order',
    MEMBER_ORDER_LIST: BaseApi + '/member/get_order_list',
    MEMBER_PP_ORDER_LIST: BaseApi + '/member/get_pp_order_list',
    MEMBER_ORDER_INFO: BaseApi + '/member/get_order_info',
    MEMBER_PP_ORDER_INFO: BaseApi + '/member/get_pp_order_info',
    MEMBER_PP_CONFIRM: BaseApi + '/member/pp_confirm',
    MEMBER_PP_DONE: BaseApi + '/member/pp_done',
    MEMBER_ORDER_DONE: BaseApi + '/member/order_done',
    MEMBER_ORDER_CANCEL: BaseApi + '/member/order_cancel',

    MEMBER_TEAM_URL: BaseApi + '/open/get_team_url',
    MEMBER_ONCE_REWARD: BaseApi + '/member/get_once_reward',
    MEMBER_MAGIC_START: BaseApi + '/member/magic_start',
    MEMBER_MAGIC_IN: BaseApi + '/member/magic_sign_in',

    UPLOAD_MEDIA: BaseApi+'/member/upload_media',
    OSS_TOKEN: BaseApi+'/member/get_oss_token',

    LOGIN: BaseApi + '/open/login',
    SHARE_INFO: BaseApi + '/member/share_info',
    GET_CONFIG: BaseApi + '/open/get_config',
};