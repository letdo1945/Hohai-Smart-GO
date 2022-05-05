var e = function() {
    return (e = Object.assign || function(e) {
        for (var t, n = 1, a = arguments.length; n < a; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e;
    }).apply(this, arguments);
}, t = function() {
    for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
    var a = Array(e), r = 0;
    for (t = 0; t < n; t++) for (var u = arguments[t], i = 0, o = u.length; i < o; i++, 
    r++) a[r] = u[i];
    return a;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = require("../common/component"), a = require("../common/utils"), r = require("../picker/shared"), u = new Date().getFullYear();

function i(e, t, n) {
    return Math.min(Math.max(e, t), n);
}

function o(e) {
    return ("00" + e).slice(-2);
}

function s(e) {
    if (e) {
        for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
        return parseInt(e, 10);
    }
}

function l(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var m = function(e, t) {
    return t;
};

n.VantComponent({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: e(e({}, r.pickerProps), {
        value: {
            type: null,
            observer: "updateValue"
        },
        filter: null,
        type: {
            type: String,
            value: "datetime",
            observer: "updateValue"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        formatter: {
            type: null,
            value: m
        },
        minDate: {
            type: Number,
            value: new Date(u - 10, 0, 1).getTime(),
            observer: "updateValue"
        },
        maxDate: {
            type: Number,
            value: new Date(u + 10, 11, 31).getTime(),
            observer: "updateValue"
        },
        minHour: {
            type: Number,
            value: 0,
            observer: "updateValue"
        },
        maxHour: {
            type: Number,
            value: 23,
            observer: "updateValue"
        },
        minMinute: {
            type: Number,
            value: 0,
            observer: "updateValue"
        },
        maxMinute: {
            type: Number,
            value: 59,
            observer: "updateValue"
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    methods: {
        updateValue: function() {
            var e = this, t = this.data, n = this.correctValue(this.data.value);
            n === t.innerValue ? this.updateColumns() : this.updateColumnValue(n).then(function() {
                e.$emit("input", n);
            });
        },
        getPicker: function() {
            if (null == this.picker) {
                this.picker = this.selectComponent(".van-datetime-picker");
                var e = this.picker, n = e.setColumnValues;
                e.setColumnValues = function() {
                    for (var a = [], r = 0; r < arguments.length; r++) a[r] = arguments[r];
                    return n.apply(e, t(a, [ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, t = void 0 === e ? m : e, n = this.getOriginColumns().map(function(e) {
                return {
                    values: e.values.map(function(n) {
                        return t(e.type, n);
                    })
                };
            });
            return this.set({
                columns: n
            });
        },
        getOriginColumns: function() {
            var e = this.data.filter;
            return this.getRanges().map(function(t) {
                var n = t.type, a = t.range, r = function(e, t) {
                    for (var n = -1, a = Array(e < 0 ? 0 : e); ++n < e; ) a[n] = t(n);
                    return a;
                }(a[1] - a[0] + 1, function(e) {
                    var t = a[0] + e;
                    return t = "year" === n ? "" + t : o(t);
                });
                return e && (r = e(n, r)), {
                    type: n,
                    values: r
                };
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), n = t.maxYear, a = t.maxDate, r = t.maxMonth, u = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), s = o.minYear, l = o.minDate, m = [ {
                type: "year",
                range: [ s, n ]
            }, {
                type: "month",
                range: [ o.minMonth, r ]
            }, {
                type: "day",
                range: [ l, a ]
            }, {
                type: "hour",
                range: [ o.minHour, u ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && m.splice(3, 2), "year-month" === e.type && m.splice(2, 3), 
            m;
        },
        correctValue: function(e) {
            var t, n = this.data, r = "time" !== n.type;
            if (r && (t = e, !a.isDef(t) || isNaN(new Date(t).getTime()))) e = n.minDate; else if (!r && !e) {
                e = o(n.minHour) + ":00";
            }
            if (!r) {
                var u = e.split(":"), s = u[0], l = u[1];
                return (s = o(i(s, n.minHour, n.maxHour))) + ":" + (l = o(i(l, n.minMinute, n.maxMinute)));
            }
            return e = Math.max(e, n.minDate), e = Math.min(e, n.maxDate);
        },
        getBoundary: function(e, t) {
            var n, a = new Date(t), r = new Date(this.data[e + "Date"]), u = r.getFullYear(), i = 1, o = 1, s = 0, m = 0;
            return "max" === e && (i = 12, o = l(a.getFullYear(), a.getMonth() + 1), s = 23, 
            m = 59), a.getFullYear() === u && (i = r.getMonth() + 1, a.getMonth() + 1 === i && (o = r.getDate(), 
            a.getDate() === o && (s = r.getHours(), a.getHours() === s && (m = r.getMinutes())))), 
            (n = {})[e + "Year"] = u, n[e + "Month"] = i, n[e + "Date"] = o, n[e + "Hour"] = s, 
            n[e + "Minute"] = m, n;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e, t = this, n = this.data, a = this.getPicker();
            if ("time" === n.type) {
                var r = a.getIndexes();
                e = +n.columns[0].values[r[0]] + ":" + +n.columns[1].values[r[1]];
            } else {
                var u = a.getValues(), i = s(u[0]), o = s(u[1]), m = l(i, o), p = s(u[2]);
                "year-month" === n.type && (p = 1), p = p > m ? m : p;
                var c = 0, h = 0;
                "datetime" === n.type && (c = s(u[3]), h = s(u[4])), e = new Date(i, o - 1, p, c, h);
            }
            e = this.correctValue(e), this.updateColumnValue(e).then(function() {
                t.$emit("input", e), t.$emit("change", a);
            });
        },
        updateColumnValue: function(e) {
            var t = this, n = [], a = this.data, r = a.type, u = a.formatter, i = void 0 === u ? m : u, s = this.getPicker();
            if ("time" === r) {
                var l = e.split(":");
                n = [ i("hour", l[0]), i("minute", l[1]) ];
            } else {
                var p = new Date(e);
                n = [ i("year", "" + p.getFullYear()), i("month", o(p.getMonth() + 1)) ], "date" === r && n.push(i("day", o(p.getDate()))), 
                "datetime" === r && n.push(i("day", o(p.getDate())), i("hour", o(p.getHours())), i("minute", o(p.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return s.setValues(n);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});