/**
 * Isotope v1.5.19
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
(function(a, b, c) { "use strict"; var d = a.document,
        e = a.Modernizr,
        f = function(a) { return a.charAt(0).toUpperCase() + a.slice(1) },
        g = "Moz Webkit O Ms".split(" "),
        h = function(a) { var b = d.documentElement.style,
                c; if (typeof b[a] == "string") return a;
            a = f(a); for (var e = 0, h = g.length; e < h; e++) { c = g[e] + a; if (typeof b[c] == "string") return c } },
        i = h("transform"),
        j = h("transitionProperty"),
        k = { csstransforms: function() { return !!i }, csstransforms3d: function() { var a = !!h("perspective"); if (a) { var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        d = "@media (" + c.join("transform-3d),(") + "modernizr)",
                        e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head"),
                        f = b('<div id="modernizr" />').appendTo("html");
                    a = f.height() === 3, f.remove(), e.remove() } return a }, csstransitions: function() { return !!j } },
        l; if (e)
        for (l in k) e.hasOwnProperty(l) || e.addTest(l, k[l]);
    else { e = a.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" }; var m = " ",
            n; for (l in k) n = k[l](), e[l] = n, m += " " + (n ? "" : "no-") + l;
        b("html").addClass(m) } if (e.csstransforms) { var o = e.csstransforms3d ? { translate: function(a) { return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) " }, scale: function(a) { return "scale3d(" + a + ", " + a + ", 1) " } } : { translate: function(a) { return "translate(" + a[0] + "px, " + a[1] + "px) " }, scale: function(a) { return "scale(" + a + ") " } },
            p = function(a, c, d) { var e = b.data(a, "isoTransform") || {},
                    f = {},
                    g, h = {},
                    j;
                f[c] = d, b.extend(e, f); for (g in e) j = e[g], h[g] = o[g](j); var k = h.translate || "",
                    l = h.scale || "",
                    m = k + l;
                b.data(a, "isoTransform", e), a.style[i] = m };
        b.cssNumber.scale = !0, b.cssHooks.scale = { set: function(a, b) { p(a, "scale", b) }, get: function(a, c) { var d = b.data(a, "isoTransform"); return d && d.scale ? d.scale : 1 } }, b.fx.step.scale = function(a) { b.cssHooks.scale.set(a.elem, a.now + a.unit) }, b.cssNumber.translate = !0, b.cssHooks.translate = { set: function(a, b) { p(a, "translate", b) }, get: function(a, c) { var d = b.data(a, "isoTransform"); return d && d.translate ? d.translate : [0, 0] } } } var q, r;
    e.csstransitions && (q = { WebkitTransitionProperty: "webkitTransitionEnd", MozTransitionProperty: "transitionend", OTransitionProperty: "oTransitionEnd", transitionProperty: "transitionEnd" }[j], r = h("transitionDuration")); var s = b.event,
        t;
    s.special.smartresize = { setup: function() { b(this).bind("resize", s.special.smartresize.handler) }, teardown: function() { b(this).unbind("resize", s.special.smartresize.handler) }, handler: function(a, b) { var c = this,
                d = arguments;
            a.type = "smartresize", t && clearTimeout(t), t = setTimeout(function() { jQuery.event.handle.apply(c, d) }, b === "execAsap" ? 0 : 100) } }, b.fn.smartresize = function(a) { return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"]) }, b.Isotope = function(a, c, d) { this.element = b(c), this._create(a), this._init(d) }; var u = ["width", "height"],
        v = b(a);
    b.Isotope.settings = { resizable: !0, layoutMode: "masonry", containerClass: "isotope", itemClass: "isotope-item", hiddenClass: "isotope-hidden", hiddenStyle: { opacity: 0, scale: .001 }, visibleStyle: { opacity: 1, scale: 1 }, containerStyle: { position: "relative", overflow: "hidden" }, animationEngine: "best-available", animationOptions: { queue: !1, duration: 800 }, sortBy: "original-order", sortAscending: !0, resizesContainer: !0, transformsEnabled: !b.browser.opera, itemPositionDataEnabled: !1 }, b.Isotope.prototype = { _create: function(a) { this.options = b.extend({}, b.Isotope.settings, a), this.styleQueue = [], this.elemCount = 0; var c = this.element[0].style;
            this.originalStyle = {}; var d = u.slice(0); for (var e in this.options.containerStyle) d.push(e); for (var f = 0, g = d.length; f < g; f++) e = d[f], this.originalStyle[e] = c[e] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms(); var h = { "original-order": function(a, b) { return b.elemCount++, b.elemCount }, random: function() { return Math.random() } };
            this.options.getSortData = b.extend(this.options.getSortData, h), this.reloadItems(), this.offset = { left: parseInt(this.element.css("padding-left") || 0, 10), top: parseInt(this.element.css("padding-top") || 0, 10) }; var i = this;
            setTimeout(function() { i.element.addClass(i.options.containerClass) }, 0), this.options.resizable && v.bind("smartresize.isotope", function() { i.resize() }), this.element.delegate("." + this.options.hiddenClass, "click", function() { return !1 }) }, _getAtoms: function(a) { var b = this.options.itemSelector,
                c = b ? a.filter(b).add(a.find(b)) : a,
                d = { position: "absolute" }; return this.usingTransforms && (d.left = 0, d.top = 0), c.css(d).addClass(this.options.itemClass), this.updateSortData(c, !0), c }, _init: function(a) { this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(a) }, option: function(a) { if (b.isPlainObject(a)) { this.options = b.extend(!0, this.options, a); var c; for (var d in a) c = "_update" + f(d), this[c] && this[c]() } }, _updateAnimationEngine: function() { var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""),
                b; switch (a) {
                case "css":
                case "none":
                    b = !1; break;
                case "jquery":
                    b = !0; break;
                default:
                    b = !e.csstransitions }
            this.isUsingJQueryAnimation = b, this._updateUsingTransforms() }, _updateTransformsEnabled: function() { this._updateUsingTransforms() }, _updateUsingTransforms: function() { var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
            a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = a ? this._translate : this._positionAbs }, _filter: function(a) { var b = this.options.filter === "" ? "*" : this.options.filter; if (!b) return a; var c = this.options.hiddenClass,
                d = "." + c,
                e = a.filter(d),
                f = e; if (b !== "*") { f = e.filter(b); var g = a.not(d).not(b).addClass(c);
                this.styleQueue.push({ $el: g, style: this.options.hiddenStyle }) } return this.styleQueue.push({ $el: f, style: this.options.visibleStyle }), f.removeClass(c), a.filter(b) }, updateSortData: function(a, c) { var d = this,
                e = this.options.getSortData,
                f, g;
            a.each(function() { f = b(this), g = {}; for (var a in e) !c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
                b.data(this, "isotope-sort-data", g) }) }, _sort: function() { var a = this.options.sortBy,
                b = this._getSorter,
                c = this.options.sortAscending ? 1 : -1,
                d = function(d, e) { var f = b(d, a),
                        g = b(e, a); return f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order")), (f > g ? 1 : f < g ? -1 : 0) * c };
            this.$filteredAtoms.sort(d) }, _getSorter: function(a, c) { return b.data(a, "isotope-sort-data")[c] }, _translate: function(a, b) { return { translate: [a, b] } }, _positionAbs: function(a, b) { return { left: a, top: b } }, _pushPosition: function(a, b, c) { b = Math.round(b + this.offset.left), c = Math.round(c + this.offset.top); var d = this.getPositionStyles(b, c);
            this.styleQueue.push({ $el: a, style: d }), this.options.itemPositionDataEnabled && a.data("isotope-item-position", { x: b, y: c }) }, layout: function(a, b) { var c = this.options.layoutMode;
            this["_" + c + "Layout"](a); if (this.options.resizesContainer) { var d = this["_" + c + "GetContainerSize"]();
                this.styleQueue.push({ $el: this.element, style: d }) }
            this._processStyleQueue(a, b), this.isLaidOut = !0 }, _processStyleQueue: function(a, c) { var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css",
                f = this.options.animationOptions,
                g = this.options.onLayout,
                h, i, j, k;
            i = function(a, b) { b.$el[d](b.style, f) }; if (this._isInserting && this.isUsingJQueryAnimation) i = function(a, b) { h = b.$el.hasClass("no-transition") ? "css" : d, b.$el[h](b.style, f) };
            else if (c || g || f.complete) { var l = !1,
                    m = [c, g, f.complete],
                    n = this;
                j = !0, k = function() { if (l) return; var b; for (var c = 0, d = m.length; c < d; c++) b = m[c], typeof b == "function" && b.call(n.element, a, n);
                    l = !0 }; if (this.isUsingJQueryAnimation && d === "animate") f.complete = k, j = !1;
                else if (e.csstransitions) { var o = 0,
                        p = this.styleQueue[0],
                        s = p && p.$el,
                        t; while (!s || !s.length) { t = this.styleQueue[o++]; if (!t) return;
                        s = t.$el } var u = parseFloat(getComputedStyle(s[0])[r]);
                    u > 0 && (i = function(a, b) { b.$el[d](b.style, f).one(q, k) }, j = !1) } }
            b.each(this.styleQueue, i), j && k(), this.styleQueue = [] }, resize: function() { this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout() }, reLayout: function(a) { this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, a) }, addItems: function(a, b) { var c = this._getAtoms(a);
            this.$allAtoms = this.$allAtoms.add(c), b && b(c) }, insert: function(a, b) { this.element.append(a); var c = this;
            this.addItems(a, function(a) { var d = c._filter(a);
                c._addHideAppended(d), c._sort(), c.reLayout(), c._revealAppended(d, b) }) }, appended: function(a, b) { var c = this;
            this.addItems(a, function(a) { c._addHideAppended(a), c.layout(a), c._revealAppended(a, b) }) }, _addHideAppended: function(a) { this.$filteredAtoms = this.$filteredAtoms.add(a), a.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }) }, _revealAppended: function(a, b) { var c = this;
            setTimeout(function() { a.removeClass("no-transition"), c.styleQueue.push({ $el: a, style: c.options.visibleStyle }), c._isInserting = !1, c._processStyleQueue(a, b) }, 10) }, reloadItems: function() { this.$allAtoms = this._getAtoms(this.element.children()) }, remove: function(a, b) { var c = this,
                d = function() { c.$allAtoms = c.$allAtoms.not(a), a.remove(), b && b.call(c.element) };
            a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }), this.$filteredAtoms = this.$filteredAtoms.not(a), this._sort(), this.reLayout(d)) : d() }, shuffle: function(a) { this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(a) }, destroy: function() { var a = this.usingTransforms,
                b = this.options;
            this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function() { var b = this.style;
                b.position = "", b.top = "", b.left = "", b.opacity = "", a && (b[i] = "") }); var c = this.element[0].style; for (var d in this.originalStyle) c[d] = this.originalStyle[d];
            this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"), v.unbind(".isotope") }, _getSegments: function(a) { var b = this.options.layoutMode,
                c = a ? "rowHeight" : "columnWidth",
                d = a ? "height" : "width",
                e = a ? "rows" : "cols",
                g = this.element[d](),
                h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
            h = Math.floor(g / i), h = Math.max(h, 1), this[b][e] = h, this[b][c] = i }, _checkIfSegmentsChanged: function(a) { var b = this.options.layoutMode,
                c = a ? "rows" : "cols",
                d = this[b][c]; return this._getSegments(a), this[b][c] !== d }, _masonryReset: function() { this.masonry = {}, this._getSegments(); var a = this.masonry.cols;
            this.masonry.colYs = []; while (a--) this.masonry.colYs.push(0) }, _masonryLayout: function(a) { var c = this,
                d = c.masonry;
            a.each(function() { var a = b(this),
                    e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
                e = Math.min(e, d.cols); if (e === 1) c._masonryPlaceBrick(a, d.colYs);
                else { var f = d.cols + 1 - e,
                        g = [],
                        h, i; for (i = 0; i < f; i++) h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryPlaceBrick(a, g) } }) }, _masonryPlaceBrick: function(a, b) { var c = Math.min.apply(Math, b),
                d = 0; for (var e = 0, f = b.length; e < f; e++)
                if (b[e] === c) { d = e; break }
            var g = this.masonry.columnWidth * d,
                h = c;
            this._pushPosition(a, g, h); var i = c + a.outerHeight(!0),
                j = this.masonry.cols + 1 - f; for (e = 0; e < j; e++) this.masonry.colYs[d + e] = i }, _masonryGetContainerSize: function() { var a = Math.max.apply(Math, this.masonry.colYs); return { height: a } }, _masonryResizeChanged: function() { return this._checkIfSegmentsChanged() }, _fitRowsReset: function() { this.fitRows = { x: 0, y: 0, height: 0 } }, _fitRowsLayout: function(a) { var c = this,
                d = this.element.width(),
                e = this.fitRows;
            a.each(function() { var a = b(this),
                    f = a.outerWidth(!0),
                    g = a.outerHeight(!0);
                e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height), c._pushPosition(a, e.x, e.y), e.height = Math.max(e.y + g, e.height), e.x += f }) }, _fitRowsGetContainerSize: function() { return { height: this.fitRows.height } }, _fitRowsResizeChanged: function() { return !0 }, _cellsByRowReset: function() { this.cellsByRow = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByRowLayout: function(a) { var c = this,
                d = this.cellsByRow;
            a.each(function() { var a = b(this),
                    e = d.index % d.cols,
                    f = Math.floor(d.index / d.cols),
                    g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2,
                    h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++ }) }, _cellsByRowGetContainerSize: function() { return { height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top } }, _cellsByRowResizeChanged: function() { return this._checkIfSegmentsChanged() }, _straightDownReset: function() { this.straightDown = { y: 0 } }, _straightDownLayout: function(a) { var c = this;
            a.each(function(a) { var d = b(this);
                c._pushPosition(d, 0, c.straightDown.y), c.straightDown.y += d.outerHeight(!0) }) }, _straightDownGetContainerSize: function() { return { height: this.straightDown.y } }, _straightDownResizeChanged: function() { return !0 }, _masonryHorizontalReset: function() { this.masonryHorizontal = {}, this._getSegments(!0); var a = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = []; while (a--) this.masonryHorizontal.rowXs.push(0) }, _masonryHorizontalLayout: function(a) { var c = this,
                d = c.masonryHorizontal;
            a.each(function() { var a = b(this),
                    e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
                e = Math.min(e, d.rows); if (e === 1) c._masonryHorizontalPlaceBrick(a, d.rowXs);
                else { var f = d.rows + 1 - e,
                        g = [],
                        h, i; for (i = 0; i < f; i++) h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    c._masonryHorizontalPlaceBrick(a, g) } }) }, _masonryHorizontalPlaceBrick: function(a, b) { var c = Math.min.apply(Math, b),
                d = 0; for (var e = 0, f = b.length; e < f; e++)
                if (b[e] === c) { d = e; break }
            var g = c,
                h = this.masonryHorizontal.rowHeight * d;
            this._pushPosition(a, g, h); var i = c + a.outerWidth(!0),
                j = this.masonryHorizontal.rows + 1 - f; for (e = 0; e < j; e++) this.masonryHorizontal.rowXs[d + e] = i }, _masonryHorizontalGetContainerSize: function() { var a = Math.max.apply(Math, this.masonryHorizontal.rowXs); return { width: a } }, _masonryHorizontalResizeChanged: function() { return this._checkIfSegmentsChanged(!0) }, _fitColumnsReset: function() { this.fitColumns = { x: 0, y: 0, width: 0 } }, _fitColumnsLayout: function(a) { var c = this,
                d = this.element.height(),
                e = this.fitColumns;
            a.each(function() { var a = b(this),
                    f = a.outerWidth(!0),
                    g = a.outerHeight(!0);
                e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0), c._pushPosition(a, e.x, e.y), e.width = Math.max(e.x + f, e.width), e.y += g }) }, _fitColumnsGetContainerSize: function() { return { width: this.fitColumns.width } }, _fitColumnsResizeChanged: function() { return !0 }, _cellsByColumnReset: function() { this.cellsByColumn = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByColumnLayout: function(a) { var c = this,
                d = this.cellsByColumn;
            a.each(function() { var a = b(this),
                    e = Math.floor(d.index / d.rows),
                    f = d.index % d.rows,
                    g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2,
                    h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h), d.index++ }) }, _cellsByColumnGetContainerSize: function() { return { width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth } }, _cellsByColumnResizeChanged: function() { return this._checkIfSegmentsChanged(!0) }, _straightAcrossReset: function() { this.straightAcross = { x: 0 } }, _straightAcrossLayout: function(a) { var c = this;
            a.each(function(a) { var d = b(this);
                c._pushPosition(d, c.straightAcross.x, 0), c.straightAcross.x += d.outerWidth(!0) }) }, _straightAcrossGetContainerSize: function() { return { width: this.straightAcross.x } }, _straightAcrossResizeChanged: function() { return !0 } }, b.fn.imagesLoaded = function(a) {
        function h() { a.call(c, d) }

        function i(a) { var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i))) } var c = this,
            d = c.find("img").add(c.filter("img")),
            e = d.length,
            f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            g = []; return e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function() { var a = this.src;
            this.src = f, this.src = a }), c }; var w = function(b) { a.console && a.console.error(b) };
    b.fn.isotope = function(a, c) { if (typeof a == "string") { var d = Array.prototype.slice.call(arguments, 1);
            this.each(function() { var c = b.data(this, "isotope"); if (!c) { w("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'"); return } if (!b.isFunction(c[a]) || a.charAt(0) === "_") { w("no such method '" + a + "' for isotope instance"); return }
                c[a].apply(c, d) }) } else this.each(function() { var d = b.data(this, "isotope");
            d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c)) }); return this } })(window, jQuery);

$(function() {
    if (0 < $("#over_view").size()) {
        $("#recent_changes,#dev_date").hide();
        $("#pipelineMenu li").click(function() { switch ($(this).attr("id")) {
                case "recent":
                    $("#over_view").hide();
                    $("#recent_changes,#dev_date").show(); break;
                default:
                    $("#recent_changes,#dev_date").hide(), $("#over_view").show() }
            $("#pipelineMenu li.current").removeClass("current");
            $(this).addClass("current") });
        $("table.filter input").attr("checked", !1);
        $("table.filter input[name*=_all]").attr("checked", !0);
        var d = $("#container"),
            f =
            "phase",
            e = { compound: !0, phase: !0 },
            b = { modalities: "", therapeuticarea: "" };
        d.isotope({ itemSelector: ".element", layoutMode: "straightDown", animationEngine: "best-available", getSortData: { compound: function(a) { return a.find(".compound").text() }, phase: function(a) { return a.find(".head04 p").attr("class").split(/p/)[1] } } });
        $("#options .option-set a").click(function() {
            var a = {},
                c = "",
                b = $(this).attr("href").split(/\=/)[1];
            f == b ? (c = "sortAscending", e[b] = e[b] ? !1 : !0, b = e[b]) : (c = "sortBy", f = b);
            a[c] = b;
            d.isotope(a);
            !0 == e[f] ?
                $(this).removeClass("desc").addClass("asc") : $(this).removeClass("asc").addClass("desc");
            return !1
        });
        $("#container .element a.compound").click(function() { var a = $(this).parents().parents().siblings(".open");
            a.is(":hidden") ? (a.fadeIn(700), d.isotope("reLayout"), a.parents(".element").addClass("current")) : (a.fadeOut("fast", function() { d.isotope("reLayout") }), a.parents(".element").removeClass("current")); return !1 });
        $("table.filter input").click(function() {
            var a = $(this).attr("name");
            switch (a) {
                case "modalities_all":
                case "therapeuticarea_all":
                    var c =
                        a.split(/\_/)[0];
                    $(this).attr("checked") ? 0 < $("input[name=" + c + "]:checked").length && $("input[name=" + c + "]").attr("checked", !1) : 0 === $("input[name=" + c + "]:checked").length && $(this).attr("checked", !0);
                    b[c] = "*";
                    break;
                default:
                    c = $("input[name=" + a + "]:checked"), b[a] = [], c.each(function() { b[a].push("." + $(this).val()) }), $("input[name=" + a + "_all]").attr("checked", 0 === c.length), b[a] = 0 === c.length ? "*" : b[a].join(",")
            }
            "**" == b.modalities + b.therapeuticarea && (b.modalities = "*", b.therapeuticarea = "");
            d.isotope({
                filter: b.modalities +
                    b.therapeuticarea
            })
        })
    }
});

/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.6 (11-SEP-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
(function(f, e) {
    function g(h) { f.fn.cycle.debug && a(h) }

    function a() { window.console && console.log && console.log("[cycle] " + Array.prototype.join.call(arguments, " ")) }

    function l(a, b, o) { var d = f(a).data("cycle.opts"),
            e = !!a.cyclePause;
        e && d.paused ? d.paused(a, d, b, o) : !e && d.resumed && d.resumed(a, d, b, o) }

    function j(h, b, d) {
        function j(b, c, h) {
            if (!b && !0 === c) {
                b = f(h).data("cycle.opts");
                if (!b) return a("options not found, can not resume"), !1;
                h.cycleTimeout && (clearTimeout(h.cycleTimeout), h.cycleTimeout = 0);
                r(b.elements, b, 1, !b.backwards)
            }
        }
        h.cycleStop === e && (h.cycleStop = 0);
        if (b === e || null === b) b = {};
        if (b.constructor == String) switch (b) {
            case "destroy":
            case "stop":
                d = f(h).data("cycle.opts");
                if (!d) return !1;
                h.cycleStop++;
                h.cycleTimeout && clearTimeout(h.cycleTimeout);
                h.cycleTimeout = 0;
                d.elements && f(d.elements).stop();
                f(h).removeData("cycle.opts");
                if ("destroy" == b) {
                    b = d;
                    b.next && f(b.next).unbind(b.prevNextEvent);
                    b.prev && f(b.prev).unbind(b.prevNextEvent);
                    if (b.pager || b.pagerAnchorBuilder) f.each(b.pagerAnchors || [], function() { this.unbind().remove() });
                    b.pagerAnchors = null;
                    f(h).unbind("mouseenter.cycle mouseleave.cycle");
                    b.destroy && b.destroy(b)
                }
                return !1;
            case "toggle":
                return h.cyclePause = 1 === h.cyclePause ? 0 : 1, j(h.cyclePause, d, h), l(h), !1;
            case "pause":
                return h.cyclePause = 1, l(h), !1;
            case "resume":
                return h.cyclePause = 0, j(!1, d, h), l(h), !1;
            case "prev":
            case "next":
                d = f(h).data("cycle.opts");
                if (!d) return a('options not found, "prev/next" ignored'), !1;
                f.fn.cycle[b](d);
                return !1;
            default:
                b = { fx: b }
        } else if (b.constructor == Number) {
            var p = b,
                b = f(h).data("cycle.opts");
            if (!b) return a("options not found, can not advance slide"), !1;
            if (0 > p || p >= b.elements.length) return a("invalid slide index: " + p), !1;
            b.nextSlide = p;
            h.cycleTimeout && (clearTimeout(h.cycleTimeout), h.cycleTimeout = 0);
            "string" == typeof d && (b.oneTimeFx = d);
            r(b.elements, b, 1, p >= b.currSlide);
            return !1
        }
        return b
    }

    function d(a, b) { if (!f.support.opacity && b.cleartype && a.style.filter) try { a.style.removeAttribute("filter") } catch (d) {} }

    function u(h, b, o, j, p) {
        var i, c = f.extend({}, f.fn.cycle.defaults, j || {}, f.metadata ? h.metadata() : f.meta ? h.data() : {}),
            k = f.isFunction(h.data) ? h.data(c.metaAttr) :
            null;
        k && (c = f.extend(c, k));
        c.autostop && (c.countdown = c.autostopCount || o.length);
        var u = h[0];
        h.data("cycle.opts", c);
        c.$cont = h;
        c.stopCount = u.cycleStop;
        c.elements = o;
        c.before = c.before ? [c.before] : [];
        c.after = c.after ? [c.after] : [];
        !f.support.opacity && c.cleartype && c.after.push(function() { d(this, c) });
        c.continuous && c.after.push(function() { r(o, c, 0, !c.backwards) });
        var s = c;
        s.original = { before: [], after: [] };
        s.original.cssBefore = f.extend({}, s.cssBefore);
        s.original.cssAfter = f.extend({}, s.cssAfter);
        s.original.animIn = f.extend({},
            s.animIn);
        s.original.animOut = f.extend({}, s.animOut);
        f.each(s.before, function() { s.original.before.push(this) });
        f.each(s.after, function() { s.original.after.push(this) });
        !f.support.opacity && (c.cleartype && !c.cleartypeNoBg) && B(b);
        "static" == h.css("position") && h.css("position", "relative");
        c.width && h.width(c.width);
        c.height && "auto" != c.height && h.height(c.height);
        c.startingSlide !== e ? (c.startingSlide = parseInt(c.startingSlide, 10), c.startingSlide >= o.length || 0 > c.startSlide ? c.startingSlide = 0 : i = !0) : c.startingSlide =
            c.backwards ? o.length - 1 : 0;
        if (c.random) { c.randomMap = []; for (k = 0; k < o.length; k++) c.randomMap.push(k);
            c.randomMap.sort(function() { return Math.random() - 0.5 }); if (i)
                for (i = 0; i < o.length; i++) c.startingSlide == c.randomMap[i] && (c.randomIndex = i);
            else c.randomIndex = 1, c.startingSlide = c.randomMap[1] } else c.startingSlide >= o.length && (c.startingSlide = 0);
        c.currSlide = c.startingSlide || 0;
        var t = c.startingSlide;
        b.css({ position: "absolute", top: 0, left: 0 }).hide().each(function(b) {
            b = c.backwards ? t ? b <= t ? o.length + (b - t) : t - b : o.length -
                b : t ? b >= t ? o.length - (b - t) : t - b : o.length - b;
            f(this).css("z-index", b)
        });
        f(o[t]).css("opacity", 1).show();
        d(o[t], c);
        c.fit && (c.aspect ? b.each(function() { var b = f(this),
                a = c.aspect === true ? b.width() / b.height() : c.aspect; if (c.width && b.width() != c.width) { b.width(c.width);
                b.height(c.width / a) } if (c.height && b.height() < c.height) { b.height(c.height);
                b.width(c.height * a) } }) : (c.width && b.width(c.width), c.height && "auto" != c.height && b.height(c.height)));
        c.center && (!c.fit || c.aspect) && b.each(function() {
            var b = f(this);
            b.css({
                "margin-left": c.width ?
                    (c.width - b.width()) / 2 + "px" : 0,
                "margin-top": c.height ? (c.height - b.height()) / 2 + "px" : 0
            })
        });
        c.center && (!c.fit && !c.slideResize) && b.each(function() { var b = f(this);
            b.css({ "margin-left": c.width ? (c.width - b.width()) / 2 + "px" : 0, "margin-top": c.height ? (c.height - b.height()) / 2 + "px" : 0 }) });
        if ((c.containerResize || c.containerResizeHeight) && !h.innerHeight()) {
            for (var n = k = i = 0; n < o.length; n++) {
                var w = f(o[n]),
                    y = w[0],
                    z = w.outerWidth(),
                    A = w.outerHeight();
                z || (z = y.offsetWidth || y.width || w.attr("width"));
                A || (A = y.offsetHeight || y.height ||
                    w.attr("height"));
                i = z > i ? z : i;
                k = A > k ? A : k
            }
            c.containerResize && (0 < i && 0 < k) && h.css({ width: i + "px", height: k + "px" });
            c.containerResizeHeight && 0 < k && h.css({ height: k + "px" })
        }
        var C = !1;
        c.pause && h.bind("mouseenter.cycle", function() { C = true;
            this.cyclePause++;
            l(u, true) }).bind("mouseleave.cycle", function() { C && this.cyclePause--;
            l(u, true) });
        var q;
        a: {
            i = c;n = f.fn.cycle.transitions;
            if (0 < i.fx.indexOf(",")) {
                i.multiFx = !0;
                i.fxs = i.fx.replace(/\s*/g, "").split(",");
                for (q = 0; q < i.fxs.length; q++)
                    if (w = i.fxs[q], k = n[w], !k || !n.hasOwnProperty(w) ||
                        !f.isFunction(k)) a("discarding unknown transition: ", w), i.fxs.splice(q, 1), q--;
                if (!i.fxs.length) { a("No valid transitions named; slideshow terminating.");
                    q = !1; break a }
            } else if ("all" == i.fx)
                for (q in i.multiFx = !0, i.fxs = [], n) n.hasOwnProperty(q) && (k = n[q], n.hasOwnProperty(q) && f.isFunction(k) && i.fxs.push(q));
            if (i.multiFx && i.randomizeEffects) { k = Math.floor(20 * Math.random()) + 30; for (q = 0; q < k; q++) n = Math.floor(Math.random() * i.fxs.length), i.fxs.push(i.fxs.splice(n, 1)[0]);
                g("randomized fx sequence: ", i.fxs) }
            q = !0
        }
        if (!1 ===
            q) return !1;
        var D = !1;
        j.requeueAttempts = j.requeueAttempts || 0;
        b.each(function() {
            var b = f(this);
            this.cycleH = c.fit && c.height ? c.height : b.height() || this.offsetHeight || this.height || b.attr("height") || 0;
            this.cycleW = c.fit && c.width ? c.width : b.width() || this.offsetWidth || this.width || b.attr("width") || 0;
            if (b.is("img")) {
                var b = f.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete,
                    h = f.browser.opera && (this.cycleW == 42 && this.cycleH == 19 || this.cycleW == 37 && this.cycleH == 17) && !this.complete,
                    d = this.cycleH === 0 && this.cycleW ===
                    0 && !this.complete;
                if (f.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete || b || h || d) { if (p.s && c.requeueOnImageNotLoaded && ++j.requeueAttempts < 100) { a(j.requeueAttempts, " - img slide not loaded, requeuing slideshow: ", this.src, this.cycleW, this.cycleH);
                        setTimeout(function() { f(p.s, p.c).cycle(j) }, c.requeueTimeout);
                        D = true; return false }
                    a("could not determine size of image: " + this.src, this.cycleW, this.cycleH) }
            }
            return true
        });
        if (D) return !1;
        c.cssBefore = c.cssBefore || {};
        c.cssAfter = c.cssAfter || {};
        c.cssFirst =
            c.cssFirst || {};
        c.animIn = c.animIn || {};
        c.animOut = c.animOut || {};
        b.not(":eq(" + t + ")").css(c.cssBefore);
        f(b[t]).css(c.cssFirst);
        if (c.timeout) { c.timeout = parseInt(c.timeout, 10);
            c.speed.constructor == String && (c.speed = f.fx.speeds[c.speed] || parseInt(c.speed, 10));
            c.sync || (c.speed /= 2); for (q = "none" == c.fx ? 0 : "shuffle" == c.fx ? 500 : 250; c.timeout - c.speed < q;) c.timeout += c.speed }
        c.easing && (c.easeIn = c.easeOut = c.easing);
        c.speedIn || (c.speedIn = c.speed);
        c.speedOut || (c.speedOut = c.speed);
        c.slideCount = o.length;
        c.currSlide = c.lastSlide =
            t;
        c.random ? (++c.randomIndex == o.length && (c.randomIndex = 0), c.nextSlide = c.randomMap[c.randomIndex]) : c.nextSlide = c.backwards ? 0 === c.startingSlide ? o.length - 1 : c.startingSlide - 1 : c.startingSlide >= o.length - 1 ? 0 : c.startingSlide + 1;
        if (!c.multiFx)
            if (q = f.fn.cycle.transitions[c.fx], f.isFunction(q)) q(h, b, c);
            else if ("custom" != c.fx && !c.multiFx) return a("unknown transition: " + c.fx, "; slideshow terminating"), !1;
        h = b[t];
        c.skipInitializationCallbacks || (c.before.length && c.before[0].apply(h, [h, h, c, !0]), c.after.length && c.after[0].apply(h, [h, h, c, !0]));
        c.next && f(c.next).bind(c.prevNextEvent, function() { return v(c, 1) });
        c.prev && f(c.prev).bind(c.prevNextEvent, function() { return v(c, 0) });
        if (c.pager || c.pagerAnchorBuilder) { var x = c,
                E = f(x.pager);
            f.each(o, function(b, a) { f.fn.cycle.createPagerAnchor(b, a, E, o, x) });
            x.updateActivePagerLink(x.pager, x.startingSlide, x.activePagerClass) }
        var m = c;
        m.addSlide = function(b, a) {
            var c = f(b),
                h = c[0];
            m.autostopCount || m.countdown++;
            o[a ? "unshift" : "push"](h);
            if (m.els) m.els[a ? "unshift" : "push"](h);
            m.slideCount = o.length;
            if (m.random) {
                m.randomMap.push(m.slideCount -
                    1);
                m.randomMap.sort(function() { return Math.random() - 0.5 })
            }
            c.css("position", "absolute");
            c[a ? "prependTo" : "appendTo"](m.$cont);
            if (a) { m.currSlide++;
                m.nextSlide++ }!f.support.opacity && (m.cleartype && !m.cleartypeNoBg) && B(c);
            m.fit && m.width && c.width(m.width);
            m.fit && (m.height && m.height != "auto") && c.height(m.height);
            h.cycleH = m.fit && m.height ? m.height : c.height();
            h.cycleW = m.fit && m.width ? m.width : c.width();
            c.css(m.cssBefore);
            (m.pager || m.pagerAnchorBuilder) && f.fn.cycle.createPagerAnchor(o.length - 1, h, f(m.pager), o, m);
            if (f.isFunction(m.onAddSlide)) m.onAddSlide(c);
            else c.hide()
        };
        return c
    }

    function r(a, b, d, j) {
        function l() { var c = 0;
            b.timeout && !b.continuous ? (c = n(a[b.currSlide], a[b.nextSlide], b, j), "shuffle" == b.fx && (c -= b.speedOut)) : b.continuous && i.cyclePause && (c = 10);
            0 < c && (i.cycleTimeout = setTimeout(function() { r(a, b, 0, !b.backwards) }, c)) }
        var i = b.$cont[0],
            c = a[b.currSlide],
            k = a[b.nextSlide];
        d && (b.busy && b.manualTrump) && (g("manualTrump in go(), stopping active transition"), f(a).stop(!0, !0), b.busy = 0, clearTimeout(i.cycleTimeout));
        if (b.busy) g("transition active, ignoring new tx request");
        else if (!(i.cycleStop != b.stopCount || 0 === i.cycleTimeout && !d))
            if (!d && !i.cyclePause && !b.bounce && (b.autostop && 0 >= --b.countdown || b.nowrap && !b.random && b.nextSlide < b.currSlide)) b.end && b.end(b);
            else {
                var u = !1;
                if ((d || !i.cyclePause) && b.nextSlide != b.currSlide) {
                    var u = !0,
                        s = b.fx;
                    c.cycleH = c.cycleH || f(c).height();
                    c.cycleW = c.cycleW || f(c).width();
                    k.cycleH = k.cycleH || f(k).height();
                    k.cycleW = k.cycleW || f(k).width();
                    if (b.multiFx) {
                        if (j && (b.lastFx === e || ++b.lastFx >= b.fxs.length)) b.lastFx =
                            0;
                        else if (!j && (b.lastFx === e || 0 > --b.lastFx)) b.lastFx = b.fxs.length - 1;
                        s = b.fxs[b.lastFx]
                    }
                    b.oneTimeFx && (s = b.oneTimeFx, b.oneTimeFx = null);
                    f.fn.cycle.resetState(b, s);
                    b.before.length && f.each(b.before, function(a, f) { i.cycleStop == b.stopCount && f.apply(k, [c, k, b, j]) });
                    var t = function() { b.busy = 0;
                        f.each(b.after, function(a, f) { i.cycleStop == b.stopCount && f.apply(k, [c, k, b, j]) });
                        i.cycleStop || l() };
                    g("tx firing(" + s + "); currSlide: " + b.currSlide + "; nextSlide: " + b.nextSlide);
                    b.busy = 1;
                    if (b.fxFn) b.fxFn(c, k, b, t, j, d && b.fastOnEvent);
                    else if (f.isFunction(f.fn.cycle[b.fx])) f.fn.cycle[b.fx](c, k, b, t, j, d && b.fastOnEvent);
                    else f.fn.cycle.custom(c, k, b, t, j, d && b.fastOnEvent)
                } else l();
                if (u || b.nextSlide == b.currSlide)
                    if (b.lastSlide = b.currSlide, b.random) { if (b.currSlide = b.nextSlide, ++b.randomIndex == a.length && (b.randomIndex = 0, b.randomMap.sort(function() { return Math.random() - 0.5 })), b.nextSlide = b.randomMap[b.randomIndex], b.nextSlide == b.currSlide) b.nextSlide = b.currSlide == b.slideCount - 1 ? 0 : b.currSlide + 1 } else b.backwards ? (d = 0 > b.nextSlide - 1) && b.bounce ?
                        (b.backwards = !b.backwards, b.nextSlide = 1, b.currSlide = 0) : (b.nextSlide = d ? a.length - 1 : b.nextSlide - 1, b.currSlide = d ? 0 : b.nextSlide + 1) : (d = b.nextSlide + 1 == a.length) && b.bounce ? (b.backwards = !b.backwards, b.nextSlide = a.length - 2, b.currSlide = a.length - 1) : (b.nextSlide = d ? 0 : b.nextSlide + 1, b.currSlide = d ? a.length - 1 : b.nextSlide - 1);
                u && b.pager && b.updateActivePagerLink(b.pager, b.currSlide, b.activePagerClass)
            }
    }

    function n(a, b, f, d) {
        if (f.timeoutFn) {
            for (a = f.timeoutFn.call(a, a, b, f, d);
                "none" != f.fx && 250 > a - f.speed;) a += f.speed;
            g("calculated timeout: " +
                a + "; speed: " + f.speed);
            if (!1 !== a) return a
        }
        return f.timeout
    }

    function v(a, b) {
        var d = b ? 1 : -1,
            j = a.elements,
            e = a.$cont[0],
            l = e.cycleTimeout;
        l && (clearTimeout(l), e.cycleTimeout = 0);
        if (a.random && 0 > d) a.randomIndex--, -2 == --a.randomIndex ? a.randomIndex = j.length - 2 : -1 == a.randomIndex && (a.randomIndex = j.length - 1), a.nextSlide = a.randomMap[a.randomIndex];
        else if (a.random) a.nextSlide = a.randomMap[a.randomIndex];
        else if (a.nextSlide = a.currSlide + d, 0 > a.nextSlide) { if (a.nowrap) return !1;
            a.nextSlide = j.length - 1 } else if (a.nextSlide >=
            j.length) { if (a.nowrap) return !1;
            a.nextSlide = 0 }
        e = a.onPrevNextEvent || a.prevNextClick;
        f.isFunction(e) && e(0 < d, a.nextSlide, j[a.nextSlide]);
        r(j, a, 1, b);
        return !1
    }

    function B(a) {
        function b(a) { a = parseInt(a, 10).toString(16); return 2 > a.length ? "0" + a : a }

        function d(a) { for (; a && "html" != a.nodeName.toLowerCase(); a = a.parentNode) { var h = f.css(a, "background-color"); if (h && 0 <= h.indexOf("rgb")) return a = h.match(/\d+/g), "#" + b(a[0]) + b(a[1]) + b(a[2]); if (h && "transparent" != h) return h } return "#ffffff" }
        g("applying clearType background-color hack");
        a.each(function() { f(this).css("background-color", d(this)) })
    }
    f.support === e && (f.support = { opacity: !f.browser.msie });
    f.expr[":"].paused = function(a) { return a.cyclePause };
    f.fn.cycle = function(d, b) {
        var e = { s: this.selector, c: this.context };
        if (this.length === 0 && d != "stop") { if (!f.isReady && e.s) { a("DOM not ready, queuing slideshow");
                f(function() { f(e.s, e.c).cycle(d, b) }); return this }
            a("terminating; zero elements found by selector" + (f.isReady ? "" : " (DOM not ready)")); return this }
        return this.each(function() {
            var l = j(this,
                d, b);
            if (l !== false) {
                l.updateActivePagerLink = l.updateActivePagerLink || f.fn.cycle.updateActivePagerLink;
                this.cycleTimeout && clearTimeout(this.cycleTimeout);
                this.cycleStop = this.cycleTimeout = this.cyclePause = 0;
                var p = f(this),
                    i = l.slideExpr ? f(l.slideExpr, this) : p.children(),
                    c = i.get();
                if (c.length < 2) a("terminating; too few slides: " + c.length);
                else {
                    var k = u(p, i, c, l, e);
                    if (k !== false)
                        if (p = k.continuous ? 10 : n(c[k.currSlide], c[k.nextSlide], k, !k.backwards)) {
                            p = p + (k.delay || 0);
                            p < 10 && (p = 10);
                            g("first timeout: " + p);
                            this.cycleTimeout =
                                setTimeout(function() { r(c, k, 0, !l.backwards) }, p)
                        }
                }
            }
        })
    };
    f.fn.cycle.resetState = function(a, b) { b = b || a.fx;
        a.before = [];
        a.after = [];
        a.cssBefore = f.extend({}, a.original.cssBefore);
        a.cssAfter = f.extend({}, a.original.cssAfter);
        a.animIn = f.extend({}, a.original.animIn);
        a.animOut = f.extend({}, a.original.animOut);
        a.fxFn = null;
        f.each(a.original.before, function() { a.before.push(this) });
        f.each(a.original.after, function() { a.after.push(this) }); var d = f.fn.cycle.transitions[b];
        f.isFunction(d) && d(a.$cont, f(a.elements), a) };
    f.fn.cycle.updateActivePagerLink =
        function(a, b, d) { f(a).each(function() { f(this).children().removeClass(d).eq(b).addClass(d) }) };
    f.fn.cycle.next = function(a) { v(a, 1) };
    f.fn.cycle.prev = function(a) { v(a, 0) };
    f.fn.cycle.createPagerAnchor = function(a, b, d, j, e) {
        if (f.isFunction(e.pagerAnchorBuilder)) { b = e.pagerAnchorBuilder(a, b);
            g("pagerAnchorBuilder(" + a + ", el) returned: " + b) } else b = '<a href="#">' + (a + 1) + "</a>";
        if (b) {
            var i = f(b);
            if (i.parents("body").length === 0) {
                var c = [];
                if (d.length > 1) {
                    d.each(function() { var a = i.clone(true);
                        f(this).append(a);
                        c.push(a[0]) });
                    i = f(c)
                } else i.appendTo(d)
            }
            e.pagerAnchors = e.pagerAnchors || [];
            e.pagerAnchors.push(i);
            d = function(b) { b.preventDefault();
                e.nextSlide = a; var b = e.$cont[0],
                    c = b.cycleTimeout; if (c) { clearTimeout(c);
                    b.cycleTimeout = 0 }
                b = e.onPagerEvent || e.pagerClick;
                f.isFunction(b) && b(e.nextSlide, j[e.nextSlide]);
                r(j, e, 1, e.currSlide < a) };
            /mouseenter|mouseover/i.test(e.pagerEvent) ? i.hover(d, function() {}) : i.bind(e.pagerEvent, d);
            !/^click/.test(e.pagerEvent) && !e.allowPagerClickBubble && i.bind("click.cycle", function() { return false });
            var k =
                e.$cont[0],
                n = false;
            e.pauseOnPagerHover && i.hover(function() { n = true;
                k.cyclePause++;
                l(k, true, true) }, function() { n && k.cyclePause--;
                l(k, true, true) })
        }
    };
    f.fn.cycle.hopsFromLast = function(a, b) { var f = a.lastSlide,
            d = a.currSlide; return b ? d > f ? d - f : a.slideCount - f : d < f ? f - d : f + a.slideCount - d };
    f.fn.cycle.commonReset = function(a, b, d, e, j, l) {
        f(d.elements).not(a).hide();
        if (typeof d.cssBefore.opacity == "undefined") d.cssBefore.opacity = 1;
        d.cssBefore.display = "block";
        if (d.slideResize && e !== false && b.cycleW > 0) d.cssBefore.width = b.cycleW;
        if (d.slideResize && j !== false && b.cycleH > 0) d.cssBefore.height = b.cycleH;
        d.cssAfter = d.cssAfter || {};
        d.cssAfter.display = "none";
        f(a).css("zIndex", d.slideCount + (l === true ? 1 : 0));
        f(b).css("zIndex", d.slideCount + (l === true ? 0 : 1))
    };
    f.fn.cycle.custom = function(a, b, d, e, j, l) {
        var c = f(a),
            k = f(b),
            g = d.speedIn,
            a = d.speedOut,
            n = d.easeIn,
            b = d.easeOut;
        k.css(d.cssBefore);
        if (l) { g = typeof l == "number" ? a = l : a = 1;
            n = b = null }
        var u = function() { k.animate(d.animIn, g, n, function() { e() }) };
        c.animate(d.animOut, a, b, function() {
            c.css(d.cssAfter);
            d.sync ||
                u()
        });
        d.sync && u()
    };
    f.fn.cycle.transitions = { fade: function(a, b, d) { b.not(":eq(" + d.currSlide + ")").css("opacity", 0);
            d.before.push(function(a, b, d) { f.fn.cycle.commonReset(a, b, d);
                d.cssBefore.opacity = 0 });
            d.animIn = { opacity: 1 };
            d.animOut = { opacity: 0 };
            d.cssBefore = { top: 0, left: 0 } } };
    f.fn.cycle.ver = function() { return "2.9999.5" };
    f.fn.cycle.defaults = {
        activePagerClass: "activeSlide",
        after: null,
        allowPagerClickBubble: !1,
        animIn: null,
        animOut: null,
        aspect: !1,
        autostop: 0,
        autostopCount: 0,
        backwards: !1,
        before: null,
        center: null,
        cleartype: !f.support.opacity,
        cleartypeNoBg: !1,
        containerResize: 1,
        containerResizeHeight: 0,
        continuous: 0,
        cssAfter: null,
        cssBefore: null,
        delay: 0,
        easeIn: null,
        easeOut: null,
        easing: null,
        end: null,
        fastOnEvent: 0,
        fit: 0,
        fx: "fade",
        fxFn: null,
        height: "auto",
        manualTrump: !0,
        metaAttr: "cycle",
        next: null,
        nowrap: 0,
        onPagerEvent: null,
        onPrevNextEvent: null,
        pager: null,
        pagerAnchorBuilder: null,
        pagerEvent: "click.cycle",
        pause: 0,
        pauseOnPagerHover: 0,
        prev: null,
        prevNextEvent: "click.cycle",
        random: 0,
        randomizeEffects: 1,
        requeueOnImageNotLoaded: !0,
        requeueTimeout: 250,
        rev: 0,
        shuffle: null,
        skipInitializationCallbacks: !1,
        slideExpr: null,
        slideResize: 1,
        speed: 1E3,
        speedIn: null,
        speedOut: null,
        startingSlide: e,
        sync: 1,
        timeout: 4E3,
        timeoutFn: null,
        updateActivePagerLink: null,
        width: null
    }
})(jQuery);
(function(f) {
    f.fn.cycle.transitions.none = function(e, g, a) { a.fxFn = function(a, e, d, g) { f(e).show();
            f(a).hide();
            g() } };
    f.fn.cycle.transitions.fadeout = function(e, g, a) { g.not(":eq(" + a.currSlide + ")").css({ display: "block", opacity: 1 });
        a.before.push(function(a, e, d, g, r, n) { f(a).css("zIndex", d.slideCount + (!0 !== n ? 1 : 0));
            f(e).css("zIndex", d.slideCount + (!0 !== n ? 0 : 1)) });
        a.animIn.opacity = 1;
        a.animOut.opacity = 0;
        a.cssBefore.opacity = 1;
        a.cssBefore.display = "block";
        a.cssAfter.zIndex = 0 };
    f.fn.cycle.transitions.scrollUp = function(e,
        g, a) { e.css("overflow", "hidden");
        a.before.push(f.fn.cycle.commonReset);
        e = e.height();
        a.cssBefore.top = e;
        a.cssBefore.left = 0;
        a.cssFirst.top = 0;
        a.animIn.top = 0;
        a.animOut.top = -e };
    f.fn.cycle.transitions.scrollDown = function(e, g, a) { e.css("overflow", "hidden");
        a.before.push(f.fn.cycle.commonReset);
        e = e.height();
        a.cssFirst.top = 0;
        a.cssBefore.top = -e;
        a.cssBefore.left = 0;
        a.animIn.top = 0;
        a.animOut.top = e };
    f.fn.cycle.transitions.scrollLeft = function(e, g, a) {
        e.css("overflow", "hidden");
        a.before.push(f.fn.cycle.commonReset);
        e =
            e.width();
        a.cssFirst.left = 0;
        a.cssBefore.left = e;
        a.cssBefore.top = 0;
        a.animIn.left = 0;
        a.animOut.left = 0 - e
    };
    f.fn.cycle.transitions.scrollRight = function(e, g, a) { e.css("overflow", "hidden");
        a.before.push(f.fn.cycle.commonReset);
        e = e.width();
        a.cssFirst.left = 0;
        a.cssBefore.left = -e;
        a.cssBefore.top = 0;
        a.animIn.left = 0;
        a.animOut.left = e };
    f.fn.cycle.transitions.scrollHorz = function(e, g, a) {
        e.css("overflow", "hidden").width();
        a.before.push(function(a, e, d, g) {
            d.rev && (g = !g);
            f.fn.cycle.commonReset(a, e, d);
            d.cssBefore.left = g ? e.cycleW -
                1 : 1 - e.cycleW;
            d.animOut.left = g ? -a.cycleW : a.cycleW
        });
        a.cssFirst.left = 0;
        a.cssBefore.top = 0;
        a.animIn.left = 0;
        a.animOut.top = 0
    };
    f.fn.cycle.transitions.scrollVert = function(e, g, a) { e.css("overflow", "hidden");
        a.before.push(function(a, e, d, g) { d.rev && (g = !g);
            f.fn.cycle.commonReset(a, e, d);
            d.cssBefore.top = g ? 1 - e.cycleH : e.cycleH - 1;
            d.animOut.top = g ? a.cycleH : -a.cycleH });
        a.cssFirst.top = 0;
        a.cssBefore.left = 0;
        a.animIn.top = 0;
        a.animOut.left = 0 };
    f.fn.cycle.transitions.slideX = function(e, g, a) {
        a.before.push(function(a, e, d) {
            f(d.elements).not(a).hide();
            f.fn.cycle.commonReset(a, e, d, !1, !0);
            d.animIn.width = e.cycleW
        });
        a.cssBefore.left = 0;
        a.cssBefore.top = 0;
        a.cssBefore.width = 0;
        a.animIn.width = "show";
        a.animOut.width = 0
    };
    f.fn.cycle.transitions.slideY = function(e, g, a) { a.before.push(function(a, e, d) { f(d.elements).not(a).hide();
            f.fn.cycle.commonReset(a, e, d, !0, !1);
            d.animIn.height = e.cycleH });
        a.cssBefore.left = 0;
        a.cssBefore.top = 0;
        a.cssBefore.height = 0;
        a.animIn.height = "show";
        a.animOut.height = 0 };
    f.fn.cycle.transitions.shuffle = function(e, g, a) {
        e = e.css("overflow", "visible").width();
        g.css({ left: 0, top: 0 });
        a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !0, !0, !0) });
        a.speedAdjusted || (a.speed /= 2, a.speedAdjusted = !0);
        a.random = 0;
        a.shuffle = a.shuffle || { left: -e, top: 15 };
        a.els = [];
        for (e = 0; e < g.length; e++) a.els.push(g[e]);
        for (e = 0; e < a.currSlide; e++) a.els.push(a.els.shift());
        a.fxFn = function(a, e, d, g, r) {
            d.rev && (r = !r);
            var n = r ? f(a) : f(e);
            f(e).css(d.cssBefore);
            var v = d.slideCount;
            n.animate(d.shuffle, d.speedIn, d.easeIn, function() {
                for (var e = f.fn.cycle.hopsFromLast(d, r), j = 0; j < e; j++) r ? d.els.push(d.els.shift()) :
                    d.els.unshift(d.els.pop());
                if (r) { e = 0; for (j = d.els.length; e < j; e++) f(d.els[e]).css("z-index", j - e + v) } else { e = f(a).css("z-index");
                    n.css("z-index", parseInt(e, 10) + 1 + v) }
                n.animate({ left: 0, top: 0 }, d.speedOut, d.easeOut, function() { f(r ? this : a).hide();
                    g && g() })
            })
        };
        f.extend(a.cssBefore, { display: "block", opacity: 1, top: 0, left: 0 })
    };
    f.fn.cycle.transitions.turnUp = function(e, g, a) {
        a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !0, !1);
            d.cssBefore.top = e.cycleH;
            d.animIn.height = e.cycleH;
            d.animOut.width = e.cycleW });
        a.cssFirst.top = 0;
        a.cssBefore.left = 0;
        a.cssBefore.height = 0;
        a.animIn.top = 0;
        a.animOut.height = 0
    };
    f.fn.cycle.transitions.turnDown = function(e, g, a) { a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !0, !1);
            d.animIn.height = e.cycleH;
            d.animOut.top = a.cycleH });
        a.cssFirst.top = 0;
        a.cssBefore.left = 0;
        a.cssBefore.top = 0;
        a.cssBefore.height = 0;
        a.animOut.height = 0 };
    f.fn.cycle.transitions.turnLeft = function(e, g, a) {
        a.before.push(function(a, e, d) {
            f.fn.cycle.commonReset(a, e, d, !1, !0);
            d.cssBefore.left = e.cycleW;
            d.animIn.width =
                e.cycleW
        });
        a.cssBefore.top = 0;
        a.cssBefore.width = 0;
        a.animIn.left = 0;
        a.animOut.width = 0
    };
    f.fn.cycle.transitions.turnRight = function(e, g, a) { a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !1, !0);
            d.animIn.width = e.cycleW;
            d.animOut.left = a.cycleW });
        f.extend(a.cssBefore, { top: 0, left: 0, width: 0 });
        a.animIn.left = 0;
        a.animOut.width = 0 };
    f.fn.cycle.transitions.zoom = function(e, g, a) {
        a.before.push(function(a, e, d) {
            f.fn.cycle.commonReset(a, e, d, !1, !1, !0);
            d.cssBefore.top = e.cycleH / 2;
            d.cssBefore.left = e.cycleW / 2;
            f.extend(d.animIn, { top: 0, left: 0, width: e.cycleW, height: e.cycleH });
            f.extend(d.animOut, { width: 0, height: 0, top: a.cycleH / 2, left: a.cycleW / 2 })
        });
        a.cssFirst.top = 0;
        a.cssFirst.left = 0;
        a.cssBefore.width = 0;
        a.cssBefore.height = 0
    };
    f.fn.cycle.transitions.fadeZoom = function(e, g, a) { a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !1, !1);
            d.cssBefore.left = e.cycleW / 2;
            d.cssBefore.top = e.cycleH / 2;
            f.extend(d.animIn, { top: 0, left: 0, width: e.cycleW, height: e.cycleH }) });
        a.cssBefore.width = 0;
        a.cssBefore.height = 0;
        a.animOut.opacity = 0 };
    f.fn.cycle.transitions.blindX =
        function(e, g, a) { e = e.css("overflow", "hidden").width();
            a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d);
                d.animIn.width = e.cycleW;
                d.animOut.left = a.cycleW });
            a.cssBefore.left = e;
            a.cssBefore.top = 0;
            a.animIn.left = 0;
            a.animOut.left = e };
    f.fn.cycle.transitions.blindY = function(e, g, a) { e = e.css("overflow", "hidden").height();
        a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d);
            d.animIn.height = e.cycleH;
            d.animOut.top = a.cycleH });
        a.cssBefore.top = e;
        a.cssBefore.left = 0;
        a.animIn.top = 0;
        a.animOut.top = e };
    f.fn.cycle.transitions.blindZ =
        function(e, g, a) { g = e.css("overflow", "hidden").height();
            e = e.width();
            a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d);
                d.animIn.height = e.cycleH;
                d.animOut.top = a.cycleH });
            a.cssBefore.top = g;
            a.cssBefore.left = e;
            a.animIn.top = 0;
            a.animIn.left = 0;
            a.animOut.top = g;
            a.animOut.left = e };
    f.fn.cycle.transitions.growX = function(e, g, a) {
        a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !1, !0);
            d.cssBefore.left = this.cycleW / 2;
            d.animIn.left = 0;
            d.animIn.width = this.cycleW;
            d.animOut.left = 0 });
        a.cssBefore.top = 0;
        a.cssBefore.width =
            0
    };
    f.fn.cycle.transitions.growY = function(e, g, a) { a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !0, !1);
            d.cssBefore.top = this.cycleH / 2;
            d.animIn.top = 0;
            d.animIn.height = this.cycleH;
            d.animOut.top = 0 });
        a.cssBefore.height = 0;
        a.cssBefore.left = 0 };
    f.fn.cycle.transitions.curtainX = function(e, g, a) {
        a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !1, !0, !0);
            d.cssBefore.left = e.cycleW / 2;
            d.animIn.left = 0;
            d.animIn.width = this.cycleW;
            d.animOut.left = a.cycleW / 2;
            d.animOut.width = 0 });
        a.cssBefore.top = 0;
        a.cssBefore.width =
            0
    };
    f.fn.cycle.transitions.curtainY = function(e, g, a) { a.before.push(function(a, e, d) { f.fn.cycle.commonReset(a, e, d, !0, !1, !0);
            d.cssBefore.top = e.cycleH / 2;
            d.animIn.top = 0;
            d.animIn.height = e.cycleH;
            d.animOut.top = a.cycleH / 2;
            d.animOut.height = 0 });
        a.cssBefore.height = 0;
        a.cssBefore.left = 0 };
    f.fn.cycle.transitions.cover = function(e, g, a) {
        var l = a.direction || "left",
            j = e.css("overflow", "hidden").width(),
            d = e.height();
        a.before.push(function(a, e, g) {
            f.fn.cycle.commonReset(a, e, g);
            "right" == l ? g.cssBefore.left = -j : "up" == l ? g.cssBefore.top =
                d : "down" == l ? g.cssBefore.top = -d : g.cssBefore.left = j
        });
        a.animIn.left = 0;
        a.animIn.top = 0;
        a.cssBefore.top = 0;
        a.cssBefore.left = 0
    };
    f.fn.cycle.transitions.uncover = function(e, g, a) { var l = a.direction || "left",
            j = e.css("overflow", "hidden").width(),
            d = e.height();
        a.before.push(function(a, e, g) { f.fn.cycle.commonReset(a, e, g, !0, !0, !0); "right" == l ? g.animOut.left = j : "up" == l ? g.animOut.top = -d : "down" == l ? g.animOut.top = d : g.animOut.left = -j });
        a.animIn.left = 0;
        a.animIn.top = 0;
        a.cssBefore.top = 0;
        a.cssBefore.left = 0 };
    f.fn.cycle.transitions.toss =
        function(e, g, a) { var l = e.css("overflow", "visible").width(),
                j = e.height();
            a.before.push(function(a, e, g) { f.fn.cycle.commonReset(a, e, g, !0, !0, !0);!g.animOut.left && !g.animOut.top ? f.extend(g.animOut, { left: 2 * l, top: -j / 2, opacity: 0 }) : g.animOut.opacity = 0 });
            a.cssBefore.left = 0;
            a.cssBefore.top = 0;
            a.animIn.left = 0 };
    f.fn.cycle.transitions.wipe = function(e, g, a) {
        var l = e.css("overflow", "hidden").width(),
            j = e.height();
        a.cssBefore = a.cssBefore || {};
        var d;
        a.clip && (/l2r/.test(a.clip) ? d = "rect(0px 0px " + j + "px 0px)" : /r2l/.test(a.clip) ?
            d = "rect(0px " + l + "px " + j + "px " + l + "px)" : /t2b/.test(a.clip) ? d = "rect(0px " + l + "px 0px 0px)" : /b2t/.test(a.clip) ? d = "rect(" + j + "px " + l + "px " + j + "px 0px)" : /zoom/.test(a.clip) && (e = parseInt(j / 2, 10), g = parseInt(l / 2, 10), d = "rect(" + e + "px " + g + "px " + e + "px " + g + "px)"));
        a.cssBefore.clip = a.cssBefore.clip || d || "rect(0px 0px 0px 0px)";
        var e = a.cssBefore.clip.match(/(\d+)/g),
            u = parseInt(e[0], 10),
            r = parseInt(e[1], 10),
            n = parseInt(e[2], 10),
            v = parseInt(e[3], 10);
        a.before.push(function(a, d, b) {
            if (a != d) {
                var e = f(a),
                    g = f(d);
                f.fn.cycle.commonReset(a,
                    d, b, true, true, false);
                b.cssAfter.display = "block";
                var p = 1,
                    i = parseInt(b.speedIn / 13, 10) - 1;
                (function k() { var a = u ? u - parseInt(p * (u / i), 10) : 0,
                        b = v ? v - parseInt(p * (v / i), 10) : 0,
                        d = n < j ? n + parseInt(p * ((j - n) / i || 1), 10) : j,
                        f = r < l ? r + parseInt(p * ((l - r) / i || 1), 10) : l;
                    g.css({ clip: "rect(" + a + "px " + f + "px " + d + "px " + b + "px)" });
                    p++ <= i ? setTimeout(k, 13) : e.css("display", "none") })()
            }
        });
        f.extend(a.cssBefore, { display: "block", opacity: 1, top: 0, left: 0 });
        a.animIn = { left: 0 };
        a.animOut = { left: 0 }
    }
})(jQuery);

$(function() {
    if (0 < $("#investorContent").size()) {
        for (var d = 0; d < $config.topics.length; d++) {
            var b = $config.topics[d],
                e = $("#investorContent ul.list"),
                a = "";
            if ("1" === b.disp) {
                a += '<li style="margin:0;with:500px">';
                b.img && (a += '<div class="textBox">');
                a += "<p>";
                b.date && (a += "<span>" + $("<div/>").text(b.date).html() + "</span><br />");
                b.title && (a += "<strong>" + $("<div/>").text(b.title).html() + "</strong>");
                a += "</p>";
                a += "<ul>";
                if (b.pdftitle1) var c = $("<div/>").text(b.pdftitle1).html(),
                    a = a + ('<li><a href="' + $("<div/>").text(b.pdf1).html() +
                        '" target="_blank">' + c + '<img src="images/pct_pdf.gif" width="14" height="15" alt="' + c + '" /></a></li>');
                b.pdftitle2 && (c = $("<div/>").text(b.pdftitle2).html(), a += '<li><a href="' + $("<div/>").text(b.pdf2).html() + '" target="_blank">' + c + '<img src="images/pct_pdf.gif" width="14" height="15" alt="' + c + '" /></a></li>');
                b.pdftitle3 && (c = $("<div/>").text(b.pdftitle3).html(), a += '<li><a href="' + $("<div/>").text(b.pdf3).html() + '" target="_blank">' + c + '<img src="images/pct_pdf.gif" width="14" height="15" alt="' + c + '" /></a></li>');
                b.soundtitle && (c = $("<div/>").text(b.soundtitle).html(), a += '<li><a href="' + $("<div/>").text(b.sound).html() + '" target="_blank">' + c + '<img src="images/pct_sound.gif" width="17" height="14" alt="' + c + '" /></a></li>');
                b.movietitle && (c = $("<div/>").text(b.movietitle).html(), a += '<li><a href="' + $("<div/>").text(b.movie).html() + '" target="_blank">' + c + '<img src="images/pct_movie.gif" width="16" height="11" alt="' + c + '" /></a></li>');
                b.linktitle && (c = $("<div/>").text(b.linktitle).html(), a += '<li><a href="' + $("<div/>").text(b.link).html() +
                    '" target="_blank">' + c + '<img src="images/pct_blank.gif" width="17" height="14" alt="' + c + '" /></a></li>');
                a += "</ul>";
                b.img && (a += '</div><div class="imageBox"><p><img src="' + $("<div/>").text(b.img).html() + '" width="120" height="90" alt="image" /></p></div>');
                a += "</li>";
                e.html(e.html() + a)
            }
        }
        $("#investorContent ul.list").cycle({ speed: 200, timeout: 1E4, pager: "ul#slotFocus-pagination", pagerAnchorBuilder: slotTopics_buildPagination, prevNextClick: slotTopics_actionPause, activePagerClass: "selected", after: onAfter });
        $("ul#slotFocus-pagination").append('<li><a href="#"><img src="/investors/images/txt_pause.gif" width="32" height="24" alt="pause" /></a></li>');
        slotTopicsPlayPause()
    }
});

function slotTopicsPlayPause() {
    $("ul#slotFocus-pagination li:last a").click(function(d) {
        d.preventDefault();
        "play" == $(this).attr("class") ? ($(this).attr("class", "pause"), $("#investorContent ul.list").cycle("resume"), $("img", this).attr("src", $("img", this).attr("src").replace(/txt\_start/, "txt_pause")), $("img", this).attr("alt", $("img", this).attr("alt").replace(/start/, "pause"))) : ($(this).attr("class", "play"), $("#investorContent ul.list").cycle("pause"), $("img", this).attr("src", $("img", this).attr("src").replace(/txt\_pause/,
            "txt_start")), $("img", this).attr("alt", $("img", this).attr("alt").replace(/pause/, "start")))
    })
}

function slotTopics_buildPagination(d) { return '<li><a href="#"><img src="/investors/images/txt_tab' + (d + 1) + (0 == d ? "_on" : "") + '.gif" width="56" height="24" alt="' + (d + 1) + '" /></a></li>' }

function slotTopics_actionPause() { $("#investorContent ul.list").cycle("pause");
    setTimeout(function() { $("#investorContent ul.list").cycle("resume") }, 1E4) }

function onAfter() { var d = $("ul#slotFocus-pagination li.selected img");
    $("ul#slotFocus-pagination li img").each(function() { $(this).attr("src", $(this).attr("src").replace(/\_on\./, ".")) });
    d.attr("src") && d.attr("src", d.attr("src").replace(/\./, "_on.")) };

/*
 *	jQuery carouFredSel 5.6.4
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
eval(function(p, a, c, k, e, r) { e = function(c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) { return r[e] }];
        e = function() { return '\\w+' };
        c = 1 }; while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p }('(H($){8($.1P.1J)J;$.1P.1J=H(y,z){8(1g.V==0){1e(N,\'5s 4q 6u 1m "\'+1g.3U+\'".\');J 1g}8(1g.V>1){J 1g.1K(H(){$(1g).1J(y,z)})}F A=1g,$19=1g[0];8(A.1r(\'4r\')){F B=A.1D(\'34\',\'3w\');A.X(\'34\',[\'5t\',[N]])}Q{F B=O}A.3V=H(o,b,c){o=3W($19,o);F e=[\'G\',\'1n\',\'T\',\'17\',\'1a\',\'1b\'];1m(F a=0,l=e.V;a<l;a++){o[e[a]]=3W($19,o[e[a]])}8(K o.1n==\'13\'){8(o.1n<=50)o.1n={\'G\':o.1n};Q o.1n={\'1j\':o.1n}}Q{8(K o.1n==\'1k\')o.1n={\'1G\':o.1n}}8(K o.G==\'13\')o.G={\'P\':o.G};Q 8(o.G==\'1d\')o.G={\'P\':o.G,\'S\':o.G,\'1l\':o.G};8(K o.G!=\'1o\')o.G={};8(b)2u=$.25(N,{},$.1P.1J.4s,o);7=$.25(N,{},$.1P.1J.4s,o);8(K 7.G.12!=\'1o\')7.G.12={};8(7.G.2J==0&&K c==\'13\'){7.G.2J=c}C.4t=(7.2K);C.2k=(7.2k==\'4u\'||7.2k==\'1t\')?\'1a\':\'17\';F f=[[\'S\',\'35\',\'26\',\'1l\',\'5u\',\'2L\',\'1t\',\'2M\',\'1E\',0,1,2,3],[\'1l\',\'5u\',\'2L\',\'S\',\'35\',\'26\',\'2M\',\'1t\',\'3X\',3,2,1,0]];F g=f[0].V,5v=(7.2k==\'2N\'||7.2k==\'1t\')?0:1;7.d={};1m(F d=0;d<g;d++){7.d[f[0][d]]=f[5v][d]}F h=A.11();1x(K 7.G.P){W\'1o\':7.G.12.2O=7.G.P.2O;7.G.12.27=7.G.P.27;7.G.P=O;18;W\'1k\':8(7.G.P==\'1d\'){7.G.12.1d=N}Q{7.G.12.2l=7.G.P}7.G.P=O;18;W\'H\':7.G.12.2l=7.G.P;7.G.P=O;18}8(K 7.G.1v==\'1y\'){7.G.1v=(h.1v(\':2P\').V>0)?\':P\':\'*\'}8(7[7.d[\'S\']]==\'T\'){7[7.d[\'S\']]=3x(h,7,\'26\')}8(3Y(7[7.d[\'S\']])&&!7.2K){7[7.d[\'S\']]=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);C.4t=N}8(7[7.d[\'1l\']]==\'T\'){7[7.d[\'1l\']]=3x(h,7,\'2L\')}8(!7.G[7.d[\'S\']]){8(7.2K){1e(N,\'5w a \'+7.d[\'S\']+\' 1m 6v G!\');7.G[7.d[\'S\']]=3x(h,7,\'26\')}Q{7.G[7.d[\'S\']]=(4v(h,7,\'26\'))?\'1d\':h[7.d[\'26\']](N)}}8(!7.G[7.d[\'1l\']]){7.G[7.d[\'1l\']]=(4v(h,7,\'2L\'))?\'1d\':h[7.d[\'2L\']](N)}8(!7[7.d[\'1l\']]){7[7.d[\'1l\']]=7.G[7.d[\'1l\']]}8(!7.G.P&&!7.2K){8(7.G[7.d[\'S\']]==\'1d\'){7.G.12.1d=N}8(!7.G.12.1d){8(K 7[7.d[\'S\']]==\'13\'){7.G.P=1L.3y(7[7.d[\'S\']]/7.G[7.d[\'S\']])}Q{F i=36($1A.3a(),7,\'35\');7.G.P=1L.3y(i/7.G[7.d[\'S\']]);7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];8(!7.G.12.2l)7.1B=O}8(7.G.P==\'6w\'||7.G.P<1){1e(N,\'28 a 4w 13 3z P G: 5w 41 "1d".\');7.G.12.1d=N}}}8(!7[7.d[\'S\']]){7[7.d[\'S\']]=\'1d\';8(!7.2K&&7.G.1v==\'*\'&&!7.G.12.1d&&7.G[7.d[\'S\']]!=\'1d\'){7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];7.1B=O}}8(7.G.12.1d){7.3A=(7[7.d[\'S\']]==\'1d\')?36($1A.3a(),7,\'35\'):7[7.d[\'S\']];8(7.1B===O){7[7.d[\'S\']]=\'1d\'}7.G.P=2Q(h,7,0)}Q 8(7.G.1v!=\'*\'){7.G.12.42=7.G.P;7.G.P=3B(h,7,0)}8(K 7.1B==\'1y\'){7.1B=(7[7.d[\'S\']]==\'1d\')?O:\'4x\'}7.G.P=2R(7.G.P,7,7.G.12.2l,$19);7.G.12.2m=7.G.P;7.1u=O;8(7.2K){8(!7.G.12.2O)7.G.12.2O=7.G.P;8(!7.G.12.27)7.G.12.27=7.G.P;7.1B=O;7.1i=[0,0,0,0];F j=$1A.1W(\':P\');8(j)$1A.3b();F k=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);8(K 7[7.d[\'S\']]==\'13\'&&k<7[7.d[\'S\']]){k=7[7.d[\'S\']]}8(j)$1A.3c();F m=4y(1L.2v(k/7.G[7.d[\'S\']]),7.G.12);8(m>h.V){m=h.V}F n=1L.3y(k/m),4z=7[7.d[\'1l\']],5x=3Y(4z);h.1K(H(){F a=$(1g),4A=n-5y(a,7,\'6x\');a[7.d[\'S\']](4A);8(5x){a[7.d[\'1l\']](3Z(4A,4z))}});7.G.P=m;7.G[7.d[\'S\']]=n;7[7.d[\'S\']]=m*n}Q{7.1i=5z(7.1i);8(7.1B==\'2M\')7.1B=\'1t\';8(7.1B==\'4B\')7.1B=\'2N\';1x(7.1B){W\'4x\':W\'1t\':W\'2N\':8(7[7.d[\'S\']]!=\'1d\'){F p=43(3d(h,7),7);7.1u=N;7.1i[7.d[1]]=p[1];7.1i[7.d[3]]=p[0]}18;2w:7.1B=O;7.1u=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?O:N;18}}8(K 7.2n==\'1s\'&&7.2n)7.2n=\'6y\'+A.6z(\'6A\');8(K 7.G.3e!=\'13\')7.G.3e=7.G.P;8(K 7.1n.1j!=\'13\')7.1n.1j=5A;8(K 7.1n.G==\'1y\')7.1n.G=(7.G.12.1d||7.G.1v!=\'*\')?\'P\':7.G.P;7.T=3C($19,7.T,\'T\');7.17=3C($19,7.17);7.1a=3C($19,7.1a);7.1b=3C($19,7.1b,\'1b\');7.T=$.25(N,{},7.1n,7.T);7.17=$.25(N,{},7.1n,7.17);7.1a=$.25(N,{},7.1n,7.1a);7.1b=$.25(N,{},7.1n,7.1b);8(K 7.1b.44!=\'1s\')7.1b.44=O;8(K 7.1b.3f!=\'H\'&&7.1b.3f!==O)7.1b.3f=$.1P.1J.5B;8(K 7.T.1H!=\'1s\')7.T.1H=N;8(K 7.T.4C!=\'13\')7.T.4C=0;8(K 7.T.45==\'1y\')7.T.45=N;8(K 7.T.4D!=\'1s\')7.T.4D=N;8(K 7.T.3g!=\'13\')7.T.3g=(7.T.1j<10)?6B:7.T.1j*5;8(7.29){7.29=4E(7.29)}8(I.1e){1e(I,\'3h S: \'+7.S);1e(I,\'3h 1l: \'+7.1l);8(7.3A)1e(I,\'6C \'+7.d[\'S\']+\': \'+7.3A);1e(I,\'5C 6D: \'+7.G.S);1e(I,\'5C 6E: \'+7.G.1l);1e(I,\'46 3z G P: \'+7.G.P);8(7.T.1H)1e(I,\'46 3z G 4F 6F: \'+7.T.G);8(7.17.Y)1e(I,\'46 3z G 4F 4G: \'+7.17.G);8(7.1a.Y)1e(I,\'46 3z G 4F 5D: \'+7.1a.G)}};A.5E=H(){A.1r(\'4r\',N);F a={\'4H\':A.16(\'4H\'),\'4I\':A.16(\'4I\'),\'3D\':A.16(\'3D\'),\'2M\':A.16(\'2M\'),\'2N\':A.16(\'2N\'),\'4B\':A.16(\'4B\'),\'1t\':A.16(\'1t\'),\'S\':A.16(\'S\'),\'1l\':A.16(\'1l\'),\'4J\':A.16(\'4J\'),\'1E\':A.16(\'1E\'),\'3X\':A.16(\'3X\'),\'4K\':A.16(\'4K\')};1x(a.3D){W\'4L\':F b=\'4L\';18;W\'5F\':F b=\'5F\';18;2w:F b=\'6G\'}$1A.16(a).16({\'6H\':\'2P\',\'3D\':b});A.1r(\'5G\',a).16({\'4H\':\'1t\',\'4I\':\'47\',\'3D\':\'4L\',\'2M\':0,\'1t\':0,\'4J\':0,\'1E\':0,\'3X\':0,\'4K\':0});8(7.1u){A.11().1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}};A.5H=H(){A.4M();A.14(L(\'4N\',I),H(e,a){e.1h();8(!C.20){8(7.T.Y){7.T.Y.2S(2q(\'48\',I))}}C.20=N;8(7.T.1H){7.T.1H=O;A.X(L(\'2T\',I),a)}J N});A.14(L(\'4O\',I),H(e){e.1h();8(C.1S){3E(R)}J N});A.14(L(\'2T\',I),H(e,a,b){e.1h();1F=3i(1F);8(a&&C.1S){R.20=N;F c=2x()-R.2U;R.1j-=c;8(R.1p)R.1p.1j-=c;8(R.1Q)R.1Q.1j-=c;3E(R,O)}8(!C.1X&&!C.1S){8(b)1F.3F+=2x()-1F.2U}8(!C.1X){8(7.T.Y){7.T.Y.2S(2q(\'5I\',I))}}C.1X=N;8(7.T.5J){F d=7.T.3g-1F.3F,3G=3H-1L.2v(d*3H/7.T.3g);7.T.5J.1z($19,3G,d)}J N});A.14(L(\'1H\',I),H(e,b,c,d){e.1h();1F=3i(1F);F v=[b,c,d],t=[\'1k\',\'13\',\'1s\'],a=2V(v,t);F b=a[0],c=a[1],d=a[2];8(b!=\'17\'&&b!=\'1a\')b=C.2k;8(K c!=\'13\')c=0;8(K d!=\'1s\')d=O;8(d){C.20=O;7.T.1H=N}8(!7.T.1H){e.21();J 1e(I,\'3h 48: 28 2W.\')}8(C.1X){8(7.T.Y){7.T.Y.2y(2q(\'48\',I));7.T.Y.2y(2q(\'5I\',I))}}C.1X=O;1F.2U=2x();F f=7.T.3g+c;3I=f-1F.3F;3G=3H-1L.2v(3I*3H/f);1F.T=6I(H(){8(7.T.5K){7.T.5K.1z($19,3G,3I)}8(C.1S){A.X(L(\'1H\',I),b)}Q{A.X(L(b,I),7.T)}},3I);8(7.T.5L){7.T.5L.1z($19,3G,3I)}J N});A.14(L(\'2X\',I),H(e){e.1h();8(R.20){R.20=O;C.1X=O;C.1S=N;R.2U=2x();2a(R)}Q{A.X(L(\'1H\',I))}J N});A.14(L(\'17\',I)+\' \'+L(\'1a\',I),H(e,b,f,g){e.1h();8(C.20||A.1W(\':2P\')){e.21();J 1e(I,\'3h 48 6J 2P: 28 2W.\')}8(7.G.3e>=M.U){e.21();J 1e(I,\'28 5M G (\'+M.U+\', \'+7.G.3e+\' 5N): 28 2W.\')}F v=[b,f,g],t=[\'1o\',\'13/1k\',\'H\'],a=2V(v,t);F b=a[0],f=a[1],g=a[2];F h=e.4P.1c(I.3j.3J.V);8(K b!=\'1o\'||b==2b)b=7[h];8(K g==\'H\')b.22=g;8(K f!=\'13\'){8(7.G.1v!=\'*\'){f=\'P\'}Q{F i=[f,b.G,7[h].G];1m(F a=0,l=i.V;a<l;a++){8(K i[a]==\'13\'||i[a]==\'5O\'||i[a]==\'P\'){f=i[a];18}}}1x(f){W\'5O\':e.21();J A.1D(h+\'6K\',[b,g]);18;W\'P\':8(!7.G.12.1d&&7.G.1v==\'*\'){f=7.G.P}18}}8(R.20){A.X(L(\'2X\',I));A.X(L(\'3k\',I),[h,[b,f,g]]);e.21();J 1e(I,\'3h 6L 2W.\')}8(b.1j>0){8(C.1S){8(b.3k)A.X(L(\'3k\',I),[h,[b,f,g]]);e.21();J 1e(I,\'3h 6M 2W.\')}}8(b.4Q&&!b.4Q.1z($19)){e.21();J 1e(I,\'6N "4Q" 6O O.\')}1F.3F=0;A.X(L(\'5P\'+h,I),[b,f]);8(7.29){F s=7.29,c=[b,f];1m(F j=0,l=s.V;j<l;j++){F d=h;8(!s[j][2])d=(d==\'17\')?\'1a\':\'17\';8(!s[j][1])c[0]=s[j][0].1D(\'34\',[\'5Q\',d]);c[1]=f+s[j][3];s[j][0].X(\'34\',[\'5P\'+d,c])}}J N});A.14(L(\'6P\',I),H(e,f,g){e.1h();F h=A.11();8(!7.1M){8(M.Z==0){8(7.3l){A.X(L(\'1a\',I),M.U-1)}J e.21()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.12.1d){g=4a(h,7,M.U-1)}Q 8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5R(h,7,M.U-1,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}8(!7.1M){8(M.U-g<M.Z){g=M.U-M.Z}}7.G.12.2m=7.G.P;8(7.G.12.1d){F j=2Q(h,7,M.U-g);8(7.G.P+g<=j&&g<M.U){g++;j=2Q(h,7,M.U-g)}7.G.P=2R(j,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F j=3B(h,7,M.U-g);7.G.P=2R(j,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,N);8(g==0){e.21();J 1e(I,\'0 G 41 1n: 28 2W.\')}1e(I,\'5S \'+g+\' G 4G.\');M.Z+=g;23(M.Z>=M.U){M.Z-=M.U}8(!7.1M){8(M.Z==0&&f.4c)f.4c.1z($19);8(!7.3l)2z(7,M.Z,I)}A.11().1c(M.U-g,M.U).6Q(A);8(M.U<7.G.P+g){A.11().1c(0,(7.G.P+g)-M.U).4d(N).3K(A)}F h=A.11(),2r=5T(h,7,g),1T=5U(h,7),2c=h.1O(g-1),2d=2r.2Y(),2A=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),k=p[0],2s=p[1]}Q{F k=0,2s=0}F l=(k<0)?7.1i[7.d[3]]:0;8(f.1I==\'5V\'&&7.G.P<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2P\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2B(1T,7,N),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1u){1N(h,7,N);8(2s>=0){1N(2d,7,7.1i[7.d[1]])}1N(2c,7,7.1i[7.d[3]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=k}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=24(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=7.1i[7.d[3]];8(2A.4S(2c).V){F r={};r[7.d[\'1E\']]=2c.1r(\'1R\');8(k<0)2c.16(r);Q R.1f.1q([2c,r])}8(2A.4S(2d).V){F s={};s[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,s])}8(2s>=0){F t={};t[7.d[\'1E\']]=2A.1r(\'1R\')+7.1i[7.d[1]];R.1f.1q([2A,t])}}Q{F q=0}o[7.d[\'1t\']]=q;F u=[2r,1T,2e,1w];8(f.2f)f.2f.3L($19,u);1Y.2f=3M(1Y.2f,$19,u);1x(f.1I){W\'2C\':W\'2g\':W\'2D\':W\'2h\':R.1p=24(R.1j,R.1G);R.1Q=24(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2D\':W\'2h\':F v=A.4d().3K($1A);18}1x(f.1I){W\'2h\':v.11().1c(0,g).1U();W\'2g\':W\'2D\':v.11().1c(7.G.P).1U();18}1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2D\':R=4T(R,A,v,7,N);18;W\'2h\':R=4U(R,A,v,7,N,g);18}F w=H(){F b=7.G.P+g-M.U;8(b>0){A.11().1c(M.U).1U();2r=$(A.11().1c(M.U-(7.G.P-b)).4h().5W(A.11().1c(0,b).4h()))}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){F c=A.11().1O(7.G.P+g-1);c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=24(R.4V,R.1G);F d=H(){1x(f.1I){W\'2C\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=24(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.22)f.22.3L($19,a);1Y.22=3M(1Y.22,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':1},d]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},d]);2a(R.1p);18;2w:d();18}};R.1f.1q([A,o,w]);C.1S=N;A.16(7.d[\'1t\'],-(n-l));1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3w\',I)));A.X(L(\'2E\',I),[O,2e]);J N});A.14(L(\'6R\',I),H(e,f,g){e.1h();F h=A.11();8(!7.1M){8(M.Z==7.G.P){8(7.3l){A.X(L(\'17\',I),M.U-1)}J e.21()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5Y(h,7,0,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}F j=(M.Z==0)?M.U:M.Z;8(!7.1M){8(7.G.12.1d){F k=2Q(h,7,g),i=4a(h,7,j-1)}Q{F k=7.G.P,i=7.G.P}8(g+k>j){g=j-i}}7.G.12.2m=7.G.P;8(7.G.12.1d){F k=4X(h,7,g,j);23(7.G.P-g>=k&&g<M.U){g++;k=4X(h,7,g,j)}7.G.P=2R(k,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F k=3B(h,7,g);7.G.P=2R(k,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,N);8(g==0){e.21();J 1e(I,\'0 G 41 1n: 28 2W.\')}1e(I,\'5S \'+g+\' G 5D.\');M.Z-=g;23(M.Z<0){M.Z+=M.U}8(!7.1M){8(M.Z==7.G.P&&f.4c)f.4c.1z($19);8(!7.3l)2z(7,M.Z,I)}8(M.U<7.G.P+g){A.11().1c(0,(7.G.P+g)-M.U).4d(N).3K(A)}F h=A.11(),2r=4Y(h,7),1T=4Z(h,7,g),2c=h.1O(g-1),2d=2r.2Y(),2A=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),l=p[0],2s=p[1]}Q{F l=0,2s=0}8(f.1I==\'5V\'&&7.G.12.2m<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2P\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2B(1T,7,N),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1B){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}8(7.1u){1N(h,7,N);1N(2d,7,7.1i[7.d[1]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=l}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=24(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=2A.1r(\'1R\');8(2s>=0){q+=7.1i[7.d[1]]}2A.16(7.d[\'1E\'],q);8(2c.4S(2d).V){F r={};r[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,r])}F s=2c.1r(\'1R\');8(l>=0){s+=7.1i[7.d[3]]}F t={};t[7.d[\'1E\']]=s;R.1f.1q([2c,t])}o[7.d[\'1t\']]=-n;8(l<0){o[7.d[\'1t\']]+=l}F u=[2r,1T,2e,1w];8(f.2f)f.2f.3L($19,u);1Y.2f=3M(1Y.2f,$19,u);1x(f.1I){W\'2C\':W\'2g\':W\'2D\':W\'2h\':R.1p=24(R.1j,R.1G);R.1Q=24(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2D\':W\'2h\':F v=A.4d().3K($1A);18}1x(f.1I){W\'2h\':v.11().1c(7.G.12.2m).1U();18;W\'2g\':W\'2D\':v.11().1c(0,g).1U();v.11().1c(7.G.P).1U();18}1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2D\':R=4T(R,A,v,7,O);18;W\'2h\':R=4U(R,A,v,7,O,g);18}F w=H(){F b=7.G.P+g-M.U,5Z=(7.1u)?7.1i[7.d[3]]:0;A.16(7.d[\'1t\'],5Z);8(b>0){A.11().1c(M.U).1U()}F c=A.11().1c(0,g).3K(A).2Y();8(b>0){1T=3d(h,7)}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){8(M.U<7.G.P+g){F d=A.11().1O(7.G.P-1);d.16(7.d[\'1E\'],d.1r(\'1R\')+7.1i[7.d[3]])}c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=24(R.4V,R.1G);F e=H(){1x(f.1I){W\'2C\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=24(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.22)f.22.3L($19,a);1Y.22=3M(1Y.22,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2C\':R.1p.1f.1q([A,{\'2i\':1},e]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},e]);2a(R.1p);18;2w:e();18}};R.1f.1q([A,o,w]);C.1S=N;1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3w\',I)));A.X(L(\'2E\',I),[O,2e]);J N});A.14(L(\'2Z\',I),H(e,b,c,d,f,g,h){e.1h();F v=[b,c,d,f,g,h],t=[\'1k/13/1o\',\'13\',\'1s\',\'1o\',\'1k\',\'H\'],a=2V(v,t);F f=a[3],g=a[4],h=a[5];b=3n(a[0],a[1],a[2],M,A);8(b==0)J;8(K f!=\'1o\')f=O;8(C.1S){8(K f!=\'1o\'||f.1j>0)J O}8(g!=\'17\'&&g!=\'1a\'){8(7.1M){8(b<=M.U/2)g=\'1a\';Q g=\'17\'}Q{8(M.Z==0||M.Z>b)g=\'1a\';Q g=\'17\'}}8(g==\'17\')b=M.U-b;A.X(L(g,I),[f,b,h]);J N});A.14(L(\'6S\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3N\',I));J A.1D(L(\'51\',I),[c-1,a,\'17\',b])});A.14(L(\'6T\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3N\',I));J A.1D(L(\'51\',I),[c+1,a,\'1a\',b])});A.14(L(\'51\',I),H(e,a,b,c,d){e.1h();8(K a!=\'13\')a=A.1D(L(\'3N\',I));F f=7.1b.G||7.G.P,27=1L.2v(M.U/f)-1;8(a<0)a=27;8(a>27)a=0;J A.1D(L(\'2Z\',I),[a*f,0,N,b,c,d])});A.14(L(\'60\',I),H(e,s){e.1h();8(s)s=3n(s,0,N,M,A);Q s=0;s+=M.Z;8(s!=0){23(s>M.U)s-=M.U;A.6U(A.11().1c(s,M.U))}J N});A.14(L(\'29\',I),H(e,s){e.1h();8(s)s=4E(s);Q 8(7.29)s=7.29;Q J 1e(I,\'5s 6V 41 29.\');F n=A.1D(L(\'3w\',I)),x=N;1m(F j=0,l=s.V;j<l;j++){8(!s[j][0].1D(L(\'2Z\',I),[n,s[j][3],N])){x=O}}J x});A.14(L(\'3k\',I),H(e,a,b){e.1h();8(K a==\'H\'){a.1z($19,1V)}Q 8(31(a)){1V=a}Q 8(K a!=\'1y\'){1V.1q([a,b])}J 1V});A.14(L(\'6W\',I),H(e,b,c,d,f){e.1h();F v=[b,c,d,f],t=[\'1k/1o\',\'1k/13/1o\',\'1s\',\'13\'],a=2V(v,t);F b=a[0],c=a[1],d=a[2],f=a[3];8(K b==\'1o\'&&K b.3o==\'1y\')b=$(b);8(K b==\'1k\')b=$(b);8(K b!=\'1o\'||K b.3o==\'1y\'||b.V==0)J 1e(I,\'28 a 4w 1o.\');8(K c==\'1y\')c=\'4i\';8(7.1u){b.1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}F g=c,3O=\'3O\';8(c==\'4i\'){8(d){8(M.Z==0){c=M.U-1;3O=\'61\'}Q{c=M.Z;M.Z+=b.V}8(c<0)c=0}Q{c=M.U-1;3O=\'61\'}}Q{c=3n(c,f,d,M,A)}8(g!=\'4i\'&&!d){8(c<M.Z)M.Z+=b.V}8(M.Z>=M.U)M.Z-=M.U;F h=A.11().1O(c);8(h.V){h[3O](b)}Q{A.62(b)}M.U=A.11().V;F i=A.1D(\'52\');3p(7,M.U,I);2z(7,M.Z,I);A.X(L(\'53\',I));A.X(L(\'2E\',I),[N,i]);J N});A.14(L(\'63\',I),H(e,c,d,f){e.1h();F v=[c,d,f],t=[\'1k/13/1o\',\'1s\',\'13\'],a=2V(v,t);c=a[0];d=a[1];f=a[2];F g=O;8(c 64 $&&c.V>1){h=$();c.1K(H(i,a){F b=A.X(L(\'63\',I),[$(1g),d,f]);8(b)h=h.6X(b)});J h}8(K c==\'1y\'||c==\'4i\'){h=A.11().2Y()}Q{c=3n(c,f,d,M,A);F h=A.11().1O(c);8(h.V){8(c<M.Z)M.Z-=h.V}}8(h&&h.V){h.6Y();M.U=A.11().V;F j=A.1D(\'52\');3p(7,M.U,I);2z(7,M.Z,I);A.X(L(\'2E\',I),[N,j])}J h});A.14(L(\'2f\',I)+\' \'+L(\'22\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3J.V);8(31(a))1Y[b]=a;8(K a==\'H\')1Y[b].1q(a);J 1Y[b]});A.14(L(\'3w\',I),H(e,a){e.1h();8(M.Z==0)F b=0;Q F b=M.U-M.Z;8(K a==\'H\')a.1z($19,b);J b});A.14(L(\'3N\',I),H(e,a){e.1h();F b=7.1b.G||7.G.P;F c=1L.2v(M.U/b-1);8(M.Z==0)F d=0;Q 8(M.Z<M.U%b)F d=0;Q 8(M.Z==b&&!7.1M)F d=c;Q F d=1L.6Z((M.U-M.Z)/b);8(d<0)d=0;8(d>c)d=c;8(K a==\'H\')a.1z($19,d);J d});A.14(L(\'70\',I),H(e,a){e.1h();$i=3d(A.11(),7);8(K a==\'H\')a.1z($19,$i);J $i});A.14(L(\'1c\',I),H(e,f,l,b){e.1h();8(M.U==0)J O;F v=[f,l,b],t=[\'13\',\'13\',\'H\'],a=2V(v,t);f=(K a[0]==\'13\')?a[0]:0;l=(K a[1]==\'13\')?a[1]:M.U;b=a[2];f+=M.Z;l+=M.Z;23(f>M.U){f-=M.U}23(l>M.U){l-=M.U}23(f<0){f+=M.U}23(l<0){l+=M.U}F c=A.11();8(l>f){F d=c.1c(f,l)}Q{F d=$(c.1c(f,M.U).4h().5W(c.1c(0,l).4h()))}8(K b==\'H\')b.1z($19,d);J d});A.14(L(\'1X\',I)+\' \'+L(\'20\',I)+\' \'+L(\'1S\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3J.V);8(K a==\'H\')a.1z($19,C[b]);J C[b]});A.14(L(\'5Q\',I),H(e,a,b,c){e.1h();F d=O;8(K a==\'H\'){a.1z($19,7)}Q 8(K a==\'1o\'){2u=$.25(N,{},2u,a);8(b!==O)d=N;Q 7=$.25(N,{},7,a)}Q 8(K a!=\'1y\'){8(K b==\'H\'){F f=4j(\'7.\'+a);8(K f==\'1y\')f=\'\';b.1z($19,f)}Q 8(K b!=\'1y\'){8(K c!==\'1s\')c=N;4j(\'2u.\'+a+\' = b\');8(c!==O)d=N;Q 4j(\'7.\'+a+\' = b\')}Q{J 4j(\'7.\'+a)}}8(d){1N(A.11(),7);A.3V(2u);A.54();F g=3P(A,7,O);A.X(L(\'2E\',I),[N,g])}J 7});A.14(L(\'53\',I),H(e,a,b){e.1h();8(K a==\'1y\'||a.V==0)a=$(\'71\');Q 8(K a==\'1k\')a=$(a);8(K a!=\'1o\')J 1e(I,\'28 a 4w 1o.\');8(K b!=\'1k\'||b.V==0)b=\'a.65\';a.72(b).1K(H(){F h=1g.66||\'\';8(h.V>0&&A.11().68($(h))!=-1){$(1g).1Z(\'55\').55(H(e){e.2j();A.X(L(\'2Z\',I),h)})}});J N});A.14(L(\'2E\',I),H(e,b,c){e.1h();8(!7.1b.1C)J;8(b){F d=7.1b.G||7.G.P,l=1L.2v(M.U/d);8(7.1b.3f){7.1b.1C.11().1U();7.1b.1C.1K(H(){1m(F a=0;a<l;a++){F i=A.11().1O(3n(a*d,0,N,M,A));$(1g).62(7.1b.3f(a+1,i))}})}7.1b.1C.1K(H(){$(1g).11().1Z(7.1b.3q).1K(H(a){$(1g).14(7.1b.3q,H(e){e.2j();A.X(L(\'2Z\',I),[a*d,0,N,7.1b])})})})}7.1b.1C.1K(H(){$(1g).11().2y(2q(\'69\',I)).1O(A.1D(L(\'3N\',I))).2S(2q(\'69\',I))});J N});A.14(L(\'52\',I),H(e){F a=A.11(),3Q=7.G.P;8(7.G.12.1d)3Q=2Q(a,7,0);Q 8(7.G.1v!=\'*\')3Q=3B(a,7,0);8(!7.1M&&M.Z!=0&&3Q>M.Z){8(7.G.12.1d){F b=4a(a,7,M.Z)-M.Z}Q 8(7.G.1v!=\'*\'){F b=6a(a,7,M.Z)-M.Z}Q{b=7.G.P-M.Z}1e(I,\'73 74-1M: 75 \'+b+\' G 4G.\');A.X(\'17\',b)}7.G.P=2R(3Q,7,7.G.12.2l,$19);J 3P(A,7)});A.14(L(\'5t\',I),H(e,a){e.1h();1F=3i(1F);A.1r(\'4r\',O);A.X(L(\'4O\',I));8(a){A.X(L(\'60\',I))}8(7.1u){1N(A.11(),7)}A.16(A.1r(\'5G\'));A.4M();A.56();$1A.76(A);J N});A.14(\'34\',H(e,n,o){e.1h();J A.1D(L(n,I),o)})};A.4M=H(){A.1Z(L(\'\',I));A.1Z(L(\'\',I,O));A.1Z(\'34\')};A.54=H(){A.56();3p(7,M.U,I);2z(7,M.Z,I);8(7.T.2t){F c=3r(7.T.2t);$1A.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}8(7.T.Y){7.T.Y.14(L(7.T.3q,I,O),H(e){e.2j();F a=O,c=2b;8(C.1X){a=\'1H\'}Q 8(7.T.45){a=\'2T\';c=3r(7.T.45)}8(a){A.X(L(a,I),c)}})}8(7.17.Y){7.17.Y.14(L(7.17.3q,I,O),H(e){e.2j();A.X(L(\'17\',I))});8(7.17.2t){F c=3r(7.17.2t);7.17.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}}8(7.1a.Y){7.1a.Y.14(L(7.1a.3q,I,O),H(e){e.2j();A.X(L(\'1a\',I))});8(7.1a.2t){F c=3r(7.1a.2t);7.1a.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}}8($.1P.2F){8(7.17.2F){8(!C.57){C.57=N;$1A.2F(H(e,a){8(a>0){e.2j();F b=59(7.17.2F);A.X(L(\'17\',I),b)}})}}8(7.1a.2F){8(!C.5a){C.5a=N;$1A.2F(H(e,a){8(a<0){e.2j();F b=59(7.1a.2F);A.X(L(\'1a\',I),b)}})}}}8($.1P.3R){F d=(7.17.5b)?H(){A.X(L(\'17\',I))}:2b,3S=(7.1a.5b)?H(){A.X(L(\'1a\',I))}:2b;8(3S||3S){8(!C.3R){C.3R=N;F f={\'77\':30,\'78\':30,\'79\':N};1x(7.2k){W\'4u\':W\'6b\':f.7a=d;f.7b=3S;18;2w:f.7c=3S;f.7d=d}$1A.3R(f)}}}8(7.1b.1C){8(7.1b.2t){F c=3r(7.1b.2t);7.1b.1C.14(L(\'4k\',I,O),H(){A.X(L(\'2T\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2X\',I))})}}8(7.17.2G||7.1a.2G){$(3T).14(L(\'6c\',I,O,N,N),H(e){F k=e.6d;8(k==7.1a.2G){e.2j();A.X(L(\'1a\',I))}8(k==7.17.2G){e.2j();A.X(L(\'17\',I))}})}8(7.1b.44){$(3T).14(L(\'6c\',I,O,N,N),H(e){F k=e.6d;8(k>=49&&k<58){k=(k-49)*7.G.P;8(k<=M.U){e.2j();A.X(L(\'2Z\',I),[k,0,N,7.1b])}}})}8(7.T.1H){A.X(L(\'1H\',I),7.T.4C)}8(C.4t){F g=$(3s),5c=g.S(),5d=g.1l();g.14(L(\'7e\',I,O,N,N),H(e){8(g.S()!=5c||g.1l()!=5d){A.X(L(\'4O\',I));8(7.T.4D&&!C.1X){A.X(L(\'1H\',I))}1N(A.11(),7);A.3V(2u);F a=3P(A,7,O);3p(7,M.U,I);2z(7,M.Z,I);A.X(L(\'2E\',I),[N,a]);5c=g.S();5d=g.1l()}})}};A.56=H(){F a=L(\'\',I),3t=L(\'\',I,O);5e=L(\'\',I,O,N,N);$(3T).1Z(5e);$(3s).1Z(5e);$1A.1Z(3t);8(7.T.Y)7.T.Y.1Z(3t);8(7.17.Y)7.17.Y.1Z(3t);8(7.1a.Y)7.1a.Y.1Z(3t);8(7.1b.1C){7.1b.1C.1Z(3t);8(7.1b.3f){7.1b.1C.11().1U()}}3p(7,\'3b\',I);2z(7,\'2y\',I)};F C={\'2k\':\'1a\',\'1X\':N,\'1S\':O,\'20\':O,\'5a\':O,\'57\':O,\'3R\':O},M={\'U\':A.11().V,\'Z\':0},1F={\'7f\':2b,\'T\':2b,\'3k\':2b,\'2U\':2x(),\'3F\':0},R={\'20\':O,\'1j\':0,\'2U\':0,\'1G\':\'\',\'1f\':[]},1Y={\'2f\':[],\'22\':[]},1V=[],I=$.25(N,{},$.1P.1J.6e,z),7={},2u=y,$1A=A.7g(\'<\'+I.5f.4q+\' 7h="\'+I.5f.6f+\'" />\').3a();I.3U=A.3U;I.4m=$.1P.1J.4m++;A.3V(2u,N,B);A.5E();A.5H();A.54();8(31(7.G.2J)){F D=7.G.2J}Q{F D=[];8(7.G.2J!=0){D.1q(7.G.2J)}}8(7.2n){D.7i(6g(7.2n))}8(D.V>0){1m(F a=0,l=D.V;a<l;a++){F s=D[a];8(s==0){5g}8(s===N){s=3s.7j.66;8(s.V<1){5g}}Q 8(s===\'6h\'){s=1L.3y(1L.6h()*M.U)}8(A.1D(L(\'2Z\',I),[s,0,N,{1I:\'47\'}])){18}}}F E=3P(A,7,O),6i=3d(A.11(),7);8(7.6j){7.6j.1z($19,6i,E)}A.X(L(\'2E\',I),[N,E]);A.X(L(\'53\',I));J A};$.1P.1J.4m=1;$.1P.1J.4s={\'29\':O,\'3l\':N,\'1M\':N,\'2K\':O,\'2k\':\'1t\',\'G\':{\'2J\':0},\'1n\':{\'1G\':\'7k\',\'1j\':5A,\'2t\':O,\'2F\':O,\'5b\':O,\'3q\':\'55\',\'3k\':O}};$.1P.1J.6e={\'1e\':O,\'3j\':{\'3J\':\'\',\'6k\':\'7l\'},\'5f\':{\'4q\':\'7m\',\'6f\':\'7n\'},\'5h\':{}};$.1P.1J.5B=H(a,b){J\'<a 7o="#"><6l>\'+a+\'</6l></a>\'};H 24(d,e){J{1f:[],1j:d,4V:d,1G:e,2U:2x()}}H 2a(s){8(K s.1p==\'1o\'){2a(s.1p)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];8(!b)5g;8(b[3])b[0].4N();b[0].6m(b[1],{6n:b[2],1j:s.1j,1G:s.1G})}8(K s.1Q==\'1o\'){2a(s.1Q)}}H 3E(s,c){8(K c!=\'1s\')c=N;8(K s.1p==\'1o\'){3E(s.1p,c)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];b[0].4N(N);8(c){b[0].16(b[1]);8(K b[2]==\'H\')b[2]()}}8(K s.1Q==\'1o\'){3E(s.1Q,c)}}H 3i(t){8(t.T)7p(t.T);J t}H 3M(b,t,c){8(b.V){1m(F a=0,l=b.V;a<l;a++){b[a].3L(t,c)}}J[]}H 7q(a,c,x,d,f){F o={\'1j\':d,\'1G\':a.1G};8(K f==\'H\')o.6n=f;c.6m({2i:x},o)}H 4T(a,b,c,o,d){F e=2B(4Y(b.11(),o),o,N)[0],5i=2B(c.11(),o,N)[0],4n=(d)?-5i:e,2H={},3u={};2H[o.d[\'S\']]=5i;2H[o.d[\'1t\']]=4n;3u[o.d[\'1t\']]=0;a.1p.1f.1q([b,{\'2i\':1}]);a.1Q.1f.1q([c,3u,H(){$(1g).1U()}]);c.16(2H);J a}H 4U(a,b,c,o,d,n){F e=2B(4Z(b.11(),o,n),o,N)[0],5j=2B(c.11(),o,N)[0],4n=(d)?-5j:e,2H={},3u={};2H[o.d[\'S\']]=5j;2H[o.d[\'1t\']]=0;3u[o.d[\'1t\']]=4n;a.1Q.1f.1q([c,3u,H(){$(1g).1U()}]);c.16(2H);J a}H 3p(o,t,c){8(t==\'3c\'||t==\'3b\'){F f=t}Q 8(o.G.3e>=t){1e(c,\'28 5M G: 7r 7s (\'+t+\' G, \'+o.G.3e+\' 5N).\');F f=\'3b\'}Q{F f=\'3c\'}F s=(f==\'3c\')?\'2y\':\'2S\',h=2q(\'2P\',c);8(o.T.Y)o.T.Y[f]()[s](h);8(o.17.Y)o.17.Y[f]()[s](h);8(o.1a.Y)o.1a.Y[f]()[s](h);8(o.1b.1C)o.1b.1C[f]()[s](h)}H 2z(o,f,c){8(o.1M||o.3l)J;F a=(f==\'2y\'||f==\'2S\')?f:O,4o=2q(\'7t\',c);8(o.T.Y&&a){o.T.Y[a](4o)}8(o.17.Y){F b=a||(f==0)?\'2S\':\'2y\';o.17.Y[b](4o)}8(o.1a.Y){F b=a||(f==o.G.P)?\'2S\':\'2y\';o.1a.Y[b](4o)}}H 3W(a,b){8(K b==\'H\')b=b.1z(a);8(K b==\'1y\')b={};J b}H 3C(a,b,c){8(K c!=\'1k\')c=\'\';b=3W(a,b);8(K b==\'1k\'){F d=5k(b);8(d==-1)b=$(b);Q b=d}8(c==\'1b\'){8(K b==\'1s\')b={\'44\':b};8(K b.3o!=\'1y\')b={\'1C\':b};8(K b.1C==\'H\')b.1C=b.1C.1z(a);8(K b.1C==\'1k\')b.1C=$(b.1C);8(K b.G!=\'13\')b.G=O}Q 8(c==\'T\'){8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'1s\')b={\'1H\':b};8(K b==\'13\')b={\'3g\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y)}Q{8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'13\')b={\'2G\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y);8(K b.2G==\'1k\')b.2G=5k(b.2G)}J b}H 3n(a,b,c,d,e){8(K a==\'1k\'){8(2p(a))a=$(a);Q a=2o(a)}8(K a==\'1o\'){8(K a.3o==\'1y\')a=$(a);a=e.11().68(a);8(a==-1)a=0;8(K c!=\'1s\')c=O}Q{8(K c!=\'1s\')c=N}8(2p(a))a=0;Q a=2o(a);8(2p(b))b=0;Q b=2o(b);8(c){a+=d.Z}a+=b;8(d.U>0){23(a>=d.U){a-=d.U}23(a<0){a+=d.U}}J a}H 4a(i,o,s){F t=0,x=0;1m(F a=s;a>=0;a--){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](N):0;8(t>o.3A)J x;8(a==0)a=i.V;x++}}H 6a(i,o,s){J 5l(i,o.G.1v,o.G.12.42,s)}H 5R(i,o,s,m){J 5l(i,o.G.1v,m,s)}H 5l(i,f,m,s){F t=0,x=0;1m(F a=s,l=i.V;a>=0;a--){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==0)a=l}}H 4R(a,o){J o.G.12.42||a.11().1c(0,o.G.P).1v(o.G.1v).V}H 2Q(i,o,s){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](N):0;8(t>o.3A)J x;x++;8(x==l+1)J x;8(a==l)a=-1}}H 4X(i,o,s,l){F v=2Q(i,o,s);8(!o.1M){8(s+v>l)v=l-s}J v}H 3B(i,o,s){J 5m(i,o.G.1v,o.G.12.42,s,o.1M)}H 5Y(i,o,s,m){J 5m(i,o.G.1v,m+1,s,o.1M)-1}H 5m(i,f,m,s,c){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==l)a=-1}}H 3d(i,o){J i.1c(0,o.G.P)}H 5T(i,o,n){J i.1c(n,o.G.12.2m+n)}H 5U(i,o){J i.1c(0,o.G.P)}H 4Y(i,o){J i.1c(0,o.G.12.2m)}H 4Z(i,o,n){J i.1c(n,o.G.P+n)}H 1N(i,o,m){F x=(K m==\'1s\')?m:O;8(K m!=\'13\')m=0;i.1K(H(){F j=$(1g);F t=2o(j.16(o.d[\'1E\']));8(2p(t))t=0;j.1r(\'6o\',t);j.16(o.d[\'1E\'],((x)?j.1r(\'6o\'):m+j.1r(\'1R\')))})}H 3P(a,o,p){F b=a.3a(),$i=a.11(),$v=3d($i,o),4p=4g(2B($v,o,N),o,p);b.16(4p);8(o.1u){F p=o.1i,r=p[o.d[1]];8(o.1B){8(r<0)r=0}F c=$v.2Y();c.16(o.d[\'1E\'],c.1r(\'1R\')+r);a.16(o.d[\'2M\'],p[o.d[0]]);a.16(o.d[\'1t\'],p[o.d[3]])}a.16(o.d[\'S\'],4p[o.d[\'S\']]+(3m($i,o,\'S\')*2));a.16(o.d[\'1l\'],5n($i,o,\'1l\'));J 4p}H 2B(i,o,a){F b=3m(i,o,\'S\',a),6p=5n(i,o,\'1l\',a);J[b,6p]}H 5n(i,o,a,b){8(K b!=\'1s\')b=O;8(K o[o.d[a]]==\'13\'&&b)J o[o.d[a]];8(K o.G[o.d[a]]==\'13\')J o.G[o.d[a]];F c=(a.5o().32(\'S\')>-1)?\'26\':\'2L\';J 3x(i,o,c)}H 3x(i,o,b){F s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F m=(j.1W(\':P\'))?j[o.d[b]](N):0;8(s<m)s=m}J s}H 36(b,o,c){8(!b.1W(\':P\'))J 0;F d=b[o.d[c]](),5p=(o.d[c].5o().32(\'S\')>-1)?[\'7u\',\'7v\']:[\'7w\',\'7x\'];1m(F a=0,l=5p.V;a<l;a++){F m=2o(b.16(5p[a]));d-=(2p(m))?0:m}J d}H 3m(i,o,b,c){8(K c!=\'1s\')c=O;8(K o[o.d[b]]==\'13\'&&c)J o[o.d[b]];8(K o.G[o.d[b]]==\'13\')J o.G[o.d[b]]*i.V;F d=(b.5o().32(\'S\')>-1)?\'26\':\'2L\',s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);s+=(j.1W(\':P\'))?j[o.d[d]](N):0}J s}H 4v(i,o,b){F s=O,v=O;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F c=(j.1W(\':P\'))?j[o.d[b]](N):0;8(s===O)s=c;Q 8(s!=c)v=N;8(s==0)v=N}J v}H 5y(i,o,d){J i[o.d[\'7y\'+d]](N)-36(i,o,\'7z\'+d)}H 3Y(x){J(K x==\'1k\'&&x.1c(-1)==\'%\')}H 3Z(s,o){8(3Y(o)){o=o.1c(0,-1);8(2p(o))J s;s*=o/3H}J s}H L(n,c,a,b,d){8(K a!=\'1s\')a=N;8(K b!=\'1s\')b=N;8(K d!=\'1s\')d=O;8(a)n=c.3j.3J+n;8(b)n=n+\'.\'+c.3j.6k;8(b&&d)n+=c.4m;J n}H 2q(n,c){J(K c.5h[n]==\'1k\')?c.5h[n]:n}H 4g(a,o,p){8(K p!=\'1s\')p=N;F b=(o.1u&&p)?o.1i:[0,0,0,0];F c={};c[o.d[\'S\']]=a[0]+b[1]+b[3];c[o.d[\'1l\']]=a[1]+b[0]+b[2];J c}H 2V(c,d){F e=[];1m(F a=0,6q=c.V;a<6q;a++){1m(F b=0,6r=d.V;b<6r;b++){8(d[b].32(K c[a])>-1&&K e[b]==\'1y\'){e[b]=c[a];18}}}J e}H 5z(p){8(K p==\'1y\')J[0,0,0,0];8(K p==\'13\')J[p,p,p,p];Q 8(K p==\'1k\')p=p.3v(\'7A\').6s(\'\').3v(\'7B\').6s(\'\').3v(\' \');8(!31(p)){J[0,0,0,0]}1m(F i=0;i<4;i++){p[i]=2o(p[i])}1x(p.V){W 0:J[0,0,0,0];W 1:J[p[0],p[0],p[0],p[0]];W 2:J[p[0],p[1],p[0],p[1]];W 3:J[p[0],p[1],p[2],p[1]];2w:J[p[0],p[1],p[2],p[3]]}}H 43(a,o){F x=(K o[o.d[\'S\']]==\'13\')?1L.2v(o[o.d[\'S\']]-3m(a,o,\'S\')):0;1x(o.1B){W\'1t\':J[0,x];W\'2N\':J[x,0];W\'4x\':2w:J[1L.2v(x/2),1L.3y(x/2)]}}H 4b(x,o,a,b){F v=x;8(K a==\'H\'){v=a.1z(b,v)}Q 8(K a==\'1k\'){F p=a.3v(\'+\'),m=a.3v(\'-\');8(m.V>p.V){F c=N,5q=m[0],2I=m[1]}Q{F c=O,5q=p[0],2I=p[1]}1x(5q){W\'7C\':v=(x%2==1)?x-1:x;18;W\'7D\':v=(x%2==0)?x-1:x;18;2w:v=x;18}2I=2o(2I);8(!2p(2I)){8(c)2I=-2I;v+=2I}}8(K v!=\'13\')v=1;8(v<1)v=1;J v}H 2R(x,o,a,b){J 4y(4b(x,o,a,b),o.G.12)}H 4y(v,i){8(K i.2O==\'13\'&&v<i.2O)v=i.2O;8(K i.27==\'13\'&&v>i.27)v=i.27;8(v<1)v=1;J v}H 4E(s){8(!31(s))s=[[s]];8(!31(s[0]))s=[s];1m(F j=0,l=s.V;j<l;j++){8(K s[j][0]==\'1k\')s[j][0]=$(s[j][0]);8(K s[j][1]!=\'1s\')s[j][1]=N;8(K s[j][2]!=\'1s\')s[j][2]=N;8(K s[j][3]!=\'13\')s[j][3]=0}J s}H 5k(k){8(k==\'2N\')J 39;8(k==\'1t\')J 37;8(k==\'4u\')J 38;8(k==\'6b\')J 40;J-1}H 4W(n,v){8(n)3T.2n=n+\'=\'+v+\'; 7E=/\'}H 6g(n){n+=\'=\';F b=3T.2n.3v(\';\');1m(F a=0,l=b.V;a<l;a++){F c=b[a];23(c.7F(0)==\' \'){c=c.1c(1)}8(c.32(n)==0){J c.1c(n.V)}}J 0}H 3r(p){8(p&&K p==\'1k\'){F i=(p.32(\'7G\')>-1)?N:O,r=(p.32(\'2X\')>-1)?N:O}Q{F i=r=O}J[i,r]}H 59(a){J(K a==\'13\')?a:2b}H 31(a){J K(a)==\'1o\'&&(a 64 7H)}H 2x(){J 7I 7J().2x()}H 1e(d,m){8(K d==\'1o\'){F s=\' (\'+d.3U+\')\';d=d.1e}Q{F s=\'\'}8(!d)J O;8(K m==\'1k\')m=\'1J\'+s+\': \'+m;Q m=[\'1J\'+s+\':\',m];8(3s.5r&&3s.5r.6t)3s.5r.6t(m);J O}$.1P.65=H(o,c){J 1g.1J(o,c)};$.25($.1G,{\'7K\':H(t){F a=t*t;J t*(-a*t+4*a-6*t+4)},\'7L\':H(t){J t*(4*t*t-9*t+6)},\'7M\':H(t){F a=t*t;J t*(33*a*a-7N*a*t+7O*a-67*t+15)}})})(7P);', 62, 486, '|||||||opts|if|||||||||||||||||||||||||||||||||var|items|function|conf|return|typeof|cf_e|itms|true|false|visible|else|scrl|width|auto|total|length|case|trigger|button|first||children|visibleConf|number|bind||css|prev|break|tt0|next|pagination|slice|variable|debug|anims|this|stopPropagation|padding|duration|string|height|for|scroll|object|pre|push|data|boolean|left|usePadding|filter|a_dur|switch|undefined|call|wrp|align|container|triggerHandler|marginRight|tmrs|easing|play|fx|carouFredSel|each|Math|circular|sz_resetMargin|eq|fn|post|cfs_origCssMargin|isScrolling|c_new|remove|queu|is|isPaused|clbk|unbind|isStopped|stopImmediatePropagation|onAfter|while|sc_setScroll|extend|outerWidth|max|Not|synchronise|sc_startScroll|null|l_cur|l_old|w_siz|onBefore|crossfade|uncover|opacity|preventDefault|direction|adjust|old|cookie|parseInt|isNaN|cf_c|c_old|pR|pauseOnHover|opts_orig|ceil|default|getTime|removeClass|nv_enableNavi|l_new|ms_getSizes|fade|cover|updatePageStatus|mousewheel|key|css_o|adj|start|responsive|outerHeight|top|right|min|hidden|gn_getVisibleItemsNext|cf_getItemsAdjust|addClass|pause|startTime|cf_sortParams|scrolling|resume|last|slideTo||is_array|indexOf||_cfs_triggerEvent|innerWidth|ms_getTrueInnerSize||||parent|hide|show|gi_getCurrentItems|minimum|anchorBuilder|pauseDuration|Carousel|sc_clearTimers|events|queue|infinite|ms_getTotalSize|gn_getItemIndex|jquery|nv_showNavi|event|bt_pauseOnHoverConfig|window|ns2|ani_o|split|currentPosition|ms_getTrueLargestSize|floor|of|maxDimention|gn_getVisibleItemsNextFilter|go_getNaviObject|position|sc_stopScroll|timePassed|perc|100|dur2|prefix|appendTo|apply|sc_callCallbacks|currentPage|before|sz_setSizes|vI|touchwipe|wN|document|selector|_cfs_init|go_getObject|marginBottom|ms_isPercentage|ms_getPercentage||to|org|cf_getAlignPadding|keys|pauseOnEvent|Number|none|stopped||gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|orgW|isHidden|cf_mapWrapperSizes|get|end|eval|mouseenter|mouseleave|serialNumber|cur_l|di|sz|element|cfs_isCarousel|defaults|upDateOnWindowResize|up|ms_hasVariableSizes|valid|center|cf_getItemAdjustMinMax|seco|nw|bottom|delay|pauseOnResize|cf_getSynchArr|scrolled|backward|textAlign|float|marginTop|marginLeft|absolute|_cfs_unbind_events|stop|finish|type|conditions|gn_getVisibleOrg|not|fx_cover|fx_uncover|orgDuration|cf_setCookie|gn_getVisibleItemsNextTestCircular|gi_getOldItemsNext|gi_getNewItemsNext||slideToPage|updateSizes|linkAnchors|_cfs_bind_buttons|click|_cfs_unbind_buttons|mousewheelPrev||bt_mousesheelNumber|mousewheelNext|wipe|_windowWidth|_windowHeight|ns3|wrapper|continue|classnames|new_w|old_w|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|ms_getLargestSize|toLowerCase|arr|sta|console|No|destroy|innerHeight|dx|Set|secp|ms_getPaddingBorderMargin|cf_getPadding|500|pageAnchorBuilder|Item|forward|_cfs_build|fixed|cfs_origCss|_cfs_bind_events|paused|onPausePause|onPauseEnd|onPauseStart|enough|needed|page|slide_|configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|shift|gn_getScrollItemsNextFilter|new_m|jumpToStart|after|append|removeItem|instanceof|caroufredsel|hash||index|selected|gn_getVisibleItemsPrevFilter|down|keyup|keyCode|configs|classname|cf_readCookie|random|itm|onCreate|namespace|span|animate|complete|cfs_tempCssMargin|s2|l1|l2|join|log|found|the|Infinity|Width|caroufredsel_cookie_|attr|id|2500|Available|widths|heights|automatically|relative|overflow|setTimeout|or|Page|resumed|currently|Callback|returned|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|add|detach|round|currentVisible|body|find|Preventing|non|sliding|replaceWith|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|resize|timer|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|clearTimeout|fx_fade|hiding|navigation|disabled|paddingLeft|paddingRight|paddingTop|paddingBottom|outer|inner|px|em|even|odd|path|charAt|immediate|Array|new|Date|quadratic|cubic|elastic|106|126|jQuery'.split('|'), 0, {}))

$(function() {
    function e(b) {
        var a = $config.news[b];
        a.text && (d.fadeOut(100), d.css({ left: 0, position: "relative" }).animate({ left: "-10px" }, {
            complete: function() {
                a.date && $("span.date", d).text(a.date);
                a.link ? (109 < a.text.length && (a.text = a.text.slice(0, 109) + "..."), $("span.text", d).html('<a href="' + a.link + '">' + $("<div/>").text(a.text).html() + "</a>")) : a.pdf ? (101 < a.text.length && (a.text = a.text.slice(0, 101) + "..."), $("span.text", d).html('<img src="share/images/btn_pdf.gif" width="14" height="15" alt="PDF file:New window opens" />' +
                    (a.pdf_capa ? "(" + a.pdf_capa + ")" : "") + '&nbsp;<a href="' + a.pdf + '" target="_blank">' + $("<div/>").text(a.text).html() + "</a>")) : (109 < a.text.length && (a.text = a.text.slice(0, 109) + "..."), $("span.text", d).text(a.text));
                $(this).fadeIn(100);
                $(this).css({ left: "10px" }).animate({ left: 0 }, { complete: function() {} })
            }
        }), c = b)
    }
    if (0 < $("#index").size()) {
        for (var b = 0; b < $config.main.length; b++)
            if ($config.main[b].link) {
                var f = $("#index" + (b + 1));
                f.css("cursor", "pointer");
                f.live("click", function() {
                    location.href = $config.main[$(this).attr("id").replace(/index/,
                        "") - 1].link
                })
            }
        $("#carousel").carouFredSel({
            auto: { pauseDuration: 5E3, onAfter: function(b, a) { $("#button li").eq(parseInt($(b).attr("id").replace(/^index/, "")) - 1).removeClass("current");
                    $("#button li").eq(parseInt($(a).attr("id").replace(/^index/, "")) - 1).addClass("current") } },
            pagination: {
                container: "#button",
                anchorBuilder: function(b) { return "<li" + (1 === b ? ' class="current"' : "") + '><a href="javascript:void(0);"><img src="share/images/pct_thumbnail0' + b + '.jpg" width="41" height="26" /></a></li>' },
                onAfter: function(b,
                    a) { $("#button li").eq(parseInt($(b).attr("id").replace(/^index/, "")) - 1).removeClass("current");
                    $("#button li").eq(parseInt($(a).attr("id").replace(/^index/, "")) - 1).addClass("current") }
            }
        });
        $("#index ul#button li").click(function() { $("#carousel").trigger("pause") });
        var d = $("#latestNews dl dd"),
            c = 0;
        d.hide();
        for (b = 0; b < $config.news.length; b++)
            if ($config.news[b].text) { e(b); break }
        var g = setInterval(function() { c++;
            e($config.news.length < c + 1 ? 0 : c) }, 7E3);
        $("#latestNews ul li").eq(0).click(function() {
            c--;
            e(0 > c ?
                $config.news.length - 1 : c);
            clearInterval(g)
        });
        $("#latestNews ul li").eq(1).click(function() { c++;
            e($config.news.length - 1 < c ? 0 : c);
            clearInterval(g) })
    }
});