var t = require("../../../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../../../utils/index.js"), a = getApp();

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
        loading: !0
    },
    ready: function() {
        this.onRefresh();
    },
    methods: {
        loadData: function() {
            var i = this;
            return new Promise(function(n, s) {
                i.setData({
                    loading: !0
                }), (0, e.Request)(e.Api.getXSShenHeJiLu, {
                    openid: a.globalData.openId,
                    verifierState: i.data.type,
                    start: i.data.start,
                    length: 10
                }).then(function(a) {
                    i.setData({
                        loading: !1
                    }), n(a.list.map(function(a) {
                        return t(t({}, a), {}, {
                            createTime: a.createTime && a.createTime.substr(0, 16),
                            startTime: a.startTime && a.startTime.substr(0, 16),
                            endTime: a.endTime && a.endTime.substr(0, 16),
                            status: e.Util.status(a.dictionaryInfo)
                        });
                    }));
                }).catch(function(t) {
                    i.setData({
                        loading: !1
                    }), s();
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
        onShowDetail: function(t) {
            this.triggerEvent("user", t.currentTarget.dataset.item), wx.navigateTo({
                url: "/pages/student/jiluDetail/index"
            });
        }
    }
});