Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    props: {
        size: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String,
        type: {
            type: String,
            value: "default"
        },
        closeable: Boolean
    },
    methods: {
        onClose: function() {
            this.$emit("close");
        }
    }
});