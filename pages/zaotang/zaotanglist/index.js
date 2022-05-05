var t = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        isEnd: !1,
        list: [],
        start: 0,
        loading: !0,
        obj: null,
        userInfo: null
    },
    onLoad: function() {
        this.setData({
            userInfo: a.globalData.userInfo
        }), this.onRefresh();
    },
    loadData: function() {
        var n = this;
        return new Promise(function(s, e) {
            n.setData({
                loading: !0
            });
            var i = a.globalData.userInfo.id;
            (0, t.Request)(t.Api.getZaoTangList, {
                start: n.data.start,
                length: 10,
                teacherId: i
            }).then(function(t) {
                n.setData({
                    loading: !1
                }), s(t.list);
            }).catch(function(t) {
                n.setData({
                    loading: !1
                }), e();
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
    },
    onSelect: function(t) {
        this.setData({
            obj: t.currentTarget.dataset.item
        }), wx.navigateTo({
            url: "/pages/zaotang/zaotangmanage/index"
        });
    }
});