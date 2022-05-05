var t = require("../../../@babel/runtime/helpers/defineProperty"), a = require("../../../utils/index.js"), e = getApp();

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
        time: null,
        taskList: null
    },
    onLoad: function() {
        var t = getCurrentPages(), a = t[t.length - 2].data;
        this.setData({
            userInfo: e.globalData.userInfo,
            data: a.obj,
            time: a.time,
            taskList: a.taskList
        });
    },
    onSelectTimeOk: function(a) {
        var e = a.detail;
        if (1 == this.data.tag && this.data.startTime) {
            if (e < this.data.startTime) return void wx.showToast({
                title: "终止时间必须晚于开始时间",
                icon: "none"
            });
        } else if (this.data.endTime && e > this.data.endTime) return void wx.showToast({
            title: "开始时间必须早于终止时间",
            icon: "none"
        });
        this.setData(t({
            selectTimeShow: !1,
            currentDate: a.detail
        }, 0 == this.data.tag ? "startTime" : "endTime", e));
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
    onSubmit: function() {
        var t = this;
        this.data.startTime ? this.data.endTime ? this.data.num ? (this.data.holdNum || wx.showToast({
            title: "请填写可容纳人数",
            icon: "none"
        }), wx.showModal({
            title: "提示",
            content: "确定新建吗？",
            success: function(a) {
                a.confirm && t.submitData();
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
        });
        var e = new Date(this.data.time.date).getDay();
        0 == e && (e = 7), (0, a.Request)(a.Api.addNewZaoTangTime, {
            bathhouseId: this.data.data.id,
            maxNum: this.data.num.toString(),
            startTime: this.data.time.date + " " + this.data.startTime + ":00",
            endTime: this.data.time.date + " " + this.data.endTime + ":00",
            userDate: this.data.time.date + " " + this.data.startTime + ":00",
            bathhouseTaskId: this.data.taskList[e - 1].id,
            containNum: this.data.holdNum.toString(),
            state: 1
        }).then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "新建成功"
            }), setTimeout(function() {
                t.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(a) {
            t.setData({
                showMask: !1
            });
        });
    }
});