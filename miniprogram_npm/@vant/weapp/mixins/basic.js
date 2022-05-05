Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.basic = Behavior({
    methods: {
        $emit: function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this.triggerEvent.apply(this, e);
        },
        set: function(e, t) {
            return this.setData(e, t), new Promise(function(e) {
                return wx.nextTick(e);
            });
        },
        getRect: function(e, t) {
            var n = this;
            return new Promise(function(r) {
                wx.createSelectorQuery().in(n)[t ? "selectAll" : "select"](e).boundingClientRect(function(e) {
                    t && Array.isArray(e) && e.length && r(e), !t && e && r(e);
                }).exec();
            });
        }
    }
});