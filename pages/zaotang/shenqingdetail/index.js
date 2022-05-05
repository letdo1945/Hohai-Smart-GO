var t = require("../../../utils/index.js");

getApp();

Page({
    data: {
        showMask: !1,
        data: null,
        pre: null,
        lastPage: null
    },
    onLoad: function() {
        var t = getCurrentPages();
        this.lastPage = t[t.length - 2];
        var a = t[t.length - 2].data;
        this.setData({
            data: a.obj,
            pre: a
        });
    },
    onSubmit: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定取消此次预约吗？",
            success: function(a) {
                a.confirm && t.submitData();
            }
        });
    },
    submitData: function() {
        var a = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.cancelZaoTangYuYue, {
            id: this.data.data.id,
            state: 3,
            bathhouseDetailId: this.data.data.bathhouseDetailId
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
                a.setData({
                    showMask: !1
                }), a.lastPage.onRefresh(), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(t) {
            wx.hideLoading(), a.setData({
                showMask: !1
            });
        });
    }
});