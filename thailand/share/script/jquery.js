(function(r, q) {
    function w(a) {
        var b = Ba[a] = {};
        return c.each(a.split(S), function(a, c) {
            b[c] = !0
        }), b
    }

    function B(a, b, d) {
        if (d === q && 1 === a.nodeType)
            if (d = "data-" + b.replace(xb, "-$1").toLowerCase(), d = a.getAttribute(d), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : yb.test(d) ? c.parseJSON(d) : d
                } catch (e) {}
                c.data(a, b, d)
            } else d = q;
        return d
    }

    function x(a) {
        for (var b in a)
            if (("data" !== b || !c.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function v() {
        return !1
    }

    function T() {
        return !0
    }

    function F(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function E(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function s(a, b, d) {
        b = b || 0;
        if (c.isFunction(b)) return c.grep(a, function(a, c) {
            return !!b.call(a, c, a) === d
        });
        if (b.nodeType) return c.grep(a, function(a, c) {
            return a === b === d
        });
        if ("string" == typeof b) {
            var e = c.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (zb.test(b)) return c.filter(b, e, !d);
            b = c.filter(b, e)
        }
        return c.grep(a, function(a, e) {
            return 0 <= c.inArray(a, b) === d
        })
    }

    function C(a) {
        var b = Ca.split("|");
        a = a.createDocumentFragment();
        if (a.createElement)
            for (; b.length;) a.createElement(b.pop());
        return a
    }

    function O(a, b) {
        if (1 === b.nodeType && c.hasData(a)) {
            var d, e, f;
            e = c._data(a);
            var g = c._data(b, e),
                h = e.events;
            if (h)
                for (d in delete g.handle, g.events = {}, h)
                    for (e = 0, f = h[d].length; e < f; e++) c.event.add(b, d, h[d][e]);
            g.data && (g.data = c.extend({}, g.data))
        }
    }

    function Z(a, b) {
        var d;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), d = b.nodeName.toLowerCase(), "object" === d ? (b.parentNode &&
            (b.outerHTML = a.outerHTML), c.support.html5Clone && a.innerHTML && !c.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === d && Da.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === d ? b.selected = a.defaultSelected : "input" === d || "textarea" === d ? b.defaultValue = a.defaultValue : "script" === d && b.text !== a.text && (b.text = a.text), b.removeAttribute(c.expando))
    }

    function ea(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ?
            a.querySelectorAll("*") : []
    }

    function Ea(a) {
        Da.test(a.type) && (a.defaultChecked = a.checked)
    }

    function Fa(a, b) {
        if (b in a) return b;
        for (var d = b.charAt(0).toUpperCase() + b.slice(1), c = b, f = Ga.length; f--;)
            if (b = Ga[f] + d, b in a) return b;
        return c
    }

    function fa(a, b) {
        return a = b || a, "none" === c.css(a, "display") || !c.contains(a.ownerDocument, a)
    }

    function Ha(a, b) {
        for (var d, e, f = [], g = 0, h = a.length; g < h; g++) d = a[g], d.style && (f[g] = c._data(d, "olddisplay"), b ? (!f[g] && "none" === d.style.display && (d.style.display = ""), "" === d.style.display &&
            fa(d) && (f[g] = c._data(d, "olddisplay", Ia(d.nodeName)))) : (e = z(d, "display"), !f[g] && "none" !== e && c._data(d, "olddisplay", e)));
        for (g = 0; g < h; g++) d = a[g], !d.style || b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none");
        return a
    }

    function Ja(a, b, d) {
        return (a = Ab.exec(b)) ? Math.max(0, a[1] - (d || 0)) + (a[2] || "px") : b
    }

    function Ka(a, b, d, e) {
        b = d === (e ? "border" : "content") ? 4 : "width" === b ? 1 : 0;
        for (var f = 0; 4 > b; b += 2) "margin" === d && (f += c.css(a, d + I[b], !0)), e ? ("content" === d && (f -= parseFloat(z(a, "padding" +
            I[b])) || 0), "margin" !== d && (f -= parseFloat(z(a, "border" + I[b] + "Width")) || 0)) : (f += parseFloat(z(a, "padding" + I[b])) || 0, "padding" !== d && (f += parseFloat(z(a, "border" + I[b] + "Width")) || 0));
        return f
    }

    function La(a, b, d) {
        var e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = !0,
            g = c.support.boxSizing && "border-box" === c.css(a, "boxSizing");
        if (0 >= e || null == e) {
            e = z(a, b);
            if (0 > e || null == e) e = a.style[b];
            if (ga.test(e)) return e;
            f = g && (c.support.boxSizingReliable || e === a.style[b]);
            e = parseFloat(e) || 0
        }
        return e + Ka(a, b, d || (g ? "border" : "content"),
            f) + "px"
    }

    function Ia(a) {
        if (qa[a]) return qa[a];
        var b = c("<" + a + ">").appendTo(p.body),
            d = b.css("display");
        b.remove();
        if ("none" === d || "" === d) V = p.body.appendChild(V || c.extend(p.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), Y && V.createElement || (Y = (V.contentWindow || V.contentDocument).document, Y.write("<!doctype html><html><body>"), Y.close()), b = Y.body.appendChild(Y.createElement(a)), d = z(b, "display"), p.body.removeChild(V);
        return qa[a] = d, d
    }

    function ra(a, b, d, e) {
        var f;
        if (c.isArray(b)) c.each(b, function(b,
            c) {
            d || Bb.test(a) ? e(a, c) : ra(a + "[" + ("object" == typeof c ? b : "") + "]", c, d, e)
        });
        else if (d || "object" !== c.type(b)) e(a, b);
        else
            for (f in b) ra(a + "[" + f + "]", b[f], d, e)
    }

    function Ma(a) {
        return function(b, d) {
            "string" != typeof b && (d = b, b = "*");
            var e, f, g = b.toLowerCase().split(S),
                h = 0,
                k = g.length;
            if (c.isFunction(d))
                for (; h < k; h++) e = g[h], (f = /^\+/.test(e)) && (e = e.substr(1) || "*"), e = a[e] = a[e] || [], e[f ? "unshift" : "push"](d)
        }
    }

    function ha(a, b, d, c, f, g) {
        f = f || b.dataTypes[0];
        g = g || {};
        g[f] = !0;
        var h;
        f = a[f];
        for (var k = 0, l = f ? f.length : 0, m = a === sa; k <
            l && (m || !h); k++) h = f[k](b, d, c), "string" == typeof h && (!m || g[h] ? h = q : (b.dataTypes.unshift(h), h = ha(a, b, d, c, h, g)));
        return (m || !h) && !g["*"] && (h = ha(a, b, d, c, "*", g)), h
    }

    function Na(a, b) {
        var d, e, f = c.ajaxSettings.flatOptions || {};
        for (d in b) b[d] !== q && ((f[d] ? a : e || (e = {}))[d] = b[d]);
        e && c.extend(!0, a, e)
    }

    function Oa() {
        try {
            return new r.XMLHttpRequest
        } catch (a) {}
    }

    function Pa() {
        return setTimeout(function() {
            ia = q
        }, 0), ia = c.now()
    }

    function Cb(a, b) {
        c.each(b, function(b, c) {
            for (var f = (da[b] || []).concat(da["*"]), g = 0, h = f.length; g < h &&
                !f[g].call(a, b, c); g++);
        })
    }

    function Qa(a, b, d) {
        var e = 0,
            f = ja.length,
            g = c.Deferred().always(function() {
                delete h.elem
            }),
            h = function() {
                for (var b = ia || Pa(), b = Math.max(0, k.startTime + k.duration - b), d = 1 - (b / k.duration || 0), c = 0, e = k.tweens.length; c < e; c++) k.tweens[c].run(d);
                return g.notifyWith(a, [k, d, b]), 1 > d && e ? b : (g.resolveWith(a, [k]), !1)
            },
            k = g.promise({
                elem: a,
                props: c.extend({}, b),
                opts: c.extend(!0, {
                    specialEasing: {}
                }, d),
                originalProperties: b,
                originalOptions: d,
                startTime: ia || Pa(),
                duration: d.duration,
                tweens: [],
                createTween: function(b,
                    d, e) {
                    b = c.Tween(a, k.opts, b, d, k.opts.specialEasing[b] || k.opts.easing);
                    return k.tweens.push(b), b
                },
                stop: function(b) {
                    for (var d = 0, c = b ? k.tweens.length : 0; d < c; d++) k.tweens[d].run(1);
                    return b ? g.resolveWith(a, [k, b]) : g.rejectWith(a, [k, b]), this
                }
            });
        d = k.props;
        for (Db(d, k.opts.specialEasing); e < f; e++)
            if (b = ja[e].call(k, a, d, k.opts)) return b;
        return Cb(k, d), c.isFunction(k.opts.start) && k.opts.start.call(a, k), c.fx.timer(c.extend(h, {
            anim: k,
            queue: k.opts.queue,
            elem: a
        })), k.progress(k.opts.progress).done(k.opts.done, k.opts.complete).fail(k.opts.fail).always(k.opts.always)
    }

    function Db(a, b) {
        var d, e, f, g, h;
        for (d in a)
            if (e = c.camelCase(d), f = b[e], g = a[d], c.isArray(g) && (f = g[1], g = a[d] = g[0]), d !== e && (a[e] = g, delete a[d]), (h = c.cssHooks[e]) && "expand" in h)
                for (d in g = h.expand(g), delete a[e], g) d in a || (a[d] = g[d], b[d] = f);
            else b[e] = f
    }

    function A(a, b, d, c, f) {
        return new A.prototype.init(a, b, d, c, f)
    }

    function ka(a, b) {
        var d, c = {
                height: a
            },
            f = 0;
        for (b = b ? 1 : 0; 4 > f; f += 2 - b) d = I[f], c["margin" + d] = c["padding" + d] = a;
        return b && (c.opacity = c.width = a), c
    }

    function Ra(a) {
        return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView ||
            a.parentWindow : !1
    }
    var Sa, la, p = r.document,
        Eb = r.location,
        Fb = r.navigator,
        Gb = r.jQuery,
        Hb = r.$,
        Ta = Array.prototype.push,
        K = Array.prototype.slice,
        Ua = Array.prototype.indexOf,
        Ib = Object.prototype.toString,
        ta = Object.prototype.hasOwnProperty,
        ua = String.prototype.trim,
        c = function(a, b) {
            return new c.fn.init(a, b, Sa)
        },
        ma = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        Jb = /\S/,
        S = /\s+/,
        Kb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Lb = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Va = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Mb = /^[\],:{}\s]*$/,
        Nb = /(?:^|:|,)(?:\s*\[)+/g,
        Ob = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        Pb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        Qb = /^-ms-/,
        Rb = /-([\da-z])/gi,
        Sb = function(a, b) {
            return (b + "").toUpperCase()
        },
        na = function() {
            p.addEventListener ? (p.removeEventListener("DOMContentLoaded", na, !1), c.ready()) : "complete" === p.readyState && (p.detachEvent("onreadystatechange", na), c.ready())
        },
        Wa = {};
    c.fn = c.prototype = {
        constructor: c,
        init: function(a, b, d) {
            var e, f;
            if (!a) return this;
            if (a.nodeType) return this.context =
                this[0] = a, this.length = 1, this;
            if ("string" == typeof a) {
                "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && 3 <= a.length ? e = [null, a, null] : e = Lb.exec(a);
                if (e && (e[1] || !b)) {
                    if (e[1]) return b = b instanceof c ? b[0] : b, f = b && b.nodeType ? b.ownerDocument || b : p, a = c.parseHTML(e[1], f, !0), Va.test(e[1]) && c.isPlainObject(b) && this.attr.call(a, b, !0), c.merge(this, a);
                    if ((b = p.getElementById(e[2])) && b.parentNode) {
                        if (b.id !== e[2]) return d.find(a);
                        this.length = 1;
                        this[0] = b
                    }
                    return this.context = p, this.selector = a, this
                }
                return !b || b.jquery ? (b || d).find(a) :
                    this.constructor(b).find(a)
            }
            return c.isFunction(a) ? d.ready(a) : (a.selector !== q && (this.selector = a.selector, this.context = a.context), c.makeArray(a, this))
        },
        selector: "",
        jquery: "1.8.1",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return K.call(this)
        },
        get: function(a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function(a, b, d) {
            a = c.merge(this.constructor(), a);
            return a.prevObject = this, a.context = this.context, "find" === b ? a.selector = this.selector + (this.selector ? " " :
                "") + d : b && (a.selector = this.selector + "." + b + "(" + d + ")"), a
        },
        each: function(a, b) {
            return c.each(this, a, b)
        },
        ready: function(a) {
            return c.ready.promise().done(a), this
        },
        eq: function(a) {
            return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(K.apply(this, arguments), "slice", K.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, d) {
                return a.call(b, d, b)
            }))
        },
        end: function() {
            return this.prevObject ||
                this.constructor(null)
        },
        push: Ta,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a, b, d, e, f, g, h = arguments[0] || {},
            k = 1,
            l = arguments.length,
            m = !1;
        "boolean" == typeof h && (m = h, h = arguments[1] || {}, k = 2);
        "object" != typeof h && !c.isFunction(h) && (h = {});
        for (l === k && (h = this, --k); k < l; k++)
            if (null != (a = arguments[k]))
                for (b in a) d = h[b], e = a[b], h !== e && (m && e && (c.isPlainObject(e) || (f = c.isArray(e))) ? (f ? (f = !1, g = d && c.isArray(d) ? d : []) : g = d && c.isPlainObject(d) ? d : {}, h[b] = c.extend(m, g, e)) : e !==
                    q && (h[b] = e));
        return h
    };
    c.extend({
        noConflict: function(a) {
            return r.$ === c && (r.$ = Hb), a && r.jQuery === c && (r.jQuery = Gb), c
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? c.readyWait++ : c.ready(!0)
        },
        ready: function(a) {
            if (!0 === a ? !--c.readyWait : !c.isReady) {
                if (!p.body) return setTimeout(c.ready, 1);
                c.isReady = !0;
                !0 !== a && 0 < --c.readyWait || (la.resolveWith(p, [c]), c.fn.trigger && c(p).trigger("ready").off("ready"))
            }
        },
        isFunction: function(a) {
            return "function" === c.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" ===
                c.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return null == a ? String(a) : Wa[Ib.call(a)] || "object"
        },
        isPlainObject: function(a) {
            if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
            try {
                if (a.constructor && !ta.call(a, "constructor") && !ta.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (b) {
                return !1
            }
            for (var d in a);
            return d === q || ta.call(a, d)
        },
        isEmptyObject: function(a) {
            for (var b in a) return !1;
            return !0
        },
        error: function(a) {
            throw Error(a);
        },
        parseHTML: function(a, b, d) {
            var e;
            return a && "string" == typeof a ? ("boolean" == typeof b && (d = b, b = 0), b = b || p, (e = Va.exec(a)) ? [b.createElement(e[1])] : (e = c.buildFragment([a], b, d ? null : []), c.merge([], (e.cacheable ? c.clone(e.fragment) : e.fragment).childNodes))) : null
        },
        parseJSON: function(a) {
            if (!a || "string" != typeof a) return null;
            a = c.trim(a);
            if (r.JSON && r.JSON.parse) return r.JSON.parse(a);
            if (Mb.test(a.replace(Ob, "@").replace(Pb, "]").replace(Nb, ""))) return (new Function("return " +
                a))();
            c.error("Invalid JSON: " + a)
        },
        parseXML: function(a) {
            var b, d;
            if (!a || "string" != typeof a) return null;
            try {
                r.DOMParser ? (d = new DOMParser, b = d.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a))
            } catch (e) {
                b = q
            }
            return (!b || !b.documentElement || b.getElementsByTagName("parsererror").length) && c.error("Invalid XML: " + a), b
        },
        noop: function() {},
        globalEval: function(a) {
            a && Jb.test(a) && (r.execScript || function(a) {
                r.eval.call(r, a)
            })(a)
        },
        camelCase: function(a) {
            return a.replace(Qb,
                "ms-").replace(Rb, Sb)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function(a, b, d) {
            var e, f = 0,
                g = a.length,
                h = g === q || c.isFunction(a);
            if (d)
                if (h)
                    for (e in a) {
                        if (!1 === b.apply(a[e], d)) break
                    } else
                        for (; f < g && !1 !== b.apply(a[f++], d););
                else if (h)
                for (e in a) {
                    if (!1 === b.call(a[e], e, a[e])) break
                } else
                    for (; f < g && !1 !== b.call(a[f], f, a[f++]););
            return a
        },
        trim: ua && !ua.call("\ufeff ") ? function(a) {
            return null == a ? "" : ua.call(a)
        } : function(a) {
            return null == a ? "" : a.toString().replace(Kb,
                "")
        },
        makeArray: function(a, b) {
            var d, e = b || [];
            return null != a && (d = c.type(a), null == a.length || "string" === d || "function" === d || "regexp" === d || c.isWindow(a) ? Ta.call(e, a) : c.merge(e, a)), e
        },
        inArray: function(a, b, d) {
            var c;
            if (b) {
                if (Ua) return Ua.call(b, a, d);
                c = b.length;
                for (d = d ? 0 > d ? Math.max(0, c + d) : d : 0; d < c; d++)
                    if (d in b && b[d] === a) return d
            }
            return -1
        },
        merge: function(a, b) {
            var d = b.length,
                c = a.length,
                f = 0;
            if ("number" == typeof d)
                for (; f < d; f++) a[c++] = b[f];
            else
                for (; b[f] !== q;) a[c++] = b[f++];
            return a.length = c, a
        },
        grep: function(a, b, c) {
            var e,
                f = [],
                g = 0,
                h = a.length;
            for (c = !!c; g < h; g++) e = !!b(a[g], g), c !== e && f.push(a[g]);
            return f
        },
        map: function(a, b, d) {
            var e, f, g = [],
                h = 0,
                k = a.length;
            if (a instanceof c || k !== q && "number" == typeof k && (0 < k && a[0] && a[k - 1] || 0 === k || c.isArray(a)))
                for (; h < k; h++) e = b(a[h], h, d), null != e && (g[g.length] = e);
            else
                for (f in a) e = b(a[f], f, d), null != e && (g[g.length] = e);
            return g.concat.apply([], g)
        },
        guid: 1,
        proxy: function(a, b) {
            var d, e, f;
            return "string" == typeof b && (d = a[b], b = a, a = d), c.isFunction(a) ? (e = K.call(arguments, 2), f = function() {
                return a.apply(b,
                    e.concat(K.call(arguments)))
            }, f.guid = a.guid = a.guid || f.guid || c.guid++, f) : q
        },
        access: function(a, b, d, e, f, g, h) {
            var k, l = null == d,
                m = 0,
                t = a.length;
            if (d && "object" == typeof d) {
                for (m in d) c.access(a, b, m, d[m], 1, g, e);
                f = 1
            } else if (e !== q) {
                k = h === q && c.isFunction(e);
                l && (k ? (k = b, b = function(a, b, d) {
                    return k.call(c(a), d)
                }) : (b.call(a, e), b = null));
                if (b)
                    for (; m < t; m++) b(a[m], d, k ? e.call(a[m], m, b(a[m], d)) : e, h);
                f = 1
            }
            return f ? a : l ? b.call(a) : t ? b(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        }
    });
    c.ready.promise = function(a) {
        if (!la)
            if (la =
                c.Deferred(), "complete" === p.readyState) setTimeout(c.ready, 1);
            else if (p.addEventListener) p.addEventListener("DOMContentLoaded", na, !1), r.addEventListener("load", c.ready, !1);
        else {
            p.attachEvent("onreadystatechange", na);
            r.attachEvent("onload", c.ready);
            var b = !1;
            try {
                b = null == r.frameElement && p.documentElement
            } catch (d) {}
            b && b.doScroll && function f() {
                if (!c.isReady) {
                    try {
                        b.doScroll("left")
                    } catch (a) {
                        return setTimeout(f, 50)
                    }
                    c.ready()
                }
            }()
        }
        return la.promise(a)
    };
    c.each("Boolean Number String Function Array Date RegExp Object".split(" "),
        function(a, b) {
            Wa["[object " + b + "]"] = b.toLowerCase()
        });
    Sa = c(p);
    var Ba = {};
    c.Callbacks = function(a) {
        a = "string" == typeof a ? Ba[a] || w(a) : c.extend({}, a);
        var b, d, e, f, g, h, k = [],
            l = !a.once && [],
            m = function(c) {
                b = a.memory && c;
                d = !0;
                h = f || 0;
                f = 0;
                g = k.length;
                for (e = !0; k && h < g; h++)
                    if (!1 === k[h].apply(c[0], c[1]) && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                e = !1;
                k && (l ? l.length && m(l.shift()) : b ? k = [] : t.disable())
            },
            t = {
                add: function() {
                    if (k) {
                        var d = k.length;
                        (function Ub(b) {
                            c.each(b, function(b, d) {
                                var e = c.type(d);
                                "function" !== e || a.unique && t.has(d) ? d && d.length &&
                                    "string" !== e && Ub(d) : k.push(d)
                            })
                        })(arguments);
                        e ? g = k.length : b && (f = d, m(b))
                    }
                    return this
                },
                remove: function() {
                    return k && c.each(arguments, function(a, b) {
                        for (var d; - 1 < (d = c.inArray(b, k, d));) k.splice(d, 1), e && (d <= g && g--, d <= h && h--)
                    }), this
                },
                has: function(a) {
                    return -1 < c.inArray(a, k)
                },
                empty: function() {
                    return k = [], this
                },
                disable: function() {
                    return k = l = b = q, this
                },
                disabled: function() {
                    return !k
                },
                lock: function() {
                    return l = q, b || t.disable(), this
                },
                locked: function() {
                    return !l
                },
                fireWith: function(a, b) {
                    return b = b || [], b = [a, b.slice ? b.slice() :
                        b
                    ], k && (!d || l) && (e ? l.push(b) : m(b)), this
                },
                fire: function() {
                    return t.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return t
    };
    c.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", c.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", c.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", c.Callbacks("memory")]
                ],
                d = "pending",
                e = {
                    state: function() {
                        return d
                    },
                    always: function() {
                        return f.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return c.Deferred(function(d) {
                            c.each(b,
                                function(b, e) {
                                    var m = e[0],
                                        t = a[b];
                                    f[e[1]](c.isFunction(t) ? function() {
                                        var a = t.apply(this, arguments);
                                        a && c.isFunction(a.promise) ? a.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[m + "With"](this === f ? d : this, [a])
                                    } : d[m])
                                });
                            a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return "object" == typeof a ? c.extend(a, e) : e
                    }
                },
                f = {};
            return e.pipe = e.then, c.each(b, function(a, c) {
                    var k = c[2],
                        l = c[3];
                    e[c[1]] = k.add;
                    l && k.add(function() {
                        d = l
                    }, b[a ^ 1][2].disable, b[2][2].lock);
                    f[c[0]] = k.fire;
                    f[c[0] + "With"] = k.fireWith
                }), e.promise(f),
                a && a.call(f, f), f
        },
        when: function(a) {
            var b = 0,
                d = K.call(arguments),
                e = d.length,
                f = 1 !== e || a && c.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : c.Deferred(),
                h = function(a, b, d) {
                    return function(c) {
                        b[a] = this;
                        d[a] = 1 < arguments.length ? K.call(arguments) : c;
                        d === k ? g.notifyWith(b, d) : --f || g.resolveWith(b, d)
                    }
                },
                k, l, m;
            if (1 < e)
                for (k = Array(e), l = Array(e), m = Array(e); b < e; b++) d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(h(b, m, d)).fail(g.reject).progress(h(b, l, k)) : --f;
            return f || g.resolveWith(m, d), g.promise()
        }
    });
    c.support = function() {
        var a,
            b, d, e, f, g, h, k, l = p.createElement("div");
        l.setAttribute("className", "t");
        l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        b = l.getElementsByTagName("*");
        d = l.getElementsByTagName("a")[0];
        d.style.cssText = "top:1px;float:left;opacity:.5";
        if (!b || !b.length || !d) return {};
        e = p.createElement("select");
        f = e.appendChild(p.createElement("option"));
        b = l.getElementsByTagName("input")[0];
        a = {
            leadingWhitespace: 3 === l.firstChild.nodeType,
            tbody: !l.getElementsByTagName("tbody").length,
            htmlSerialize: !!l.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: "on" === b.value,
            optSelected: f.selected,
            getSetAttribute: "t" !== l.className,
            enctype: !!p.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== p.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === p.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        };
        b.checked = !0;
        a.noCloneChecked = b.cloneNode(!0).checked;
        e.disabled = !0;
        a.optDisabled = !f.disabled;
        try {
            delete l.test
        } catch (m) {
            a.deleteExpando = !1
        }!l.addEventListener && l.attachEvent && l.fireEvent && (l.attachEvent("onclick", k = function() {
            a.noCloneEvent = !1
        }), l.cloneNode(!0).fireEvent("onclick"), l.detachEvent("onclick", k));
        b = p.createElement("input");
        b.value = "t";
        b.setAttribute("type", "radio");
        a.radioValue = "t" === b.value;
        b.setAttribute("checked", "checked");
        b.setAttribute("name", "t");
        l.appendChild(b);
        d = p.createDocumentFragment();
        d.appendChild(l.lastChild);
        a.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked;
        a.appendChecked = b.checked;
        d.removeChild(b);
        d.appendChild(l);
        if (l.attachEvent)
            for (g in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) b = "on" + g, (h = b in l) || (l.setAttribute(b, "return;"), h = "function" == typeof l[b]), a[g + "Bubbles"] = h;
        return c(function() {
            var b, d, c, e, f = p.getElementsByTagName("body")[0];
            f && (b = p.createElement("div"), b.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
                f.insertBefore(b, f.firstChild), d = p.createElement("div"), b.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", c = d.getElementsByTagName("td"), c[0].style.cssText = "padding:0;margin:0;border:0;display:none", h = 0 === c[0].offsetHeight, c[0].style.display = "", c[1].style.display = "none", a.reliableHiddenOffsets = h && 0 === c[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                a.boxSizing = 4 === d.offsetWidth, a.doesNotIncludeMarginInBodyOffset = 1 !== f.offsetTop, r.getComputedStyle && (a.pixelPosition = "1%" !== (r.getComputedStyle(d, null) || {}).top, a.boxSizingReliable = "4px" === (r.getComputedStyle(d, null) || {
                    width: "4px"
                }).width, e = p.createElement("div"), e.style.cssText = d.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", e.style.marginRight = e.style.width = "0", d.style.width = "1px", d.appendChild(e), a.reliableMarginRight = !parseFloat((r.getComputedStyle(e, null) || {}).marginRight)),
                "undefined" != typeof d.style.zoom && (d.innerHTML = "", d.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", a.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", a.shrinkWrapBlocks = 3 !== d.offsetWidth, b.style.zoom = 1), f.removeChild(b))
        }), d.removeChild(l), b = d = e = f = b = d = l = null, a
    }();
    var yb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        xb = /([A-Z])/g;
    c.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (c.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando], !!a && !x(a)
        },
        data: function(a, b, d, e) {
            if (c.acceptData(a)) {
                var f, g, h = c.expando,
                    k = "string" == typeof b,
                    l = a.nodeType,
                    m = l ? c.cache : a,
                    t = l ? a[h] : a[h] && h;
                if (t && m[t] && (e || m[t].data) || !k || d !== q) {
                    t || (l ? a[h] = t = c.deletedIds.pop() || ++c.uuid : t = h);
                    m[t] || (m[t] = {}, l || (m[t].toJSON = c.noop));
                    if ("object" == typeof b || "function" == typeof b) e ? m[t] = c.extend(m[t], b) : m[t].data = c.extend(m[t].data, b);
                    return f = m[t], e || (f.data || (f.data = {}), f = f.data), d !== q && (f[c.camelCase(b)] = d), k ? (g = f[b], null == g && (g = f[c.camelCase(b)])) : g = f, g
                }
            }
        },
        removeData: function(a, b, d) {
            if (c.acceptData(a)) {
                var e, f, g, h = a.nodeType,
                    k = h ? c.cache : a,
                    l = h ? a[c.expando] : c.expando;
                if (k[l]) {
                    if (b && (e = d ? k[l] : k[l].data)) {
                        c.isArray(b) || (b in e ? b = [b] : (b = c.camelCase(b), b in e ? b = [b] : b = b.split(" ")));
                        f = 0;
                        for (g = b.length; f < g; f++) delete e[b[f]];
                        if (!(d ?
                                x : c.isEmptyObject)(e)) return
                    }
                    if (!d && (delete k[l].data, !x(k[l]))) return;
                    h ? c.cleanData([a], !0) : c.support.deleteExpando || k != k.window ? delete k[l] : k[l] = null
                }
            }
        },
        _data: function(a, b, d) {
            return c.data(a, b, d, !0)
        },
        acceptData: function(a) {
            var b = a.nodeName && c.noData[a.nodeName.toLowerCase()];
            return !b || !0 !== b && a.getAttribute("classid") === b
        }
    });
    c.fn.extend({
        data: function(a, b) {
            var d, e, f, g, h, k = this[0],
                l = 0,
                m = null;
            if (a === q) {
                if (this.length && (m = c.data(k), 1 === k.nodeType && !c._data(k, "parsedAttrs"))) {
                    f = k.attributes;
                    for (h = f.length; l <
                        h; l++) g = f[l].name, 0 === g.indexOf("data-") && (g = c.camelCase(g.substring(5)), B(k, g, m[g]));
                    c._data(k, "parsedAttrs", !0)
                }
                return m
            }
            return "object" == typeof a ? this.each(function() {
                c.data(this, a)
            }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", c.access(this, function(b) {
                if (b === q) return m = this.triggerHandler("getData" + e, [d[0]]), m === q && k && (m = c.data(k, a), m = B(k, a, m)), m === q && d[1] ? this.data(d[0]) : m;
                d[1] = b;
                this.each(function() {
                    var f = c(this);
                    f.triggerHandler("setData" + e, d);
                    c.data(this, a, b);
                    f.triggerHandler("changeData" +
                        e, d)
                })
            }, null, b, 1 < arguments.length, null, !1))
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            var e;
            if (a) return b = (b || "fx") + "queue", e = c._data(a, b), d && (!e || c.isArray(d) ? e = c._data(a, b, c.makeArray(d)) : e.push(d)), e || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var d = c.queue(a, b),
                e = d.length,
                f = d.shift(),
                g = c._queueHooks(a, b),
                h = function() {
                    c.dequeue(a, b)
                };
            "inprogress" === f && (f = d.shift(), e--);
            f && ("fx" === b && d.unshift("inprogress"), delete g.stop, f.call(a, h, g));
            !e && g && g.empty.fire()
        },
        _queueHooks: function(a, b) {
            var d = b + "queueHooks";
            return c._data(a, d) || c._data(a, d, {
                empty: c.Callbacks("once memory").add(function() {
                    c.removeData(a, b + "queue", !0);
                    c.removeData(a, d, !0)
                })
            })
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            var d = 2;
            return "string" != typeof a && (b = a, a = "fx", d--), arguments.length < d ? c.queue(this[0], a) : b === q ? this : this.each(function() {
                var d = c.queue(this, a, b);
                c._queueHooks(this, a);
                "fx" === a && "inprogress" !== d[0] && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this,
                    a)
            })
        },
        delay: function(a, b) {
            return a = c.fx ? c.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var f = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(f)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var d, e = 1,
                f = c.Deferred(),
                g = this,
                h = this.length,
                k = function() {
                    --e || f.resolveWith(g, [g])
                };
            "string" != typeof a && (b = a, a = q);
            for (a = a || "fx"; h--;)(d = c._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(k));
            return k(), f.promise(b)
        }
    });
    var P, Xa, Ya, Za = /[\t\r\n]/g,
        Vb = /\r/g,
        Wb = /^(?:button|input)$/i,
        Xb = /^(?:button|input|object|select|textarea)$/i,
        Yb = /^a(?:rea|)$/i,
        $a = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        ab = c.support.getSetAttribute;
    c.fn.extend({
        attr: function(a, b) {
            return c.access(this, c.attr, a, b, 1 < arguments.length)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return c.access(this, c.prop, a, b, 1 < arguments.length)
        },
        removeProp: function(a) {
            return a = c.propFix[a] ||
                a, this.each(function() {
                    try {
                        this[a] = q, delete this[a]
                    } catch (b) {}
                })
        },
        addClass: function(a) {
            var b, d, e, f, g, h, k;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a)
                for (b = a.split(S), d = 0, e = this.length; d < e; d++)
                    if (f = this[d], 1 === f.nodeType)
                        if (f.className || 1 !== b.length) {
                            g = " " + f.className + " ";
                            h = 0;
                            for (k = b.length; h < k; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            f.className = c.trim(g)
                        } else f.className = a;
            return this
        },
        removeClass: function(a) {
            var b,
                d, e, f, g, h, k;
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).removeClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a || a === q)
                for (b = (a || "").split(S), h = 0, k = this.length; h < k; h++)
                    if (e = this[h], 1 === e.nodeType && e.className) {
                        d = (" " + e.className + " ").replace(Za, " ");
                        f = 0;
                        for (g = b.length; f < g; f++)
                            for (; - 1 < d.indexOf(" " + b[f] + " ");) d = d.replace(" " + b[f] + " ", " ");
                        e.className = a ? c.trim(d) : ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a,
                e = "boolean" == typeof b;
            return c.isFunction(a) ? this.each(function(d) {
                c(this).toggleClass(a.call(this,
                    d, this.className, b), b)
            }) : this.each(function() {
                if ("string" === d)
                    for (var f, g = 0, h = c(this), k = b, l = a.split(S); f = l[g++];) k = e ? k : !h.hasClass(f), h[k ? "addClass" : "removeClass"](f);
                else if ("undefined" === d || "boolean" === d) this.className && c._data(this, "__className__", this.className), this.className = this.className || !1 === a ? "" : c._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++)
                if (1 === this[b].nodeType && -1 < (" " + this[b].className + " ").replace(Za, " ").indexOf(a)) return !0;
            return !1
        },
        val: function(a) {
            var b, d, e, f = this[0];
            if (arguments.length) return e = c.isFunction(a), this.each(function(d) {
                var f, k = c(this);
                1 === this.nodeType && (e ? f = a.call(this, d, k.val()) : f = a, null == f ? f = "" : "number" == typeof f ? f += "" : c.isArray(f) && (f = c.map(f, function(a) {
                    return null == a ? "" : a + ""
                })), b = c.valHooks[this.type] || c.valHooks[this.nodeName.toLowerCase()], b && "set" in b && b.set(this, f, "value") !== q || (this.value = f))
            });
            if (f) return b = c.valHooks[f.type] || c.valHooks[f.nodeName.toLowerCase()], b && "get" in b && (d = b.get(f,
                "value")) !== q ? d : (d = f.value, "string" == typeof d ? d.replace(Vb, "") : null == d ? "" : d)
        }
    });
    c.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, d, e = a.selectedIndex,
                        f = [],
                        g = a.options,
                        h = "select-one" === a.type;
                    if (0 > e) return null;
                    a = h ? e : 0;
                    for (d = h ? e + 1 : g.length; a < d; a++)
                        if (b = g[a], b.selected && !((c.support.optDisabled ? b.disabled : null !== b.getAttribute("disabled")) || b.parentNode.disabled && c.nodeName(b.parentNode, "optgroup"))) {
                            b = c(b).val();
                            if (h) return b;
                            f.push(b)
                        }
                    return h && !f.length && g.length ? c(g[e]).val() : f
                },
                set: function(a, b) {
                    var d = c.makeArray(b);
                    return c(a).find("option").each(function() {
                        this.selected = 0 <= c.inArray(c(this).val(), d)
                    }), d.length || (a.selectedIndex = -1), d
                }
            }
        },
        attrFn: {},
        attr: function(a, b, d, e) {
            var f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) {
                if (e && c.isFunction(c.fn[b])) return c(a)[b](d);
                if ("undefined" == typeof a.getAttribute) return c.prop(a, b, d);
                (e = 1 !== h || !c.isXMLDoc(a)) && (b = b.toLowerCase(), g = c.attrHooks[b] || ($a.test(b) ? Xa : P));
                if (d !== q) {
                    if (null === d) {
                        c.removeAttr(a, b);
                        return
                    }
                    return g && "set" in g && e && (f = g.set(a, d, b)) !== q ? f : (a.setAttribute(b, "" + d), d)
                }
                return g && "get" in g && e && null !== (f = g.get(a, b)) ? f : (f = a.getAttribute(b), null === f ? q : f)
            }
        },
        removeAttr: function(a, b) {
            var d, e, f, g, h = 0;
            if (b && 1 === a.nodeType)
                for (e = b.split(S); h < e.length; h++)(f = e[h]) && (d = c.propFix[f] || f, g = $a.test(f), g || c.attr(a, f, ""), a.removeAttribute(ab ? f : d), g && d in a && (a[d] = !1))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (Wb.test(a.nodeName) && a.parentNode) c.error("type property can't be changed");
                    else if (!c.support.radioValue && "radio" === b && c.nodeName(a, "input")) {
                        var d = a.value;
                        return a.setAttribute("type", b), d && (a.value = d), b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return P && c.nodeName(a, "button") ? P.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, d) {
                    if (P && c.nodeName(a, "button")) return P.set(a, b, d);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, b, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !c.isXMLDoc(a), g && (b = c.propFix[b] || b, f = c.propHooks[b]), d !== q ? f && "set" in f && (e = f.set(a, d, b)) !== q ? e : a[b] = d : f && "get" in f && null !== (e = f.get(a, b)) ? e : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = a.getAttributeNode("tabindex");
                    return b && b.specified ? parseInt(b.value, 10) : Xb.test(a.nodeName) || Yb.test(a.nodeName) && a.href ? 0 : q
                }
            }
        }
    });
    Xa = {
        get: function(a, b) {
            var d, e =
                c.prop(a, b);
            return !0 === e || "boolean" != typeof e && (d = a.getAttributeNode(b)) && !1 !== d.nodeValue ? b.toLowerCase() : q
        },
        set: function(a, b, d) {
            var e;
            return !1 === b ? c.removeAttr(a, d) : (e = c.propFix[d] || d, e in a && (a[e] = !0), a.setAttribute(d, d.toLowerCase())), d
        }
    };
    ab || (Ya = {
        name: !0,
        id: !0,
        coords: !0
    }, P = c.valHooks.button = {
        get: function(a, b) {
            var d;
            return d = a.getAttributeNode(b), d && (Ya[b] ? "" !== d.value : d.specified) ? d.value : q
        },
        set: function(a, b, d) {
            var c = a.getAttributeNode(d);
            return c || (c = p.createAttribute(d), a.setAttributeNode(c)),
                c.value = b + ""
        }
    }, c.each(["width", "height"], function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            set: function(a, c) {
                if ("" === c) return a.setAttribute(b, "auto"), c
            }
        })
    }), c.attrHooks.contenteditable = {
        get: P.get,
        set: function(a, b, d) {
            "" === b && (b = "false");
            P.set(a, b, d)
        }
    });
    c.support.hrefNormalized || c.each(["href", "src", "width", "height"], function(a, b) {
        c.attrHooks[b] = c.extend(c.attrHooks[b], {
            get: function(a) {
                a = a.getAttribute(b, 2);
                return null === a ? q : a
            }
        })
    });
    c.support.style || (c.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() ||
                q
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    });
    c.support.optSelected || (c.propHooks.selected = c.extend(c.propHooks.selected, {
        get: function(a) {
            a = a.parentNode;
            return a && (a.selectedIndex, a.parentNode && a.parentNode.selectedIndex), null
        }
    }));
    c.support.enctype || (c.propFix.enctype = "encoding");
    c.support.checkOn || c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    });
    c.each(["radio", "checkbox"], function() {
        c.valHooks[this] = c.extend(c.valHooks[this], {
            set: function(a, b) {
                if (c.isArray(b)) return a.checked = 0 <= c.inArray(c(a).val(), b)
            }
        })
    });
    var va = /^(?:textarea|input|select)$/i,
        bb = /^([^\.]*|)(?:\.(.+)|)$/,
        Zb = /(?:^|\s)hover(\.\S+|)\b/,
        $b = /^key/,
        ac = /^(?:mouse|contextmenu)|click/,
        cb = /^(?:focusinfocus|focusoutblur)$/,
        db = function(a) {
            return c.event.special.hover ? a : a.replace(Zb, "mouseenter$1 mouseleave$1")
        };
    c.event = {
        add: function(a, b, d, e, f) {
            var g, h, k, l, m, t, n, r, p;
            if (3 !== a.nodeType && 8 !== a.nodeType && b && d && (g = c._data(a))) {
                d.handler && (n = d, d = n.handler, f = n.selector);
                d.guid || (d.guid = c.guid++);
                (k = g.events) || (g.events = k = {});
                (h = g.handle) || (g.handle = h = function(a) {
                    return "undefined" == typeof c || a && c.event.triggered === a.type ? q : c.event.dispatch.apply(h.elem, arguments)
                }, h.elem = a);
                b = c.trim(db(b)).split(" ");
                for (g = 0; g < b.length; g++) l = bb.exec(b[g]) || [], m = l[1], t = (l[2] || "").split(".").sort(), p = c.event.special[m] || {}, m = (f ? p.delegateType : p.bindType) || m, p = c.event.special[m] || {}, l = c.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        namespace: t.join(".")
                    }, n), r =
                    k[m], r || (r = k[m] = [], r.delegateCount = 0, p.setup && !1 !== p.setup.call(a, e, t, h) || (a.addEventListener ? a.addEventListener(m, h, !1) : a.attachEvent && a.attachEvent("on" + m, h))), p.add && (p.add.call(a, l), l.handler.guid || (l.handler.guid = d.guid)), f ? r.splice(r.delegateCount++, 0, l) : r.push(l), c.event.global[m] = !0;
                a = null
            }
        },
        global: {},
        remove: function(a, b, d, e, f) {
            var g, h, k, l, m, t, n, q, r, p, s = c.hasData(a) && c._data(a);
            if (s && (n = s.events)) {
                b = c.trim(db(b || "")).split(" ");
                for (g = 0; g < b.length; g++)
                    if (h = bb.exec(b[g]) || [], k = l = h[1], h = h[2],
                        k) {
                        q = c.event.special[k] || {};
                        k = (e ? q.delegateType : q.bindType) || k;
                        r = n[k] || [];
                        m = r.length;
                        h = h ? RegExp("(^|\\.)" + h.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                        for (t = 0; t < r.length; t++) p = r[t], !f && l !== p.origType || d && d.guid !== p.guid || h && !h.test(p.namespace) || e && !(e === p.selector || "**" === e && p.selector) || (r.splice(t--, 1), p.selector && r.delegateCount--, !q.remove || q.remove.call(a, p));
                        0 === r.length && m !== r.length && ((!q.teardown || !1 === q.teardown.call(a, h, s.handle)) && c.removeEvent(a, k, s.handle), delete n[k])
                    } else
                        for (k in n) c.event.remove(a,
                            k + b[g], d, e, !0);
                c.isEmptyObject(n) && (delete s.handle, c.removeData(a, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(a, b, d, e) {
            if (!d || 3 !== d.nodeType && 8 !== d.nodeType) {
                var f, g, h, k, l, m, t, n = a.type || a;
                k = [];
                if (!cb.test(n + c.event.triggered) && (0 <= n.indexOf("!") && (n = n.slice(0, -1), f = !0), 0 <= n.indexOf(".") && (k = n.split("."), n = k.shift(), k.sort()), d && !c.event.customEvent[n] || c.event.global[n]))
                    if (a = "object" == typeof a ? a[c.expando] ? a : new c.Event(n, a) : new c.Event(n), a.type = n, a.isTrigger = !0, a.exclusive = f, a.namespace = k.join("."), a.namespace_re = a.namespace ? RegExp("(^|\\.)" + k.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, k = 0 > n.indexOf(":") ? "on" + n : "", d) {
                        if (a.result = q, a.target || (a.target = d), b = null != b ? c.makeArray(b) : [], b.unshift(a), l = c.event.special[n] || {}, !l.trigger || !1 !== l.trigger.apply(d, b)) {
                            t = [
                                [d, l.bindType || n]
                            ];
                            if (!e && !l.noBubble && !c.isWindow(d)) {
                                g = l.delegateType || n;
                                f = cb.test(g + n) ? d : d.parentNode;
                                for (h = d; f; f = f.parentNode) t.push([f, g]), h = f;
                                h === (d.ownerDocument || p) && t.push([h.defaultView || h.parentWindow ||
                                    r, g
                                ])
                            }
                            for (g = 0; g < t.length && !a.isPropagationStopped(); g++) f = t[g][0], a.type = t[g][1], (m = (c._data(f, "events") || {})[a.type] && c._data(f, "handle")) && m.apply(f, b), (m = k && f[k]) && c.acceptData(f) && !1 === m.apply(f, b) && a.preventDefault();
                            return a.type = n, !e && !a.isDefaultPrevented() && (!l._default || !1 === l._default.apply(d.ownerDocument, b)) && ("click" !== n || !c.nodeName(d, "a")) && c.acceptData(d) && k && d[n] && ("focus" !== n && "blur" !== n || 0 !== a.target.offsetWidth) && !c.isWindow(d) && (h = d[k], h && (d[k] = null), c.event.triggered = n, d[n](),
                                c.event.triggered = q, h && (d[k] = h)), a.result
                        }
                    } else
                        for (g in d = c.cache, d) d[g].events && d[g].events[n] && c.event.trigger(a, b, d[g].handle.elem, !0)
            }
        },
        dispatch: function(a) {
            a = c.event.fix(a || r.event);
            var b, d, e, f, g, h, k = (c._data(this, "events") || {})[a.type] || [],
                l = k.delegateCount,
                m = [].slice.call(arguments),
                t = !a.exclusive && !a.namespace,
                n = c.event.special[a.type] || {},
                p = [];
            m[0] = a;
            a.delegateTarget = this;
            if (!n.preDispatch || !1 !== n.preDispatch.call(this, a)) {
                if (l && (!a.button || "click" !== a.type))
                    for (d = a.target; d != this; d = d.parentNode ||
                        this)
                        if (!0 !== d.disabled || "click" !== a.type) {
                            f = {};
                            g = [];
                            for (b = 0; b < l; b++) e = k[b], h = e.selector, f[h] === q && (f[h] = 0 <= c(h, this).index(d)), f[h] && g.push(e);
                            g.length && p.push({
                                elem: d,
                                matches: g
                            })
                        }
                k.length > l && p.push({
                    elem: this,
                    matches: k.slice(l)
                });
                for (b = 0; b < p.length && !a.isPropagationStopped(); b++)
                    for (f = p[b], a.currentTarget = f.elem, d = 0; d < f.matches.length && !a.isImmediatePropagationStopped(); d++)
                        if (e = f.matches[d], t || !a.namespace && !e.namespace || a.namespace_re && a.namespace_re.test(e.namespace)) a.data = e.data, a.handleObj =
                            e, e = ((c.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, m), e !== q && (a.result = e, !1 === e && (a.preventDefault(), a.stopPropagation()));
                return n.postDispatch && n.postDispatch.call(this, a), a.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(a, b) {
                return null == a.which && (a.which =
                    null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var d, c, f, g = b.button,
                    h = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || p, c = d.documentElement, f = d.body, a.pageX = b.clientX + (c && c.scrollLeft || f && f.scrollLeft || 0) - (c && c.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (c && c.scrollTop || f && f.scrollTop || 0) - (c && c.clientTop || f && f.clientTop ||
                    0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), !a.which && g !== q && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[c.expando]) return a;
            var b, d, e = a,
                f = c.event.fixHooks[a.type] || {},
                g = f.props ? this.props.concat(f.props) : this.props;
            a = c.Event(e);
            for (b = g.length; b;) d = g[--b], a[d] = e[d];
            return a.target || (a.target = e.srcElement || p), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, f.filter ? f.filter(a, e) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, d) {
                    c.isWindow(this) && (this.onbeforeunload = d)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, d, e) {
            a = c.extend(new c.Event, d, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
            a.isDefaultPrevented() && d.preventDefault()
        }
    };
    c.event.handle = c.event.dispatch;
    c.removeEvent = p.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b,
            c, !1)
    } : function(a, b, c) {
        b = "on" + b;
        a.detachEvent && ("undefined" == typeof a[b] && (a[b] = null), a.detachEvent(b, c))
    };
    c.Event = function(a, b) {
        if (this instanceof c.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? T : v) : this.type = a, b && c.extend(this, b), this.timeStamp = a && a.timeStamp || c.now(), this[c.expando] = !0;
        else return new c.Event(a, b)
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented =
                T;
            var a = this.originalEvent;
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = T;
            var a = this.originalEvent;
            a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = T;
            this.stopPropagation()
        },
        isDefaultPrevented: v,
        isPropagationStopped: v,
        isImmediatePropagationStopped: v
    };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var e, f = a.relatedTarget,
                    g = a.handleObj;
                if (!f || f !== this && !c.contains(this, f)) a.type = g.origType, e = g.handler.apply(this, arguments), a.type = b;
                return e
            }
        }
    });
    c.support.submitBubbles || (c.event.special.submit = {
        setup: function() {
            if (c.nodeName(this, "form")) return !1;
            c.event.add(this, "click._submit keypress._submit", function(a) {
                a = a.target;
                (a = c.nodeName(a, "input") || c.nodeName(a, "button") ? a.form : q) && !c._data(a, "_submit_attached") && (c.event.add(a, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), c._data(a, "_submit_attached", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && c.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            if (c.nodeName(this, "form")) return !1;
            c.event.remove(this, "._submit")
        }
    });
    c.support.changeBubbles || (c.event.special.change = {
        setup: function() {
            if (va.test(this.nodeName)) {
                if ("checkbox" === this.type || "radio" === this.type) c.event.add(this, "propertychange._change", function(a) {
                    "checked" === a.originalEvent.propertyName &&
                        (this._just_changed = !0)
                }), c.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1);
                    c.event.simulate("change", this, a, !0)
                });
                return !1
            }
            c.event.add(this, "beforeactivate._change", function(a) {
                a = a.target;
                va.test(a.nodeName) && !c._data(a, "_change_attached") && (c.event.add(a, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && c.event.simulate("change", this.parentNode, a, !0)
                }), c._data(a, "_change_attached", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return c.event.remove(this, "._change"), !va.test(this.nodeName)
        }
    });
    c.support.focusinBubbles || c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0,
            e = function(a) {
                c.event.simulate(b, a.target, c.event.fix(a), !0)
            };
        c.event.special[b] = {
            setup: function() {
                0 === d++ && p.addEventListener(a, e, !0)
            },
            teardown: function() {
                0 === --d && p.removeEventListener(a, e, !0)
            }
        }
    });
    c.fn.extend({
        on: function(a, b, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof b && (d = d || b, b = q);
                for (h in a) this.on(h, b, d, a[h], f);
                return this
            }
            null == d && null == e ? (e = b, d = b = q) : null == e && ("string" == typeof b ? (e = d, d = q) : (e = d, d = b, b = q));
            if (!1 === e) e = v;
            else if (!e) return this;
            return 1 === f && (g = e, e = function(a) {
                return c().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = c.guid++)), this.each(function() {
                c.event.add(this, a, e, d, b)
            })
        },
        one: function(a, b, c, e) {
            return this.on(a, b, c, e, 1)
        },
        off: function(a, b, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) return e = a.handleObj, c(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a) this.off(f, b, a[f]);
                return this
            }
            if (!1 === b || "function" == typeof b) d = b, b = q;
            return !1 === d && (d = v), this.each(function() {
                c.event.remove(this, a, d, b)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, d) {
            return c(this.context).on(a, this.selector, b, d), this
        },
        die: function(a, b) {
            return c(this.context).off(a, this.selector || "**", b), this
        },
        delegate: function(a, b, c, e) {
            return this.on(b, a, c, e)
        },
        undelegate: function(a, b, c) {
            return 1 == arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) return c.event.trigger(a, b, this[0], !0)
        },
        toggle: function(a) {
            var b = arguments,
                d = a.guid || c.guid++,
                e = 0,
                f = function(d) {
                    var f = (c._data(this, "lastToggle" + a.guid) || 0) % e;
                    return c._data(this,
                        "lastToggle" + a.guid, f + 1), d.preventDefault(), b[f].apply(this, arguments) || !1
                };
            for (f.guid = d; e < b.length;) b[e++].guid = d;
            return this.click(f)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        c.fn[b] = function(a, c) {
            return null == c && (c = a, a = null), 0 < arguments.length ?
                this.on(b, null, a, c) : this.trigger(b)
        };
        $b.test(b) && (c.event.fixHooks[b] = c.event.keyHooks);
        ac.test(b) && (c.event.fixHooks[b] = c.event.mouseHooks)
    });
    (function(a, b) {
        function d(a, b, c, d) {
            c = c || [];
            b = b || L;
            var e, f, g, h, k = b.nodeType;
            if (1 !== k && 9 !== k) return [];
            if (!a || "string" != typeof a) return c;
            g = x(b);
            if (!g && !d && (e = Z.exec(a)))
                if (h = e[1])
                    if (9 === k) {
                        f = b.getElementById(h);
                        if (!f || !f.parentNode) return c;
                        if (f.id === h) return c.push(f), c
                    } else {
                        if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && E(b, f) && f.id === h) return c.push(f),
                            c
                    } else {
                if (e[2]) return aa.apply(c, N.call(b.getElementsByTagName(a), 0)), c;
                if ((h = e[3]) && R && b.getElementsByClassName) return aa.apply(c, N.call(b.getElementsByClassName(h), 0)), c
            }
            return p(a, b, c, d, g)
        }

        function e(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a
            }
        }

        function f(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function g(a, b, c) {
            if (a === b) return c;
            for (a = a.nextSibling; a;) {
                if (a === b) return -1;
                a = a.nextSibling
            }
            return 1
        }

        function h(a,
            b, c, e) {
            var f, g, h, k, l, n, m, q, t, p = !c && b !== L,
                r = (p ? "<s>" : "") + a.replace(F, "$1<s>");
            if (l = eb[G][r]) return e ? 0 : N.call(l, 0);
            l = a;
            n = [];
            q = y.preFilter;
            for (t = y.filter; l;) {
                if (!f || (g = bc.exec(l))) g && (l = l.slice(g[0].length), h.selector = m), n.push(h = []), m = "", p && (l = " " + l);
                f = !1;
                if (g = O.exec(l)) m += g[0], l = l.slice(g[0].length), f = h.push({
                    part: g.pop().replace(F, " "),
                    string: g[0],
                    captures: g
                });
                for (k in t)(g = W[k].exec(l)) && (!q[k] || (g = q[k](g, b, c))) && (m += g[0], l = l.slice(g[0].length), f = h.push({
                    part: k,
                    string: g.shift(),
                    captures: g
                }));
                if (!f) break
            }
            return m &&
                (h.selector = m), e ? l.length : l ? d.error(a) : N.call(eb(r, n), 0)
        }

        function k(a, b, c, d) {
            var e = b.dir,
                f = fb++;
            return a || (a = function(a) {
                return a === c
            }), b.first ? function(b) {
                for (; b = b[e];)
                    if (1 === b.nodeType) return a(b) && b
            } : d ? function(b) {
                for (; b = b[e];)
                    if (1 === b.nodeType && a(b)) return b
            } : function(b) {
                for (var c, d = f + "." + s, g = d + "." + v; b = b[e];)
                    if (1 === b.nodeType) {
                        if ((c = b[G]) === g) return b.sizset;
                        if ("string" == typeof c && 0 === c.indexOf(d)) {
                            if (b.sizset) return b
                        } else {
                            b[G] = g;
                            if (a(b)) return b.sizset = !0, b;
                            b.sizset = !1
                        }
                    }
            }
        }

        function l(a, b) {
            return a ?
                function(c) {
                    var d = b(c);
                    return d && a(!0 === d ? c : d)
                } : b
        }

        function m(a) {
            return function(b) {
                for (var c, d = 0; c = a[d]; d++)
                    if (c(b)) return !0;
                return !1
            }
        }

        function q(a, b, c, e) {
            for (var f = 0, g = b.length; f < g; f++) d(a, b[f], c, e)
        }

        function n(a, b, c, e, f, g) {
            var h, k = y.setFilters[b.toLowerCase()];
            return k || d.error(b), (a || !(h = f)) && q(a || "*", e, h = [], f), 0 < h.length ? k(h, c, g) : []
        }

        function r(a, c, e, f) {
            for (var g, h, k, l, m, p, s, u, v, G, C, ba = 0, w = a.length, L = W.POS, Tb = RegExp("^" + L.source + "(?!" + D + ")", "i"), y = function() {
                    for (var a = 1, c = arguments.length - 2; a < c; a++) arguments[a] ===
                        b && (u[a] = b)
                }; ba < w; ba++) {
                g = a[ba];
                h = "";
                s = f;
                k = 0;
                for (l = g.length; k < l; k++) {
                    m = g[k];
                    p = m.string;
                    if ("PSEUDO" === m.part)
                        for (L.exec(""), m = 0; u = L.exec(p);) {
                            v = !0;
                            G = L.lastIndex = u.index + u[0].length;
                            if (G > m) {
                                h += p.slice(m, u.index);
                                m = G;
                                G = [c];
                                O.test(h) && (s && (G = s), s = f);
                                if (C = P.test(h)) h = h.slice(0, -5).replace(O, "$&*"), m++;
                                1 < u.length && u[0].replace(Tb, y);
                                s = n(h, u[1], u[2], G, s, C)
                            }
                            h = ""
                        }
                    v || (h += p);
                    v = !1
                }
                h ? O.test(h) ? q(h, s || [c], e, f) : d(h, c, e, f ? f.concat(s) : s) : aa.apply(e, s)
            }
            return 1 === w ? e : d.uniqueSort(e)
        }

        function p(a, b, c, d, e) {
            a = a.replace(F,
                "$1");
            var f, g, k, l, m, n;
            g = h(a, b, e);
            m = b.nodeType;
            if (W.POS.test(a)) return r(g, b, c, d);
            if (d) f = N.call(d, 0);
            else if (1 === g.length) {
                if (2 < (k = N.call(g[0], 0)).length && "ID" === (l = k[0]).part && 9 === m && !e && y.relative[k[1].part]) {
                    b = y.find.ID(l.captures[0].replace(I, ""), b, e)[0];
                    if (!b) return c;
                    a = a.slice(k.shift().string.length)
                }
                d = (g = K.exec(k[0].string)) && !g.index && b.parentNode || b;
                m = "";
                for (g = k.length - 1; 0 <= g; g--) {
                    l = k[g];
                    n = l.part;
                    m = l.string + m;
                    if (y.relative[n]) break;
                    if (y.order.test(n) && (f = y.find[n](l.captures[0].replace(I,
                            ""), d, e), null != f)) {
                        (a = a.slice(0, a.length - m.length) + m.replace(W[n], "")) || aa.apply(c, N.call(f, 0));
                        break
                    }
                }
            }
            if (a)
                for (e = u(a, b, e), s = e.dirruns++, null == f && (f = y.find.TAG("*", K.test(a) && b.parentNode || b)), g = 0; a = f[g]; g++) v = e.runs++, e(a) && c.push(a);
            return c
        }
        var s, v, C, y, w, x, E, u, z, B, ba = !0,
            G = ("sizcache" + Math.random()).replace(".", ""),
            L = a.document,
            M = L.documentElement,
            fb = 0,
            N = [].slice,
            aa = [].push,
            A = function(a, b) {
                return a[G] = b || !0, a
            },
            Q = function() {
                var a = {},
                    b = [];
                return A(function(c, d) {
                    return b.push(c) > y.cacheLength && delete a[b.shift()],
                        a[c] = d
                }, a)
            },
            gb = Q(),
            eb = Q(),
            hb = Q(),
            D = "[\\x20\\t\\r\\n\\f]",
            Q = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#"),
            Q = "\\[" + D + "*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)" + D + "*(?:([*^$|!~]?=)" + D + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + Q + ")|)|)" + D + "*\\]",
            H = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + Q + ")|[^:]|\\\\.)*|.*))\\)|)",
            F = RegExp("^" + D + "+|((?:^|[^\\\\])(?:\\\\.)*)" + D + "+$", "g"),
            bc = RegExp("^" + D + "*," + D + "*"),
            O = RegExp("^" + D + "*([\\x20\\t\\r\\n\\f>+~])" + D + "*"),
            J = RegExp(H),
            Z = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
            K = /[\x20\t\r\n\f]*[+~]/,
            P = /:not\($/,
            S = /h\d/i,
            T = /input|select|textarea|button/i,
            I = /\\(?!\\)/g,
            W = {
                ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
                NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
                TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
                ATTR: RegExp("^" + Q),
                PSEUDO: RegExp("^" + H),
                CHILD: RegExp("^:(only|nth|last|first)-child(?:\\(" + D + "*(even|odd|(([+-]|)(\\d*)n|)" + D + "*(?:([+-]|)" + D + "*(\\d+)|))" +
                    D + "*\\)|)", "i"),
                POS: RegExp(":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)", "ig"),
                needsContext: RegExp("^" + D + "*[>+~]|:(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)", "i")
            },
            X = function(a) {
                var b = L.createElement("div");
                try {
                    return a(b)
                } catch (c) {
                    return !1
                } finally {}
            },
            Q = X(function(a) {
                return a.appendChild(L.createComment("")), !a.getElementsByTagName("*").length
            }),
            H = X(function(a) {
                return a.innerHTML = "<a href='#'></a>", a.firstChild && "undefined" !== typeof a.firstChild.getAttribute &&
                    "#" === a.firstChild.getAttribute("href")
            }),
            U = X(function(a) {
                a.innerHTML = "<select></select>";
                a = typeof a.lastChild.getAttribute("multiple");
                return "boolean" !== a && "string" !== a
            }),
            R = X(function(a) {
                return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && a.getElementsByClassName("e").length ? (a.lastChild.className = "e", 2 === a.getElementsByClassName("e").length) : !1
            }),
            V = X(function(a) {
                a.id = G + 0;
                a.innerHTML = "<a name='" + G + "'></a><div name='" + G + "'></div>";
                M.insertBefore(a,
                    M.firstChild);
                var b = L.getElementsByName && L.getElementsByName(G).length === 2 + L.getElementsByName(G + 0).length;
                return C = !L.getElementById(G), M.removeChild(a), b
            });
        try {
            N.call(M.childNodes, 0)[0].nodeType
        } catch (Y) {
            N = function(a) {
                for (var b, c = []; b = this[a]; a++) c.push(b);
                return c
            }
        }
        d.matches = function(a, b) {
            return d(a, null, null, b)
        };
        d.matchesSelector = function(a, b) {
            return 0 < d(b, null, null, [a]).length
        };
        w = d.getText = function(a) {
            var b, c = "",
                d = 0;
            if (b = a.nodeType)
                if (1 === b || 9 === b || 11 === b) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += w(a)
                } else {
                    if (3 === b || 4 === b) return a.nodeValue
                } else
                for (; b = a[d]; d++) c += w(b);
            return c
        };
        x = d.isXML = function(a) {
            return (a = a && (a.ownerDocument || a).documentElement) ? "HTML" !== a.nodeName : !1
        };
        E = d.contains = M.contains ? function(a, b) {
            var c = 9 === a.nodeType ? a.documentElement : a,
                d = b && b.parentNode;
            return a === d || !!(d && 1 === d.nodeType && c.contains && c.contains(d))
        } : M.compareDocumentPosition ? function(a, b) {
            return b && !!(a.compareDocumentPosition(b) & 16)
        } : function(a, b) {
            for (; b = b.parentNode;)
                if (b ===
                    a) return !0;
            return !1
        };
        d.attr = function(a, b) {
            var c, d = x(a);
            return d || (b = b.toLowerCase()), y.attrHandle[b] ? y.attrHandle[b](a) : U || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? "boolean" == typeof a[b] ? a[b] ? b : null : c.specified ? c.value : null : null)
        };
        y = d.selectors = {
            cacheLength: 50,
            createPseudo: A,
            match: W,
            order: RegExp("ID|TAG" + (V ? "|NAME" : "") + (R ? "|CLASS" : "")),
            attrHandle: H ? {} : {
                href: function(a) {
                    return a.getAttribute("href", 2)
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            find: {
                ID: C ? function(a, b, c) {
                    if ("undefined" !==
                        typeof b.getElementById && !c) return (a = b.getElementById(a)) && a.parentNode ? [a] : []
                } : function(a, c, d) {
                    if ("undefined" !== typeof c.getElementById && !d) return (c = c.getElementById(a)) ? c.id === a || "undefined" !== typeof c.getAttributeNode && c.getAttributeNode("id").value === a ? [c] : b : []
                },
                TAG: Q ? function(a, b) {
                    if ("undefined" !== typeof b.getElementsByTagName) return b.getElementsByTagName(a)
                } : function(a, b) {
                    var c = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (var d, e = [], f = 0; d = c[f]; f++) 1 === d.nodeType && e.push(d);
                        return e
                    }
                    return c
                },
                NAME: function(a, b) {
                    if ("undefined" !== typeof b.getElementsByName) return b.getElementsByName(name)
                },
                CLASS: function(a, b, c) {
                    if ("undefined" !== typeof b.getElementsByClassName && !c) return b.getElementsByClassName(a)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(I, ""), a[3] = (a[4] || a[5] || "").replace(I, ""), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] =
                        a[1].toLowerCase(), "nth" === a[1] ? (a[2] || d.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && d.error(a[0]), a
                },
                PSEUDO: function(a, b, c) {
                    var d, e;
                    if (W.CHILD.test(a[0])) return null;
                    if (a[3]) a[2] = a[3];
                    else if (d = a[4]) J.test(d) && (e = h(d, b, c, !0)) && (e = d.indexOf(")", d.length - e) - d.length) && (d = d.slice(0, e), a[0] = a[0].slice(0, e)), a[2] = d;
                    return a.slice(0, 3)
                }
            },
            filter: {
                ID: C ? function(a) {
                    return a = a.replace(I, ""),
                        function(b) {
                            return b.getAttribute("id") === a
                        }
                } : function(a) {
                    return a =
                        a.replace(I, ""),
                        function(b) {
                            return (b = "undefined" !== typeof b.getAttributeNode && b.getAttributeNode("id")) && b.value === a
                        }
                },
                TAG: function(a) {
                    return "*" === a ? function() {
                        return !0
                    } : (a = a.replace(I, "").toLowerCase(), function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    })
                },
                CLASS: function(a) {
                    var b = gb[G][a];
                    return b || (b = gb(a, RegExp("(^|" + D + ")" + a + "(" + D + "|$)"))),
                        function(a) {
                            return b.test(a.className || "undefined" !== typeof a.getAttribute && a.getAttribute("class") || "")
                        }
                },
                ATTR: function(a, b, c) {
                    return b ? function(e) {
                        e =
                            d.attr(e, a);
                        var f = e + "";
                        if (null == e) return "!=" === b;
                        switch (b) {
                            case "=":
                                return f === c;
                            case "!=":
                                return f !== c;
                            case "^=":
                                return c && 0 === f.indexOf(c);
                            case "*=":
                                return c && -1 < f.indexOf(c);
                            case "$=":
                                return c && f.substr(f.length - c.length) === c;
                            case "~=":
                                return -1 < (" " + f + " ").indexOf(c);
                            case "|=":
                                return f === c || f.substr(0, c.length + 1) === c + "-"
                        }
                    } : function(b) {
                        return null != d.attr(b, a)
                    }
                },
                CHILD: function(a, b, c, d) {
                    if ("nth" === a) {
                        var e = fb++;
                        return function(a) {
                            var b, f, g = 0,
                                h = a;
                            if (1 === c && 0 === d) return !0;
                            if ((b = a.parentNode) && (b[G] !==
                                    e || !a.sizset)) {
                                for (h = b.firstChild; h && (1 !== h.nodeType || (h.sizset = ++g, h !== a)); h = h.nextSibling);
                                b[G] = e
                            }
                            return f = a.sizset - d, 0 === c ? 0 === f : 0 === f % c && 0 <= f / c
                        }
                    }
                    return function(b) {
                        var c = b;
                        switch (a) {
                            case "only":
                            case "first":
                                for (; c = c.previousSibling;)
                                    if (1 === c.nodeType) return !1;
                                if ("first" === a) return !0;
                                c = b;
                            case "last":
                                for (; c = c.nextSibling;)
                                    if (1 === c.nodeType) return !1;
                                return !0
                        }
                    }
                },
                PSEUDO: function(a, b, c, e) {
                    var f, g = y.pseudos[a] || y.pseudos[a.toLowerCase()];
                    return g || d.error("unsupported pseudo: " + a), g[G] ? g(b, c, e) : 1 < g.length ?
                        (f = [a, a, "", b], function(a) {
                            return g(a, 0, f)
                        }) : g
                }
            },
            pseudos: {
                not: A(function(a, b, c) {
                    var d = u(a.replace(F, "$1"), b, c);
                    return function(a) {
                        return !d(a)
                    }
                }),
                enabled: function(a) {
                    return !1 === a.disabled
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                },
                parent: function(a) {
                    return !y.pseudos.empty(a)
                },
                empty: function(a) {
                    var b;
                    for (a =
                        a.firstChild; a;) {
                        if ("@" < a.nodeName || 3 === (b = a.nodeType) || 4 === b) return !1;
                        a = a.nextSibling
                    }
                    return !0
                },
                contains: A(function(a) {
                    return function(b) {
                        return -1 < (b.textContent || b.innerText || w(b)).indexOf(a)
                    }
                }),
                has: A(function(a) {
                    return function(b) {
                        return 0 < d(a, b).length
                    }
                }),
                header: function(a) {
                    return S.test(a.nodeName)
                },
                text: function(a) {
                    var b, c;
                    return "input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (c = a.getAttribute("type")) || c.toLowerCase() === b)
                },
                radio: e("radio"),
                checkbox: e("checkbox"),
                file: e("file"),
                password: e("password"),
                image: e("image"),
                submit: f("submit"),
                reset: f("reset"),
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                input: function(a) {
                    return T.test(a.nodeName)
                },
                focus: function(a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href)
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(a, b, c) {
                    return c ? a.slice(1) : [a[0]]
                },
                last: function(a, b, c) {
                    b = a.pop();
                    return c ?
                        a : [b]
                },
                even: function(a, b, c) {
                    b = [];
                    c = c ? 1 : 0;
                    for (var d = a.length; c < d; c += 2) b.push(a[c]);
                    return b
                },
                odd: function(a, b, c) {
                    b = [];
                    c = c ? 0 : 1;
                    for (var d = a.length; c < d; c += 2) b.push(a[c]);
                    return b
                },
                lt: function(a, b, c) {
                    return c ? a.slice(+b) : a.slice(0, +b)
                },
                gt: function(a, b, c) {
                    return c ? a.slice(0, +b + 1) : a.slice(+b + 1)
                },
                eq: function(a, b, c) {
                    b = a.splice(+b, 1);
                    return c ? a : b
                }
            }
        };
        z = M.compareDocumentPosition ? function(a, b) {
            return a === b ? (B = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? a.compareDocumentPosition(b) & 4 : a.compareDocumentPosition) ?
                -1 : 1
        } : function(a, b) {
            if (a === b) return B = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
                f = [];
            c = a.parentNode;
            d = b.parentNode;
            var h = c;
            if (c === d) return g(a, b);
            if (!c) return -1;
            if (!d) return 1;
            for (; h;) e.unshift(h), h = h.parentNode;
            for (h = d; h;) f.unshift(h), h = h.parentNode;
            c = e.length;
            d = f.length;
            for (h = 0; h < c && h < d; h++)
                if (e[h] !== f[h]) return g(e[h], f[h]);
            return h === c ? g(a, f[h], -1) : g(e[h], b, 1)
        };
        [0, 0].sort(z);
        ba = !B;
        d.uniqueSort = function(a) {
            var b, c = 1;
            B = ba;
            a.sort(z);
            if (B)
                for (; b = a[c]; c++) b ===
                    a[c - 1] && a.splice(c--, 1);
            return a
        };
        d.error = function(a) {
            throw Error("Syntax error, unrecognized expression: " + a);
        };
        u = d.compile = function(a, b, c) {
            var d, e, f, g = hb[G][a];
            if (g && g.context === b) return g;
            d = h(a, b, c);
            e = 0;
            for (f = d.length; e < f; e++) {
                for (var n = d, q = e, t = d[e], p = b, r = c, s = void 0, u = void 0, v = 0; s = t[v]; v++) y.relative[s.part] ? u = k(u, y.relative[s.part], p, r) : u = l(u, y.filter[s.part].apply(null, s.captures.concat(p, r)));
                n[q] = u
            }
            return g = hb(a, m(d)), g.context = b, g.runs = g.dirruns = 0, g
        };
        L.querySelectorAll && function() {
            var a, b =
                p,
                c = /'|\\/g,
                e = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                f = [],
                g = [":active"],
                k = M.matchesSelector || M.mozMatchesSelector || M.webkitMatchesSelector || M.oMatchesSelector || M.msMatchesSelector;
            X(function(a) {
                a.innerHTML = "<select><option selected=''></option></select>";
                a.querySelectorAll("[selected]").length || f.push("\\[" + D + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
                a.querySelectorAll(":checked").length || f.push(":checked")
            });
            X(function(a) {
                a.innerHTML = "<p test=''></p>";
                a.querySelectorAll("[test^='']").length &&
                    f.push("[*^$]=" + D + "*(?:\"\"|'')");
                a.innerHTML = "<input type='hidden'/>";
                a.querySelectorAll(":enabled").length || f.push(":enabled", ":disabled")
            });
            f = f.length && RegExp(f.join("|"));
            p = function(a, d, e, g, k) {
                if (!(g || k || f && f.test(a)))
                    if (9 === d.nodeType) try {
                        return aa.apply(e, N.call(d.querySelectorAll(a), 0)), e
                    } catch (l) {} else if (1 === d.nodeType && "object" !== d.nodeName.toLowerCase()) {
                        var m, n, q, t = d.getAttribute("id"),
                            p = t || G,
                            r = K.test(a) && d.parentNode || d;
                        t ? p = p.replace(c, "\\$&") : d.setAttribute("id", p);
                        m = h(a, d, k);
                        p = "[id='" +
                            p + "']";
                        n = 0;
                        for (q = m.length; n < q; n++) m[n] = p + m[n].selector;
                        try {
                            return aa.apply(e, N.call(r.querySelectorAll(m.join(",")), 0)), e
                        } catch (s) {} finally {
                            t || d.removeAttribute("id")
                        }
                    }
                return b(a, d, e, g, k)
            };
            k && (X(function(b) {
                a = k.call(b, "div");
                try {
                    k.call(b, "[test!='']:sizzle"), g.push(W.PSEUDO.source, W.POS.source, "!=")
                } catch (c) {}
            }), g = RegExp(g.join("|")), d.matchesSelector = function(b, c) {
                c = c.replace(e, "='$1']");
                if (!(x(b) || g.test(c) || f && f.test(c))) try {
                    var h = k.call(b, c);
                    if (h || a || b.document && 11 !== b.document.nodeType) return h
                } catch (l) {}
                return 0 <
                    d(c, null, null, [b]).length
            })
        }();
        y.setFilters.nth = y.setFilters.eq;
        y.filters = y.pseudos;
        d.attr = c.attr;
        c.find = d;
        c.expr = d.selectors;
        c.expr[":"] = c.expr.pseudos;
        c.unique = d.uniqueSort;
        c.text = d.getText;
        c.isXMLDoc = d.isXML;
        c.contains = d.contains
    })(r);
    var cc = /Until$/,
        dc = /^(?:parents|prev(?:Until|All))/,
        zb = /^.[^:#\[\.,]*$/,
        ib = c.expr.match.needsContext,
        ec = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    c.fn.extend({
        find: function(a) {
            var b, d, e, f, g, h, k = this;
            if ("string" != typeof a) return c(a).filter(function() {
                b = 0;
                for (d = k.length; b <
                    d; b++)
                    if (c.contains(k[b], this)) return !0
            });
            h = this.pushStack("", "find", a);
            b = 0;
            for (d = this.length; b < d; b++)
                if (e = h.length, c.find(a, this[b], h), 0 < b)
                    for (f = e; f < h.length; f++)
                        for (g = 0; g < e; g++)
                            if (h[g] === h[f]) {
                                h.splice(f--, 1);
                                break
                            }
            return h
        },
        has: function(a) {
            var b, d = c(a, this),
                e = d.length;
            return this.filter(function() {
                for (b = 0; b < e; b++)
                    if (c.contains(this, d[b])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(s(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(s(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a &&
                ("string" == typeof a ? ib.test(a) ? 0 <= c(a, this.context).index(this[0]) : 0 < c.filter(a, this).length : 0 < this.filter(a).length)
        },
        closest: function(a, b) {
            for (var d, e = 0, f = this.length, g = [], h = ib.test(a) || "string" != typeof a ? c(a, b || this.context) : 0; e < f; e++)
                for (d = this[e]; d && d.ownerDocument && d !== b && 11 !== d.nodeType;) {
                    if (h ? -1 < h.index(d) : c.find.matchesSelector(d, a)) {
                        g.push(d);
                        break
                    }
                    d = d.parentNode
                }
            return g = 1 < g.length ? c.unique(g) : g, this.pushStack(g, "closest", a)
        },
        index: function(a) {
            return a ? "string" == typeof a ? c.inArray(this[0],
                c(a)) : c.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(a, b) {
            var d = "string" == typeof a ? c(a, b) : c.makeArray(a && a.nodeType ? [a] : a),
                e = c.merge(this.get(), d);
            return this.pushStack(F(d[0]) || F(e[0]) ? e : c.unique(e))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });
    c.fn.andSelf = c.fn.addBack;
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && 11 !== a.nodeType ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a,
            b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return E(a, "nextSibling")
        },
        prev: function(a) {
            return E(a, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a,
                "iframe") ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d, e) {
            var f = c.map(this, b, d);
            return cc.test(a) || (e = d), e && "string" == typeof e && (f = c.filter(e, f)), f = 1 < this.length && !ec[a] ? c.unique(f) : f, 1 < this.length && dc.test(a) && (f = f.reverse()), this.pushStack(f, a, K.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function(a, b, d) {
            return d && (a = ":not(" + a + ")"), 1 === b.length ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b)
        },
        dir: function(a, b, d) {
            var e = [];
            for (a = a[b]; a && 9 !== a.nodeType && (d === q || 1 !== a.nodeType || !c(a).is(d));) 1 === a.nodeType && e.push(a), a = a[b];
            return e
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Ca = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        fc = / jQuery\d+="(?:null|\d+)"/g,
        wa = /^\s+/,
        jb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        kb = /<([\w:]+)/,
        gc = /<tbody/i,
        hc = /<|&#?\w+;/,
        ic = /<(?:script|style|link)/i,
        jc = /<(?:script|object|embed|option|style)/i,
        xa = RegExp("<(?:" + Ca + ")[\\s/>]", "i"),
        Da = /^(?:checkbox|radio)$/,
        lb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        kc = /\/(java|ecma)script/i,
        lc = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        H = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2,
                "<table><tbody></tbody><colgroup>", "</colgroup></table>"
            ],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        mb = C(p),
        ya = mb.appendChild(p.createElement("div"));
    H.optgroup = H.option;
    H.tbody = H.tfoot = H.colgroup = H.caption = H.thead;
    H.th = H.td;
    c.support.htmlSerialize || (H._default = [1, "X<div>", "</div>"]);
    c.fn.extend({
        text: function(a) {
            return c.access(this, function(a) {
                return a === q ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || p).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapAll(a.call(this,
                    b))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return c.isFunction(a) ? this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = c.isFunction(a);
            return this.each(function(d) {
                c(this).wrapAll(b ?
                    a.call(this, d) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                1 !== this.nodeType && 11 !== this.nodeType || this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                1 !== this.nodeType && 11 !== this.nodeType || this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (!F(this[0])) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a,
                    this)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                return this.pushStack(c.merge(a, this), "before", this.selector)
            }
        },
        after: function() {
            if (!F(this[0])) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = c.clean(arguments);
                return this.pushStack(c.merge(this, a), "after", this.selector)
            }
        },
        remove: function(a, b) {
            for (var d, e = 0; null != (d = this[e]); e++)
                if (!a || c.filter(a, [d]).length) !b && 1 === d.nodeType && (c.cleanData(d.getElementsByTagName("*")),
                    c.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++)
                for (1 === a.nodeType && c.cleanData(a.getElementsByTagName("*")); a.firstChild;) a.removeChild(a.firstChild);
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return c.clone(this, a, b)
            })
        },
        html: function(a) {
            return c.access(this, function(a) {
                var d = this[0] || {},
                    e = 0,
                    f = this.length;
                if (a === q) return 1 === d.nodeType ? d.innerHTML.replace(fc, "") : q;
                if ("string" ==
                    typeof a && !(ic.test(a) || !c.support.htmlSerialize && xa.test(a) || !c.support.leadingWhitespace && wa.test(a) || H[(kb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(jb, "<$1></$2>");
                    try {
                        for (; e < f; e++) d = this[e] || {}, 1 === d.nodeType && (c.cleanData(d.getElementsByTagName("*")), d.innerHTML = a);
                        d = 0
                    } catch (g) {}
                }
                d && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            return F(this[0]) ? this.length ? this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a) : this : c.isFunction(a) ? this.each(function(b) {
                var d =
                    c(this),
                    e = d.html();
                d.replaceWith(a.call(this, b, e))
            }) : ("string" != typeof a && (a = c(a).detach()), this.each(function() {
                var b = this.nextSibling,
                    d = this.parentNode;
                c(this).remove();
                b ? c(b).before(a) : c(d).append(a)
            }))
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, d) {
            a = [].concat.apply([], a);
            var e, f, g, h = 0,
                k = a[0],
                l = [],
                m = this.length;
            if (!c.support.checkClone && 1 < m && "string" == typeof k && lb.test(k)) return this.each(function() {
                c(this).domManip(a, b, d)
            });
            if (c.isFunction(k)) return this.each(function(e) {
                var f =
                    c(this);
                a[0] = k.call(this, e, b ? f.html() : q);
                f.domManip(a, b, d)
            });
            if (this[0]) {
                e = c.buildFragment(a, this, l);
                g = e.fragment;
                f = g.firstChild;
                1 === g.childNodes.length && (g = f);
                if (f)
                    for (b = b && c.nodeName(f, "tr"), e = e.cacheable || m - 1; h < m; h++) d.call(b && c.nodeName(this[h], "table") ? this[h].getElementsByTagName("tbody")[0] || this[h].appendChild(this[h].ownerDocument.createElement("tbody")) : this[h], h === e ? g : c.clone(g, !0, !0));
                g = f = null;
                l.length && c.each(l, function(a, b) {
                    b.src ? c.ajax ? c.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : c.error("no ajax") : c.globalEval((b.text || b.textContent || b.innerHTML || "").replace(lc, ""));
                    b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    });
    c.buildFragment = function(a, b, d) {
        var e, f, g, h = a[0];
        return b = b || p, b = !b.nodeType && b[0] || b, b = b.ownerDocument || b, 1 === a.length && "string" == typeof h && 512 > h.length && b === p && "<" === h.charAt(0) && !jc.test(h) && (c.support.checkClone || !lb.test(h)) && (c.support.html5Clone || !xa.test(h)) && (f = !0, e = c.fragments[h], g = e !== q), e || (e = b.createDocumentFragment(),
            c.clean(a, b, e, d), f && (c.fragments[h] = g && e)), {
            fragment: e,
            cacheable: f
        }
    };
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(d) {
            var e, f = 0,
                g = [];
            d = c(d);
            var h = d.length;
            e = 1 === this.length && this[0].parentNode;
            if ((null == e || e && 11 === e.nodeType && 1 === e.childNodes.length) && 1 === h) return d[b](this[0]), this;
            for (; f < h; f++) e = (0 < f ? this.clone(!0) : this).get(), c(d[f])[b](e), g = g.concat(e);
            return this.pushStack(g, a, d.selector)
        }
    });
    c.extend({
        clone: function(a, b, d) {
            var e, f, g, h;
            c.support.html5Clone || c.isXMLDoc(a) || !xa.test("<" + a.nodeName + ">") ? h = a.cloneNode(!0) : (ya.innerHTML = a.outerHTML, ya.removeChild(h = ya.firstChild));
            if (!(c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || c.isXMLDoc(a)))
                for (Z(a, h), e = ea(a), f = ea(h), g = 0; e[g]; ++g) f[g] && Z(e[g], f[g]);
            if (b && (O(a, h), d))
                for (e = ea(a), f = ea(h), g = 0; e[g]; ++g) O(e[g], f[g]);
            return h
        },
        clean: function(a, b, d, e) {
            var f, g, h, k, l, m, q, n = b === p && mb,
                r = [];
            b && "undefined" != typeof b.createDocumentFragment ||
                (b = p);
            for (f = 0; null != (h = a[f]); f++)
                if ("number" == typeof h && (h += ""), h) {
                    if ("string" == typeof h)
                        if (hc.test(h)) {
                            n = n || C(b);
                            m = b.createElement("div");
                            n.appendChild(m);
                            h = h.replace(jb, "<$1></$2>");
                            g = (kb.exec(h) || ["", ""])[1].toLowerCase();
                            k = H[g] || H._default;
                            l = k[0];
                            for (m.innerHTML = k[1] + h + k[2]; l--;) m = m.lastChild;
                            if (!c.support.tbody)
                                for (l = gc.test(h), k = "table" !== g || l ? "<table>" !== k[1] || l ? [] : m.childNodes : m.firstChild && m.firstChild.childNodes, g = k.length - 1; 0 <= g; --g) c.nodeName(k[g], "tbody") && !k[g].childNodes.length && k[g].parentNode.removeChild(k[g]);
                            !c.support.leadingWhitespace && wa.test(h) && m.insertBefore(b.createTextNode(wa.exec(h)[0]), m.firstChild);
                            h = m.childNodes;
                            m.parentNode.removeChild(m)
                        } else h = b.createTextNode(h);
                    h.nodeType ? r.push(h) : c.merge(r, h)
                }
            m && (h = m = n = null);
            if (!c.support.appendChecked)
                for (f = 0; null != (h = r[f]); f++) c.nodeName(h, "input") ? Ea(h) : "undefined" != typeof h.getElementsByTagName && c.grep(h.getElementsByTagName("input"), Ea);
            if (d)
                for (a = function(a) {
                        if (!a.type || kc.test(a.type)) return e ? e.push(a.parentNode ? a.parentNode.removeChild(a) :
                            a) : d.appendChild(a)
                    }, f = 0; null != (h = r[f]); f++) c.nodeName(h, "script") && a(h) || (d.appendChild(h), "undefined" != typeof h.getElementsByTagName && (q = c.grep(c.merge([], h.getElementsByTagName("script")), a), r.splice.apply(r, [f + 1, 0].concat(q)), f += q.length));
            return r
        },
        cleanData: function(a, b) {
            for (var d, e, f, g, h = 0, k = c.expando, l = c.cache, m = c.support.deleteExpando, q = c.event.special; null != (f = a[h]); h++)
                if (b || c.acceptData(f))
                    if (d = (e = f[k]) && l[e]) {
                        if (d.events)
                            for (g in d.events) q[g] ? c.event.remove(f, g) : c.removeEvent(f, g, d.handle);
                        l[e] && (delete l[e], m ? delete f[k] : f.removeAttribute ? f.removeAttribute(k) : f[k] = null, c.deletedIds.push(e))
                    }
        }
    });
    (function() {
        var a, b;
        c.uaMatch = function(a) {
            a = a.toLowerCase();
            a = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: a[1] || "",
                version: a[2] || "0"
            }
        };
        a = c.uaMatch(Fb.userAgent);
        b = {};
        a.browser && (b[a.browser] = !0, b.version = a.version);
        b.chrome ? b.webkit = !0 : b.webkit && (b.safari = !0);
        c.browser = b;
        c.sub = function() {
            function a(b, c) {
                return new a.fn.init(b, c)
            }
            c.extend(!0, a, this);
            a.superclass = this;
            a.fn = a.prototype = this();
            a.fn.constructor = a;
            a.sub = this.sub;
            a.fn.init = function(f, g) {
                return g && g instanceof c && !(g instanceof a) && (g = a(g)), c.fn.init.call(this, f, g, b)
            };
            a.fn.init.prototype = a.fn;
            var b = a(p);
            return a
        }
    })();
    var z, V, Y, za = /alpha\([^)]*\)/i,
        mc = /opacity=([^)]*)/,
        nc = /^(top|right|bottom|left)$/,
        oc = /^(none|table(?!-c[ea]).+)/,
        nb = /^margin/,
        Ab = RegExp("^(" +
            ma + ")(.*)$", "i"),
        ga = RegExp("^(" + ma + ")(?!px)[a-z%]+$", "i"),
        pc = RegExp("^([-+])=(" + ma + ")", "i"),
        qa = {},
        qc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ob = {
            letterSpacing: 0,
            fontWeight: 400
        },
        I = ["Top", "Right", "Bottom", "Left"],
        Ga = ["Webkit", "O", "Moz", "ms"],
        rc = c.fn.toggle;
    c.fn.extend({
        css: function(a, b) {
            return c.access(this, function(a, b, f) {
                return f !== q ? c.style(a, b, f) : c.css(a, b)
            }, a, b, 1 < arguments.length)
        },
        show: function() {
            return Ha(this, !0)
        },
        hide: function() {
            return Ha(this)
        },
        toggle: function(a, b) {
            var d =
                "boolean" == typeof a;
            return c.isFunction(a) && c.isFunction(b) ? rc.apply(this, arguments) : this.each(function() {
                (d ? a : fa(this)) ? c(this).show(): c(this).hide()
            })
        }
    });
    c.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = z(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": c.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h,
                    k = c.camelCase(b),
                    l = a.style;
                b = c.cssProps[k] || (c.cssProps[k] = Fa(l, k));
                h = c.cssHooks[b] || c.cssHooks[k];
                if (d === q) return h && "get" in h && (f = h.get(a, !1, e)) !== q ? f : l[b];
                g = typeof d;
                "string" === g && (f = pc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(c.css(a, b)), g = "number");
                if (!(null == d || "number" === g && isNaN(d) || ("number" === g && !c.cssNumber[k] && (d += "px"), h && "set" in h && (d = h.set(a, d, e)) === q))) try {
                    l[b] = d
                } catch (m) {}
            }
        },
        css: function(a, b, d, e) {
            var f, g, h, k = c.camelCase(b);
            return b = c.cssProps[k] || (c.cssProps[k] = Fa(a.style, k)), h = c.cssHooks[b] ||
                c.cssHooks[k], h && "get" in h && (f = h.get(a, !0, e)), f === q && (f = z(a, b)), "normal" === f && b in ob && (f = ob[b]), d || e !== q ? (g = parseFloat(f), d || c.isNumeric(g) ? g || 0 : f) : f
        },
        swap: function(a, b, c) {
            var e, f = {};
            for (e in b) f[e] = a.style[e], a.style[e] = b[e];
            c = c.call(a);
            for (e in b) a.style[e] = f[e];
            return c
        }
    });
    r.getComputedStyle ? z = function(a, b) {
        var d, e, f, g, h = r.getComputedStyle(a, null),
            k = a.style;
        return h && (d = h[b], "" === d && !c.contains(a.ownerDocument, a) && (d = c.style(a, b)), ga.test(d) && nb.test(b) && (e = k.width, f = k.minWidth, g = k.maxWidth, k.minWidth =
            k.maxWidth = k.width = d, d = h.width, k.width = e, k.minWidth = f, k.maxWidth = g)), d
    } : p.documentElement.currentStyle && (z = function(a, b) {
        var c, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        return null == f && g && g[b] && (f = g[b]), ga.test(f) && !nc.test(b) && (c = g.left, e = a.runtimeStyle && a.runtimeStyle.left, e && (a.runtimeStyle.left = a.currentStyle.left), g.left = "fontSize" === b ? "1em" : f, f = g.pixelLeft + "px", g.left = c, e && (a.runtimeStyle.left = e)), "" === f ? "auto" : f
    });
    c.each(["height", "width"], function(a, b) {
        c.cssHooks[b] = {
            get: function(a,
                e, f) {
                if (e) return 0 === a.offsetWidth && oc.test(z(a, "display")) ? c.swap(a, qc, function() {
                    return La(a, b, f)
                }) : La(a, b, f)
            },
            set: function(a, e, f) {
                return Ja(a, e, f ? Ka(a, b, f, c.support.boxSizing && "border-box" === c.css(a, "boxSizing")) : 0)
            }
        }
    });
    c.support.opacity || (c.cssHooks.opacity = {
        get: function(a, b) {
            return mc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var d = a.style,
                e = a.currentStyle,
                f = c.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                g = e && e.filter ||
                d.filter || "";
            d.zoom = 1;
            if (1 <= b && "" === c.trim(g.replace(za, "")) && d.removeAttribute && (d.removeAttribute("filter"), e && !e.filter)) return;
            d.filter = za.test(g) ? g.replace(za, f) : g + " " + f
        }
    });
    c(function() {
        c.support.reliableMarginRight || (c.cssHooks.marginRight = {
            get: function(a, b) {
                return c.swap(a, {
                    display: "inline-block"
                }, function() {
                    if (b) return z(a, "marginRight")
                })
            }
        });
        !c.support.pixelPosition && c.fn.position && c.each(["top", "left"], function(a, b) {
            c.cssHooks[b] = {
                get: function(a, e) {
                    if (e) {
                        var f = z(a, b);
                        return ga.test(f) ? c(a).position()[b] +
                            "px" : f
                    }
                }
            }
        })
    });
    c.expr && c.expr.filters && (c.expr.filters.hidden = function(a) {
        return 0 === a.offsetWidth && 0 === a.offsetHeight || !c.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || z(a, "display"))
    }, c.expr.filters.visible = function(a) {
        return !c.expr.filters.hidden(a)
    });
    c.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        c.cssHooks[a + b] = {
            expand: function(c) {
                var e = "string" == typeof c ? c.split(" ") : [c],
                    f = {};
                for (c = 0; 4 > c; c++) f[a + I[c] + b] = e[c] || e[c - 2] || e[0];
                return f
            }
        };
        nb.test(a) || (c.cssHooks[a +
            b].set = Ja)
    });
    var sc = /%20/g,
        Bb = /\[\]$/,
        pb = /\r?\n/g,
        tc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        uc = /^(?:select|textarea)/i;
    c.fn.extend({
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || uc.test(this.nodeName) || tc.test(this.type))
            }).map(function(a,
                b) {
                var d = c(this).val();
                return null == d ? null : c.isArray(d) ? c.map(d, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(pb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: d.replace(pb, "\r\n")
                }
            }).get()
        }
    });
    c.param = function(a, b) {
        var d, e = [],
            f = function(a, b) {
                b = c.isFunction(b) ? b() : null == b ? "" : b;
                e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        b === q && (b = c.ajaxSettings && c.ajaxSettings.traditional);
        if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function() {
            f(this.name, this.value)
        });
        else
            for (d in a) ra(d, a[d], b, f);
        return e.join("&").replace(sc, "+")
    };
    var U, R, vc = /#.*$/,
        wc = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        xc = /^(?:GET|HEAD)$/,
        yc = /^\/\//,
        qb = /\?/,
        zc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Ac = /([?&])_=[^&]*/,
        rb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        sb = c.fn.load,
        sa = {},
        tb = {},
        ub = ["*/"] + ["*"];
    try {
        U = Eb.href
    } catch (Hc) {
        U = p.createElement("a"), U.href = "", U = U.href
    }
    R = rb.exec(U.toLowerCase()) || [];
    c.fn.load = function(a, b, d) {
        if ("string" != typeof a && sb) return sb.apply(this, arguments);
        if (!this.length) return this;
        var e, f, g, h = this,
            k = a.indexOf(" ");
        return 0 <= k && (e = a.slice(k, a.length), a = a.slice(0, k)), c.isFunction(b) ? (d = b, b = q) : b && "object" == typeof b && (f = "POST"), c.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b,
            complete: function(a, b) {
                d && h.each(d, g || [a.responseText, b, a])
            }
        }).done(function(a) {
            g = arguments;
            h.html(e ? c("<div>").append(a.replace(zc, "")).find(e) : a)
        }), this
    };
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        c.fn[b] = function(a) {
            return this.on(b, a)
        }
    });
    c.each(["get", "post"],
        function(a, b) {
            c[b] = function(a, e, f, g) {
                return c.isFunction(e) && (g = g || f, f = e, e = q), c.ajax({
                    type: b,
                    url: a,
                    data: e,
                    success: f,
                    dataType: g
                })
            }
        });
    c.extend({
        getScript: function(a, b) {
            return c.get(a, q, b, "script")
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        ajaxSetup: function(a, b) {
            return b ? Na(a, c.ajaxSettings) : (b = a, a = c.ajaxSettings), Na(a, b), a
        },
        ajaxSettings: {
            url: U,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(R[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": ub
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },

            converters: {
                "* text": r.String,
                "text html": !0,
                "text json": c.parseJSON,
                "text xml": c.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Ma(sa),
        ajaxTransport: Ma(tb),
        ajax: function(a, b) {
            function d(a, b, d, g) {
                var l, p, t, y, x, A = b;
                if (2 !== B) {
                    B = 2;
                    k && clearTimeout(k);
                    h = q;
                    f = g || "";
                    u.readyState = 0 < a ? 4 : 0;
                    if (d) {
                        y = n;
                        g = u;
                        var E, z, D, H, I = y.contents,
                            F = y.dataTypes,
                            O = y.responseFields;
                        for (z in O) z in d && (g[O[z]] = d[z]);
                        for (;
                            "*" === F[0];) F.shift(), E === q && (E = y.mimeType || g.getResponseHeader("content-type"));
                        if (E)
                            for (z in I)
                                if (I[z] && I[z].test(E)) {
                                    F.unshift(z);
                                    break
                                }
                        if (F[0] in d) D = F[0];
                        else {
                            for (z in d) {
                                if (!F[0] || y.converters[z + " " + F[0]]) {
                                    D = z;
                                    break
                                }
                                H || (H = z)
                            }
                            D = D || H
                        }
                        d = D ? (D !== F[0] && F.unshift(D), d[D]) : void 0;
                        y = d
                    }
                    if (200 <= a && 300 > a || 304 === a)
                        if (n.ifModified && (x = u.getResponseHeader("Last-Modified"),
                                x && (c.lastModified[e] = x), x = u.getResponseHeader("Etag"), x && (c.etag[e] = x)), 304 === a) A = "notmodified", l = !0;
                        else {
                            var J;
                            a: {
                                l = n;
                                p = y;
                                var K, A = l.dataTypes.slice();
                                d = A[0];
                                E = {};
                                z = 0;
                                l.dataFilter && (p = l.dataFilter(p, l.dataType));
                                if (A[1])
                                    for (J in l.converters) E[J.toLowerCase()] = l.converters[J];
                                for (; t = A[++z];)
                                    if ("*" !== t) {
                                        if ("*" !== d && d !== t) {
                                            J = E[d + " " + t] || E["* " + t];
                                            if (!J)
                                                for (K in E)
                                                    if (x = K.split(" "), x[1] === t && (J = E[d + " " + x[0]] || E["* " + x[0]])) {
                                                        !0 === J ? J = E[K] : !0 !== E[K] && (t = x[0], A.splice(z--, 0, t));
                                                        break
                                                    }
                                            if (!0 !== J)
                                                if (J && l["throws"]) p =
                                                    J(p);
                                                else try {
                                                    p = J(p)
                                                } catch (Z) {
                                                    J = {
                                                        state: "parsererror",
                                                        error: J ? Z : "No conversion from " + d + " to " + t
                                                    };
                                                    break a
                                                }
                                        }
                                        d = t
                                    }
                                J = {
                                    state: "success",
                                    data: p
                                }
                            }
                            l = J;
                            A = l.state;
                            p = l.data;
                            t = l.error;
                            l = !t
                        } else if (t = A, !A || a) A = "error", 0 > a && (a = 0);
                    u.status = a;
                    u.statusText = "" + (b || A);
                    l ? v.resolveWith(r, [p, A, u]) : v.rejectWith(r, [u, A, t]);
                    u.statusCode(w);
                    w = q;
                    m && s.trigger("ajax" + (l ? "Success" : "Error"), [u, n, l ? p : t]);
                    C.fireWith(r, [u, A]);
                    m && (s.trigger("ajaxComplete", [u, n]), --c.active || c.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (b = a, a = q);
            b = b || {};
            var e, f, g, h, k, l, m, p, n = c.ajaxSetup({}, b),
                r = n.context || n,
                s = r !== n && (r.nodeType || r instanceof c) ? c(r) : c.event,
                v = c.Deferred(),
                C = c.Callbacks("once memory"),
                w = n.statusCode || {},
                y = {},
                x = {},
                B = 0,
                A = "canceled",
                u = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!B) {
                            var c = a.toLowerCase();
                            a = x[c] = x[c] || a;
                            y[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === B ? f : null
                    },
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === B) {
                            if (!g)
                                for (g = {}; b = wc.exec(f);) g[b[1].toLowerCase()] = b[2];
                            b = g[a.toLowerCase()]
                        }
                        return b ===
                            q ? null : b
                    },
                    overrideMimeType: function(a) {
                        return B || (n.mimeType = a), this
                    },
                    abort: function(a) {
                        return a = a || A, h && h.abort(a), d(0, a), this
                    }
                };
            v.promise(u);
            u.success = u.done;
            u.error = u.fail;
            u.complete = C.add;
            u.statusCode = function(a) {
                if (a) {
                    var b;
                    if (2 > B)
                        for (b in a) w[b] = [w[b], a[b]];
                    else b = a[u.status], u.always(b)
                }
                return this
            };
            n.url = ((a || n.url) + "").replace(vc, "").replace(yc, R[1] + "//");
            n.dataTypes = c.trim(n.dataType || "*").toLowerCase().split(S);
            null == n.crossDomain && (l = rb.exec(n.url.toLowerCase()), n.crossDomain = !(!l || l[1] ==
                R[1] && l[2] == R[2] && (l[3] || ("http:" === l[1] ? 80 : 443)) == (R[3] || ("http:" === R[1] ? 80 : 443))));
            n.data && n.processData && "string" != typeof n.data && (n.data = c.param(n.data, n.traditional));
            ha(sa, n, b, u);
            if (2 === B) return u;
            m = n.global;
            n.type = n.type.toUpperCase();
            n.hasContent = !xc.test(n.type);
            m && 0 === c.active++ && c.event.trigger("ajaxStart");
            if (!n.hasContent && (n.data && (n.url += (qb.test(n.url) ? "&" : "?") + n.data, delete n.data), e = n.url, !1 === n.cache)) {
                l = c.now();
                var E = n.url.replace(Ac, "$1_=" + l);
                n.url = E + (E === n.url ? (qb.test(n.url) ?
                    "&" : "?") + "_=" + l : "")
            }(n.data && n.hasContent && !1 !== n.contentType || b.contentType) && u.setRequestHeader("Content-Type", n.contentType);
            n.ifModified && (e = e || n.url, c.lastModified[e] && u.setRequestHeader("If-Modified-Since", c.lastModified[e]), c.etag[e] && u.setRequestHeader("If-None-Match", c.etag[e]));
            u.setRequestHeader("Accept", n.dataTypes[0] && n.accepts[n.dataTypes[0]] ? n.accepts[n.dataTypes[0]] + ("*" !== n.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : n.accepts["*"]);
            for (p in n.headers) u.setRequestHeader(p, n.headers[p]);
            if (!n.beforeSend ||
                !1 !== n.beforeSend.call(r, u, n) && 2 !== B) {
                A = "abort";
                for (p in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) u[p](n[p]);
                if (h = ha(tb, n, b, u)) {
                    u.readyState = 1;
                    m && s.trigger("ajaxSend", [u, n]);
                    n.async && 0 < n.timeout && (k = setTimeout(function() {
                        u.abort("timeout")
                    }, n.timeout));
                    try {
                        B = 1, h.send(y, d)
                    } catch (z) {
                        if (2 > B) d(-1, z);
                        else throw z;
                    }
                } else d(-1, "No Transport");
                return u
            }
            return u.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var vb = [],
        Bc = /\?/,
        oa = /(=)\?(?=&|$)|\?\?/,
        Cc = c.now();
    c.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a =
                vb.pop() || c.expando + "_" + Cc++;
            return this[a] = !0, a
        }
    });
    c.ajaxPrefilter("json jsonp", function(a, b, d) {
        var e, f, g, h = a.data,
            k = a.url,
            l = !1 !== a.jsonp,
            m = l && oa.test(k),
            p = l && !m && "string" == typeof h && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && oa.test(h);
        if ("jsonp" === a.dataTypes[0] || m || p) return e = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, f = r[e], m ? a.url = k.replace(oa, "$1" + e) : p ? a.data = h.replace(oa, "$1" + e) : l && (a.url += (Bc.test(k) ? "&" : "?") + a.jsonp + "=" + e), a.converters["script json"] =
            function() {
                return g || c.error(e + " was not called"), g[0]
            }, a.dataTypes[0] = "json", r[e] = function() {
                g = arguments
            }, d.always(function() {
                r[e] = f;
                a[e] && (a.jsonpCallback = b.jsonpCallback, vb.push(e));
                g && c.isFunction(f) && f(g[0]);
                g = f = q
            }), "script"
    });
    c.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return c.globalEval(a), a
            }
        }
    });
    c.ajaxPrefilter("script", function(a) {
        a.cache ===
            q && (a.cache = !1);
        a.crossDomain && (a.type = "GET", a.global = !1)
    });
    c.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = p.head || p.getElementsByTagName("head")[0] || p.documentElement;
            return {
                send: function(e, f) {
                    b = p.createElement("script");
                    b.async = "async";
                    a.scriptCharset && (b.charset = a.scriptCharset);
                    b.src = a.url;
                    b.onload = b.onreadystatechange = function(a, e) {
                        if (e || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, c && b.parentNode && c.removeChild(b), b = q, e || f(200, "success")
                    };
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(0, 1)
                }
            }
        }
    });
    var ca, Aa = r.ActiveXObject ? function() {
            for (var a in ca) ca[a](0, 1)
        } : !1,
        Dc = 0;
    c.ajaxSettings.xhr = r.ActiveXObject ? function() {
        var a;
        if (!(a = !this.isLocal && Oa())) a: {
            try {
                a = new r.ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (b) {}
            a = void 0
        }
        return a
    } : Oa;
    (function(a) {
        c.extend(c.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        })
    })(c.ajaxSettings.xhr());
    c.support.ajax && c.ajaxTransport(function(a) {
        if (!a.crossDomain || c.support.cors) {
            var b;
            return {
                send: function(d,
                    e) {
                    var f, g, h = a.xhr();
                    a.username ? h.open(a.type, a.url, a.async, a.username, a.password) : h.open(a.type, a.url, a.async);
                    if (a.xhrFields)
                        for (g in a.xhrFields) h[g] = a.xhrFields[g];
                    a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType);
                    a.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (g in d) h.setRequestHeader(g, d[g])
                    } catch (k) {}
                    h.send(a.hasContent && a.data || null);
                    b = function(d, g) {
                        var k, n, p, r, s;
                        try {
                            if (b && (g || 4 === h.readyState))
                                if (b = q, f && (h.onreadystatechange = c.noop, Aa &&
                                        delete ca[f]), g) 4 !== h.readyState && h.abort();
                                else {
                                    k = h.status;
                                    p = h.getAllResponseHeaders();
                                    r = {};
                                    (s = h.responseXML) && s.documentElement && (r.xml = s);
                                    try {
                                        r.text = h.responseText
                                    } catch (v) {}
                                    try {
                                        n = h.statusText
                                    } catch (w) {
                                        n = ""
                                    }
                                    k || !a.isLocal || a.crossDomain ? 1223 === k && (k = 204) : k = r.text ? 200 : 404
                                }
                        } catch (y) {
                            g || e(-1, y)
                        }
                        r && e(k, n, r, p)
                    };
                    a.async ? 4 === h.readyState ? setTimeout(b, 0) : (f = ++Dc, Aa && (ca || (ca = {}, c(r).unload(Aa)), ca[f] = b), h.onreadystatechange = b) : b()
                },
                abort: function() {
                    b && b(0, 1)
                }
            }
        }
    });
    var ia, pa, Ec = /^(?:toggle|show|hide)$/,
        Fc =
        RegExp("^(?:([-+])=|)(" + ma + ")([a-z%]*)$", "i"),
        Gc = /queueHooks$/,
        ja = [function(a, b, d) {
            var e, f, g, h, k, l, m = this,
                p = a.style,
                n = {},
                q = [],
                r = a.nodeType && fa(a);
            d.queue || (k = c._queueHooks(a, "fx"), null == k.unqueued && (k.unqueued = 0, l = k.empty.fire, k.empty.fire = function() {
                k.unqueued || l()
            }), k.unqueued++, m.always(function() {
                m.always(function() {
                    k.unqueued--;
                    c.queue(a, "fx").length || k.empty.fire()
                })
            }));
            1 === a.nodeType && ("height" in b || "width" in b) && (d.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === c.css(a, "display") &&
                "none" === c.css(a, "float") && (c.support.inlineBlockNeedsLayout && "inline" !== Ia(a.nodeName) ? p.zoom = 1 : p.display = "inline-block"));
            d.overflow && (p.overflow = "hidden", c.support.shrinkWrapBlocks || m.done(function() {
                p.overflow = d.overflow[0];
                p.overflowX = d.overflow[1];
                p.overflowY = d.overflow[2]
            }));
            for (e in b) f = b[e], Ec.exec(f) && (delete b[e], f !== (r ? "hide" : "show") && q.push(e));
            if (f = q.length)
                for (g = c._data(a, "fxshow") || c._data(a, "fxshow", {}), r ? c(a).show() : m.done(function() {
                        c(a).hide()
                    }), m.done(function() {
                        var b;
                        c.removeData(a,
                            "fxshow", !0);
                        for (b in n) c.style(a, b, n[b])
                    }), e = 0; e < f; e++) b = q[e], h = m.createTween(b, r ? g[b] : 0), n[b] = g[b] || c.style(a, b), b in g || (g[b] = h.start, r && (h.end = h.start, h.start = "width" === b || "height" === b ? 1 : 0))
        }],
        da = {
            "*": [function(a, b) {
                var d, e, f, g = this.createTween(a, b),
                    h = Fc.exec(b),
                    k = g.cur(),
                    l = +k || 0,
                    m = 1;
                if (h) {
                    d = +h[2];
                    e = h[3] || (c.cssNumber[a] ? "" : "px");
                    if ("px" !== e && l) {
                        l = c.css(g.elem, a, !0) || d || 1;
                        do f = m = m || ".5", l /= m, c.style(g.elem, a, l + e), m = g.cur() / k; while (1 !== m && m !== f)
                    }
                    g.unit = e;
                    g.start = l;
                    g.end = h[1] ? l + (h[1] + 1) * d : d
                }
                return g
            }]
        };
    c.Animation = c.extend(Qa, {
        tweener: function(a, b) {
            c.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var d, e = 0, f = a.length; e < f; e++) d = a[e], da[d] = da[d] || [], da[d].unshift(b)
        },
        prefilter: function(a, b) {
            b ? ja.unshift(a) : ja.push(a)
        }
    });
    c.Tween = A;
    A.prototype = {
        constructor: A,
        init: function(a, b, d, e, f, g) {
            this.elem = a;
            this.prop = d;
            this.easing = f || "swing";
            this.options = b;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = g || (c.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var a = A.propHooks[this.prop];
            return a && a.get ? a.get(this) : A.propHooks._default.get(this)
        },
        run: function(a) {
            var b, d = A.propHooks[this.prop];
            return this.options.duration ? this.pos = b = c.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : A.propHooks._default.set(this), this
        }
    };
    A.prototype.init.prototype = A.prototype;
    A.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b =
                    c.css(a.elem, a.prop, !1, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                c.fx.step[a.prop] ? c.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[c.cssProps[a.prop]] || c.cssHooks[a.prop]) ? c.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    };
    A.propHooks.scrollTop = A.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    };
    c.each(["toggle", "show", "hide"], function(a, b) {
        var d = c.fn[b];
        c.fn[b] = function(e, f, g) {
            return null == e || "boolean" == typeof e || !a && c.isFunction(e) &&
                c.isFunction(f) ? d.apply(this, arguments) : this.animate(ka(b, !0), e, f, g)
        }
    });
    c.fn.extend({
        fadeTo: function(a, b, c, e) {
            return this.filter(fa).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, e)
        },
        animate: function(a, b, d, e) {
            var f = c.isEmptyObject(a),
                g = c.speed(b, d, e);
            b = function() {
                var b = Qa(this, c.extend({}, a), g);
                f && b.stop(!0)
            };
            return f || !1 === g.queue ? this.each(b) : this.queue(g.queue, b)
        },
        stop: function(a, b, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop;
                b(d)
            };
            return "string" != typeof a && (d = b, b = a, a = q), b && !1 !== a &&
                this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        g = null != a && a + "queueHooks",
                        h = c.timers,
                        k = c._data(this);
                    if (g) k[g] && k[g].stop && e(k[g]);
                    else
                        for (g in k) k[g] && k[g].stop && Gc.test(g) && e(k[g]);
                    for (g = h.length; g--;) h[g].elem !== this || null != a && h[g].queue !== a || (h[g].anim.stop(d), b = !1, h.splice(g, 1));
                    !b && d || c.dequeue(this, a)
                })
        }
    });
    c.each({
        slideDown: ka("show"),
        slideUp: ka("hide"),
        slideToggle: ka("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        c.fn[a] = function(a,
            c, f) {
            return this.animate(b, a, c, f)
        }
    });
    c.speed = function(a, b, d) {
        var e = a && "object" == typeof a ? c.extend({}, a) : {
            complete: d || !d && b || c.isFunction(a) && a,
            duration: a,
            easing: d && b || b && !c.isFunction(b) && b
        };
        e.duration = c.fx.off ? 0 : "number" == typeof e.duration ? e.duration : e.duration in c.fx.speeds ? c.fx.speeds[e.duration] : c.fx.speeds._default;
        if (null == e.queue || !0 === e.queue) e.queue = "fx";
        return e.old = e.complete, e.complete = function() {
            c.isFunction(e.old) && e.old.call(this);
            e.queue && c.dequeue(this, e.queue)
        }, e
    };
    c.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    };
    c.timers = [];
    c.fx = A.prototype.init;
    c.fx.tick = function() {
        for (var a, b = c.timers, d = 0; d < b.length; d++) a = b[d], !a() && b[d] === a && b.splice(d--, 1);
        b.length || c.fx.stop()
    };
    c.fx.timer = function(a) {
        a() && c.timers.push(a) && !pa && (pa = setInterval(c.fx.tick, c.fx.interval))
    };
    c.fx.interval = 13;
    c.fx.stop = function() {
        clearInterval(pa);
        pa = null
    };
    c.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    c.fx.step = {};
    c.expr && c.expr.filters && (c.expr.filters.animated = function(a) {
        return c.grep(c.timers,
            function(b) {
                return a === b.elem
            }).length
    });
    var wb = /^(?:body|html)$/i;
    c.fn.offset = function(a) {
        if (arguments.length) return a === q ? this : this.each(function(b) {
            c.offset.setOffset(this, a, b)
        });
        var b, d, e, f, g, h, k, l, m, p, n = this[0],
            r = n && n.ownerDocument;
        if (r) return (e = r.body) === n ? c.offset.bodyOffset(n) : (d = r.documentElement, c.contains(d, n) ? (b = n.getBoundingClientRect(), f = Ra(r), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, k = f.pageYOffset || d.scrollTop, l = f.pageXOffset || d.scrollLeft, m = b.top + k - g, p = b.left +
            l - h, {
                top: m,
                left: p
            }) : {
            top: 0,
            left: 0
        })
    };
    c.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                d = a.offsetLeft;
            return c.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(c.css(a, "marginTop")) || 0, d += parseFloat(c.css(a, "marginLeft")) || 0), {
                top: b,
                left: d
            }
        },
        setOffset: function(a, b, d) {
            var e = c.css(a, "position");
            "static" === e && (a.style.position = "relative");
            var f = c(a),
                g = f.offset(),
                h = c.css(a, "top"),
                k = c.css(a, "left"),
                l = {},
                m = {},
                p, n;
            ("absolute" === e || "fixed" === e) && -1 < c.inArray("auto", [h, k]) ? (m = f.position(), p = m.top,
                n = m.left) : (p = parseFloat(h) || 0, n = parseFloat(k) || 0);
            c.isFunction(b) && (b = b.call(a, d, g));
            null != b.top && (l.top = b.top - g.top + p);
            null != b.left && (l.left = b.left - g.left + n);
            "using" in b ? b.using.call(a, l) : f.css(l)
        }
    };
    c.fn.extend({
        position: function() {
            if (this[0]) {
                var a = this[0],
                    b = this.offsetParent(),
                    d = this.offset(),
                    e = wb.test(b[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : b.offset();
                return d.top -= parseFloat(c.css(a, "marginTop")) || 0, d.left -= parseFloat(c.css(a, "marginLeft")) || 0, e.top += parseFloat(c.css(b[0], "borderTopWidth")) || 0, e.left +=
                    parseFloat(c.css(b[0], "borderLeftWidth")) || 0, {
                        top: d.top - e.top,
                        left: d.left - e.left
                    }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || p.body; a && !wb.test(a.nodeName) && "static" === c.css(a, "position");) a = a.offsetParent;
                return a || p.body
            })
        }
    });
    c.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var d = /Y/.test(b);
        c.fn[a] = function(e) {
            return c.access(this, function(a, e, h) {
                var k = Ra(a);
                if (h === q) return k ? b in k ? k[b] : k.document.documentElement[e] : a[e];
                k ? k.scrollTo(d ?
                    c(k).scrollLeft() : h, d ? h : c(k).scrollTop()) : a[e] = h
            }, a, e, arguments.length, null)
        }
    });
    c.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        c.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(d, e) {
            c.fn[e] = function(e, g) {
                var h = arguments.length && (d || "boolean" != typeof e),
                    k = d || (!0 === e || !0 === g ? "margin" : "border");
                return c.access(this, function(b, d, e) {
                    var f;
                    return c.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" +
                        a], f["offset" + a], f["client" + a])) : e === q ? c.css(b, d, e, k) : c.style(b, d, e, k)
                }, b, h ? e : q, h, null)
            }
        })
    });
    r.jQuery = r.$ = c;
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return c
    })
})(window);
var isIE6 = -1 != navigator.userAgent.toLowerCase().indexOf("msie 6"),
    isIE7 = -1 != navigator.userAgent.toLowerCase().indexOf("msie 7"),
    isSafari = -1 != navigator.userAgent.toLowerCase().indexOf("safari"),
    isAndroid = -1 != navigator.userAgent.toLowerCase().indexOf("android"),
    isiPad = -1 != navigator.userAgent.toLowerCase().indexOf("ipad");
jQuery.fn.megamenu = function(r) {
    r = jQuery.extend({
        activate_action: "mouseover",
        deactivate_action: "mouseleave",
        show_method: "simple",
        hide_method: "simple",
        justify: "left",
        enable_js_shadow: !0,
        shadow_size: 0,
        mm_timeout: 300
    }, r);
    var q = this;
    "click" == r.activate_action && (r.mm_timeout = 0);
    q.children("li").each(function() {
        jQuery(this).addClass("mm-item");
        jQuery(".mm-item").css({
            "float": r.justify
        });
        jQuery(this).find("div:first").addClass("mm-item-content");
        jQuery(this).find("a:first").addClass("mm-item-link");
        var w =
            jQuery(this).find(".mm-item-content"),
            B = jQuery(this).find(".mm-item-link");
        w.hide();
        jQuery(document).bind("click", function() {
            jQuery(".mm-item-content").hide();
            jQuery(".mm-item-link").removeClass("mm-item-link-hover")
        });
        jQuery(this).bind("click", function(r) {
            r.stopPropagation()
        });
        w.wrapInner('<div class="mm-content-base"></div>');
        !0 == r.enable_js_shadow && w.append('<div class="mm-js-shadow"></div>');
        var x = 0,
            v = 0;
        jQuery(this).bind(r.activate_action, function(E) {
            clearTimeout(v);
            E.stopPropagation();
            var s =
                jQuery(this).find("a.mm-item-link"),
                C = jQuery(this).find("div.mm-item-content");
            clearTimeout(x);
            s.addClass("mm-item-link-hover");
            $("img", s).attr("src", $("img", s).attr("src").replace(/([\d]+)\.gif$/, "$1_o.gif"));
            isIE6 ? (C.parents().parents().css({
                position: "relative",
                "z-index": 1
            }), C.css({
                top: "39px",
                right: "0px"
            })) : isIE7 ? C.css({
                top: B.offset().top + B.outerHeight() - 1 + "px",
                left: "0px"
            }) : C.css({
                top: B.offset().top + B.outerHeight() - 1 + "px"
            });
            x = setTimeout(function() {
                if ("left" == r.justify) {
                    var v = q.offset().left + q.outerWidth(),
                        x = B.offset().left + w.outerWidth() - 5;
                    x >= v && C.css({
                        left: B.offset().left - (x - v) - 2 + "px"
                    })
                } else "right" == r.justify && (v = q.offset().left, x = B.offset().left - C.outerWidth() + B.outerWidth() + 5, x <= v ? C.css({
                    left: v + 2 + "px"
                }) : C.css({
                    left: x + "px"
                }));
                !0 == r.enable_js_shadow && (C.find(".mm-js-shadow").height(C.height()), C.find(".mm-js-shadow").width(C.width()), C.find(".mm-js-shadow").css({
                    top: r.shadow_size + (isIE6 ? 2 : 0) + "px",
                    left: r.shadow_size + (isIE6 ? 2 : 0) + "px",
                    opacity: 0.5
                }));
                switch (r.show_method) {
                    case "simple":
                        C.show();
                        break;
                    case "slideDown":
                        C.height("auto");
                        C.slideDown("fast");
                        break;
                    case "fadeIn":
                        C.fadeTo("fast", 1);
                        break;
                    default:
                        C.each(r.show_method)
                }
                if (isAndroid || isiPad) "About Us" == $("img", s).attr("alt") ? $(s).attr("href", "/about_us/index.html") : "Research & Development" == $("img", s).attr("alt") ? $(s).attr("href", "/research_and_development/index.html") : "Responsibility" == $("img", s).attr("alt") && $(s).attr("href", "/responsibility/index.html")
            }, r.mm_timeout)
        });
        jQuery(this).bind(r.deactivate_action, function(q) {
            q.stopPropagation();
            clearTimeout(x);
            var s = jQuery(this).find("a.mm-item-link"),
                w = jQuery(this).find("div.mm-item-content");
            v = setTimeout(function() {
                $("img", s).attr("src", $("img", s).attr("src").replace(/\_o\.gif$/, ".gif"));
                switch (r.hide_method) {
                    case "simple":
                        w.hide();
                        s.removeClass("mm-item-link-hover");
                        break;
                    case "slideUp":
                        w.slideUp("fast", function() {
                            s.removeClass("mm-item-link-hover")
                        });
                        break;
                    case "fadeOut":
                        w.fadeOut("fast", function() {
                            s.removeClass("mm-item-link-hover")
                        });
                        break;
                    default:
                        w.each(r.hide_method), s.removeClass("mm-item-link-hover")
                }
                1 >
                    w.length && s.removeClass("mm-item-link-hover");
                if (isAndroid || isiPad) "About Us" != $("img", s).attr("alt") && "Research & Development" != $("img", s).attr("alt") && "Responsibility" != $("img", s).attr("alt") || $(s).attr("href", "javascript:void(0);")
            }, 250)
        });
        if (isAndroid || isiPad) {
            var T = jQuery("#globalNavi div.megamenu p.closeBtn"),
                F = this;
            T.show();
            T.bind("click", function(q) {
                q.stopPropagation();
                clearTimeout(x);
                var s = jQuery(F).find("a.mm-item-link");
                q = jQuery(F).find("div.mm-item-content");
                $("img", s).attr("src", $("img",
                    s).attr("src").replace(/\_o\.gif$/, ".gif"));
                switch (r.hide_method) {
                    case "simple":
                        q.hide();
                        s.removeClass("mm-item-link-hover");
                        break;
                    case "slideUp":
                        q.slideUp("fast", function() {
                            s.removeClass("mm-item-link-hover")
                        });
                        break;
                    case "fadeOut":
                        q.fadeOut("fast", function() {
                            s.removeClass("mm-item-link-hover")
                        });
                        break;
                    default:
                        q.each(r.hide_method), s.removeClass("mm-item-link-hover")
                }
                1 > q.length && s.removeClass("mm-item-link-hover");
                if (isAndroid || isiPad) "About Us" != $("img", s).attr("alt") && "Research & Development" !=
                    $("img", s).attr("alt") && "Responsibility" != $("img", s).attr("alt") || $(s).attr("href", "javascript:void(0);")
            })
        }
    });
    this.find(">li:last").after('<li class="clear-fix"></li>');
    this.show()
};
$(function() {
    $("#globalNavi .megamenu").show();
    isSafari || isAndroid || isiPad || $("ul.mega > li > div").css("display", "block");
	
	var ua = navigator.userAgent;
	var isAndroidTab = ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1; // android tablet
	(isAndroidTab || isiPad) && $("#globalNavi .megamenu").parents().siblings("a").attr("href", "javascript:void(0)");
	
    //(isAndroid || isiPad) && $("#globalNavi .megamenu").parents().siblings("a").attr("href", "javascript:void(0)");
	
    for (var r = ["aboutus", "research", "responsibility"], q = 0; q < $config.menu.length; q++) {
        for (var w = $config.menu[q], B = $("#globalNavi div.megamenu div." + r[q]), x = [], v = 1; 7 >= v; v++) w["title" + v] && w["link" + v] ? x.push('<a href="' + w["link" + v] + '">' + w["title" + v] + "</a>") : w["title" + v] && x.push(w["title" +
            v]);
        $("ul", B).html("<li>" + x.join("</li><li>") + "</li>");
        var v = 1, y = 4, x = 0, F = "p:last-child";
		if("4" === w.img_pattern) {
			for (;v <= y; v++) w["img" + v] && x++;
				if (2 >= x)
					for (x = "", v = 1, y = 2; v <= y; v++) w["img" + v] && w["img" + v + "_link"] ? x += '<p><a href="' + w["img" + v + "_link"] + '"' + ("1" === w["img" + v + "_blank"] ? ' target="_blank"' : "") + '><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + ("1" === w["img" + v + "_blank"] ? '<img src="share/images/icon_win_lnavi.png" width="14" height="12" alt="New Window" class="newWin" />' : "") + w["img" + v + "_title"] + "</a></p>" : w["img" + v] && (x += '<p><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + w["img" + v + "_title"] + "</p>");
				else {
					B.parent("div.megamenu").addClass("image2");
					x = '<div class="line clearfix">';
					v = 1;
					for (y = 2; v <= y; v++) w["img" + v] && w["img" + v + "_link"] ? x += '<p><a href="' + w["img" + v + "_link"] + '"' + ("1" === w["img" + v + "_blank"] ? ' target="_blank"' : "") + '><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + ("1" === w["img" + v + "_blank"] ? '<img src="share/images/icon_win_lnavi.png" width="14" height="12" alt="New Window" class="newWin" />' : "") + w["img" + v + "_title"] + "</a></p>" : w["img" + v] && (x += '<p><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + w["img" + v + "_title"] + "</p>");
					x += '</div><div class="line clearfix">';
					v = 3;
					for (y = 4; v <= y; v++) w["img" + v] && w["img" + v + "_link"] ? x += '<p><a href="' + w["img" + v + "_link"] + '"' + ("3" === w["img" + v + "_blank"] ?' target="_blank"' : "") + '><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + ("1" === w["img" + v + "_blank"] ? '<img src="share/images/icon_win_lnavi.png" width="14" height="12" alt="New Window" class="newWin" />' : "") + w["img" + v + "_title"] + "</a></p>" : w["img" + v] && (x += '<p><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + w["img" + v + "_title"] + "</p>");
					x += "</div>";
					F = "div.line > " + F
				}
		} else for (x = "", v = 1, y = 2; v <= y; v++) w["img" + v] && w["img" + v + "_link"] ? x += '<p><a href="' + w["img" + v + "_link"] + '"' + ("1" === w["img" + v + "_blank"] ? ' target="_blank"' : "") + '><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + ("1" === w["img" + v + "_blank"] ? '<img src="share/images/icon_win_lnavi.png" width="14" height="12" alt="New Window" class="newWin" />' : "") + w["img" + v + "_title"] + "</a></p>" : w["img" + v] && (x += '<p><img src="' + w["img" + v] + '" width="216" height="145" alt="" /><br />' + w["img" + v + "_title"] + "</p>");
		$("div.entryMenu", B).html(x);
		$("div.entryMenu > " + F,B).addClass("lastItem")
    }
    $(".mega").megamenu({
        justify: ""
    })
});