function e(e, t) {
    e instanceof Date || (e = new Date(e)), t instanceof Date || (t = new Date(t));
    var n = e.getFullYear(), r = t.getFullYear(), a = e.getMonth(), o = t.getMonth();
    return n === r ? a === o ? 0 : a > o ? 1 : -1 : n > r ? 1 : -1;
}

function t(e, t) {
    return (e = new Date(e)).setDate(e.getDate() + t), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.ROW_HEIGHT = 64, exports.formatMonthTitle = function(e) {
    return e instanceof Date || (e = new Date(e)), e.getFullYear() + "年" + (e.getMonth() + 1) + "月";
}, exports.compareMonth = e, exports.compareDay = function(t, n) {
    t instanceof Date || (t = new Date(t)), n instanceof Date || (n = new Date(n));
    var r = e(t, n);
    if (0 === r) {
        var a = t.getDate(), o = n.getDate();
        return a === o ? 0 : a > o ? 1 : -1;
    }
    return r;
}, exports.getPrevDay = function(e) {
    return t(e, -1);
}, exports.getNextDay = function(e) {
    return t(e, 1);
}, exports.calcDateNum = function(e) {
    var t = new Date(e[0]).getTime();
    return (new Date(e[1]).getTime() - t) / 864e5 + 1;
}, exports.copyDates = function(e) {
    return Array.isArray(e) ? e.map(function(e) {
        return null === e ? e : new Date(e);
    }) : new Date(e);
}, exports.getMonthEndDay = function(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}, exports.getMonths = function(t, n) {
    var r = [], a = new Date(t);
    a.setDate(1);
    do {
        r.push(a.getTime()), a.setMonth(a.getMonth() + 1);
    } while (1 !== e(a, n));
    return r;
};