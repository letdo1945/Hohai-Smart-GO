var t = require("../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        minDate: Date.now(),
        maxDate: new Date(Date.now() + 6048e5).getTime(),
        time: {
            date: e.Util.formatTime(Date.now(), "YYYY-MM-DD"),
            text: e.Util.formatTime(Date.now(), "MM月DD日")
        },
        loading: !1,
        list: [],
        obj: null,
        timeObj: null,
        userInfo: null
    },
    onLoad: function() {
        var t = getCurrentPages(), e = t[t.length - 2].data.obj;
        wx.setNavigationBarTitle({
            title: e.name
        }), this.setData({
            userInfo: a.globalData.userInfo,
            obj: e
        }), this.loadTimeList();
    },
    onSelect: function(t) {
        this.setData({
            time: {
                date: e.Util.formatTime(t.detail, "YYYY-MM-DD"),
                text: e.Util.formatTime(t.detail, "MM月DD日")
            }
        }), this.loadTimeList();
    },
    loadTimeList: function() {
        var a = this;
        this.setData({
            loading: !0
        }), (0, e.Request)(e.Api.getZaoTangTimeList, {
            start: 0,
            length: 100,
            bathHouseId: this.data.obj.id,
            userDate: this.data.time.date
        }).then(function(i) {
            var n = i.list.map(function(a) {
                return t(t({}, a), {}, {
                    date: e.Util.formatTime(a.startTime, "MM月DD日"),
                    sTime: e.Util.formatTime(a.startTime, "HH:mm"),
                    eTime: e.Util.formatTime(a.endTime, "HH:mm")
                });
            });
            a.setData({
                list: n,
                loading: !1
            });
        }).catch(function() {
            a.setData({
                loading: !1
            });
        });
    },
    onSelectCell: function(t) {
        this.setData({
            timeObj: t.currentTarget.dataset.item
        }), wx.navigateTo({
            url: "/pages/zaotang/shenqing/index"
        });
    },
    onShowList: function() {
        wx.navigateTo({
            url: "/pages/zaotang/zaotangjilu/index"
        });
    }
});