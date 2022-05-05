require("../../../utils/index.js");

Page({
    data: {
        data: null,
        item: null
    },
    onLoad: function() {
        var t = getCurrentPages();
        this.setData({
            data: t[t.length - 2].data.item
        });
    }
});