var t = require("../../@babel/runtime/helpers/defineProperty"), e = require("../../utils/index.js"), i = getApp();

Page({
    data: {
        showMask: !1,
        startTime: "",
        endTime: "",
        userInfo: null,
        selectTimeShow: !1,
        minDate: Date.now(),
        currentDate: void 0,
        remark: "",
        tag: null,
        userList: []
    },
    onLoad: function() {
        var t = getCurrentPages(), e = t[t.length - 2].data;
        this.setData({
            userInfo: i.globalData.userInfo,
            userList: e.data ? e.data.universityVisitorItem.map(function(t) {
                return {
                    type: t.visitorCardType,
                    name: t.visitorName,
                    cardNum: t.visitorCard,
                    phone: t.visitorPhone
                };
            }) : []
        });
    },
    onAddNew: function() {
        wx.navigateTo({
            url: "/pages/addnew/index"
        });
    },
    addUser: function(t) {
        this.data.userList.push(t), this.setData({
            userList: this.data.userList
        });
    },
    onClose: function(t) {
        this.data.userList.splice(t.currentTarget.dataset.index, 1), this.setData({
            userList: this.data.userList
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
    onSelectTimeOk: function(i) {
        var a = e.Util.formatTime(i.detail, "YYYY-MM-DD");
        if (1 == this.data.tag && this.data.startTime) {
            if (a < this.data.startTime) return void wx.showToast({
                title: "终止时间必须晚于开始时间",
                icon: "none"
            });
        } else if (this.data.endTime && a > this.data.endTime) return void wx.showToast({
            title: "开始时间必须早于终止时间",
            icon: "none"
        });
        this.setData(t({
            selectTimeShow: !1,
            currentDate: i.detail
        }, 0 == this.data.tag ? "startTime" : "endTime", a));
    },
    onRemarkChange: function(t) {
        this.setData({
            remark: t.detail
        });
    },
    onSubmit: function() {
        var t = this;
        this.data.userList.length ? this.data.startTime ? this.data.endTime ? this.data.remark ? wx.showModal({
            title: "提示",
            content: 0 == this.data.userInfo.verifier ? "确定提交此登记吗？" : "确定提交此申请吗？",
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
        }) : wx.showToast({
            title: "请添加至少一个访客",
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
            openId: i.globalData.openId,
            visitorReason: this.data.remark,
            startTime: this.data.startTime + " 00:00:01",
            endTime: this.data.endTime + " 23:59:59",
            type: 1,
            item: this.data.userList.map(function(t) {
                return {
                    visitorName: t.name,
                    visitorPhone: t.phone,
                    visitorCard: t.cardNum.trim(),
                    visitorCardType: t.type
                };
            })
        }).then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
                t.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(e) {
            t.setData({
                showMask: !1
            });
        });
    }
});