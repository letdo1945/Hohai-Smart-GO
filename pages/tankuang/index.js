var t = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        showMask: !1,
        phone: "",
        idCard: ""
    },
    onInput: function(a) {
        this.setData(t({}, a.currentTarget.dataset.name, a.detail));
    },
    onSubmit: function() {
        var t = this;
        this.data.phone || this.data.idCard ? wx.showModal({
            title: "提示",
            content: "确定提交此条信息吗？",
            success: function(a) {
                a.confirm && t.submitData();
            }
        }) : wx.showToast({
            title: "请填写联系方式或请填写身份证号码",
            icon: "none"
        });
    },
    submitData: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, a.Request)(a.Api.getTXBind, {
            openid: e.globalData.openId,
            phone: this.data.phone,
            idcard: this.data.idCard
        }).then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), setTimeout(function() {
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