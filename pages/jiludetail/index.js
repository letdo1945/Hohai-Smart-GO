var t = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        error: !1,
        userInfo: null,
        data: null
    },
    onLoad: function(a) {
        var i = this;
        this.setData({
            error: !1,
            userInfo: e.globalData.userInfo
        }), wx.showLoading({
            title: "加载中..."
        }), (0, t.Request)(t.Api.getJiLuDetail, {
            id: a.id
        }).then(function(e) {
            e.createTime = e.createTime.substr(0, 16), e.startTime = e.startTime.substr(0, 10), 
            e.endTime = e.endTime.substr(0, 10), e.status = t.Util.status(e.dictionaryInfo), 
            i.setData({
                data: e
            }), wx.hideLoading();
        }).catch(function(t) {
            wx.hideLoading(), i.setData({
                error: !0
            });
        });
    },
    onReSubmit: function() {
        0 !== this.data.data.type ? wx.navigateTo({
            url: "/pages/fangke/index"
        }) : wx.navigateTo({
            url: "/pages/shenqing/index"
        });
    }
});