Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../common/component"), e = require("../mixins/page-scroll");

t.VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: "onScroll"
        },
        disabled: {
            type: Boolean,
            observer: "onScroll"
        },
        container: {
            type: null,
            observer: "onScroll"
        }
    },
    mixins: [ e.pageScrollMixin(function(t) {
        this.onScroll(t);
    }) ],
    data: {
        height: 0,
        fixed: !1,
        transform: 0
    },
    mounted: function() {
        this.onScroll();
    },
    methods: {
        onScroll: function(t) {
            var e = this, i = (void 0 === t ? {} : t).scrollTop, o = this.data, n = o.container, r = o.offsetTop;
            o.disabled ? this.setDataAfterDiff({
                fixed: !1,
                transform: 0
            }) : (this.scrollTop = i || this.scrollTop, "function" != typeof n ? this.getRect(".van-sticky").then(function(t) {
                r >= t.top ? (e.setDataAfterDiff({
                    fixed: !0,
                    height: t.height
                }), e.transform = 0) : e.setDataAfterDiff({
                    fixed: !1
                });
            }) : Promise.all([ this.getRect(".van-sticky"), this.getContainerRect() ]).then(function(t) {
                var i = t[0], o = t[1];
                r + i.height > o.height + o.top ? e.setDataAfterDiff({
                    fixed: !1,
                    transform: o.height - i.height
                }) : r >= i.top ? e.setDataAfterDiff({
                    fixed: !0,
                    height: i.height,
                    transform: 0
                }) : e.setDataAfterDiff({
                    fixed: !1,
                    transform: 0
                });
            }));
        },
        setDataAfterDiff: function(t) {
            var e = this;
            wx.nextTick(function() {
                var i = Object.keys(t).reduce(function(i, o) {
                    return t[o] !== e.data[o] && (i[o] = t[o]), i;
                }, {});
                e.setData(i), e.$emit("scroll", {
                    scrollTop: e.scrollTop,
                    isFixed: t.fixed || e.data.fixed
                });
            });
        },
        getContainerRect: function() {
            var t = this.data.container();
            return new Promise(function(e) {
                return t.boundingClientRect(e).exec();
            });
        }
    }
});