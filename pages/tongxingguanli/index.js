Page({
    data: {
        item: null
    },
    onSelect: function(t) {
        this.setData({
            item: t.detail
        });
    }
});