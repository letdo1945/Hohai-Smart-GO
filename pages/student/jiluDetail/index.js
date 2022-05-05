var a = getApp();

Page({
    data: {
        data: null,
        userInfo: null
    },
    onLoad: function(t) {
        var e = getCurrentPages(), n = e[e.length - 2];
        this.setData({
            data: n.data.item,
            userInfo: a.globalData.userInfo
        });
    }
});