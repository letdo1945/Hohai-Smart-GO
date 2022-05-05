Object.defineProperty(exports, "__esModule", {
    value: !0
});

require("../common/component").VantComponent({
    props: {
        text: {
            type: String,
            value: "",
            observer: function() {
                var t = this;
                wx.nextTick(function() {
                    t.init();
                });
            }
        },
        mode: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        openType: {
            type: String,
            value: "navigate"
        },
        delay: {
            type: Number,
            value: 1
        },
        speed: {
            type: Number,
            value: 50,
            observer: function() {
                var t = this;
                wx.nextTick(function() {
                    t.init();
                });
            }
        },
        scrollable: {
            type: Boolean,
            value: !0
        },
        leftIcon: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#ed6a0c"
        },
        backgroundColor: {
            type: String,
            value: "#fffbe8"
        },
        wrapable: Boolean
    },
    data: {
        show: !0
    },
    created: function() {
        this.resetAnimation = wx.createAnimation({
            duration: 0,
            timingFunction: "linear"
        });
    },
    destroyed: function() {
        this.timer && clearTimeout(this.timer);
    },
    methods: {
        init: function() {
            var t = this;
            Promise.all([ this.getRect(".van-notice-bar__content"), this.getRect(".van-notice-bar__wrap") ]).then(function(e) {
                var i = e[0], n = e[1];
                if (null != i && null != n && i.width && n.width) {
                    var a = t.data, o = a.speed, r = a.scrollable, l = a.delay;
                    if (r && n.width < i.width) {
                        var s = i.width / o * 1e3;
                        t.wrapWidth = n.width, t.contentWidth = i.width, t.duration = s, t.animation = wx.createAnimation({
                            duration: s,
                            timingFunction: "linear",
                            delay: l
                        }), t.scroll();
                    }
                }
            });
        },
        scroll: function() {
            var t = this;
            this.timer && clearTimeout(this.timer), this.timer = null, this.setData({
                animationData: this.resetAnimation.translateX(this.wrapWidth).step().export()
            }), setTimeout(function() {
                t.setData({
                    animationData: t.animation.translateX(-t.contentWidth).step().export()
                });
            }, 20), this.timer = setTimeout(function() {
                t.scroll();
            }, this.duration);
        },
        onClickIcon: function() {
            this.timer && clearTimeout(this.timer), this.timer = null, this.setData({
                show: !1
            });
        },
        onClick: function(t) {
            this.$emit("click", t);
        }
    }
});