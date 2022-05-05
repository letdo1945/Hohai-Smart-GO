var t = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        showMask: !1,
        lastPage: null,
        data: null,
        selectShow: !1,
        selectType: null,
        organ: null,
        idCardType: a.Dict.cardType[0],
        organList: [],
        specialExclusionList: [ {
            key: 0,
            text: "白名单"
        }, {
            key: 1,
            text: "红名单"
        } ],
        verifierList: [ {
            key: 0,
            text: "自由进出"
        }, {
            key: 10,
            text: "需一级领导审核"
        }, {
            key: 20,
            text: "需两级领导审核"
        }, {
            key: 21,
            text: "只需党委书记审核"
        } ],
        visitorVerifierList: [ {
            key: 0,
            text: "直接进入"
        }, {
            key: 10,
            text: "需一级领导审核"
        }, {
            key: 20,
            text: "需两级领导审核"
        }, {
            key: 21,
            text: "只需党委书记审核"
        }, {
            key: -1,
            text: "无权限"
        } ],
        verifier: {
            key: 0,
            text: "自由进出"
        },
        visitorVerifier: {
            key: 0,
            text: "直接进入"
        },
        specialExclusion: {
            key: 0,
            text: "白名单"
        },
        name: null,
        campusCard: null,
        idCard: null,
        phone: null,
        isMaster: !1,
        columns: []
    },
    onLoad: function() {
        var t = e.globalData.organ.map(function(t) {
            return {
                key: t.organId,
                text: t.organName
            };
        });
        this.setData({
            organList: t,
            organ: t[0],
            isMaster: e.globalData.isMaster
        });
        var i = getCurrentPages(), s = i[i.length - 2], n = s.data.item;
        n ? this.setData({
            data: n,
            lastPage: s,
            name: n.name,
            campusCard: n.campusCard,
            idCard: n.idCard,
            phone: n.phone,
            specialExclusion: this.data.specialExclusionList.find(function(t) {
                return t.key == n.specialExclusion;
            }),
            organ: {
                key: n.organ.id,
                text: n.organ.name
            },
            idCardType: a.Dict.cardType.find(function(t) {
                return t.key == n.idCardType;
            }),
            verifier: this.data.verifierList.find(function(t) {
                return t.key == n.verifier;
            }),
            visitorVerifier: this.data.visitorVerifierList.find(function(t) {
                return t.key == n.visitorVerifier;
            })
        }) : this.setData({
            lastPage: s
        });
    },
    onInputChange: function(a) {
        this.setData(t({}, a.currentTarget.dataset.type, a.detail));
    },
    onShowPicker: function(t) {
        var e = [], i = t.currentTarget.dataset.type;
        switch (i) {
          case "organ":
            e = this.data.organList;
            break;

          case "specialExclusion":
            e = this.data.specialExclusionList;
            break;

          case "idCardType":
            e = a.Dict.cardType;
            break;

          case "verifier":
            e = this.data.verifierList;
            break;

          case "visitorVerifier":
            e = this.data.visitorVerifierList;
        }
        this.setData({
            selectShow: !0,
            columns: e,
            selectType: i
        });
    },
    onHidePicker: function() {
        this.setData({
            selectShow: !1
        });
    },
    onSelectOk: function(a) {
        this.setData(t({
            selectShow: !1
        }, this.data.selectType, a.detail.value));
    },
    onSubmit: function(t) {
        var e = this;
        if (0 == t.currentTarget.dataset.value) {
            if (!this.data.idCard) return void wx.showToast({
                title: "请输入证件号",
                icon: "none"
            });
            if (!this.data.name) return void wx.showToast({
                title: "请输入老师姓名",
                icon: "none"
            });
            wx.showLoading({
                title: "提交中..."
            }), this.setData({
                showMask: !0
            }), (0, a.Request)(this.data.data ? a.Api.updateUserDetail : a.Api.addUser, {
                id: this.data.data ? this.data.data.id : void 0,
                organId: this.data.organ.key,
                name: this.data.name,
                campusCard: this.data.campusCard,
                idCardType: this.data.idCardType.key,
                idCard: this.data.idCard,
                phone: this.data.phone,
                specialExclusion: this.data.specialExclusion.key,
                verifier: this.data.verifier.key,
                visitorVerifier: this.data.visitorVerifier.key
            }).then(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: e.data.data ? "更新成功" : "新增成功"
                }), e.data.lastPage.onRefresh(), setTimeout(function() {
                    e.setData({
                        showMask: !1
                    }), wx.navigateBack({
                        delta: 1
                    });
                }, 500);
            }).catch(function(t) {
                e.setData({
                    showMask: !1
                });
            });
        } else 1 == t.currentTarget.dataset.value ? wx.showModal({
            title: "提示",
            content: "确定解绑此人员微信吗？",
            success: function(t) {
                t.confirm && e.unBind();
            }
        }) : wx.showModal({
            title: "提示",
            content: "确定删除此人员吗？",
            success: function(t) {
                t.confirm && e.submitData();
            }
        });
    },
    unBind: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), a.WxRequest.put(a.Api.unbindUser, {
            ids: [ this.data.data.id ]
        }, {}).then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "解绑成功"
            }), t.data.lastPage.onRefresh(), setTimeout(function() {
                t.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(a) {
            t.setData({
                showMask: !1
            });
        });
    },
    submitData: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, a.Request)(a.Api.deleteUser, {
            id: this.data.data.id
        }).then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "删除成功"
            }), t.data.lastPage.onRefresh(), setTimeout(function() {
                t.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(a) {
            t.setData({
                showMask: !1
            });
        });
    }
});