var t = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        list: [],
        workList: [],
        number: null,
        steps: null,
        score: null,
        minDate: new Date(Date.now() - 864e5).getTime(),
        workDate: new Date(Date.now() - 6048e5).getTime()
    },
    onReady: function() {
        this.getRunData();
    },
    getRunData: function() {
        var a = this;
        wx.getWeRunData({
            success: function(n) {
                (0, t.Request)(t.Api.getStepsData, {
                    iv: n.iv,
                    encryptedData: n.encryptedData,
                    sessionKey: e.globalData.sessionKey,
                    teacherId: e.globalData.userInfo.id,
                    teacherName: e.globalData.userInfo.name,
                    teacherPhoto: e.globalData.wxUserInfo.avatarUrl
                }).then(function(t) {
                    var e = [], n = t.list[0];
                    e.push(n);
                    var s = [], i = t.list[1];
                    s.push(i), a.setData({
                        list: e,
                        workList: s,
                        loading: !1
                    });
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    content: "请先关注“微信运动”公众号并设置数据来源，以获取并提供微信步数数据",
                    showCancel: !1,
                    confirmText: "知道了"
                });
            }
        });
    },
    onEdit: function() {
        wx.navigateTo({
            url: "/pages/onEditAddress/index"
        });
    },
    onRefresh: function() {
        this.getRunData();
    }
});