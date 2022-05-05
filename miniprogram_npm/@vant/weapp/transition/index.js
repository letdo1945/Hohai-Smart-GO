Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../common/component"), s = require("../mixins/transition");

e.VantComponent({
    classes: [ "enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class" ],
    mixins: [ s.transition(!0) ]
});