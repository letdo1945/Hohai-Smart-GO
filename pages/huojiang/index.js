var t = require("../../@babel/runtime/helpers/objectSpread2"), a = require("../../utils/index.js");

getApp();

Component({
    properties: {
        type: {
            type: Number
        }
    },
    data: {
        isEnd: !1,
        list: [],
        start: 0,
        loading: !0,
        dataList: null,
        minDate: new Date(Date.now() - 6048e5).getTime()
    },
    ready: function() {
        this.onRefresh();
    },
    methods: {
        loadData: function() {
            var e = this;
            return new Promise(function(n, i) {
                e.setData({
                    loading: !0
                }), (0, a.Request)(a.Api.getScoreList, {
                    start: e.data.start,
                    length: 10
                }).then(function(a) {
                    var i = a.list.map(function(a) {
                        return t({}, a);
                    });
                    console.log(99, i), e.setData({
                        list: i,
                        loading: !1
                    }), n(a.list.map(function(a) {
                        return t({}, a);
                    }));
                }).catch(function(t) {
                    e.setData({
                        loading: !1
                    }), i();
                });
            });
        },
        onRefresh: function() {
            var t = this;
            this.setData({
                start: 0
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
                start: this.data.start + 10
            }), this.loadData().then(function(a) {
                t.setData({
                    list: t.data.list.concat(a),
                    isEnd: a.length < 10
                });
            });
        }
    }
});