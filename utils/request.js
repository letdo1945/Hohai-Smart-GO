var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = require("../@babel/runtime/helpers/typeof"), o = require("../@babel/runtime/helpers/objectSpread2"), n = e(require("./baseRequest.js")), a = e(require("./api"));

function r(e, i, s) {
    return new Promise(function(u, c) {
        var d = i ? o({}, i) : i;
        (0, n.default)(e, d, s).then(function(o) {
            var n, d, l = o.data;
            200 == l.code ? (l.data && "object" == t(l.data) && (l.data._data = {
                message: l.data.message
            }), u(l.data)) : 1 == l.code ? (wx.removeStorageSync("token_ap"), n = function() {
                console.log(e, i, s), r(e, i, s).then(function(e) {
                    u(e);
                });
            }, d = wx.getStorageSync("openid"), console.log(d), r(a.default.getToken, {
                openId: d
            }).then(function(e) {
                e && e.token ? (wx.setStorageSync("token_ap", e.token), n()) : wx.showToast({
                    title: "获取Token失败",
                    icon: "none"
                });
            })) : (wx.showToast({
                title: l.message || l.msg,
                icon: "none"
            }), c(l));
        }).catch(function(e) {
            return c(e);
        });
    });
}

var i = r;

exports.default = i;