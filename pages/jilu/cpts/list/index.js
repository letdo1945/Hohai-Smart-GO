var t = require("../../../../@babel/runtime/helpers/objectSpread2"), a = require("../../../../utils/index.js"), e = getApp();

Component({
    properties: {
        type: {
            type: Number
        }
    },
    data: {
        isEnd: !1,
        list: [],
        start: 1,
        loading: !0
    },
    ready: function() {
        this.onRefresh();
    },
    methods: {
        loadData: function() {
            var i = this;
            return new Promise(function(s, n) {
                i.setData({
                    loading: !0
                }), (0, a.Request)(a.Api.getShenHeJiLu, {
                    openId: e.globalData.openId,
                    verifierState: i.data.type,
                    start: i.data.start,
                    length: 10
                }).then(function(e) {
                    i.setData({
                        loading: !1
                    }), s(e.list.map(function(e) {
                        return t(t({}, e), {}, {
                            createTime: e.createTime.substr(0, 16),
                            startTime: e.startTime.substr(0, 10),
                            status: a.Util.status(e.dictionaryInfo)
                        });
                    }));
                }).catch(function(t) {
                    i.setData({
                        loading: !1
                    }), n();
                });
            });
        },
        onRefresh: function() {
            var t = this;
            this.setData({
                start: 1
            }), this.loadData().then(function(a) {
                t.setData({
                    list: a,
                    isEnd: !1
                });
            });
        },
        loadMore: function() {
            var t = this;
            this.setData({
                start: this.data.start + 1
            }), this.loadData().then(function(a) {
                t.setData({
                    list: t.data.list.concat(a),
                    isEnd: a.length < 10
                });
            });
        },
        onShowDetail: function(t) {
            var a = this.data.list[t.currentTarget.dataset.index];
            wx.navigateTo({
                url: "/pages/jiludetail/index?id=" + a.id
            });
        }
    }
});