var t = require("../../../@babel/runtime/helpers/objectSpread2"), a = require("../../../utils/index.js");

Page({
    data: {
        minDate: Date.now(),
        maxDate: new Date(Date.now() + 6048e5).getTime(),
        time: {
            date: a.Util.formatTime(Date.now(), "YYYY-MM-DD"),
            text: a.Util.formatTime(Date.now(), "MM月DD日")
        },
        loading: !1,
        list: [],
        obj: null,
        timeObj: null,
        taskList: [],
        state: 0
    },
    onLoad: function() {
        var t = getCurrentPages(), a = t[t.length - 2].data.obj;
        wx.setNavigationBarTitle({
            title: a.name
        }), this.setData({
            obj: a
        }), this.getSetting();
    },
    onShow: function() {
        this.loadTimeList();
    },
    getSetting: function() {
        var t = this;
        (0, a.Request)(a.Api.getZaoTangSetting, {
            id: this.data.obj.id
        }).then(function(a) {
            var e = new Date().getDay();
            0 == e && (e = 7);
            var i = a.sort(function(t, a) {
                return t.name - a.name;
            });
            t.setData({
                taskList: i,
                state: i[e - 1].state
            });
        });
    },
    onSelect: function(t) {
        var e = t.detail.getDay();
        0 == e && (e = 7), this.setData({
            state: this.data.taskList[e - 1].state,
            time: {
                date: a.Util.formatTime(t.detail, "YYYY-MM-DD"),
                text: a.Util.formatTime(t.detail, "MM月DD日")
            }
        }), this.loadTimeList();
    },
    loadTimeList: function() {
        var e = this;
        this.setData({
            loading: !0
        }), (0, a.Request)(a.Api.getConfigSelectList, {
            start: 0,
            length: 100,
            bathhouseid: this.data.obj.id,
            startTime: this.data.time.date + " 00:00:00",
            endTime: this.data.time.date + " 24:00:00",
            flags: 1
        }).then(function(i) {
            var n = i.list.map(function(e) {
                return t(t({}, e), {}, {
                    date: a.Util.formatTime(e.startTime, "MM月DD日"),
                    sTime: a.Util.formatTime(e.startTime, "HH:mm"),
                    eTime: a.Util.formatTime(e.endTime, "HH:mm")
                });
            });
            e.setData({
                list: n,
                loading: !1
            });
        }).catch(function() {
            e.setData({
                loading: !1
            });
        });
    },
    onSelectCell: function(t) {
        this.setData({
            timeObj: t.currentTarget.dataset.item
        }), wx.navigateTo({
            url: "/pages/zaotang/edittime/index"
        });
    },
    onOpen: function() {
        this.onSubmit(1);
    },
    onClose: function() {
        this.onSubmit(0);
    },
    onSubmit: function(t) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: t ? "确定开启本日的澡堂服务吗？" : "确定停止本日的澡堂服务吗？",
            success: function(e) {
                e.confirm && a.submitData(t);
            }
        });
    },
    submitData: function(t) {
        var e = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, a.Request)(a.Api.batchDetail, {
            id: this.data.obj.id,
            time: this.data.time.date,
            state: t
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "修改成功"
            }), e.getSetting(), e.setData({
                showMask: !1
            });
        }).catch(function(t) {
            wx.hideLoading(), e.setData({
                showMask: !1
            });
        });
    },
    onAddNew: function() {
        wx.navigateTo({
            url: "/pages/zaotang/addnew/index"
        });
    },
    onShowList: function() {
        wx.navigateTo({
            url: "/pages/zaotang/zaotangjiluall/index"
        });
    }
});