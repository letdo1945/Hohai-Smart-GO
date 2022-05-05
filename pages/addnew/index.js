var t = require("../../utils/index.js");

Page({
    data: {
        cardType: t.Dict.cardType,
        type: t.Dict.cardType[0],
        name: "",
        cardNum: "",
        phone: "",
        selectShow: !1,
        prevPage: null
    },
    onShow: function() {
        var t = getCurrentPages();
        this.setData({
            prevPage: t[t.length - 2]
        });
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
    onCardNumChangeBlur: function(t) {
        this.setData({
            cardNum: t.detail.value
        });
    },
    onPhoneChange: function(t) {
        this.setData({
            phone: t.detail
        });
    },
    onPhoneChangeBlur: function(t) {
        this.setData({
            phone: t.detail.value
        });
    },
    onSubmit: function() {
        this.data.name ? this.data.cardNum ? (this.data.prevPage.addUser({
            type: this.data.type.key,
            name: this.data.name,
            cardNum: this.data.cardNum,
            phone: this.data.phone
        }), wx.navigateBack({
            delta: 1
        })) : wx.showToast({
            title: "请填写证件号",
            icon: "none"
        }) : wx.showToast({
            title: "请填写姓名",
            icon: "none"
        });
    }
});