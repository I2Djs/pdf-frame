import { canvasGradient as q, createRadialGradient as G, createLinearGradient as U, canvasNodeExe as I, pdfLayer as j, canvasLayer as k } from "i2djs";
import { createRenderer as E, nextTick as S, defineComponent as O, getCurrentInstance as N, onMounted as F, h as m, onUnmounted as R, watch as C, Fragment as z } from "vue";
const M = [
  "i-g",
  "i-group",
  "i-circle",
  "i-line",
  "i-path",
  "i-ellipse",
  "i-polygon",
  "i-polyline",
  "i-rect",
  "i-text",
  "i-image",
  "i-page",
  "i-linearGradient",
  "i-radialGradient",
  "i-page-template",
  "i-animate",
  "i-animatePath"
];
function B(r) {
  const d = {}, s = {}, a = {}, { render: o } = E({
    patchProp(t, e, n, i, c, h, l, p, w) {
      b(e)(t, i);
    },
    insert: (t, e, n) => {
      e || (e = r), !(!t || !e || !e.child) && (t instanceof q || (t.nodeName === "animate" ? (t.parent = e, S().then(() => {
        e.animateTo(t, t.from);
      })) : t.nodeName === "animatePath" ? (t.parent = e, S().then(() => {
        e.animatePathTo(t, t.from);
      })) : e.child([t])));
    },
    remove: (t) => {
      t != null && t.remove();
    },
    createElement: (t, e, n, i) => {
      var w, A, T;
      const c = t.split("-").slice(1).join("-");
      let h = M.indexOf(t), l = null, p = r.ctx.type_;
      switch (h === -1 && console.warn(`Unknown PDF-Frame tag: ${t}`), c) {
        case "page-template":
          if (p !== "pdf")
            return console.warn("page-template element is invalid in canvas context"), null;
          l = r.createTemplate(), s[i.id] = l;
          break;
        case "page":
          if (p !== "pdf")
            return console.warn("Page element is invalid in canvas context"), null;
          l = r.addPage();
          break;
        case "linearGradient":
          l = U(), a[i.id] = l;
          break;
        case "radialGradient":
          l = G(), a[i.id] = l;
          break;
        case "animate":
          l = f(i), i.from && (l.from = {
            attr: {
              ...i.from,
              style: null
            },
            style: ((w = i.from) == null ? void 0 : w.style) ?? {}
          });
          break;
        case "animatePath":
          l = u(i), i.from && (l.from = {
            attr: {
              d: ((A = i == null ? void 0 : i.from) == null ? void 0 : A.d) ?? "",
              style: null
            },
            style: ((T = i.from) == null ? void 0 : T.style) ?? {}
          });
          break;
        default:
          l = y(c, i);
          break;
      }
      return l;
    },
    createText: (t) => {
    },
    createComment: (t) => {
    },
    setText: (t, e) => {
    },
    setElementText: (t, e) => {
    },
    parentNode: (t) => t && t.dom.parent ? t.dom.parent : null,
    nextSibling: (t) => (e, n) => {
    },
    querySelector: (t) => r.fetchEl(t) || null
  }), b = (t) => (e, n) => {
    if (typeof n == "function" && (n = n(e)), t !== "style")
      if (t === "src" && !d[n])
        d[n] = r.createAsyncTexture({
          attr: {
            src: n
          }
        }), d[n].then((i) => {
          d[n] = i.exportAsDataUrl(), e.setAttr(t, d[n]);
        });
      else if (t === "src" && d[n])
        e.setAttr(t, d[n]);
      else if (t === "text" && n)
        e.text(n);
      else if (t === "p-template" && e instanceof I)
        e.addTemplate(s[n]);
      else if (t === "event")
        for (let i in n)
          e.on && e.on(i, n[i]);
      else
        t === "block" ? e.block = !0 : t === "data" ? e.data(n) : t === "transform" ? e.setAttr(t, x(n)) : t === "bbox" ? e.bbox = n : e.setAttr(t, n);
    else
      for (let i in n) {
        let c = n[i];
        if (typeof c == "function" && (c = c(e)), (i === "fillStyle" || i === "strokeStyle") && typeof c == "string" && c.startsWith("grad")) {
          const h = c.match(/\(([^)]+)\)/)[1];
          c = g(h);
        }
        e.setStyle(i, c);
      }
  };
  function y(t, e) {
    return new I(r.ctx, {
      el: t === "group" ? "g" : t,
      attr: {},
      style: {},
      bbox: e && e.bbox !== void 0 ? e.bbox : !0
    }, Math.round(Math.random() * 1e7), 0);
  }
  function x(t) {
    if (typeof t == "object" && !Array.isArray(t) && t !== null)
      return t;
    const e = {};
    for (const n in t = t.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const i = t[n].match(/[\w\.\-]+/g);
      e[i.shift()] = i.map((c) => parseFloat(c));
    }
    return e;
  }
  function g(t) {
    return a[t];
  }
  function f(t) {
    var e;
    return {
      nodeName: "animate",
      attr: {
        ...(t == null ? void 0 : t.to) ?? {},
        style: null
      },
      style: ((e = t == null ? void 0 : t.to) == null ? void 0 : e.style) ?? {},
      duration: t.duration || 0,
      ease: t.ease || "default",
      loop: t.loop || 0,
      end: t.end || null,
      delay: t.delay || 0,
      direction: t.direction || "default",
      setAttr: function(n, i) {
      },
      setStyle: function(n, i) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  function u(t) {
    var e, n;
    return {
      nodeName: "animatePath",
      attr: {
        d: ((e = t == null ? void 0 : t.to) == null ? void 0 : e.d) ?? "",
        style: null
      },
      style: ((n = t == null ? void 0 : t.to) == null ? void 0 : n.style) ?? {},
      duration: t.duration || 0,
      ease: t.ease || "default",
      loop: t.loop || 0,
      end: t.end || null,
      delay: t.delay || 0,
      direction: t.direction || "default",
      setAttr: function(i, c) {
      },
      setStyle: function(i, c) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  return o;
}
const D = O({
  props: {
    type: {
      type: String,
      required: !0,
      default: "pdf"
    },
    id: {
      type: String,
      required: !0,
      default: "pdf-frame-id"
    },
    height: {
      type: Number,
      required: !1,
      default: 0
    },
    width: {
      type: Number,
      required: !1,
      default: 0
    },
    layerSetting: {
      type: Object,
      required: !1,
      default: () => {
      }
    },
    onUpdate: {
      type: Function,
      required: !1,
      default: () => {
      }
    },
    config: {
      type: Object,
      required: !1,
      default: () => {
      }
    },
    // applicable for PDF Layer only
    info: {
      type: Object,
      required: !1,
      default: () => {
      }
    },
    // applicable for PDF Layer only
    encryption: {
      type: Object,
      required: !1,
      default: () => {
      }
    }
  },
  emits: ["on-resize", "on-ready", "on-update"],
  setup(r, d) {
    let s, a = null;
    const o = N();
    F(() => {
      S().then(() => {
        const f = d.slots.default;
        a || (r.type === "pdf" || r.type === "pdf-blob" ? a = y(r) : r.type === "canvas" ? a = x(r) : console.warn(`Unknown render context: ${r.type}`)), a && a.onResize && a.onResize(() => {
          d.emit("on-resize", {
            height: a.height,
            width: a.width
          });
        }), a && a.onChange && a.onChange((e) => {
          a && a.container && a.container.tagName === "IFRAME" && a.container.setAttribute("src", e), r.onUpdate && g(e);
        });
        const u = B(a), t = m(b, f);
        u(t, a), d.emit("on-ready", a);
      });
    }), R(() => {
      a && (a.destroy(), a = null);
    }), C(() => r.encryption, (f) => {
      a.setConfig && a.setConfig({
        encryption: f
      });
    }, {
      deep: !0
    }), C(() => r.info, (f) => {
      a.setConfig && a.setConfig({
        info: f
      });
    }, {
      deep: !0
    }), C(() => r.config, (f) => {
      a.setConfig && a.setConfig({
        ...f
      });
    }, {
      deep: !0
    });
    const b = O({
      setup(f, u) {
        const t = N();
        t.parent = o, t.appContext = o.appContext, t.root = o.root, t.provides = o.provides;
        const e = u.slots.default;
        return () => m(z, e());
      }
    });
    function y(f) {
      let u = document.getElementById(s.props.id);
      return j(u, {
        height: f.height,
        width: f.width,
        ...f.config || {},
        info: f.info || {},
        encryption: f.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (e) => {
          u.tagName === "IFRAME" && u.setAttribute("src", e), f.onUpdate && g(e);
        }
      });
    }
    function x(f) {
      let u = document.getElementById(s.props.id);
      return k(u, f.config, {
        ...f.layerSetting
      });
    }
    switch (r.type) {
      case "pdf":
        s = m("iframe", {
          id: r.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null,
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "pdf-blob":
        s = m("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        s = m("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: r.height ? r.height + "px" : "100%",
            width: r.width ? r.width + "px" : "100%"
          }
        });
        break;
      case "default":
        s = m("iframe", {
          id: r.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null,
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
    }
    function g(f) {
      d.emit("on-update", f);
    }
    return () => s;
  }
});
export {
  D as default
};
