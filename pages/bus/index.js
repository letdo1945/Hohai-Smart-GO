var t = require("../../@babel/runtime/helpers/objectSpread2"), a = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        list: [],
        loading: !0,
        item: null
    },
    onLoad: function() {
        this.onRefresh();
    },
    loadData: function() {
        var i = this;
        return new Promise(function(n, s) {
            i.setData({
                loading: !0
            }), (0, a.Request)(a.Api.getBusRecord, {
                card: e.globalData.userInfo.idCard,
                start: i.data.start,
                length: 10
            }).then(function(e) {
                i.setData({
                    loading: !1
                }), n(e.list.map(function(e) {
                    return console.log(45, e), t(t({}, e), {}, {
                        createTime: a.Util.formatTime(e.createTime && e.createTime, "MM月DD日 HH:mm:ss")
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
});