var a = require("../../../utils/index.js");

getApp();

Page({
    data: {
        cardType: a.Dict.cardType,
        type: a.Dict.cardType[0],
        name: "",
        cardNum: "",
        phone: "",
        address: "",
        remark: "",
        lastPage: null,
        selectShow: !1,
        dataList: null
    },
    onRemarkChange: function(a) {
        this.setData({
            remark: a.detail.value
        });
    },
    onLoad: function() {
        var a = getCurrentPages();
        this.lastPage = a[a.length - 3];
        var t = a[a.length - 2].data;
        this.setData({
            data: t.dataList,
            remark: t.dataList.remark
        });
    },
    onSubmit: function() {
        var a = this;
        this.data.remark ? wx.showModal({
            title: "提示",
            content: 0 == this.data.data.state ? "确定将此人设置为红名单吗？" : "确定将此人设置为白名单吗？",
            success: function(t) {
                t.confirm && a.submitData();
            }
        }) : wx.showToast({
            title: "请填写原因",
            icon: "none"
        });
    },
    submitData: function() {
        var t = this;
        wx.showLoading({
            title: "提交中..."
        }), this.setData({
            showMask: !0
        }), (0, a.Request)(a.Api.addFamilyShenHe, {
            auditeeId: this.data.data.auditeeId,
            auditeeName: this.data.data.auditeeName,
            teacherName: this.data.data.teacherName,
            teacherIdCard: this.data.data.teacherIdCard,
            familyName: this.data.data.name,
            familyIdCard: this.data.data.idCard,
            familyState: 0 == this.data.data.state ? 1 : 0,
            reason: this.data.remark
        }).then(function(a) {
            wx.hideLoading(), wx.showToast({
                title: "提交成功"
            }), t.lastPage.onRefresh(), setTimeout(function() {
                t.setData({
                    showMask: !1
                }), wx.navigateBack({
                    delta: 2
                });
            }, 500);
        }).catch(function(a) {
            t.setData({
                showMask: !1
            });
        });
    }
});