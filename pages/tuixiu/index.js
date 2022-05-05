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
        this.onRefresh();
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
            url: "/pages/tuixiudetail/index"
        }) : wx.showToast({
            title: "请勾选至少一个人员",
            icon: "none"
        });
    },
    loadData: function() {
        var s = this;
        return new Promise(function(i, n) {
            s.setData({
                loading: !0
            }), (0, t.Request)(t.Api.getBlackList, {
                teacherId: a.globalData.userInfo.id,
                keyWord: s.data.keyword || "",
                start: s.data.start,
                length: 20
            }).then(function(t) {
                t.list.forEach(function(t) {
                    s.data.user[t.id] = t;
                }), s.setData({
                    loading: !1,
                    total: t.total
                }), i(t.list);
            }).catch(function(t) {
                s.setData({
                    loading: !1
                }), n();
            });
        });
    },
    onSearch: function(t) {
        this.setData({
            keyword: t.detail
        }), this.onRefresh();
    },
    onClear: function() {
        this.setData({
            keyword: null
        }), this.onRefresh();
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
            start: this.data.start + 20
        }), this.loadData().then(function(a) {
            t.setData({
                list: t.data.list.concat(a),
                isEnd: a.length < 20
            });
        });
    }
});