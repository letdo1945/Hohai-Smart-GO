var t = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        cardType: t.Dict.cardType,
        type: t.Dict.cardType[0],
        name: "",
        cardNum: "",
        phone: "",
        address: "",
        selectShow: !1,
        dataList: null,
        lastPage: null
    },
    onShowPicker: function() {
        this.setData({
            selectShow: !0
        });
    },
    onHidePicker: function() {
        this.setData({
            selectShow: !1
        });
    },
    onSelectOk: function(t) {
        this.setData({
            selectShow: !1,
            type: t.detail.value
        });
    },
    onNameChange: function(t) {
        this.setData({
            name: t.detail
        });
    },
    onCardNumChange: function(t) {
        this.setData({
            cardNum: t.detail
        });
    },
    onPhoneChange: function(t) {
        this.setData({
            phone: t.detail
        });
    },
    onAddressChange: function(t) {
        this.setData({
            address: t.detail
        });
    },
    onLoad: function() {
        var e = getCurrentPages();
        this.lastPage = e[e.length - 2];
        var s = e[e.length - 2].data;
        this.setData({
            teacherIdCard: a.globalData.userInfo.idCard,
            name: s.dataList.name,
            type: t.Dict.cardType.find(function(t) {
                return t.key == s.dataList.idCardType;
            }),
            cardNum: s.dataList.idCard,
            phone: s.dataList.phone,
            address: s.dataList.address,
            data: s.dataList
        });
    },
    onSubmit: function() {
        var t = this;
        this.data.name ? this.data.cardNum ? this.data.phone ? this.data.address ? wx.showModal({
            title: "提示",
            content: "确定提交吗？",
            success: function(a) {
                a.confirm && t.submitData();
            }
        }) : wx.showToast({
            title: "请填写地址",
            icon: "none"
        }) : wx.showToast({
            title: "请填写联系电话",
            icon: "none"
        }) : wx.showToast({
            title: "请填写证件号",
            icon: "none"
        }) : wx.showToast({
            title: "请填写姓名",
            icon: "none"
        });
    },
    submitData: function() {
        var e = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.updateFamily, {
            id: this.data.data.id,
            name: this.data.name,
            idCard: this.data.cardNum,
            idCardType: this.data.type.key,
            phone: this.data.phone,
            address: this.data.address,
            teacherIdCard: a.globalData.userInfo.idCard
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "更新成功"
            }), e.lastPage.onRefresh(), setTimeout(function() {
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
    },
    onForbid: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定删除吗？",
            success: function(a) {
                a.confirm && t.forbidData();
            }
        });
    },
    forbidData: function() {
        var a = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, t.Request)(t.Api.deleteFamily, {
            id: this.data.data.id
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "删除成功"
            }), a.lastPage.onRefresh(), setTimeout(function() {
                a.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 500);
        }).catch(function(t) {
            a.setData({
                showMask: !1
            });
        });
    },
    onSetList: function() {
        this.setData({
            dataList: this.data.data
        }), wx.navigateTo({
            url: "/pages/jiashu/commitShenhe/index"
        });
    }
});