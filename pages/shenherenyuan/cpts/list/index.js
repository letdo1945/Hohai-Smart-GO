var t = require("../../../../@babel/runtime/helpers/objectSpread2"), e = require("../../../../utils/index.js"), a = getApp();

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
        start: 1,
        loading: !0
    },
    methods: {
        loadData: function() {
            var i = this;
            return new Promise(function(s, n) {
                i.setData({
                    loading: !0
                }), (0, e.Request)(e.Api.getShenHeBlackList, {
                    specialExclusion: i.data.type,
                    teacherId: a.globalData.userInfo.id,
                    start: i.data.start,
                    length: 10
                }).then(function(e) {
                    i.setData({
                        loading: !1
                    }), s(e.list.map(function(e) {
                        return t(t({}, e), {}, {
                            checked: !1,
                            createTime: e.createTime.substr(0, 16)
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
        onCheckClick: function(t) {
            var e = this.data.list[t.currentTarget.dataset.index];
            e.checked = !e.checked, this.setData({
                list: this.data.list
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
        onDetial: function(t) {
            this.triggerEvent("user", t.currentTarget.dataset.item), wx.navigateTo({
                url: "/pages/shenherenyuandetail/index?type=" + this.data.type
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
            var i, s = this;
            wx.showLoading({
                title: "提交中..."
            }), this.setData({
                showMask: !0
            }), i = 0 == this.data.type ? 0 == t ? e.Api.shenhe2blackList : e.Api.shenhe2whiteList : 0 == t ? e.Api.shenhe2whiteList : e.Api.shenhe2blackList, 
            (0, e.Request)(i, {
                TeacherId: a.globalData.userInfo.id,
                List: this.data.list.filter(function(t) {
                    return t.checked;
                }).map(function(t) {
                    return t.id;
                })
            }).then(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "提交成功"
                }), s.onRefresh(), s.setData({
                    showMask: !1
                });
            }).catch(function(t) {
                s.setData({
                    showMask: !1
                });
            });
        }
    }
});