Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.touch = Behavior({
    methods: {
        resetTouchStatus: function() {
            this.direction = "", this.deltaX = 0, this.deltaY = 0, this.offsetX = 0, this.offsetY = 0;
        },
        touchStart: function(t) {
            this.resetTouchStatus();
            var s = t.touches[0];
            this.startX = s.clientX, this.startY = s.clientY;
        },
        touchMove: function(t) {
            var s, e, i = t.touches[0];
            this.deltaX = i.clientX - this.startX, this.deltaY = i.clientY - this.startY, this.offsetX = Math.abs(this.deltaX), 
            this.offsetY = Math.abs(this.deltaY), this.direction = this.direction || (s = this.offsetX, 
            e = this.offsetY, s > e && s > 10 ? "horizontal" : e > s && e > 10 ? "vertical" : "");
        }
    }
});