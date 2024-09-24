/*
jQuery MegaMenu Plugin
Author: GeekTantra
Author URI: http://www.geektantra.com
*/
var isIE6 = -1 != navigator.userAgent.toLowerCase().indexOf("msie 6"),
    isIE7 = -1 != navigator.userAgent.toLowerCase().indexOf("msie 7"),
    isSafari = -1 != navigator.userAgent.toLowerCase().indexOf("safari"),
    isAndroid = -1 != navigator.userAgent.toLowerCase().indexOf("android"),
    isiPad = -1 != navigator.userAgent.toLowerCase().indexOf("ipad");
jQuery.fn.megamenu = function(e) {
    e = jQuery.extend({ activate_action: "mouseover", deactivate_action: "mouseleave", show_method: "simple", hide_method: "simple", justify: "left", enable_js_shadow: !0, shadow_size: 3, mm_timeout: 0 }, e);
    var h = this;
    "click" == e.activate_action && (e.mm_timeout = 0);
    h.children("li").each(function() {
        jQuery(this).addClass("mm-item");
        jQuery(".mm-item").css({ "float": e.justify });
        jQuery(this).find("div:first").addClass("mm-item-content");
        jQuery(this).find("a:first").addClass("mm-item-link");
        var c = jQuery(this).find(".mm-item-content"),
            g = jQuery(this).find(".mm-item-link");
        c.hide();
        jQuery(document).bind("click", function() {
            jQuery(".mm-item-content").hide();
            jQuery(".mm-item-link").removeClass("mm-item-link-hover")
        });
        jQuery(this).bind("click", function(a) { a.stopPropagation() });
        c.wrapInner('<div class="mm-content-base"></div>');
        !0 == e.enable_js_shadow && c.append('<div class="mm-js-shadow"></div>');
        var f = 0,
            a = 0;
        jQuery(this).bind(e.activate_action, function(l) {
            clearTimeout(a);
            l.stopPropagation();
            var b = jQuery(this).find("a.mm-item-link"),
                d =
                jQuery(this).find("div.mm-item-content");
            clearTimeout(f);
            f = setTimeout(function() {
                b.addClass("mm-item-link-hover");
                $("img", b).attr("src", $("img", b).attr("src").replace(/([\d]+)\.gif$/, "$1_o.gif"));
                isIE6 ? (d.parents().parents().css({ position: "relative", "z-index": 1 }), d.css({ top: "39px", right: "0px" })) : isIE7 ? d.css({ top: g.offset().top + g.outerHeight() - 1 + "px", left: "0px" }) : d.css({ top: g.offset().top + g.outerHeight() - 1 + "px" });
                if ("left" == e.justify) {
                    var a = h.offset().left + h.outerWidth(),
                        f = g.offset().left + c.outerWidth() -
                        5;
                    f >= a && d.css({ left: g.offset().left - (f - a) - 2 + "px" })
                } else "right" == e.justify && (a = h.offset().left, f = g.offset().left - d.outerWidth() + g.outerWidth() + 5, f <= a ? d.css({ left: a + 2 + "px" }) : d.css({ left: f + "px" }));
                !0 == e.enable_js_shadow && (d.find(".mm-js-shadow").height(d.height()), d.find(".mm-js-shadow").width(d.width()), d.find(".mm-js-shadow").css({ top: e.shadow_size + (isIE6 ? 2 : 0) + "px", left: e.shadow_size + (isIE6 ? 2 : 0) + "px", opacity: 0.5 }));
                switch (e.show_method) {
                    case "simple":
                        d.show();
                        break;
                    case "slideDown":
                        d.height("auto");
                        d.slideDown("fast");
                        break;
                    case "fadeIn":
                        d.fadeTo("fast", 1);
                        break;
                    default:
                        d.each(e.show_method)
                }
                if (isAndroid || isiPad) "About Us" == $("img", b).attr("alt") ? $(b).attr("href", "/about_us/index.html") : "Research & Development" == $("img", b).attr("alt") ? $(b).attr("href", "/research_and_development/index.html") : "Responsibility" == $("img", b).attr("alt") && $(b).attr("href", "/responsibility/index.html")
            }, e.mm_timeout)
        });
        jQuery(this).bind(e.deactivate_action, function(c) {
            c.stopPropagation();
            clearTimeout(f);
            var b = jQuery(this).find("a.mm-item-link"),
                d = jQuery(this).find("div.mm-item-content");
            a = setTimeout(function() {
                $("img", b).attr("src", $("img", b).attr("src").replace(/\_o\.gif$/, ".gif"));
                switch (e.hide_method) {
                    case "simple":
                        d.hide();
                        b.removeClass("mm-item-link-hover");
                        break;
                    case "slideUp":
                        d.slideUp("fast", function() { b.removeClass("mm-item-link-hover") });
                        break;
                    case "fadeOut":
                        d.fadeOut("fast", function() { b.removeClass("mm-item-link-hover") });
                        break;
                    default:
                        d.each(e.hide_method), b.removeClass("mm-item-link-hover")
                }
                1 > d.length && b.removeClass("mm-item-link-hover");
                if (isAndroid || isiPad)("About Us" == $("img", b).attr("alt") || "Research & Development" == $("img", b).attr("alt") || "Responsibility" == $("img", b).attr("alt")) && $(b).attr("href", "javascript:void(0);")
            }, 250)
        });
        if (isAndroid || isiPad) {
            var j = jQuery("#globalNavi div.megamenu p.closeBtn"),
                k = this;
            j.show();
            j.bind("click", function(a) {
                a.stopPropagation();
                clearTimeout(f);
                var b = jQuery(k).find("a.mm-item-link");
                a = jQuery(k).find("div.mm-item-content");
                $("img", b).attr("src", $("img", b).attr("src").replace(/\_o\.gif$/, ".gif"));
                switch (e.hide_method) {
                    case "simple":
                        a.hide();
                        b.removeClass("mm-item-link-hover");
                        break;
                    case "slideUp":
                        a.slideUp("fast", function() { b.removeClass("mm-item-link-hover") });
                        break;
                    case "fadeOut":
                        a.fadeOut("fast", function() { b.removeClass("mm-item-link-hover") });
                        break;
                    default:
                        a.each(e.hide_method), b.removeClass("mm-item-link-hover")
                }
                1 > a.length && b.removeClass("mm-item-link-hover");
                if (isAndroid || isiPad)("About Us" == $("img", b).attr("alt") || "Research & Development" == $("img", b).attr("alt") || "Responsibility" ==
                    $("img", b).attr("alt")) && $(b).attr("href", "javascript:void(0);")
            })
        }
    });
    this.find(">li:last").after('<li class="clear-fix"></li>');
    this.show()
};

$(function() {
    $("#globalNavi .megamenu").show();
    !isSafari && (!isAndroid && !isiPad) && $("ul.mega > li > div").css("display", "block");
    (isAndroid || isiPad) && $("#globalNavi .megamenu").parents().siblings("a").attr("href", "javascript:void(0)");
    for (var e = ["aboutus", "research", "responsibility"], h = 0; h < $config.menu.length; h++) {
        for (var c = $config.menu[h], g = $("#globalNavi div.megamenu div." + e[h]), f = [], a = 1; 7 >= a; a++) c["title" + a] && c["link" + a] ? f.push('<a href="' + c["link" + a] + '">' + c["title" + a] + "</a>") : c["title" + a] && f.push(c["title" +
            a]);
        $("ul", g).html("<li>" + f.join("</li><li>") + "</li>");
        f = "";
        for (a = 1; 2 >= a; a++) c["img" + a] && c["img" + a + "_link"] ? f += '<p class="lastItem"><a href="' + c["img" + a + "_link"] + '"' + ("1" === c["img" + a + "_blank"] ? ' target="_blank"' : "") + '><img src="' + c["img" + a] + '" width="216" height="145" alt="' + c["img" + a + "_title"] + '" /><br />' + ("1" === c["img" + a + "_blank"] ? '<img src="/thailand/share/images/icon_win_lnavi.png" width="14" height="12" alt="New Window" class="newWin" />' : "") + c["img" + a + "_title"] + "</a></p>" : c["img" + a] && (f += '<p class="lastItem"><img src="' +
            c["img" + a] + '" width="216" height="145" alt="' + c["img" + a + "_title"] + '" /><br />' + c["img" + a + "_title"] + "</p>");
        $("div.entryMenu", g).html(f)
    }
    $(".mega").megamenu({ justify: "" })
});