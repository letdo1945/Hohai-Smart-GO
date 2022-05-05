var e = require("../@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e, a, o) {
    if (!e) throw new Error("请求的url为空");
    var u = e.match(/\:[a-zA-Z]+/g);
    u && u.forEach(function(r) {
        var t = r.substr(1);
        e = e.replace(r, a[t]), delete a[t];
    });
    Object.keys(a).forEach(function(e) {
        void 0 === a[e] && delete a[e];
    });
    var i = e.match(/^(PUT|DELETE|GET|POST)\s/);
    i ? (e = e.replace(i[0], ""), i = i[0].toLowerCase().trim()) : i = "get";
    var n = wx.getStorageSync("token_ap");
    return console.log(99, n), o = Object.assign({
        Authorization: "Bearer " + n
    }, o), e in r.default[i].dict ? r.default[i].fn(e, a, {
        headers: o
    }) : t.default[i](e, a, {
        headers: o
    });
};

var r = e(require("../mock/index.js")), t = e(require("./wxRequest"));