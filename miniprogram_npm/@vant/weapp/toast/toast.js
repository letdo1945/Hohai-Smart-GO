var e = function() {
    return (e = Object.assign || function(e) {
        for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e;
    }).apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/utils"), n = {
    type: "text",
    mask: !1,
    message: "",
    show: !0,
    zIndex: 1e3,
    duration: 2e3,
    position: "middle",
    forbidClick: !1,
    loadingType: "circular",
    selector: "#van-toast"
}, o = [], r = e({}, n);

function s(e) {
    return t.isObj(e) ? e : {
        message: e
    };
}

function i(t) {
    var n, i = e(e({}, r), s(t)), a = (i.context || (n = getCurrentPages())[n.length - 1]).selectComponent(i.selector);
    if (a) return delete i.context, delete i.selector, a.clear = function() {
        a.setData({
            show: !1
        }), i.onClose && i.onClose();
    }, o.push(a), a.setData(i), clearTimeout(a.timer), i.duration > 0 && (a.timer = setTimeout(function() {
        a.clear(), o = o.filter(function(e) {
            return e !== a;
        });
    }, i.duration)), a;
    console.warn("未找到 van-toast 节点，请确认 selector 及 context 是否正确");
}

var a = function(t) {
    return function(n) {
        return i(e({
            type: t
        }, s(n)));
    };
};

i.loading = a("loading"), i.success = a("success"), i.fail = a("fail"), i.clear = function() {
    o.forEach(function(e) {
        e.clear();
    }), o = [];
}, i.setDefaultOptions = function(e) {
    Object.assign(r, e);
}, i.resetDefaultOptions = function() {
    r = e({}, n);
}, exports.default = i;