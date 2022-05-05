var t = getApp();

Page({
    data: {
        item: null,
        userInfo: null
    },
    onLoad: function() {
        this.setData({
            userInfo: t.globalData.userInfo
        });
    },
    onSelect: function(t) {
        this.setData({
            item: t.detail
        });
    }
});