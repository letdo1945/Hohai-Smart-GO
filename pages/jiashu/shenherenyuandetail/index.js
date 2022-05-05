var t = require("../../../utils/index.js");

getApp();

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
    submitData: function(a) {
        var e = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.shenHeFamily, {
            auditeeState: 0 == a ? 1 : 2,
            familyState: 0 == this.data.type ? 1 : 0,
            ids: [ this.data.data.id ]
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
                e.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(t) {
            e.setData({
                showMask: !1
            });
        });
    }
});