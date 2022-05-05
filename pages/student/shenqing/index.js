var t = require("../../../@babel/runtime/helpers/defineProperty"), e = require("../../../utils/index.js"), a = getApp();

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
        isGraduate: null,
        selectShow: !1,
        teacher: null,
        times: null,
        columns: [ {
            url: e.Api.getLeaderList
        } ]
    },
    onLoad: function() {
        this.setData({
            userInfo: a.globalData.userInfo
        });
    },
    onSelectTimeOk: function(i) {
        var s = e.Util.formatTime(i.detail, "YYYY-MM-DD HH:mm");
        if (1 == this.data.tag && this.data.startTime) {
            if (s < this.data.startTime) return void wx.showToast({
                title: 4 == a.globalData.userInfo.type ? "the end time must be later than the start time" : "终止时间必须晚于开始时间",
                icon: "none"
            });
        } else if (this.data.endTime && s > this.data.endTime) return void wx.showToast({
            title: 4 == a.globalData.userInfo.type ? "the start time must be earlier than the end time" : "开始时间必须早于终止时间",
            icon: "none"
        });
        this.setData(t({
            selectTimeShow: !1,
            currentDate: i.detail
        }, 0 == this.data.tag ? "startTime" : "endTime", s));
    },
    onHideTimePicker: function() {
        this.setData({
            selectTimeShow: !1
        });
    },
    onShowTimePicker: function(t) {
        this.setData({
            selectTimeShow: !0,
            tag: t.currentTarget.dataset.tag
        });
    },
    onRemarkChange: function(t) {
        this.setData({
            remark: t.detail
        });
    },
    onSelect: function(t) {
        this.setData({
            teacherId: t.detail
        });
    },
    onNumChange: function(t) {
        this.setData({
            times: t.detail
        });
    },
    onSubmit: function() {
        var t = this;
        if (4 == a.globalData.userInfo.type) {
            if (!this.data.startTime) return void wx.showToast({
                title: "please select start time",
                icon: "none"
            });
            if (!this.data.endTime) return void wx.showToast({
                title: "please select the end time",
                icon: "none"
            });
            if (!this.data.teacherId) return void wx.showToast({
                title: "please select reviewer",
                icon: "none"
            });
            if (!this.data.remark) return void wx.showToast({
                title: "please fill in the reason",
                icon: "none"
            });
        } else {
            if (!this.data.startTime) return void wx.showToast({
                title: "请选择开始时间",
                icon: "none"
            });
            if (!this.data.endTime) return void wx.showToast({
                title: "请选择终止时间",
                icon: "none"
            });
            if (!this.data.teacherId) return void wx.showToast({
                title: "请选择审核人",
                icon: "none"
            });
            if (!this.data.remark) return void wx.showToast({
                title: "请填写事由",
                icon: "none"
            });
        }
        wx.showModal({
            title: 4 == a.globalData.userInfo.type ? "tips" : "提示",
            content: 4 == a.globalData.userInfo.type ? "are you sure to submit this application？" : "确定提交此进出校申请吗？",
            success: function(e) {
                e.confirm && t.submitData();
            }
        });
    },
    submitData: function() {
        var t = this;
        4 == a.globalData.userInfo.type ? wx.showLoading({
            title: "submitting"
        }) : wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, e.Request)(e.Api.submitXSShenQing, {
            applicantId: a.globalData.userInfo.id,
            visitorReason: this.data.remark,
            startTime: this.data.startTime + ":00",
            endTime: this.data.endTime + ":00",
            teacherId: this.data.teacherId[0].value,
            maxTimes: this.data.times ? this.data.times : null == a.globalData.userInfo.maxTimes || 0 == a.globalData.userInfo.maxTimes ? 3 : a.globalData.userInfo.maxTimes,
            universityVisitorItem: [ {
                visitorName: a.globalData.userInfo.name,
                visitorCard: a.globalData.userInfo.idCard,
                visitorCardType: a.globalData.userInfo.idCardType,
                visitorPhone: a.globalData.userInfo.phone
            } ]
        }).then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: 4 == a.globalData.userInfo.type ? "submitted successfully" : "提交成功"
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
    },
    checkboxChange: function(t) {
        this.data.isGraduate = t.target.dataset.value;
    }
});