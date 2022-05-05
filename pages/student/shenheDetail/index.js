var t = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        error: !1,
        userInfo: null,
        data: null,
        type: "",
        showMask: !1
    },
    onLoad: function(t) {
        var e = JSON.parse(t.data);
        this.setData({
            error: !1,
            userInfo: a.globalData.userInfo,
            data: e,
            type: t.type
        });
    },
    btn_act: function(t) {
        var a = this, e = t.target.dataset.value;
        wx.showModal({
            title: "提示",
            content: 0 == e ? "确定通过此项申请吗？" : "确定拒绝此项申请吗？",
            success: function(t) {
                t.confirm && a.submitData(e);
            }
        });
    },
    submitData: function(e) {
        var s = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.updateMoreXSState, {
            openid: a.globalData.openId,
            list: [ {
                visitorId: this.data.data.id,
                state: e
            } ]
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: 0 == e ? "通过成功" : "已拒绝"
            }), setTimeout(function() {
                s.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(t) {
            s.setData({
                showMask: !1
            });
        });
    }
});