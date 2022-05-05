var t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        showMask: !1,
        data: {},
        remark: "",
        type: 0
    },
    onLoad: function(t) {
        var a = getCurrentPages();
        this.setData({
            data: a[a.length - 2].user,
            type: t.type
        });
    },
    onRemarkChange: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    onSubmit: function(t) {
        var a = this, e = t.target.dataset.value;
        wx.showModal({
            title: "提示",
            content: 0 == e ? "确定通过吗？" : "确定拒绝吗？",
            success: function(t) {
                t.confirm && a.submitData(e);
            }
        });
    },
    submitData: function(e) {
        var s, i = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), s = 0 == this.data.type ? 0 == e ? t.Api.shenhe2blackList : t.Api.shenhe2whiteList : 0 == e ? t.Api.shenhe2whiteList : t.Api.shenhe2blackList, 
        (0, t.Request)(s, {
            TeacherId: a.globalData.userInfo.id,
            List: [ this.data.data.id ]
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
                i.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(t) {
            i.setData({
                showMask: !1
            });
        });
    }
});