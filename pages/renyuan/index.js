Page({
    data: {
        index: 1,
        user: null
    },
    onShow: function() {
        this.setData({
            index: this.data.index + 1
        });
    },
    onSelect: function(t) {
        this.user = t.detail;
    }
});