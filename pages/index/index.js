var a = require("../../@babel/runtime/helpers/interopRequireDefault"), e = require("../../utils/index.js"), t = a(require("./xieyi.js")), n = getApp();

Page({
    data: {
        isStudent: !1,
        isTeacher: 0,
        showMask: !1,
        userInfo: null,
        wxUserInfo: null,
        loading: !0,
        loadError: !1,
        idCardNum: null,
        code: "刷新获取",
        codeUpdateTime: null,
        codeLoading: !1,
        isTeacherLoader: !1,
        isAdmin: !1,
        isMaster: !1,
        checked: !0,
        isGeLi: !1,
        hasBathhouse: !1,
        isFamily: !1,
        isFirst: !1,
        isLabor: !1,
        isOrdinary: !1,
        isUnOrdinary: !1,
        isGraduate: !1,
        isStay: !1,
        glTime: e.Util.formatTime(Date.now(), "MM月DD日 HH:mm"),
        qrUrl: "",
        tong: !1,
        idCard: null,
        idPhone: null,
        isFangKe: !1
    },
    onLoad: function(a) {
        var e = this;
        this.setData({
            qrUrl: a.q && decodeURIComponent(a.q)
        }), n.onLoadFinish = function(a) {
            e.setData({
                wxUserInfo: a.wxUserInfo,
                loadError: a.error
            }), a.wxUserInfo ? e.getUserData() : e.setData({
                loading: !1
            });
        };
    },
    onShow: function() {
        1 == this.data.tong && this.getUserData();
    },
    jumpByCode: function(a) {
        var e = a.split("message=")[1];
        try {
            var t = JSON.parse(decodeURIComponent(e));
            if (!t.id) return void wx.showToast({
                title: "扫码的二维码无效",
                icon: "none",
                duration: 2e3
            });
            switch (t.type) {
              case "0":
              case "1":
              case 0:
              case 1:
              case "3":
              case "4":
              case 3:
              case 4:
              case 5:
              case "5":
                return void (t.id ? 0 == this.data.isFangKe ? wx.reLaunch({
                    url: "/pages/result/index?type=".concat(t.type, "&id=").concat(t.id)
                }) : wx.navigateTo({
                    url: "/pages/result/index?type=".concat(t.type, "&id=").concat(t.id)
                }) : wx.showToast({
                    title: "二维码编号无效",
                    icon: "none",
                    duration: 2e3
                }));

              default:
                wx.showToast({
                    title: "二维码参数类型不存在",
                    icon: "none",
                    duration: 2e3
                });
            }
        } catch (a) {
            wx.showToast({
                title: "扫码的二维码无效",
                icon: "none",
                duration: 2e3
            });
        }
    },
    onIdCardNumChange: function(a) {
        this.setData({
            idCardNum: a.detail
        });
    },
    onIdCardChange: function(a) {
        this.setData({
            idCard: a.detail
        });
    },
    onIdPhoneChange: function(a) {
        this.setData({
            idPhone: a.detail
        });
    },
    onCheckStudent: function(a) {
        this.setData({
            isTeacher: a.currentTarget.dataset.value
        });
    },
    onCheckClick: function() {
        this.setData({
            checked: !this.data.checked
        });
    },
    onXieYiClick: function() {
        wx.showModal({
            title: "用户协议",
            content: t.default.xieyi
        });
    },
    onYinSiClick: function() {
        wx.showModal({
            title: "隐私政策",
            content: t.default.yinsi
        });
    },
    onBind: function(a) {
        var t = this, o = a.detail;
        if (o.signature) {
            if (!this.data.checked) return void wx.showToast({
                title: "您需要先阅读并同意用户协议",
                icon: "none"
            });
            this.data.idCard && (this.data.showMask = !0, (0, e.Request)(e.Api.getTXBind, {
                openid: n.globalData.openId,
                idcard: this.data.idCard
            }).then(function(a) {
                t.setData({
                    wxUserInfo: o.userInfo
                }), t.data.showMask = !1, wx.showToast({
                    title: "绑定成功",
                    icon: "none"
                }), t.getToken();
            }).catch(function(a) {
                t.data.showMask = !1;
            })), this.data.idCardNum ? (this.data.showMask = !0, (0, e.Request)(1 == this.data.isTeacher ? e.Api.bindUser : 2 == this.data.isTeacher ? e.Api.bindQiTa : e.Api.bindStudent, {
                openId: n.globalData.openId,
                cardId: this.data.idCardNum
            }).then(function(a) {
                t.setData({
                    wxUserInfo: o.userInfo
                }), t.data.showMask = !1, wx.showToast({
                    title: "绑定成功",
                    icon: "none"
                }), t.getToken();
            }).catch(function(a) {
                t.data.showMask = !1;
            })) : wx.showToast({
                title: "请填写证件号",
                icon: "none"
            });
        } else wx.showToast({
            title: o.errMsg,
            icon: "none"
        });
    },
    getUserData: function() {
        var a = this;
        wx.getStorageSync("token_ap") ? (0, e.Request)(e.Api.getUserInfo, {
            openId: n.globalData.openId
        }).then(function(t) {
            if (t.permission) if (2 == t.model.property) n.globalData.isFangKe = 2 == t.model.property, 
            n.globalData.userInfo = t = t.model, a.data.qrUrl && a.jumpByCode(a.data.qrUrl), 
            a.setData({
                qrUrl: ""
            }), a.setData({
                isFangKe: n.globalData.isFangKe,
                userInfo: t
            }); else {
                n.globalData.isStudent = 0 == t.model.property, n.globalData.isFamily = 1 == t.model.family, 
                n.globalData.organ = t.permission, n.globalData.isLabor = "2352" == t.model.id || "616" == t.model.id, 
                n.globalData.isOrdinary = 1 == t.model.property && 1 == t.model.isSport, n.globalData.isUnOrdinary = 1 == t.model.property && 0 == t.model.isSport, 
                n.globalData.isGraduate = 1 == t.model.graduation && e.Util.formatTime(Date.now(), "YYYY-MM-DD HH:mm:ss") > t.model.outtime, 
                n.globalData.isStay = 4 == t.model.type;
                var o = n.globalData.permission = t.permission ? t.permission[0] : null;
                n.globalData.bathhouse = t.bathhouse, n.globalData.userInfo = t = t.model, n.globalData.isMaster = o && o.twoTeacherBaseId == t.id, 
                n.globalData.isFirst = o && o.oneTeacherBaseId == t.id, a.setData({
                    isStudent: n.globalData.isStudent,
                    isTeacherLoader: t.stuAuthority,
                    loading: !1,
                    userInfo: t,
                    hasBathhouse: !!n.globalData.bathhouse,
                    isGeLi: 1 == t.specialExclusion,
                    isAdmin: !!o,
                    isMaster: o && o.twoTeacherBaseId == t.id,
                    isFirst: o && o.oneTeacherBaseId == t.id,
                    isFamily: n.globalData.isFamily,
                    isLabor: n.globalData.isLabor,
                    isOrdinary: n.globalData.isOrdinary,
                    isUnOrdinary: n.globalData.isUnOrdinary,
                    isGraduate: n.globalData.isGraduate,
                    isStay: n.globalData.isStay,
                    isFangKe: n.globalData.isFangKe
                }), a.data.qrUrl && a.jumpByCode(a.data.qrUrl), a.setData({
                    qrUrl: ""
                });
            } else a.setData({
                loading: !1
            });
        }).catch(function(e) {
            (10026 == e.code || 1 == e.code) && a.setData({
                loading: !1
            });
        }) : this.setData({
            loading: !1
        });
    },
    getToken: function(a) {
        var t = this, n = wx.getStorageSync("openid") || a;
        (0, e.Request)(e.Api.getToken, {
            openId: n
        }).then(function(a) {
            a && a.token ? (wx.setStorageSync("token_ap", a.token), t.getUserData()) : a && !a.token && t.setData({
                loading: !1
            });
        });
    },
    onRefresh: function() {
        var a = this;
        this.setData({
            codeLoading: !0
        }), (0, e.Request)(e.Api.getCode, {
            openId: n.globalData.openId
        }).then(function(t) {
            a.setData({
                codeUpdateTime: t ? e.Util.formatTime(Date.now() + 6e5, "HH:mm") : null,
                code: t,
                codeLoading: !1
            });
        }).catch(function(e) {
            a.setData({
                code: "获取失败，请重试",
                codeLoading: !1
            });
        });
    },
    gotoSaoYiSao: function() {
        var a = this;
        1 == n.globalData.userInfo.backState && 0 == n.globalData.userInfo.intoState ? wx.showToast({
            title: "该功能暂未授权",
            icon: "none",
            duration: 1e3
        }) : wx.scanCode({
            success: function(e) {
                a.jumpByCode(e.result);
            },
            fail: function() {
                wx.showToast({
                    title: "扫码的二维码无效",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    gotoXSShenHe: function() {
        wx.navigateTo({
            url: "/pages/student/shenhe/index"
        });
    },
    gotoShenHe: function() {
        wx.navigateTo({
            url: "/pages/shenhe/index"
        });
    },
    gotoShenQing: function() {
        wx.navigateTo({
            url: "/pages/shenqing/index"
        });
    },
    gotoFangKe: function() {
        wx.navigateTo({
            url: "/pages/fangke/index"
        });
    },
    gotoJiLu: function() {
        wx.navigateTo({
            url: "/pages/jilu/index"
        });
    },
    gotoXSJiLu: function() {
        wx.navigateTo({
            url: "/pages/student/jilu/index"
        });
    },
    gotoPiLiang: function() {
        wx.navigateTo({
            url: "/pages/piliang/index"
        });
    },
    gotoRenYuan: function() {
        wx.navigateTo({
            url: "/pages/renyuan/index"
        });
    },
    gotoRenYuanShenHe: function() {
        wx.navigateTo({
            url: "/pages/shenherenyuan/index"
        });
    },
    gotoUsers: function() {
        wx.navigateTo({
            url: "/pages/usermanage/index"
        });
    },
    gotoTuiXiu: function() {
        wx.navigateTo({
            url: "/pages/tuixiu/index"
        });
    },
    gotoXSShenQing: function() {
        wx.navigateTo({
            url: "/pages/student/shenqing/index"
        });
    },
    gotoJinChuJiLu: function() {
        wx.navigateTo({
            url: "/pages/student/churujilu/index"
        });
    },
    gotoBus: function() {
        wx.navigateTo({
            url: "/pages/bus/index"
        });
    },
    gotoBusBind: function() {
        wx.navigateTo({
            url: "/pages/tankuang/index"
        });
    },
    gotoZaoTang: function() {
        var a = n.globalData.userInfo;
        a.sex ? wx.navigateTo({
            url: "/pages/zaotang/yuyuezaotanglist/index"
        }) : wx.showActionSheet({
            itemList: 4 == a.type ? [ "male", "female" ] : [ "男", "女" ],
            success: function(t) {
                var o = this, i = null;
                i = 0 == t.tapIndex ? 1 : 2, (0, e.Request)(e.Api.updateUserSex, {
                    idCard: a.idCard,
                    sextype: i
                }).then(function(a) {
                    n.globalData.userInfo.sex = i, wx.navigateTo({
                        url: "/pages/zaotang/yuyuezaotanglist/index"
                    });
                }).catch(function(a) {
                    o.setData({
                        code: "更新失败，请重试",
                        codeLoading: !1
                    });
                });
            },
            fail: function(a) {
                console.log(a.errMsg);
            }
        });
    },
    gotoZaoTangGuanLi: function() {
        wx.navigateTo({
            url: "/pages/zaotang/zaotanglist/index"
        });
    },
    gotoBaoBei: function() {
        wx.navigateTo({
            url: "/pages/jiashu/baobei/index"
        });
    },
    gotoJiaShuShenHe: function() {
        wx.navigateTo({
            url: "/pages/jiashu/shenhe/index"
        });
    },
    gotoJianKangTongXing: function() {
        wx.navigateTo({
            url: "/pages/jiankangtongxing/index"
        });
    },
    gotoTongXingGuanLi: function() {
        wx.navigateTo({
            url: "/pages/tongxingguanli/index"
        });
    },
    onAddTongXing: function() {
        wx.navigateTo({
            url: "/pages/tianjiatongxing/index"
        });
    }
});