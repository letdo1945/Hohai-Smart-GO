var t = require("../../../@babel/runtime/helpers/objectSpread2"), a = require("../../../utils/index.js"), e = getApp();

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
        dataList: null
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
                }), (0, a.Request)(a.Api.getFamilyList, {
                    teacherIdCard: e.globalData.userInfo.idCard,
                    start: i.data.start,
                    length: 10
                }).then(function(a) {
                    i.setData({
                        loading: !1
                    }), n(a.list.map(function(a) {
                        return t({}, a);
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
        },
        onAddNew: function() {
            wx.navigateTo({
                url: "/pages/jiashu/onAddJiaShu/index"
            });
        },
        onUpdate: function(t) {
            this.setData({
                dataList: t.currentTarget.dataset.item
            }), wx.navigateTo({
                url: "/pages/jiashu/onEditJiaShu/index"
            });
        }
    }
});