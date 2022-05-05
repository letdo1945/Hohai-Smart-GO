var n = require("./utils/index.js");

App({
    globalData: {
        openId: null,
        wxUserInfo: null,
        userInfo: null,
        permission: null,
        isMaster: !1,
        isStudent: !1,
        organ: [],
        bathhouse: null,
        error: !1,
        sessionKey: null
    },
    onShow: function(n) {
        this.getOpenId(), wx.setKeepScreenOn({
            keepScreenOn: !0
        });
    },
    getOpenId: function() {
        var e = this;
        wx.login({
            success: function(o) {
                o.code && (0, n.Request)(n.Api.getOpenId, {
                    jsCode: o.code
                }).then(function(n) {
                    e.globalData.sessionKey = n.sessionKey, e.globalData.openId = n.openid, wx.setStorageSync("openid", n.openid), 
                    e.getUserInfo();
                }).catch(function(n) {
                    e.globalData.error = !0, e.loadFinish();
                });
            },
            fail: function() {
                e.globalData.error = !0, e.loadFinish();
            }
        });
    },
    getUserInfo: function() {
        var n = this;
        wx.getSetting({
            success: function(e) {
                wx.getUserInfo({
                    success: function(e) {
                        n.getToken(n.globalData.openId, function() {
                            n.globalData.wxUserInfo = e.userInfo, n.loadFinish();
                        });
                    },
                    fail: function() {
                        n.loadFinish();
                    }
                });
            }
        });
    },
    getToken: function(e, o) {
        (0, n.Request)(n.Api.getToken, {
            openId: e
        }).then(function(n) {
            n && n.token && wx.setStorageSync("token_ap", n.token), o();
        });
    },
    loadFinish: function() {
        this.onLoadFinish && this.onLoadFinish(this.globalData);
    }
});