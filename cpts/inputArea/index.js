Component({
    properties: {
        customStyle: String,
        value: String,
        placeholder: String
    },
    data: {
        text: "",
        edit: !1,
        atext: []
    },
    ready: function() {
        this.atext = this.text && this.text.split(/\n/), this.setData({
            text: this.data.value,
            atext: this.data.value && this.data.value.split(/\n/)
        });
    },
    methods: {
        onChange: function(t) {
            var e = t.detail.value;
            this.setData({
                text: e,
                atext: e && e.split(/\n/)
            }), this.triggerEvent("change", t.detail);
        },
        onBlur: function() {
            this.setData({
                edit: !1
            });
        },
        onEdit: function() {
            this.setData({
                edit: !0
            });
        }
    }
});