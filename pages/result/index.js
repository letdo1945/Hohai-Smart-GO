var t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        wxUserInfo: null,
        userInfo: null,
        loading: !1,
        error: !1,
        data: null,
        type: null,
        isMG: !1,
        errorText: "",
        id: "",
        isBus: !1,
        lat: 0,
        lng: 0,
        list: []
    },
    onLoad: function(t) {
        this.setData({
            wxUserInfo: a.globalData.wxUserInfo,
            userInfo: a.globalData.userInfo,
            type: t.type,
            id: t.id
        }), 0 == this.data.type ? this.getTXInfo() : 1 == this.data.type ? this.getTXBus() : 5 == this.data.type ? 0 == a.globalData.isStudent ? wx.showToast({
            title: "老师扫码无效",
            icon: "none"
        }) : this.getTXBath() : this.getTCOtherInfo();
    },
    getTCOtherInfo: function() {
        var e = this;
        this.setData({
            isMG: !1,
            error: !1,
            loading: !0
        }), (0, t.Request)(t.Api.getTXInfoFromOther, {
            type: a.globalData.isStudent ? 1 : 0,
            id: a.globalData.userInfo.id,
            campusId: this.data.id,
            campusType: 3 == this.data.type ? 0 : 1
        }).then(function(a) {
            e.setData({
                loading: !1,
                data: {
                    time: t.Util.formatTime(Date.now(), "MM月DD日 HH:mm"),
                    state: "string" != typeof a,
                    text: a
                }
            });
        }).catch(function(t) {
            e.setData({
                error: !0,
                loading: !1,
                errorText: 500 == t.code ? t.message : "请求数据失败，点击我刷新"
            });
        });
    },
    getTXBath: function() {
        var a = this;
        this.setData({
            isMG: !1,
            error: !1,
            loading: !0
        }), (0, t.BaseRequest)(t.Api.getTXBath, {
            idCard: this.data.userInfo.id,
            bathhouseId: this.data.id
        }).then(function(e) {
            var i = e.data;
            a.setData({
                loading: !1,
                data: {
                    time: t.Util.formatTime(Date.now(), "MM月DD日 HH:mm"),
                    state: 200 == i.code,
                    text: {
                        gateName: i.msg
                    }
                }
            }), "10006" == i.code && wx.showModal({
                title: "提示",
                cancelText: "出",
                confirmText: "进",
                success: function(t) {
                    t.confirm ? a.submitState(0) : t.cancel && a.submitState(1);
                }
            });
        }).catch(function(t) {
            a.setData({
                error: !0,
                loading: !1,
                errorText: t.msg
            });
        });
    },
    getTXInfo: function() {
        var a = this;
        this.setData({
            isMG: !0,
            error: !1,
            loading: !0
        }), (0, t.Request)(t.Api.getTXInfo, {
            id: this.data.id,
            idCard: this.data.userInfo.idCard
        }).then(function(e) {
            var i = "string" != typeof e;
            a.setData({
                loading: !1,
                data: {
                    time: t.Util.formatTime(Date.now(), "MM月DD日 HH:mm"),
                    state: i,
                    text: i ? e : e._data ? e._data.msg : e
                }
            }), setTimeout(function() {
                wx.createAudioContext("player").play();
            }, 500);
        }).catch(function(t) {
            a.setData({
                error: !0,
                loading: !1
            });
        });
    },
    getTXBus: function() {
        var e = this;
        this.setData({
            isBus: !0,
            error: !1,
            loading: !0
        }), (0, t.BaseRequest)(t.Api.getTXBus, {
            openId: a.globalData.openId,
            gateId: this.data.id
        }).then(function(a) {
            e.setData({
                loading: !1,
                data: {
                    time: t.Util.formatTime(Date.now(), "MM月DD日 HH:mm"),
                    state: a.data.code,
                    text: a.data.msg,
                    gateName: a.data.data.gateName
                }
            }), setTimeout(function() {
                wx.createAudioContext("player").play();
            }, 500);
        }).catch(function(t) {
            e.setData({
                error: !0,
                loading: !1
            });
        });
    },
    submitState: function(e) {
        var i = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.artificialConfirm, {
            applyUserId: a.globalData.userInfo.id,
            bathhouseId: this.data.id,
            state: e
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "确认成功"
            }), setTimeout(function() {
                i.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 2
                });
            }, 500);
        }).catch(function(t) {
            i.setData({
                showMask: !1
            });
        });
    }
});