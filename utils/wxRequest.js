Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var e = {
    get: function(e, t, r) {
        return this.request("get", e, t, r);
    },
    post: function(e, t, r) {
        return this.request("post", e, t, r);
    },
    put: function(e, t, r) {
        return this.request("put", e, t, r);
    },
    delete: function(e, t, r) {
        return this.request("delete", e, t, r);
    },
    request: function(e, t, r, u) {
        var n = u.headers;
        return new Promise(function(u, s) {
            wx.request({
                method: e,
                url: t,
                header: n,
                data: r,
                success: function(e) {
                    u(e);
                },
                fail: function(e) {
                    s(e);
                }
            });
        });
    }
};

exports.default = e;