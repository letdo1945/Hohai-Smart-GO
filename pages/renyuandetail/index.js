var t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        showMask: !1,
        data: {},
        userInfo: null,
        isMaster: null,
        remark: "",
        type: 0
    },
    onLoad: function(t) {
        var s = getCurrentPages();
        this.setData({
            data: s[s.length - 2].user,
            userInfo: a.globalData.userInfo,
            isMaster: a.globalData.permission && a.globalData.permission.twoTeacherBaseId == a.globalData.userInfo.id,
            type: t.type
        });
    },
    onRemarkChange: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    onSubmit: function() {
        var t = this;
        this.data.data.unitManagerSpecialExclusion > 0 ? wx.showToast({
            title: "正在审核中，请勿重复提交",
            icon: "none"
        }) : wx.showModal({
            title: "提示",
            content: 0 == this.data.type ? "确定将此人设置为红名单吗？" : "确定解除此人红名单身份吗？",
            success: function(a) {
                a.confirm && t.submitData();
            }
        });
    },
    submitData: function() {
        var a, s = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), a = 0 == this.data.type ? this.data.isMaster ? t.Api.shenhe2blackList : t.Api.shenhe1blackList : this.data.isMaster ? t.Api.shenhe2whiteList : t.Api.shenhe1whiteList, 
        (0, t.Request)(a, {
            teacherId: this.data.userInfo.id,
            list: [ this.data.data.id ]
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "设置成功"
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