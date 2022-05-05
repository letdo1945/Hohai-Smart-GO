var t = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        showMask: !1,
        startTime: "",
        endTime: "",
        tag: null,
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
            userInfo: a.globalData.userInfo
        });
    },
    onShow: function() {
        var t = getCurrentPages(), e = t[t.length - 2];
        this.setData({
            prevPage: e,
            num: e.data.result.length
        });
    },
    onShowTimePicker: function(t) {
        this.setData({
            selectTimeShow: !0,
            tag: t.currentTarget.dataset.tag
        });
    },
    onHideTimePicker: function() {
        this.setData({
            selectTimeShow: !1
        });
    },
    onSelectTimeOk: function(a) {
        var i = e.Util.formatTime(a.detail, "YYYY-MM-DD");
        if (1 == this.data.tag && this.data.startTime) {
            if (i < this.data.startTime) return void wx.showToast({
                title: "终止时间必须晚于开始时间",
                icon: "none"
            });
        } else if (this.data.endTime && i > this.data.endTime) return void wx.showToast({
            title: "开始时间必须早于终止时间",
            icon: "none"
        });
        this.setData(t({
            selectTimeShow: !1,
            currentDate: a.detail
        }, 0 == this.data.tag ? "startTime" : "endTime", i));
    },
    onRemarkChange: function(t) {
        this.setData({
            remark: t.detail
        });
    },
    onSubmit: function() {
        var t = this;
        this.data.startTime ? this.data.endTime ? this.data.remark ? wx.showModal({
            title: "提示",
            content: "确定提交此登记吗？",
            success: function(e) {
                e.confirm && t.submitData();
            }
        }) : wx.showToast({
            title: "请填写事由",
            icon: "none"
        }) : wx.showToast({
            title: "请选择终止时间",
            icon: "none"
        }) : wx.showToast({
            title: "请选择开始时间",
            icon: "none"
        });
    },
    submitData: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, e.Request)(e.Api.submitShenQing, {
            openId: a.globalData.openId,
            visitorReason: this.data.remark,
            startTime: this.data.startTime + " 00:00:01",
            endTime: this.data.endTime + " 23:59:59",
            type: 2,
            item: this.data.prevPage.data.result.map(function(e) {
                return {
                    visitorName: (e = t.data.prevPage.data.user[e]).name,
                    visitorPhone: e.phone,
                    visitorCard: e.idCard,
                    visitorCardType: e.idCardType
                };
            })
        }).then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: "登记成功"
            }), setTimeout(function() {
                t.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 2
                });
            }, 500);
        }).catch(function(e) {
            t.setData({
                showMask: !1
            });
        });
    }
});