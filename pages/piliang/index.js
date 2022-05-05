var t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        isEnd: !1,
        list: [],
        user: {},
        start: -100,
        result: [],
        loading: !0
    },
    onLoad: function() {
        this.loadMore();
    },
    onCheckChange: function(t) {
        this.setData({
            result: t.detail
        });
    },
    onCheckAll: function() {
        var t = [];
        this.data.list.length !== this.data.result.length && this.data.list.forEach(function(a) {
            t.push(a.id);
        }), this.setData({
            result: t
        });
    },
    onNext: function() {
        this.data.result.length ? wx.navigateTo({
            url: "/pages/piliangtijiao/index"
        }) : wx.showToast({
            title: "请勾选至少一个人员",
            icon: "none"
        });
    },
    loadData: function() {
        var i = this;
        return new Promise(function(n, s) {
            i.setData({
                loading: !0
            }), (0, t.Request)(t.Api.getUserList, {
                openId: a.globalData.openId,
                start: i.data.start,
                length: 100
            }).then(function(t) {
                t.list.forEach(function(t) {
                    i.data.user[t.id] = t;
                }), i.setData({
                    loading: !1,
                    user: i.data.user
                }), n(t.list);
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
            loading: !1
        }), setTimeout(function() {
            t.setData({
                loading: !0
            });
        }, 10);
    },
    loadMore: function() {
        var t = this;
        this.setData({
            start: this.data.start + 100
        }), this.loadData().then(function(a) {
            t.setData({
                list: t.data.list.concat(a),
                isEnd: a.length < 100
            });
        });
    }
});