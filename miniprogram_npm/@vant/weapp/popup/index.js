Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), o = require("../mixins/transition");

e.VantComponent({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class", "close-icon-class" ],
    mixins: [ o.transition(!1) ],
    props: {
        round: Boolean,
        closeable: Boolean,
        customStyle: String,
        overlayStyle: String,
        transition: {
            type: String,
            observer: "observeClass"
        },
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeIcon: {
            type: String,
            value: "cross"
        },
        closeIconPosition: {
            type: String,
            value: "top-right"
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        position: {
            type: String,
            value: "center",
            observer: "observeClass"
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: !1
        }
    },
    created: function() {
        this.observeClass();
    },
    methods: {
        onClickCloseIcon: function() {
            this.$emit("close");
        },
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.data.closeOnClickOverlay && this.$emit("close");
        },
        observeClass: function() {
            var e = this.data, o = e.transition, t = e.position, s = {
                name: o || t
            };
            "none" === o && (s.duration = 0), this.setData(s);
        }
    }
});