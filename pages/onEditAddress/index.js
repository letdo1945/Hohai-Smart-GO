var t = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../utils/index.js"), e = getApp();

Page({
    data: {
        phone: null,
        userInfo: null,
        address: null,
        selectShow: !1,
        dataList: null,
        lastPage: null
    },
    onInput: function(a) {
        this.setData(t({}, a.currentTarget.dataset.name, a.detail));
    },
    onAddressChange: function(t) {
        this.setData({
            address: t.detail
        });
    },
    onLoad: function() {
        var t = getCurrentPages();
        this.lastPage = t[t.length - 2];
        var a = t[t.length - 2].data;
        this.setData({
            userInfo: e.globalData.userInfo,
            info: a.list[0]
        });
    },
    onSubmit: function() {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "确定提交吗？",
            success: function(a) {
                a.confirm && t.submitData();
            }
        });
    },
    submitData: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, a.Request)(a.Api.updateSteps, {
            phone: this.data.phone,
            address: this.data.address ? this.data.address.value : this.data.info.address,
            teacherId: this.data.userInfo.id
        }).then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "更新成功"
            }), t.lastPage.onRefresh(), setTimeout(function() {
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