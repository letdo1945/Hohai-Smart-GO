var t = require("../../../utils/index.js"), a = getApp();

Page({
    data: {
        cardType: t.Dict.cardType,
        type: t.Dict.cardType[0],
        name: "",
        cardNum: "",
        phone: "",
        address: "",
        lastPage: null,
        selectShow: !1
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
        var t = getCurrentPages();
        this.lastPage = t[t.length - 2];
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
        }), (0, t.Request)(t.Api.addFamily, {
            name: this.data.name,
            idCard: this.data.cardNum,
            idCardType: this.data.type.key,
            phone: this.data.phone,
            address: this.data.address,
            teacherIdCard: a.globalData.userInfo.idCard
        }).then(function(t) {
            wx.hideLoading(), wx.showToast({
                title: "该家属为红名单，审核后方可变成白名单",
                duration: 1e3,
                icon: "none"
            }), e.lastPage.onRefresh(), setTimeout(function() {
                e.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
        }).catch(function(t) {
            e.setData({
                showMask: !1
            });
        });
    }
});