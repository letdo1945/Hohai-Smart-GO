Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

exports.default = {
    status: function(e) {
        var t = [];
        return e.forEach(function(e) {
            0 == e.value ? t.push({
                type: 0,
                color: "rgb(137, 208, 255);",
                label: "待审核"
            }) : 1 == e.value ? t.push({
                type: 1,
                color: "rgb(0, 153, 255);",
                label: "已通过"
            }) : t.push({
                type: 1,
                color: "rgb(255, 61, 61);",
                label: "未通过"
            });
        }), t.unshift(t[t.length - 1]), t.push({
            type: 0,
            color: "rgb(137, 208, 255);",
            label: "待审核"
        }), t;
    }
};