import { PDFCreator as U, canvasGradient as I, createRadialGradient as E, createLinearGradient as F, canvasNodeExe as O, pdfLayer as z, canvasLayer as R } from "i2djs";
import { createRenderer as M, nextTick as j, defineComponent as q, getCurrentInstance as G, onMounted as B, h as y, onUnmounted as L, watch as C, Fragment as D } from "vue";
const V = [
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
function $(i) {
  const o = {}, s = {}, r = {}, { render: h } = M({
    patchProp(e, t, n, a, d, g, c, w, A) {
      e && f(t)(e, a);
    },
    insert: (e, t, n) => {
      if (t = t || i, e && t instanceof U && t.pages && (["template", "page"].includes(e.nodeName) || (t = t.pages.length ? t.pages[0] : t.addPage())), !(!e || !(t != null && t.child)) && !(e instanceof I))
        if (e.nodeName === "animate" || e.nodeName === "animatePath") {
          const a = e.nodeName === "animate" ? "animateTo" : "animatePathTo";
          e.parent = t, j().then(() => {
            t[a](e, e.from);
          });
        } else
          t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, a) => {
      var A, N, T;
      const d = e.split("-").slice(1).join("-");
      let g = V.indexOf(e), c = null, w = i instanceof U ? "pdf" : "canvas";
      if (g === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), (d === "animate" || d === "animatePath") && w === "pdf")
        return null;
      switch (d) {
        case "page-template":
          if (w !== "pdf")
            return console.warn("page-template element is invalid in canvas context"), null;
          c = i.createTemplate(), c.nodeName = "template", s[a.id] = c;
          break;
        case "page":
          if (w !== "pdf")
            return console.warn("Page element is invalid in canvas context"), null;
          c = i.addPage(), c.nodeName = "page";
          break;
        case "linearGradient":
          c = F(), r[a.id] = c, c.nodeName = "linearGradient";
          break;
        case "radialGradient":
          c = E(), r[a.id] = c, c.nodeName = "radialGradient";
          break;
        case "animate":
          c = x(a), a.from && (c.from = {
            attr: {
              ...a.from,
              style: null
            },
            style: ((A = a.from) == null ? void 0 : A.style) ?? {}
          });
          break;
        case "animatePath":
          c = p(a), a.from && (c.from = {
            attr: {
              d: ((N = a == null ? void 0 : a.from) == null ? void 0 : N.d) ?? "",
              style: null
            },
            style: ((T = a.from) == null ? void 0 : T.style) ?? {}
          });
          break;
        default:
          c = u(d, a);
          break;
      }
      return c;
    },
    createText: (e) => {
    },
    createComment: (e) => {
    },
    setText: (e, t) => {
    },
    setElementText: (e, t) => {
    },
    parentNode: (e) => e && e.dom.parent ? e.dom.parent : null,
    nextSibling: (e) => (t, n) => {
    },
    querySelector: (e) => i.fetchEl(e) || null
  }), S = (e) => e.includes("-") ? e.replace(/-([a-z])/g, (t, n) => n.toUpperCase()) : e, b = (e, t, n) => {
    if (t)
      switch (e) {
        case "src":
          o[n] ? t.setAttr(e, o[n]) : (o[n] = i.createAsyncTexture({ attr: { src: n } }), o[n].then((a) => {
            o[n] = a.exportAsDataUrl(), t.setAttr(e, o[n]);
          }));
          break;
        case "text":
          t.text(n);
          break;
        case "p-template":
        case "pTemplate":
          t instanceof O && t.addTemplate(s[n]);
          break;
        case "event":
          Object.entries(n).forEach(([a, d]) => {
            var g;
            return (g = t.on) == null ? void 0 : g.call(t, a, d);
          });
          break;
        case "block":
          t.block = !0;
          break;
        case "data":
          t.data(n);
          break;
        case "transform":
          t.setAttr(e, l(n));
          break;
        case "bbox":
          t.bbox = n;
          break;
        default:
          t.setAttr(e, n);
      }
  }, k = (e, t) => {
    Object.entries(t).forEach(([n, a]) => {
      let d = typeof a == "function" ? a(e) : a;
      if ((n === "fillStyle" || n === "strokeStyle") && typeof d == "string" && d.startsWith("grad")) {
        const g = d.match(/\(([^)]+)\)/)[1];
        d = m(g);
      }
      e.setStyle(n, d);
    });
  }, f = (e) => (e = S(e), (t, n) => {
    if (/^on[A-Z]/.test(e)) {
      const a = e.slice(2).toLowerCase();
      t.on && t.on(a, n);
    } else
      typeof n == "function" && (n = n(t));
    e !== "style" ? b(e, t, n) : k(t, n);
  });
  function u(e, t) {
    return new O(i.ctx, {
      el: e === "group" ? "g" : e,
      attr: {},
      style: {},
      bbox: t && t.bbox !== void 0 ? t.bbox : !0
    }, Math.round(Math.random() * 1e7), 0);
  }
  function l(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const a = e[n].match(/[\w\.\-]+/g);
      t[a.shift()] = a.map((d) => parseFloat(d));
    }
    return t;
  }
  function m(e) {
    return r[e];
  }
  function x(e) {
    var t;
    return {
      nodeName: "animate",
      attr: {
        ...(e == null ? void 0 : e.to) ?? {},
        style: null
      },
      style: ((t = e == null ? void 0 : e.to) == null ? void 0 : t.style) ?? {},
      duration: e.duration || 0,
      ease: e.ease || "default",
      loop: e.loop || 0,
      end: e.end || null,
      delay: e.delay || 0,
      direction: e.direction || "default",
      setAttr: function(n, a) {
      },
      setStyle: function(n, a) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  function p(e) {
    var t, n;
    return {
      nodeName: "animatePath",
      attr: {
        d: ((t = e == null ? void 0 : e.to) == null ? void 0 : t.d) ?? "",
        style: null
      },
      style: ((n = e == null ? void 0 : e.to) == null ? void 0 : n.style) ?? {},
      duration: e.duration || 0,
      ease: e.ease || "default",
      loop: e.loop || 0,
      end: e.end || null,
      delay: e.delay || 0,
      direction: e.direction || "default",
      setAttr: function(a, d) {
      },
      setStyle: function(a, d) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  return h;
}
const _ = q({
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
      default: void 0
    },
    width: {
      type: Number,
      required: !1,
      default: void 0
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
      default: null
    },
    onClear: {
      type: Function,
      required: !1,
      default: null
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
    },
    // applicable for PDF Layer only
    autoPagination: {
      type: Boolean,
      required: !1,
      default: !0
    }
  },
  emits: ["on-resize", "on-ready"],
  setup(i, o) {
    let s, r = null;
    const h = G();
    B(() => {
      j().then(() => {
        const f = o.slots.default;
        r || (i.type === "pdf" || i.type === "pdf-blob" ? r = b(i) : i.type === "canvas" ? r = k(i) : console.warn(`Unknown render context: ${i.type}`)), r && r.onResize && r.onResize(() => {
          o.emit("on-resize", {
            height: r.height,
            width: r.width
          });
        }), r && r.onChange && r.onChange((m) => {
          r && r.container && r.container.tagName === "IFRAME" && r.container.setAttribute("src", m), i.onUpdate && typeof i.onUpdate == "function" && i.onUpdate(m);
        });
        const u = $(r), l = y(S, f);
        u(l, r), o.emit("on-ready", r);
      });
    }), L(() => {
      r && (r.destroy(), r = null);
    }), C([() => i.height, () => i.width], (f) => {
      r.setSize && r.setSize(i.width, i.height);
    }, {
      deep: !0
    }), C(() => i.encryption, (f) => {
      r.setConfig && r.setConfig({
        encryption: f
      });
    }, {
      deep: !0
    }), C(() => i.info, (f) => {
      r.setConfig && r.setConfig({
        info: f
      });
    }, {
      deep: !0
    }), C(() => i.config, (f) => {
      r.setConfig && r.setConfig({
        ...f
      });
    }, {
      deep: !0
    });
    const S = q({
      setup(f, u) {
        const l = G();
        l.parent = h, l.appContext = h.appContext, l.root = h.root, l.provides = h.provides;
        const m = u.slots.default;
        return () => y(D, m());
      }
    });
    function b(f) {
      let u = document.getElementById(s.props.id), l = {
        ...f.height !== void 0 && { height: f.height },
        ...f.width !== void 0 && { width: f.width },
        ...f.config || {},
        info: f.info || {},
        encryption: f.encryption || {}
      };
      return z(u, l, {
        autoUpdate: !0,
        autoPagination: f.autoPagination,
        onUpdate: (x) => {
          u.tagName === "IFRAME" && u.setAttribute("src", x), f.onUpdate && typeof f.onUpdate == "function" && f.onUpdate(x);
        }
      });
    }
    function k(f) {
      let u = document.getElementById(s.props.id);
      const l = R(u, f.config, {
        ...f.layerSetting
      });
      return f.onClear && typeof f.onClear == "function" && l.setClear(f.onClear), l;
    }
    switch (i.type) {
      case "pdf":
        s = y("iframe", {
          id: i.id,
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
        s = y("div", {
          id: i.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        s = y("div", {
          id: i.id,
          class: "renderOutput",
          style: {
            height: i.height ? i.height + "px" : "100%",
            width: i.width ? i.width + "px" : "100%"
          }
        });
        break;
      case "default":
        s = y("iframe", {
          id: i.id,
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
    return () => s;
  }
});
export {
  _ as default
};
