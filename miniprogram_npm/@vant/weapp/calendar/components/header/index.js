Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("../../../common/component").VantComponent({
    props: {
        title: {
            type: String,
            value: "日期选择"
        },
        subtitle: String,
        showTitle: Boolean,
        showSubtitle: Boolean
    },
    data: {
        weekdays: [ "日", "一", "二", "三", "四", "五", "六" ]
    },
    methods: {}
});