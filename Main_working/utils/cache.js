module.exports = {
    set : function (key, value) {
        value = JSON.stringify(value);
        wx.setStorageSync(key,value);
    },
    get : function (key) {
        var value =  wx.getStorageSync(key);
        if(value){
            value = JSON.parse(value);
        }
        return value;
    },
    remove : function (key) {
        wx.removeStorageSync(key);
    },
    clear : function () {
        wx.clearStorageSync();
    }
}