Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../mixins/touch"), n = require("../common/utils");

t.VantComponent({
    mixins: [ e.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        current: "tabs",
        linked: function(t) {
            t.index = this.children.length - 1, this.updateTabs();
        },
        unlinked: function() {
            this.children = this.children.map(function(t, e) {
                return t.index = e, t;
            }), this.updateTabs();
        }
    },
    props: {
        color: {
            type: String,
            observer: "setLine"
        },
        sticky: Boolean,
        animated: {
            type: Boolean,
            observer: function() {
                var t = this;
                this.children.forEach(function(e, n) {
                    return e.updateRender(n === t.data.currentIndex, t);
                });
            }
        },
        swipeable: Boolean,
        lineWidth: {
            type: [ String, Number ],
            value: -1,
            observer: "setLine"
        },
        lineHeight: {
            type: [ String, Number ],
            value: -1,
            observer: "setLine"
        },
        titleActiveColor: String,
        titleInactiveColor: String,
        active: {
            type: [ String, Number ],
            value: 0,
            observer: function(t) {
                t !== this.getCurrentName() && this.setCurrentIndexByName(t);
            }
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        ellipsis: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4,
            observer: function(t) {
                this.setData({
                    scrollable: this.children.length > t || !this.data.ellipsis
                });
            }
        },
        offsetTop: {
            type: Number,
            value: 0
        },
        lazyRender: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        currentIndex: null,
        container: null
    },
    mounted: function() {
        var t = this;
        wx.nextTick(function() {
            t.setLine(!0), t.scrollIntoView();
        });
    },
    methods: {
        updateContainer: function() {
            var t = this;
            this.setData({
                container: function() {
                    return t.createSelectorQuery().select(".van-tabs");
                }
            });
        },
        updateTabs: function() {
            var t = this.children, e = void 0 === t ? [] : t, n = this.data;
            this.setData({
                tabs: e.map(function(t) {
                    return t.data;
                }),
                scrollable: this.children.length > n.swipeThreshold || !n.ellipsis
            }), this.setCurrentIndexByName(this.getCurrentName() || n.active);
        },
        trigger: function(t, e) {
            var i = this.data.currentIndex, r = e || this.children[i];
            n.isDef(r) && this.$emit(t, {
                index: r.index,
                name: r.getComputedName(),
                title: r.data.title
            });
        },
        onTap: function(t) {
            var e = this, n = t.currentTarget.dataset.index, i = this.children[n];
            i.data.disabled ? this.trigger("disabled", i) : (this.setCurrentIndex(n), wx.nextTick(function() {
                e.trigger("click");
            }));
        },
        setCurrentIndexByName: function(t) {
            var e = this.children, n = (void 0 === e ? [] : e).filter(function(e) {
                return e.getComputedName() === t;
            });
            n.length && this.setCurrentIndex(n[0].index);
        },
        setCurrentIndex: function(t) {
            var e = this, i = this.data, r = this.children, a = void 0 === r ? [] : r;
            if (!(!n.isDef(t) || t >= a.length || t < 0) && (a.forEach(function(n, i) {
                var r = i === t;
                r === n.data.active && n.inited || n.updateRender(r, e);
            }), t !== i.currentIndex)) {
                var s = null !== i.currentIndex;
                this.setData({
                    currentIndex: t
                }), wx.nextTick(function() {
                    e.setLine(), e.scrollIntoView(), e.updateContainer(), e.trigger("input"), s && e.trigger("change");
                });
            }
        },
        getCurrentName: function() {
            var t = this.children[this.data.currentIndex];
            if (t) return t.getComputedName();
        },
        setLine: function(t) {
            var e = this;
            if ("line" === this.data.type) {
                var i = this.data, r = i.color, a = i.duration, s = i.currentIndex, o = i.lineWidth, l = i.lineHeight;
                this.getRect(".van-tab", !0).then(function(i) {
                    void 0 === i && (i = []);
                    var u = i[s];
                    if (null != u) {
                        var c = -1 !== o ? o : u.width / 2, d = -1 !== l ? "height: " + n.addUnit(l) + "; border-radius: " + n.addUnit(l) + ";" : "", h = i.slice(0, s).reduce(function(t, e) {
                            return t + e.width;
                        }, 0);
                        h += (u.width - c) / 2;
                        var v = t ? "" : "transition-duration: " + a + "s; -webkit-transition-duration: " + a + "s;";
                        e.setData({
                            lineStyle: "\n            " + d + "\n            width: " + n.addUnit(c) + ";\n            background-color: " + r + ";\n            -webkit-transform: translateX(" + h + "px);\n            transform: translateX(" + h + "px);\n            " + v + "\n          "
                        });
                    }
                });
            }
        },
        scrollIntoView: function() {
            var t = this, e = this.data, n = e.currentIndex;
            e.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(e) {
                var i = e[0], r = e[1], a = i[n], s = i.slice(0, n).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                t.setData({
                    scrollLeft: s - (r.width - a.width) / 2
                });
            });
        },
        onTouchScroll: function(t) {
            this.$emit("scroll", t.detail);
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.tabs, n = t.currentIndex, i = this.direction, r = this.deltaX, a = this.offsetX;
                "horizontal" === i && a >= 50 && (r > 0 && 0 !== n ? this.setCurrentIndex(n - 1) : r < 0 && n !== e.length - 1 && this.setCurrentIndex(n + 1));
            }
        }
    }
});