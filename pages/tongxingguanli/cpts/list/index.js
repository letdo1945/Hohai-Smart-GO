var t = require("../../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../../utils/index.js");

getApp();

Component({
    properties: {
        type: {
            type: Number
        }
    },
    data: {
        isEnd: !1,
        item: null,
        list: [],
        start: 0,
        loading: !0,
        name: null,
        number: null,
        step: null,
        teacherPhoto: null,
        minDate: new Date(Date.now() - 6048e5).getTime()
    },
    ready: function() {
        this.onRefresh();
    },
    methods: {
        loadData: function() {
            var a = this;
            return new Promise(function(n, i) {
                a.setData({
                    loading: !0
                }), (0, e.Request)(e.Api.getStepsList, {
                    startTime: e.Util.formatTime(a.data.minDate, "YYYY-MM-DD") + " 00:00:00",
                    endTime: e.Util.formatTime(Date.now(), "YYYY-MM-DD") + " 23:59:59",
                    type: a.data.type,
                    start: a.data.start,
                    length: 10
                }).then(function(e) {
                    a.setData({
                        loading: !1
                    }), n(e.list.map(function(e) {
                        return t(t({}, e), {}, {
                            name: e.teacherName,
                            number: e.number,
                            step: e.steps,
                            teacherPhoto: e.teacherPhoto
                        });
                    }));
                }).catch(function(t) {
                    a.setData({
                        loading: !1
                    }), i();
                });
            });
        },
        onRefresh: function() {
            var t = this;
            this.setData({
                start: 0
            }), this.loadData().then(function(e) {
                t.setData({
                    list: e,
                    isEnd: !1
                });
            });
        },
        loadMore: function() {
            var t = this;
            this.setData({
                start: this.data.start + 10
            }), this.loadData().then(function(e) {
                t.setData({
                    list: t.data.list.concat(e),
                    isEnd: e.length < 10
                });
            });
        },
        onSetting: function() {
            var a = this;
            return new Promise(function(n, i) {
                a.setData({
                    loading: !0
                }), (0, e.Request)(e.Api.getScoreSetting, {
                    startTime: e.Util.formatTime(a.data.minDate, "YYYY-MM-DD") + " 00:00:00",
                    endTime: e.Util.formatTime(Date.now(), "YYYY-MM-DD") + " 23:59:59",
                    type: 2,
                    start: 0,
                    length: 10
                }).then(function(e) {
                    wx.showToast({
                        title: "设置成功"
                    }), n(e.list.map(function(e) {
                        return t({
                            steps: e.steps,
                            number: e.number
                        }, e);
                    }));
                }).catch(function(t) {
                    a.setData({
                        loading: !1
                    }), i();
                });
            });
        },
        onDetail: function() {
            wx.navigateTo({
                url: "/pages/huojiang/index"
            });
        }
    }
});