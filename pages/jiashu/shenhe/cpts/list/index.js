var t = require("../../../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../../../utils/index.js"), a = getApp();

Component({
    properties: {
        type: Number,
        index: {
            type: Number,
            observer: function(t) {
                t > 1 && this.onRefresh();
            }
        }
    },
    data: {
        isEnd: !1,
        list: [],
        start: 0,
        loading: !0
    },
    methods: {
        loadData: function() {
            var i = this;
            return new Promise(function(n, s) {
                i.setData({
                    loading: !0
                }), (0, e.Request)(e.Api.getShenheList, {
                    auditeeId: a.globalData.userInfo.id,
                    familyState: 0 == i.data.type ? 1 : 0,
                    auditeeState: (i.data.type, 0),
                    start: i.data.start,
                    length: 10
                }).then(function(a) {
                    i.setData({
                        loading: !1
                    }), n(a.list.map(function(a) {
                        return t(t({}, a), {}, {
                            checked: !1,
                            createTime: e.Util.formatTime(a.createTime, "YYYY-MM-DD HH:mm")
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
        onCheckClick: function(t) {
            var e = this.data.list[t.currentTarget.dataset.index];
            e.checked = !e.checked, this.setData({
                list: this.data.list
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
        onDetial: function(t) {
            this.triggerEvent("user", t.currentTarget.dataset.item), wx.navigateTo({
                url: "/pages/jiashu/shenherenyuandetail/index?type=" + this.data.type
            });
        },
        onSubmit: function(t) {
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
            var a = this;
            wx.showLoading({
                title: "提交中..."
            }), this.setData({
                showMask: !0
            }), (0, e.Request)(e.Api.shenHeFamily, {
                auditeeState: 0 == t ? 1 : 2,
                familyState: 0 == this.data.type ? 1 : 0,
                ids: this.data.list.filter(function(t) {
                    return t.checked;
                }).map(function(t) {
                    return t.id;
                })
            }).then(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "提交成功"
                }), a.onRefresh(), a.setData({
                    showMask: !1
                });
            }).catch(function(t) {
                a.setData({
                    showMask: !1
                });
            });
        }
    }
});