var t = require("../../../@babel/runtime/helpers/defineProperty"), e = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        showMask: !1,
        startTime: "",
        endTime: "",
        userInfo: null,
        selectTimeShow: !1,
        currentDate: void 0,
        num: "",
        holdNum: "",
        tag: null,
        data: null,
        timeObj: null
    },
    onLoad: function() {
        var t = getCurrentPages(), e = t[t.length - 2].data;
        this.setData({
            userInfo: a.globalData.userInfo,
            data: e.obj,
            startTime: e.timeObj.sTime,
            endTime: e.timeObj.eTime,
            num: e.timeObj.maxNum,
            holdNum: e.timeObj.containNum,
            timeObj: e.timeObj,
            taskId: e.timeObj.id
        });
    },
    onSelectTimeOk: function(e) {
        var a = e.detail;
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
            currentDate: e.detail
        }, 0 == this.data.tag ? "startTime" : "endTime", a));
    },
    onHideTimePicker: function() {
        this.setData({
            selectTimeShow: !1
        });
    },
    onShowTimePicker: function(t) {
        1 != t.currentTarget.dataset.tag || this.data.startTime ? this.setData({
            selectTimeShow: !0,
            tag: t.currentTarget.dataset.tag
        }) : wx.showToast({
            title: "请先选择开始时间",
            icon: "none"
        });
    },
    onNumChange: function(t) {
        this.setData({
            num: +t.detail
        });
    },
    onHoldNumChange: function(t) {
        this.setData({
            holdNum: +t.detail
        });
    },
    onForbid: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(e) {
                e.confirm && t.forbidData();
            }
        });
    },
    onSubmit: function() {
        var t = this;
        this.data.startTime ? this.data.endTime ? this.data.num ? (this.data.holdNum || wx.showToast({
            title: "请填写可容纳人数",
            icon: "none"
        }), wx.showModal({
            title: "提示",
            content: "确定更新吗？",
            success: function(e) {
                e.confirm && t.submitData();
            }
        })) : wx.showToast({
            title: "请填写最大人数",
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
        }), (0, e.Request)(e.Api.updateDetail, {
            id: this.data.timeObj.id,
            maxNum: this.data.num,
            startTime: e.Util.formatTime(this.data.timeObj.userDate, "YYYY-MM-DD") + " " + this.data.startTime + ":00",
            endTime: e.Util.formatTime(this.data.timeObj.userDate, "YYYY-MM-DD") + " " + this.data.endTime + ":00",
            containNum: this.data.holdNum
        }).then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: "更新成功"
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
    forbidData: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, e.Request)(e.Api.deleteDetail, {
            id: this.data.timeObj.id
        }).then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: "删除成功"
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