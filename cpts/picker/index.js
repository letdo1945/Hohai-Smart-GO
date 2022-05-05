var a = require("../../@babel/runtime/helpers/objectSpread2"), t = require("../../utils/index.js"), e = getApp();

Component({
    properties: {
        label: String,
        placeholder: String,
        columns: Array,
        formatValue: {
            type: Function,
            value: function(a) {
                return a.map(function(a) {
                    return a.label;
                }).join("/");
            }
        }
    },
    data: {
        loading: !1,
        visible: !1,
        value: null,
        labelValue: "",
        columnsData: [],
        cache: []
    },
    methods: {
        onClick: function() {
            this.setData({
                visible: !0,
                loading: !0
            }), this.loadData(0);
        },
        onChange: function(a) {
            var t = a.detail.index + 1;
            t < this.data.columns.length && (this.setData({
                loading: !0
            }), this.loadData(t, a.detail.value[t - 1].value));
        },
        loadData: function(l, n) {
            var i = this, s = this.data.columns[l];
            if (s) if (this.data.cache[l] && this.data.cache[l][n]) {
                var o = this.data.cache[l][n];
                this.data.columnsData[l] = {
                    values: o
                }, this.setData({
                    columnsData: this.data.columnsData
                }), this.loadData(l + 1, o[0].value);
            } else (0, t.Request)(s.url, a({
                organId: e.globalData.userInfo.organId,
                start: 0,
                length: 1e3
            }, "function" == typeof s.params ? s.params(n, s) : {})).then(function(a) {
                var t = a.map(function(a) {
                    return {
                        label: a.name,
                        value: a.id
                    };
                });
                "function" == typeof s.format && (a = s.format(t)), i.data.cache[l] || (i.data.cache[l] = {}), 
                i.data.cache[l][n] = t, i.data.columnsData[l] = {
                    values: t
                }, i.setData({
                    columnsData: i.data.columnsData
                }), i.loadData(l + 1, t[0].value);
            }); else this.setData({
                loading: !1
            });
        },
        onClose: function() {
            this.data.loading && this.setData({
                visible: !1
            });
        },
        onCancel: function() {
            this.setData({
                visible: !1
            });
        },
        onConfirm: function(a) {
            var t = a.detail.value;
            this.setData({
                visible: !1,
                value: t,
                labelValue: this.data.formatValue(t)
            }), this.triggerEvent("change", t);
        }
    }
});