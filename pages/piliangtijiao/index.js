var t = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        showMask: !1,
        time: "",
        num: 0,
        userInfo: null,
        selectTimeShow: !1,
        minDate: Date.now(),
        currentDate: void 0,
        remark: "",
        prevPage: null
    },
    onLoad: function() {
        this.setData({
            userInfo: e.globalData.userInfo
        });
    },
    onShow: function() {
        var t = getCurrentPages(), e = t[t.length - 2];
        this.setData({
            prevPage: e,
            num: e.data.result.length
        });
    },
    onShowTimePicker: function() {
        this.setData({
            selectTimeShow: !0
        });
    },
    onHideTimePicker: function() {
        this.setData({
            selectTimeShow: !1
        });
    },
    onSelectTimeOk: function(e) {
        this.setData({
            selectTimeShow: !1,
            currentDate: e.detail,
            time: t.Util.formatTime(e.detail, "YYYY-MM-DD")
        });
    },
    onRemarkChange: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    onSubmit: function() {
        var t = this;
        this.data.time ? this.data.remark ? wx.showModal({
            title: "提示",
            content: "确定提交此登记吗？",
            success: function(e) {
                e.confirm && t.submitData();
            }
        }) : wx.showToast({
            title: "请填写事由",
            icon: "none"
        }) : wx.showToast({
            title: "请选择进出时间",
            icon: "none"
        });
    },
    submitData: function() {
        var a = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.submitShenQing, {
            openId: e.globalData.openId,
            visitorReason: this.data.remark,
            startTime: this.data.time + " 00:00:01",
            endTime: this.data.time + " 23:59:59",
            type: 2,
            item: this.data.prevPage.data.result.map(function(t) {
                return {
                    visitorName: (t = a.data.prevPage.data.user[t]).name,
                    visitorPhone: t.phone,
                    visitorCard: t.idCard,
                    visitorCardType: t.idCardType
                };
            })
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "登记成功"
            }), setTimeout(function() {
                a.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 2
                });
            }, 500);
        }).catch(function(t) {
            a.setData({
                showMask: !1
            });
        });
    }
});