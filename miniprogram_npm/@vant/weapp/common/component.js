Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../mixins/basic"), n = {
    ancestor: {
        linked: function(e) {
            this.parent = e;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    descendant: {
        linked: function(e) {
            this.children = this.children || [], this.children.push(e);
        },
        unlinked: function(e) {
            this.children = (this.children || []).filter(function(n) {
                return n !== e;
            });
        }
    }
};

exports.VantComponent = function(i) {
    void 0 === i && (i = {});
    var t, s, r, a = {};
    t = i, s = a, r = {
        data: "data",
        props: "properties",
        mixins: "behaviors",
        methods: "methods",
        beforeCreate: "created",
        created: "attached",
        mounted: "ready",
        relations: "relations",
        destroyed: "detached",
        classes: "externalClasses"
    }, Object.keys(r).forEach(function(e) {
        t[e] && (s[r[e]] = t[e]);
    });
    var d = i.relation;
    d && function(e, i, t) {
        var s, r = t.type, a = t.name, d = t.linked, o = t.unlinked, l = t.linkChanged, c = i.beforeCreate, h = i.destroyed;
        "descendant" === r && (e.created = function() {
            c && c.bind(this)(), this.children = this.children || [];
        }, e.detached = function() {
            this.children = [], h && h.bind(this)();
        }), e.relations = Object.assign(e.relations || {}, ((s = {})["../" + a + "/index"] = {
            type: r,
            linked: function(e) {
                n[r].linked.bind(this)(e), d && d.bind(this)(e);
            },
            linkChanged: function(e) {
                l && l.bind(this)(e);
            },
            unlinked: function(e) {
                n[r].unlinked.bind(this)(e), o && o.bind(this)(e);
            }
        }, s));
    }(a, i, d), a.externalClasses = a.externalClasses || [], a.externalClasses.push("custom-class"), 
    a.behaviors = a.behaviors || [], a.behaviors.push(e.basic), i.field && a.behaviors.push("wx://form-field"), 
    a.properties && Object.keys(a.properties).forEach(function(e) {
        Array.isArray(a.properties[e]) && (a.properties[e] = null);
    }), a.options = {
        multipleSlots: !0,
        addGlobalClass: !0
    }, Component(a);
};