Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../common/component").VantComponent({
    field: !0,
    relation: {
        name: "checkbox",
        type: "descendant",
        current: "checkbox-group",
        linked: function(e) {
            this.updateChild(e);
        }
    },
    props: {
        max: Number,
        value: {
            type: Array,
            observer: "updateChildren"
        },
        disabled: {
            type: Boolean,
            observer: "updateChildren"
        }
    },
    methods: {
        updateChildren: function() {
            var e = this;
            (this.children || []).forEach(function(t) {
                return e.updateChild(t);
            });
        },
        updateChild: function(e) {
            var t = this.data, a = t.value, n = t.disabled;
            e.setData({
                value: -1 !== a.indexOf(e.data.name),
                parentDisabled: n
            });
        }
    }
});