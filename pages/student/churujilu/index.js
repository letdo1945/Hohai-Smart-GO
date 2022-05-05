var a = getApp();

Page({
    data: {
        userInfo: null
    },
    onLoad: function() {
        this.setData({
            userInfo: a.globalData.userInfo
        });
    }
});