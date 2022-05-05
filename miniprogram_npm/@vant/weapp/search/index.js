Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    field: !0,
    classes: [ "field-class", "input-class", "cancel-class" ],
    props: {
        label: String,
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        useLeftIconSlot: Boolean,
        useRightIconSlot: Boolean,
        leftIcon: {
            type: String,
            value: "search"
        },
        rightIcon: String,
        placeholder: String,
        placeholderStyle: String,
        actionText: {
            type: String,
            value: "取消"
        },
        background: {
            type: String,
            value: "#ffffff"
        },
        maxlength: {
            type: Number,
            value: -1
        },
        shape: {
            type: String,
            value: "square"
        },
        clearable: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        onChange: function(e) {
            this.setData({
                value: e.detail
            }), this.$emit("change", e.detail);
        },
        onCancel: function() {
            var e = this;
            setTimeout(function() {
                e.setData({
                    value: ""
                }), e.$emit("cancel"), e.$emit("change", "");
            }, 200);
        },
        onSearch: function() {
            this.$emit("search", this.data.value);
        },
        onFocus: function() {
            this.$emit("focus");
        },
        onBlur: function() {
            this.$emit("blur");
        },
        onClear: function() {
            this.$emit("clear");
        }
    }
});