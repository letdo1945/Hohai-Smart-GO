var t = require("../../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../../utils/index.js"), a = getApp();

Component({
    properties: {
        type: Number
    },
    data: {
        isEnd: !1,
        list: [],
        start: 1,
        loading: !0
    },
    pageLifetimes: {
        show: function() {
            this.onRefresh();
        }
    },
    methods: {
        onDetial: function(t) {
            var e = t.currentTarget.dataset.item;
            wx.navigateTo({
                url: "/pages/audit/index?data=" + JSON.stringify(e) + "&type=" + this.data.type
            });
        },
        onCheckClick: function(t) {
            var e = this.data.list[t.currentTarget.dataset.index];
            e.checked = !e.checked, this.setData({
                list: this.data.list
            });
        },
        onSelectAll: function(t) {
            for (var e = t.currentTarget.dataset.value, a = 0; a < e.length; a++) e[a].checked = !e[a].checked;
            this.setData({
                list: e
            });
        },
        loadData: function() {
            var i = this;
            return new Promise(function(s, n) {
                i.setData({
                    loading: !0
                }), (0, e.Request)(e.Api.getAuditList, {
                    openid: a.globalData.openId,
                    verifierState: i.data.type,
                    start: i.data.start,
                    length: 10
                }).then(function(a) {
                    i.setData({
                        loading: !1
                    }), s(a.list.map(function(a) {
                        return t(t({}, a), {}, {
                            checked: !1,
                            createTime: a.createTime && a.createTime.substr(0, 16),
                            startTime: a.startTime && a.startTime.substr(0, 10),
                            endTime: a.endTime && a.endTime.substr(0, 10),
                            status: a.dictionaryInfo && e.Util.status(a.dictionaryInfo)
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
                start: this.data.start + 1
            }), this.loadData().then(function(e) {
                t.setData({
                    list: t.data.list.concat(e),
                    isEnd: e.length < 10
                });
            });
        },
        onShowDetail: function(t) {
            this.data.list[t.currentTarget.dataset.index];
        },
        btn_act: function(t) {
            var e = this, a = t.target.dataset.value;
            this.data.list.filter(function(t) {
                return t.checked;
            }).length ? wx.showModal({
                title: "提示",
                content: 0 == a ? "确定通过勾选的申请吗？" : "确定拒绝勾选的申请吗？",
                success: function(t) {
                    t.confirm && e.submitData(a);
                }
            }) : wx.showToast({
                title: "请勾选需要审核的申请",
                icon: "none"
            });
        },
        submitData: function(t) {
            var i = this;
            wx.showLoading({
                title: "提交中..."
            }), this.setData({
                showMask: !0
            }), (0, e.Request)(e.Api.updateMoreAuditState, {
                openid: a.globalData.openId,
                list: this.data.list.filter(function(t) {
                    return t.checked;
                }).map(function(e) {
                    return {
                        visitorId: e.id,
                        state: t
                    };
                })
            }).then(function(e) {
                wx.hideLoading(), wx.showToast({
                    title: 0 == t ? "通过成功" : "已全部拒绝"
                }), setTimeout(function() {
                    i.onRefresh(), i.setData({
                        showMask: !1
                    });
                }, 500);
            }).catch(function(t) {
                i.setData({
                    showMask: !1
                });
            });
        }
    }
});