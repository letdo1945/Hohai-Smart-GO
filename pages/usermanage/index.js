var t = require("../../utils/index.js"), a = getApp();

Page({
    data: {
        isEnd: !1,
        list: [],
        start: 1,
        loading: !0,
        keyword: null,
        total: 0,
        item: null
    },
    onLoad: function() {
        this.onRefresh();
    },
    loadData: function() {
        var e = this;
        return new Promise(function(i, n) {
            e.setData({
                loading: !0
            }), (0, t.Request)(t.Api.getBlackList, {
                teacherId: a.globalData.userInfo.id,
                keyWord: e.data.keyword || "",
                start: e.data.start,
                length: 20
            }).then(function(t) {
                e.setData({
                    loading: !1,
                    total: t.total
                }), i(t.list);
            }).catch(function(t) {
                e.setData({
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
                isEnd: a.length < 20
            });
        });
    },
    onShowDetail: function(t) {
        this.setData({
            item: t.currentTarget.dataset.item
        }), wx.navigateTo({
            url: "/pages/userdetail/index?type=" + this.data.type
        });
    }
});