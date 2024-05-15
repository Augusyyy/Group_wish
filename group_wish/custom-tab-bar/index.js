Component({
    data: {
        selected: 0,
        "color": "#999999",
        "selectedColor": "#000000",
        "backgroundColor": "#ffffff",
        "list": [
            {
                "pagePath": "/pages/discover/index",
                "text": "发现",
                "iconPath": "/images/tabs/discover.png",
                "selectedIconPath": "/images/tabs/discover_a.png"
            },
            {
                "pagePath": "/pages/car/index",
                "text": "购车",
                "iconPath": "/images/tabs/featured.png",
                "selectedIconPath": "/images/tabs/featured_a.png"
            },
            {
                "pagePath": "/pages/featured/index",
                "text": "精选",
                "iconPath": "/images/tabs/car.png",
                "selectedIconPath": "/images/tabs/car_a.png"
            },
            {
                "pagePath": "/pages/profile/index",
                "text": "我的",
                "iconPath": "/images/tabs/me.png",
                "selectedIconPath": "/images/tabs/me_a.png"
            }
        ]
    },
    attached() {
    },
    methods: {
        onTabChange(e) {
            // console.log(e);
            let {index, item:{pagePath}} = e.detail;
            // console.log(index, pagePath);
            wx.switchTab({
                url: pagePath,
            });
            this.setData({
                selected:index
            });
        }
    }
})
