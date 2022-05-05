Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    props: {
        dot: Boolean,
        info: null,
        size: null,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        },
        name: {
            type: String,
            observer: function(e) {
                this.setData({
                    isImageName: -1 !== e.indexOf("/")
                });
            }
        }
    },
    methods: {
        onClick: function() {
            this.$emit("click");
        }
    }
});