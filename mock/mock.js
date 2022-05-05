Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.store = exports.Mock = void 0;

var t = {
    get: {
        dict: {},
        fn: function(e, n) {
            return t.get.dict[e](n);
        }
    },
    post: {
        dict: {},
        fn: function(e, n) {
            return t.post.dict[e](n);
        }
    },
    put: {
        dict: {},
        fn: function(e, n) {
            return t.put.dict[e](n);
        }
    },
    delete: {
        dict: {},
        fn: function(e, n) {
            return t.delete.dict[e](n);
        }
    }
};

function e(t) {
    return function(e) {
        return new Promise(function(n) {
            setTimeout(function() {
                n({
                    data: {
                        code: 200,
                        data: t(e)
                    }
                });
            }, 500);
        });
    };
}

exports.store = t;

var n = {
    get: function(n, o) {
        t.get.dict[n] = e(o);
    },
    post: function(n, o) {
        t.post.dict[n] = e(o);
    },
    put: function(n, o) {
        t.put.dict[n] = e(o);
    },
    delete: function(n, o) {
        t.delete.dict[n] = e(o);
    }
};

exports.Mock = n;