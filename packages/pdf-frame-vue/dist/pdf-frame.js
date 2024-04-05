import { PDFCreator as p, canvasGradient as E, createRadialGradient as F, createLinearGradient as U, canvasNodeExe as T, pdfLayer as R, canvasLayer as B } from "i2djs";
import { createRenderer as M, nextTick as j, defineComponent as q, getCurrentInstance as G, onMounted as L, h as b, onUnmounted as D, watch as w, Fragment as I } from "vue";
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
function $(r) {
  const l = {}, o = {}, n = {}, { render: h } = M({
    patchProp(e, t, i, a, c, g, d, C, N) {
      e && f(t)(e, a);
    },
    insert: (e, t, i) => {
      if (t = t || r, e && t instanceof p && t.pages && (["template", "page"].includes(e.nodeName) || (t = t.pages.length ? t.pages[0] : t.addPage())), !(!e || !(t != null && t.child)) && !(e instanceof E))
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
    createElement: (e, t, i, a) => {
      var N, A, O;
      const c = e.split("-").slice(1).join("-");
      let g = V.indexOf(e), d = null, C = r instanceof p ? "pdf" : "canvas";
      if (g === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), (c === "animate" || c === "animatePath") && C === "pdf")
        return null;
      switch (c) {
        case "page-template":
          if (C !== "pdf")
            return console.warn("page-template element is invalid in canvas context"), null;
          d = r.createTemplate(), d.nodeName = "template", o[a.id] = d;
          break;
        case "page":
          if (C !== "pdf")
            return console.warn("Page element is invalid in canvas context"), null;
          d = r.addPage(), d.nodeName = "page";
          break;
        case "linearGradient":
          d = U(), n[a.id] = d, d.nodeName = "linearGradient";
          break;
        case "radialGradient":
          d = F(), n[a.id] = d, d.nodeName = "radialGradient";
          break;
        case "animate":
          d = x(a), a.from && (d.from = {
            attr: {
              ...a.from,
              style: null
            },
            style: ((N = a.from) == null ? void 0 : N.style) ?? {}
          });
          break;
        case "animatePath":
          d = z(a), a.from && (d.from = {
            attr: {
              d: ((A = a == null ? void 0 : a.from) == null ? void 0 : A.d) ?? "",
              style: null
            },
            style: ((O = a.from) == null ? void 0 : O.style) ?? {}
          });
          break;
        default:
          d = s(c, a);
          break;
      }
      return d;
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
    nextSibling: (e) => (t, i) => {
    },
    querySelector: (e) => r.fetchEl(e) || null
  }), S = (e) => e.includes("-") ? e.replace(/-([a-z])/g, (t, i) => i.toUpperCase()) : e, y = (e, t, i) => {
    if (t)
      switch (e) {
        case "src":
          l[i] ? t.setAttr(e, l[i]) : (l[i] = r.createAsyncTexture({ attr: { src: i } }), l[i].then((a) => {
            l[i] = a.exportAsDataUrl(), t.setAttr(e, l[i]);
          }));
          break;
        case "text":
          t.text(i);
          break;
        case "p-template":
        case "pTemplate":
          t instanceof T && t.addTemplate(o[i]);
          break;
        case "event":
          Object.entries(i).forEach(([a, c]) => {
            var g;
            return (g = t.on) == null ? void 0 : g.call(t, a, c);
          });
          break;
        case "block":
          t.block = !0;
          break;
        case "data":
          t.data(i);
          break;
        case "transform":
          t.setAttr(e, u(i));
          break;
        case "bbox":
          t.bbox = i;
          break;
        default:
          t.setAttr(e, i);
      }
  }, k = (e, t) => {
    Object.entries(t).forEach(([i, a]) => {
      let c = typeof a == "function" ? a(e) : a;
      if ((i === "fillStyle" || i === "strokeStyle") && typeof c == "string" && c.startsWith("grad")) {
        const g = c.match(/\(([^)]+)\)/)[1];
        c = m(g);
      }
      e.setStyle(i, c);
    });
  }, f = (e) => (e = S(e), (t, i) => {
    if (/^on[A-Z]/.test(e)) {
      const a = e.slice(2).toLowerCase();
      t.on && t.on(a, i);
    } else
      typeof i == "function" && (i = i(t));
    e !== "style" ? y(e, t, i) : k(t, i);
  });
  function s(e, t) {
    return new T(r.ctx, {
      el: e === "group" ? "g" : e,
      attr: {},
      style: {},
      bbox: t && t.bbox !== void 0 ? t.bbox : !0
    }, Math.round(Math.random() * 1e7), 0);
  }
  function u(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const i in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const a = e[i].match(/[\w\.\-]+/g);
      t[a.shift()] = a.map((c) => parseFloat(c));
    }
    return t;
  }
  function m(e) {
    return n[e];
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
      setAttr: function(i, a) {
      },
      setStyle: function(i, a) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  function z(e) {
    var t, i;
    return {
      nodeName: "animatePath",
      attr: {
        d: ((t = e == null ? void 0 : e.to) == null ? void 0 : t.d) ?? "",
        style: null
      },
      style: ((i = e == null ? void 0 : e.to) == null ? void 0 : i.style) ?? {},
      duration: e.duration || 0,
      ease: e.ease || "default",
      loop: e.loop || 0,
      end: e.end || null,
      delay: e.delay || 0,
      direction: e.direction || "default",
      setAttr: function(a, c) {
      },
      setStyle: function(a, c) {
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
    needOnUpdated: {
      type: Boolean,
      required: !1,
      default: !1
    },
    setCtxClear: {
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
  emits: ["on-resize", "on-ready", "on-updated"],
  setup(r, l) {
    let o, n = null;
    const h = G();
    L(() => {
      j().then(() => {
        const f = l.slots.default;
        n || (r.type === "pdf" || r.type === "pdf-blob" ? n = y(r) : r.type === "canvas" ? n = k(r) : console.warn(`Unknown render context: ${r.type}`)), n != null && n.onResize && n.onResize(() => {
          l.emit("on-resize", {
            height: n.height,
            width: n.width
          });
        }), n != null && n.onChange && n.onChange((m) => {
          var x;
          n instanceof p && ((x = n == null ? void 0 : n.container) == null ? void 0 : x.tagName) === "IFRAME" && n.container.setAttribute("src", m), r.needOnUpdated && l.emit("on-updated", m);
        }), n != null && n.setClear && typeof r.setCtxClear == "function" && n.setClear(r.setCtxClear);
        const s = $(n), u = b(S, f);
        s(u, n), l.emit("on-ready", n);
      });
    }), D(() => {
      n && (n.destroy(), n = null);
    }), w([() => r.height, () => r.width], (f) => {
      n.setSize && n.setSize(r.width, r.height);
    }, {
      deep: !0
    }), w(() => r.encryption, (f) => {
      n.setConfig && n.setConfig({
        encryption: f
      });
    }, {
      deep: !0
    }), w(() => r.info, (f) => {
      n.setConfig && n.setConfig({
        info: f
      });
    }, {
      deep: !0
    }), w(() => r.config, (f) => {
      n.setConfig && n.setConfig({
        ...f
      });
    }, {
      deep: !0
    });
    const S = q({
      setup(f, s) {
        const u = G();
        u.parent = h, u.appContext = h.appContext, u.root = h.root, u.provides = h.provides;
        const m = s.slots.default;
        return () => b(I, m());
      }
    });
    function y(f) {
      let s = document.getElementById(o.props.id), u = {
        ...f.height !== void 0 && { height: f.height },
        ...f.width !== void 0 && { width: f.width },
        ...f.config || {},
        info: f.info || {},
        encryption: f.encryption || {}
      };
      return R(s, u, {
        autoUpdate: !0,
        autoPagination: f.autoPagination
      });
    }
    function k(f) {
      let s = document.getElementById(o.props.id);
      return B(s, f.config, {
        ...f.layerSetting
      });
    }
    switch (r.type) {
      case "pdf":
        o = b("iframe", {
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
        o = b("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        o = b("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: r.height ? r.height + "px" : "100%",
            width: r.width ? r.width + "px" : "100%"
          }
        });
        break;
      case "default":
        o = b("iframe", {
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
    return () => o;
  }
});
export {
  _ as default
};
