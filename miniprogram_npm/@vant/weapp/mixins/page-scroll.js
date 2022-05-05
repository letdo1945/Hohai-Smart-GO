function r() {
    var r = getCurrentPages();
    return r[r.length - 1] || {};
}

function e(e) {
    var n = r().vanPageScroller;
    (void 0 === n ? [] : n).forEach(function(r) {
        "function" == typeof r && r(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.pageScrollMixin = function(n) {
    return Behavior({
        attached: function() {
            var a = r();
            Array.isArray(a.vanPageScroller) ? a.vanPageScroller.push(n.bind(this)) : a.vanPageScroller = [ a.onPageScroll, n.bind(this) ], 
            a.onPageScroll = e;
        },
        detached: function() {
            var e = r();
            e.vanPageScroller = (e.vanPageScroller || []).filter(function(r) {
                return r !== n;
            });
        }
    });
};