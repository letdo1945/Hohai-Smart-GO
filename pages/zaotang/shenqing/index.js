var t = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        showMask: !1,
        zaotang: null,
        time: null,
        userInfo: null
    },
    onLoad: function() {
        var t = getCurrentPages(), e = t[t.length - 2].data;
        this.setData({
            zaotang: e.obj,
            time: e.timeObj,
            userInfo: a.globalData.userInfo
        });
    },
    onSubmit: function() {
        var t = this;
        wx.showModal({
            title: 4 == a.globalData.userInfo.type ? "tips" : "提示",
            content: 4 == a.globalData.userInfo.type ? "are you sure to submit this appointment？" : "确定提交此预约吗？",
            success: function(a) {
                a.confirm && t.submitData();
            }
        });
    },
    submitData: function() {
        var e = this;
        wx.showLoading({
            title: 4 == a.globalData.userInfo.type ? "submitting..." : "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.submitZaoTangYuYue, {
            bathhouseDetailId: this.data.time.id,
            applyUserId: a.globalData.userInfo.id,
            openid: a.globalData.openId,
            applyType: 0,
            state: 0
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: 4 == a.globalData.userInfo.type ? "the appointment is successful, please take a bath as soon as possible" : "预约成功，请在预约时间内尽早洗浴",
                duration: 1e3,
                icon: "none"
            }), setTimeout(function() {
                e.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
        }).catch(function(t) {
            wx.hideLoading(), e.setData({
                showMask: !1
            });
        });
    }
});