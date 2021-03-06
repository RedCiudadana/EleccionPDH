(function(e) {
  function t(t, n) {
    function r() {
      v.settings.shuffle && g.sort(function() {
        return .5 - Math.random()
      });
      if (v.settings.preloadPanels) {
        l();
        for (var t = 0, n = g.length, r = 0; r < n; r++) e("<img/>").load(function() {
          t++;
          if (t == n) {
            p.find(".preloader").remove();
            i()
          }
        }).attr("src", g[r].path)
      } else i()
    }

    function i() {
      L = g.length;
      A = v.settings.columns;
      O = Math.ceil(L / A);
      E = (v.settings.width - (A - 1) * v.settings.distance) / v.settings.columns;
      S = (v.settings.height - (O - 1) * v.settings.distance) / Math.ceil(L / v.settings.columns);
      x = v.settings.width - (A - 1) * (v.settings.closedPanelWidth + v.settings.distance);
      T = v.settings.height - (O - 1) * (v.settings.closedPanelHeight + v.settings.distance);
      var t = e('<div class="panel"></div>').appendTo(p);
      C = (isNaN(parseInt(t.css("borderLeftWidth"))) ? 0 : parseInt(t.css("borderLeftWidth"))) + (isNaN(parseInt(t.css("borderRightWidth"))) ? 0 : parseInt(t.css("borderRightWidth")));
      k = (isNaN(parseInt(t.css("borderTopWidth"))) ? 0 : parseInt(t.css("borderTopWidth"))) + (isNaN(parseInt(t.css("borderBottomWidth"))) ? 0 : parseInt(t.css("borderBottomWidth")));
      t.remove();
      for (t = 0; t < L; t++) s(t);
      v.settings.slideshow && h();
      p.hover(function() {
        v.settings.slideshow && v.settings.stopSlideshowOnHover && b && clearInterval(b)
      }, function() {
        v.settings.closePanelOnMouseOut && u();
        v.settings.slideshow && v.settings.stopSlideshowOnHover && h()
      })
    }

    function s(t) {
      var n = e('<div class="panel"></div>').appendTo(p);

      y.push(n);
      g[t].width = x;
      g[t].height = T;

      e("<img/>")
        .on('load', function() {

          y[t].css("background-image", "url(" + e(this).attr("src") + ")");

          switch (g[t].properties.alignType) {
            case "leftTop":
              y[t].css("background-position", "left top");
              break;
            case "leftCenter":
              y[t].css("background-position", "left center");
              break;
            case "leftBottom":
              y[t].css("background-position", "left bottom");
              break;
            case "centerTop":
              y[t].css("background-position", "center top");
              break;
            case "centerCenter":
              y[t].css("background-position", "center center");
              break;
            case "centerBottom":
              y[t].css("background-position", "center bottom");
              break;
            case "rightTop":
              y[t].css("background-position", "right top");
              break;
            case "rightCenter":
              y[t].css("background-position", "right center");
              break;
            case "rightBottom":
              y[t].css("background-position", "right bottom");
              break;
            case "default":
              y[t].css("background-position", "left top")
          }

          v.settings.shadow && e('<div class="shadow"></div>').appendTo(n);
          g[t].width = e(this).attr("width") || e(this).prop("width");
          g[t].height = e(this).attr("height") || e(this).prop("height");

          var r = {
            type: "panelLoaded",
            index: t,
            data: g[t]
          };

          e.isFunction(v.settings.panelLoaded) && v.settings.panelLoaded.call(this, r)

        })
        .attr("src", g[t].path);

      n.css("width", E - C);
      n.css("height", S - k);
      n.css("left", t % A * (E + v.settings.distance));
      n.css("top", Math.floor(t / A) * (S + v.settings.distance));
      n.hover(function() {
        if (v.settings.openPanelOnMouseOver) {
          M && clearTimeout(M);
          M = setTimeout(function() {
            o(t)
          }, v.settings.openPanelDelay)
        }
        var n = {
          type: "panelMouseOver",
          index: t,
          data: g[t]
        };
        e.isFunction(v.settings.panelMouseOver) && v.settings.panelMouseOver.call(this, n)
      }, function() {
        var n = {
          type: "panelMouseOut",
          index: t,
          data: g[t]
        };
        e.isFunction(v.settings.panelMouseOut) && v.settings.panelMouseOut.call(this, n)
      });
      g[t].link && n.css("cursor", "pointer");
      n.click(function() {
        v.settings.openPanelOnClick && o(t);
        g[t].link && window.open(g[t].link, g[t].properties.linkTarget);
        var n = {
          type: "panelClick",
          index: t,
          data: g[t]
        };
        e.isFunction(v.settings.panelClick) && v.settings.panelClick.call(this, n)
      });
      var r = {
        type: "panelCreated",
        index: t,
        data: g[t]
      };
      e.isFunction(v.settings.panelCreated) && v.settings.panelCreated.call(this, r);
      if (t == g.length - 1) {
        r = {
          type: "allPanelsCreated"
        };
        e.isFunction(v.settings.allPanelsCreated) && v.settings.allPanelsCreated.call(this, r)
      }
    }

    function o(t) {
      if (!(m == t && N == "opened")) {
        N = "opened";
        m != -1 && y[m].stop();
        m = t;
        var n = {
          type: "openPanel",
          index: t,
          data: g[t]
        };
        e.isFunction(v.settings.openPanel) && v.settings.openPanel.call(this, n);
        c();
        var r = false;
        n = y[m];
        var i, s;
        if (v.settings.openedPanelWidth == "auto") {
          i = x;
          for (var o = 0; o < L; o++)
            if (o % A == m % A) i = Math.min(i, g[o].width)
        } else i = v.settings.openedPanelWidth == "max" ? g[m].width : v.settings.openedPanelWidth;
        if (v.settings.openedPanelHeight == "auto") {
          s = T;
          for (o = 0; o < L; o++)
            if (Math.floor(o / A) == Math.floor(m / A)) s = Math.min(s, g[o].height)
        } else s = v.settings.openedPanelHeight == "max" ? g[m].height : v.settings.openedPanelHeight;
        var u = (v.settings.width - (A - 1) * v.settings.distance - i) / (A - 1),
          a = (v.settings.height - (O - 1) * v.settings.distance - s) / (O - 1),
          f = {},
          l = [],
          h = [],
          p = [],
          b = [],
          w = [],
          E = [],
          S = [],
          M = [],
          _;
        for (o = 0; o < L; o++) {
          h[o] = parseFloat(y[o].css("width"));
          b[o] = parseFloat(y[o].css("height"));
          E[o] = parseFloat(y[o].css("left"));
          M[o] = parseFloat(y[o].css("top"));
          if (o == m) {
            l[o] = i - C;
            p[o] = s - k
          } else {
            l[o] = o % A == m % A ? Math.min(i - C, g[o].width) : u - C;
            p[o] = Math.floor(o / A) == Math.floor(m / A) ? Math.min(s - k, g[o].height) : a - k
          }
          w[o] = o % A * (u + v.settings.distance) + (o % A <= m % A ? 0 : i - u) + (o % A == m % A && i - C > l[o] ? (i - C - l[o]) / 2 : 0);
          S[o] = Math.floor(o / A) * (a + v.settings.distance) + (Math.floor(o / A) <= Math.floor(m / A) ? 0 : s - a) + (Math.floor(o / A) == Math.floor(m / A) && s - k > p[o] ? (s - k - p[o]) / 2 : 0)
        }
        var D, P, H;
        if (parseFloat(n.css("width")) != i - C) {
          D = parseFloat(n.css("width"));
          P = i;
          H = C;
          f.width = P - H
        } else {
          D = parseFloat(n.css("height"));
          P = s;
          H = k;
          f.height = P - H
        }
        n.stop();
        n.animate(f, {
          duration: v.settings.slideDuration,
          complete: function() {
            if (!r) {
              r = true;
              if (g[t].caption) {
                var n = g[t].caption,
                  i = g[m].properties,
                  s = parseInt(i.captionFadeDuration),
                  o = parseInt(i.captionWidth),
                  u = parseInt(i.captionHeight),
                  a = parseInt(i.captionTop);
                i = parseInt(i.captionLeft);
                o = e('<div class="caption"></div>').css({
                  width: o,
                  height: u,
                  left: i,
                  top: a,
                  opacity: 0
                }).appendTo(y[m]);
                u = e('<div class="caption-background"></div>').css({
                  width: "100%",
                  height: "100%"
                }).appendTo(o);
                e("<p></p>").html(n).css({
                  width: "100%",
                  height: "100%",
                  opacity: 1
                }).appendTo(u);
                o.animate({
                  opacity: 1
                }, s)
              }
              n = {
                type: "animationComplete"
              };
              e.isFunction(v.settings.animationComplete) && v.settings.animationComplete.call(this, n)
            }
          },
          step: function(e) {
            _ = (e - D) / (P - H - D);
            for (e = 0; e < L; e++) {
              y[e].css("width", _ * (l[e] - h[e]) + h[e]);
              y[e].css("height", _ * (p[e] - b[e]) + b[e]);
              y[e].css("left", _ * (w[e] - E[e]) + E[e]);
              y[e].css("top", _ * (S[e] - M[e]) + M[e])
            }
          }
        })
      }
    }

    function u() {
      N = "closed";
      M && clearTimeout(M);
      c();
      m = 0;
      for (var t = false, n = y[m], r = parseFloat(n.css("width")), i = {}, s = [], o = [], u = [], a = [], f = [], l = [], h = [], p = [], g, b = 0; b < L; b++) {
        o[b] = parseFloat(y[b].css("width"));
        a[b] = parseFloat(y[b].css("height"));
        s[b] = E - C;
        u[b] = S - k;
        l[b] = parseFloat(y[b].css("left"));
        p[b] = parseFloat(y[b].css("top"));
        f[b] = b % A * (E + v.settings.distance);
        h[b] = Math.floor(b / A) * (S + v.settings.distance)
      }
      i.width = E - C;
      n.stop();
      n.animate(i, {
        duration: v.settings.slideDuration,
        complete: function() {
          if (!t) {
            t = true;
            var n = {
              type: "animationComplete"
            };
            e.isFunction(v.settings.animationComplete) && v.settings.animationComplete.call(this, n)
          }
        },
        step: function(e) {
          g = (r - e) / (r - E + C);
          for (e = 0; e < L; e++) {
            y[e].css("width", g * (s[e] - o[e]) + o[e]);
            y[e].css("height", g * (u[e] - a[e]) + a[e]);
            y[e].css("left", g * (f[e] - l[e]) + l[e]);
            y[e].css("top", g * (h[e] - p[e]) + p[e])
          }
        }
      })
    }

    function a() {
      o(m == g.length - 1 ? 0 : m + 1)
    }

    function f() {
      o(m == 0 ? g.length - 1 : m - 1)
    }

    function l() {
      var t = e('<div class="preloader"></div>').hide().fadeIn(300).appendTo(p),
        n = (v.settings.width - parseInt(t.css("width"))) * .5,
        r = (v.settings.height - parseInt(t.css("height"))) * .5;
      t.css({
        left: n,
        top: r
      })
    }

    function c() {
      var e = p.find(".caption");
      e && e.stop().animate({
        opacity: 0
      }, 300, function() {
        e.remove()
      })
    }

    function h() {
      b = setInterval(function() {
        if (v.settings.slideshowDirection == "next") a();
        else v.settings.slideshowDirection == "previous" && f()
      }, v.settings.slideshowDelay)
    }
    this.settings = e.extend({}, e.fn.gridAccordion.defaults, n);
    var p = e(t),
      v = this,
      m = -1,
      g = [],
      y = [],
      b = 0,
      w = ["captionFadeDuration", "captionWidth", "captionHeight", "captionTop", "captionLeft", "linkTarget", "alignType"],
      E, S, x, T, N = "closed",
      C = 0,
      k = 0,
      L = 0,
      A, O, M;
    (function() {
      p.addClass("grid-accordion").css({
        width: v.settings.width,
        height: v.settings.height
      });
      if (v.settings.xmlSource) {
        p.empty();
        e.ajax({
          type: "GET",
          url: v.settings.xmlSource,
          dataType: e.browser.msie ? "text" : "xml",
          success: function(t) {
            var n;
            if (e.browser.msie) {
              n = new ActiveXObject("Microsoft.XMLDOM");
              n.async = false;
              n.loadXML(t)
            } else n = t;
            e(n).find("panel").each(function() {
              var t = {};
              t.properties = {};
              for (var n = 0; n < e(this).children().length; n++) {
                var r = e(this).children()[n];
                t[r.nodeName] = e(this).find(r.nodeName).text()
              }
              for (n = 0; n < w.length; n++) {
                r = w[n];
                var i = e(this).attr(r);
                t.properties[r] = i == undefined ? v.settings[r] : i
              }
              g.push(t)
            });
            r()
          }
        })
      } else {
        p.children().each(function(t) {
          var n = {};
          n.properties = {};
          for (var r = 0; r < e(this).children().length; r++) {
            var i = e(this).children()[r];
            if (e(i).is("a")) {
              n.path = e(i).find("img").attr("src");
              n.link = e(i).attr("href");
              if (e(i).attr("target")) n.properties.linkTarget = e(i).attr("target")
            } else if (e(i).is("img")) n.path = e(i).attr("src");
            else n[e(i).attr("class")] = e(i).html()
          }
          for (r = 0; r < w.length; r++) {
            i = w[r];
            var s;
            if (v.settings.panelProperties)
              if (v.settings.panelProperties[t]) s = v.settings.panelProperties[t][i];
            n.properties[i] || (n.properties[i] = s == undefined ? v.settings[i] : s)
          }
          g.push(n)
        });
        p.empty();
        r()
      }
    })();
    this.nextPanel = a;
    this.previousSlide = f;
    this.openPanel = o;
    this.startSlideshow = function() {
      h()
    };
    this.stopSlideshow = function() {
      b && clearInterval(b)
    };
    this.getSlideshowState = function() {
      return slideshowState
    };
    this.getCurrentIndex = function() {
      return m
    };
    this.getPanelAt = function(e) {
      return g[e]
    };
    this.getAccordionState = function() {
      return N
    }
  }
  e.fn.gridAccordion = function(e) {
    for (var n = [], r = 0; r < this.length; r++)
      if (!this[r].accordion) {
        this[r].accordion = new t(this[r], e);
        n.push(this[r].accordion)
      }
    return n.length > 1 ? n : n[0]
  };
  e.fn.gridAccordion.defaults = {
    xmlSource: null,
    width: 500,
    height: 300,
    alignType: "leftTop",
    distance: 0,
    columns: 3,
    slideshow: false,
    slideshowDelay: 5e3,
    slideshowDirection: "next",
    stopSlideshowOnHover: true,
    slideDuration: 700,
    openPanelOnMouseOver: true,
    closePanelOnMouseOut: true,
    openPanelOnClick: false,
    preloadPanels: false,
    shuffle: false,
    openedPanelWidth: "auto",
    openedPanelHeight: "auto",
    closedPanelWidth: 30,
    closedPanelHeight: 30,
    captionFadeDuration: 500,
    captionWidth: 300,
    captionHeight: 100,
    captionTop: 100,
    captionLeft: 30,
    shadow: false,
    linkTarget: "_blank",
    openPanelDelay: 200,
    panelProperties: null,
    panelMouseOver: null,
    panelMouseOut: null,
    panelClick: null,
    panelLoaded: null,
    panelCreated: null,
    allPanelsCreated: null,
    animationComplete: null,
    openPanel: null
  }
})(jQuery)
