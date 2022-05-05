var e = function() {
    for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
    var a = Array(e), o = 0;
    for (t = 0; t < n; t++) for (var i = arguments[t], r = 0, s = i.length; r < s; r++, 
    o++) a[o] = i[r];
    return a;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = require("../common/component"), a = require("./utils"), o = t(require("../toast/toast"));

n.VantComponent({
    props: {
        title: {
            type: String,
            value: "日期选择"
        },
        color: String,
        show: {
            type: Boolean,
            observer: function(e) {
                e && (this.initRect(), this.scrollIntoView());
            }
        },
        formatter: null,
        confirmText: {
            type: String,
            value: "确定"
        },
        rangePrompt: String,
        defaultDate: {
            type: [ Number, Array ],
            observer: function(e) {
                this.setData({
                    currentDate: e
                }), this.scrollIntoView();
            }
        },
        allowSameDay: Boolean,
        confirmDisabledText: String,
        type: {
            type: String,
            value: "single",
            observer: "reset"
        },
        minDate: {
            type: null,
            value: Date.now()
        },
        maxDate: {
            type: null,
            value: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
        },
        position: {
            type: String,
            value: "bottom"
        },
        rowHeight: {
            type: [ Number, String ],
            value: a.ROW_HEIGHT
        },
        round: {
            type: Boolean,
            value: !0
        },
        poppable: {
            type: Boolean,
            value: !0
        },
        showMark: {
            type: Boolean,
            value: !0
        },
        showTitle: {
            type: Boolean,
            value: !0
        },
        showConfirm: {
            type: Boolean,
            value: !0
        },
        showSubtitle: {
            type: Boolean,
            value: !0
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        maxRange: {
            type: [ Number, String ],
            value: null
        }
    },
    data: {
        subtitle: "",
        currentDate: null,
        scrollIntoView: ""
    },
    created: function() {
        this.setData({
            currentDate: this.getInitialDate()
        });
    },
    mounted: function() {
        !this.data.show && this.data.poppable || (this.initRect(), this.scrollIntoView());
    },
    methods: {
        reset: function() {
            this.setData({
                currentDate: this.getInitialDate()
            }), this.scrollIntoView();
        },
        initRect: function() {
            var e = this;
            null != this.contentObserver && this.contentObserver.disconnect();
            var t = this.createIntersectionObserver({
                thresholds: [ 0, .1, .9, 1 ],
                observeAll: !0
            });
            this.contentObserver = t, t.relativeTo(".van-calendar__body"), t.observe(".month", function(t) {
                t.boundingClientRect.top <= t.relativeRect.top && e.setData({
                    subtitle: a.formatMonthTitle(t.dataset.date)
                });
            });
        },
        getInitialDate: function() {
            var e = this.data, t = e.type, n = e.defaultDate, o = e.minDate;
            if ("range" === t) {
                var i = n || [];
                return [ i[0] || o, i[1] || a.getNextDay(new Date(o)).getTime() ];
            }
            return "multiple" === t ? [ n || o ] : n || o;
        },
        scrollIntoView: function() {
            var e = this;
            setTimeout(function() {
                var t = e.data, n = t.currentDate, o = t.type, i = t.show, r = t.poppable, s = t.minDate, l = t.maxDate, c = "single" === o ? n : n[0];
                !c || !i && r || a.getMonths(s, l).some(function(t, n) {
                    return 0 === a.compareMonth(t, c) && (e.setData({
                        scrollIntoView: "month" + n
                    }), !0);
                });
            }, 100);
        },
        onOpen: function() {
            this.$emit("open");
        },
        onOpened: function() {
            this.$emit("opened");
        },
        onClose: function() {
            this.$emit("close");
        },
        onClosed: function() {
            this.$emit("closed");
        },
        onClickDay: function(t) {
            var n = t.detail.date, o = this.data, i = o.type, r = o.currentDate, s = o.allowSameDay;
            if ("range" === i) {
                var l = r[0], c = r[1];
                if (l && !c) {
                    var u = a.compareDay(n, l);
                    1 === u ? this.select([ l, n ], !0) : -1 === u ? this.select([ n, null ]) : s && this.select([ n, n ]);
                } else this.select([ n, null ]);
            } else if ("multiple" === i) {
                var h;
                if (r.some(function(e, t) {
                    var o = 0 === a.compareDay(e, n);
                    return o && (h = t), o;
                })) {
                    var p = r.splice(h, 1);
                    this.setData({
                        currentDate: r
                    }), this.unselect(p);
                } else this.select(e(r, [ n ]));
            } else this.select(n, !0);
        },
        unselect: function(e) {
            var t = e[0];
            t && this.$emit("unselect", a.copyDates(t));
        },
        select: function(e, t) {
            var n = function(e) {
                return e instanceof Date ? e.getTime() : e;
            };
            if ((this.setData({
                currentDate: Array.isArray(e) ? e.map(n) : n(e)
            }), this.$emit("select", a.copyDates(e)), t && "range" === this.data.type) && !this.checkRange()) return;
            t && !this.data.showConfirm && this.onConfirm();
        },
        checkRange: function() {
            var e = this.data, t = e.maxRange, n = e.currentDate, i = e.rangePrompt;
            return !(t && a.calcDateNum(n) > t) || (o.default(i || "选择天数不能超过 " + t + " 天"), 
            !1);
        },
        onConfirm: function() {
            var e = this;
            ("range" !== this.data.type || this.checkRange()) && wx.nextTick(function() {
                e.$emit("confirm", a.copyDates(e.data.currentDate));
            });
        }
    }
});