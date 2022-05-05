var e = require("../@babel/runtime/helpers/interopRequireDefault"), r = require("../@babel/runtime/helpers/objectSpread2"), t = e(require("./projectUtil.js")), a = function(e, r) {
    for (var t = e.toString().split("").reverse(), a = t.length; a < r; a++) t.push("0");
    return t.reverse().join("");
};

module.exports = r({
    formatTime: function(e, r) {
        "string" == typeof e && (e = e.replace(/-/g, "/").replace("T", " ").replace(".0", ""));
        var t = new Date(e), l = t.getFullYear(), p = a(t.getMonth() + 1, 2), u = a(t.getDate(), 2), i = a(t.getHours(), 2), n = a(t.getMinutes(), 2), s = a(t.getSeconds(), 2);
        return r.replace("YYYY", l).replace("MM", p).replace("DD", u).replace("HH", i).replace("mm", n).replace("ss", s);
    }
}, t.default);