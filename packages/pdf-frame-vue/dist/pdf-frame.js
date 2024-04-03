import { canvasGradient as U, createRadialGradient as q, createLinearGradient as G, canvasNodeExe as I, pdfLayer as j, canvasLayer as E } from "i2djs";
import { createRenderer as F, nextTick as S, defineComponent as N, getCurrentInstance as O, onMounted as R, h as m, onUnmounted as z, watch as C, Fragment as M } from "vue";
const L = [
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
  const d = {}, u = {}, a = {}, { render: o } = F({
    patchProp(t, e, i, n, c, y, l, x, w) {
      b(e)(t, n);
    },
    insert: (t, e, i) => {
      e || (e = r), !(!t || !e || !e.child) && (t instanceof U || (t.nodeName === "animate" ? (t.parent = e, S().then(() => {
        e.animateTo(t, t.from);
      })) : t.nodeName === "animatePath" ? (t.parent = e, S().then(() => {
        e.animatePathTo(t, t.from);
      })) : e.child([t])));
    },
    remove: (t) => {
      t != null && t.remove();
    },
    createElement: (t, e, i, n) => {
      var w, A, T;
      const c = t.split("-").slice(1).join("-");
      let y = L.indexOf(t), l = null, x = r.ctx.type_;
      switch (y === -1 && console.warn(`Unknown PDF-Frame tag: ${t}`), c) {
        case "page-template":
          if (x !== "pdf")
            return console.warn("page-template element is invalid in canvas context"), null;
          l = r.createTemplate(), u[n.id] = l;
          break;
        case "page":
          if (x !== "pdf")
            return console.warn("Page element is invalid in canvas context"), null;
          l = r.addPage();
          break;
        case "linearGradient":
          l = G(), a[n.id] = l;
          break;
        case "radialGradient":
          l = q(), a[n.id] = l;
          break;
        case "animate":
          l = f(n), n.from && (l.from = {
            attr: {
              ...n.from,
              style: null
            },
            style: ((w = n.from) == null ? void 0 : w.style) ?? {}
          });
          break;
        case "animatePath":
          l = s(n), n.from && (l.from = {
            attr: {
              d: ((A = n == null ? void 0 : n.from) == null ? void 0 : A.d) ?? "",
              style: null
            },
            style: ((T = n.from) == null ? void 0 : T.style) ?? {}
          });
          break;
        default:
          l = g(c, n);
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
    nextSibling: (t) => (e, i) => {
    },
    querySelector: (t) => r.fetchEl(t) || null
  }), b = (t) => (t.includes("-") && (t = t.replace(/-([a-z])/g, (e) => e[1].toUpperCase())), (e, i) => {
    if (/^on[A-Z]/.test(t)) {
      const n = t.slice(2).toLowerCase();
      e.on && e.on(n, i);
    } else
      typeof i == "function" && (i = i(e));
    if (t !== "style")
      if (t === "src" && !d[i])
        d[i] = r.createAsyncTexture({
          attr: {
            src: i
          }
        }), d[i].then((n) => {
          d[i] = n.exportAsDataUrl(), e.setAttr(t, d[i]);
        });
      else if (t === "src" && d[i])
        e.setAttr(t, d[i]);
      else if (t === "text" && i)
        e.text(i);
      else if ((t === "p-template" || t === "pTemplate") && e instanceof I)
        e.addTemplate(u[i]);
      else if (t === "event")
        for (let n in i)
          e.on && e.on(n, i[n]);
      else
        t === "block" ? e.block = !0 : t === "data" ? e.data(i) : t === "transform" ? e.setAttr(t, p(i)) : t === "bbox" ? e.bbox = i : e.setAttr(t, i);
    else
      for (let n in i) {
        let c = i[n];
        if (typeof c == "function" && (c = c(e)), (n === "fillStyle" || n === "strokeStyle") && typeof c == "string" && c.startsWith("grad")) {
          const y = c.match(/\(([^)]+)\)/)[1];
          c = h(y);
        }
        e.setStyle(n, c);
      }
  });
  function g(t, e) {
    return new I(r.ctx, {
      el: t === "group" ? "g" : t,
      attr: {},
      style: {},
      bbox: e && e.bbox !== void 0 ? e.bbox : !0
    }, Math.round(Math.random() * 1e7), 0);
  }
  function p(t) {
    if (typeof t == "object" && !Array.isArray(t) && t !== null)
      return t;
    const e = {};
    for (const i in t = t.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const n = t[i].match(/[\w\.\-]+/g);
      e[n.shift()] = n.map((c) => parseFloat(c));
    }
    return e;
  }
  function h(t) {
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
      setAttr: function(i, n) {
      },
      setStyle: function(i, n) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  function s(t) {
    var e, i;
    return {
      nodeName: "animatePath",
      attr: {
        d: ((e = t == null ? void 0 : t.to) == null ? void 0 : e.d) ?? "",
        style: null
      },
      style: ((i = t == null ? void 0 : t.to) == null ? void 0 : i.style) ?? {},
      duration: t.duration || 0,
      ease: t.ease || "default",
      loop: t.loop || 0,
      end: t.end || null,
      delay: t.delay || 0,
      direction: t.direction || "default",
      setAttr: function(n, c) {
      },
      setStyle: function(n, c) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  return o;
}
const D = N({
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
    let u, a = null;
    const o = O();
    R(() => {
      S().then(() => {
        const f = d.slots.default;
        a || (r.type === "pdf" || r.type === "pdf-blob" ? a = g(r) : r.type === "canvas" ? a = p(r) : console.warn(`Unknown render context: ${r.type}`)), a && a.onResize && a.onResize(() => {
          d.emit("on-resize", {
            height: a.height,
            width: a.width
          });
        }), a && a.onChange && a.onChange((e) => {
          a && a.container && a.container.tagName === "IFRAME" && a.container.setAttribute("src", e), r.onUpdate && h(e);
        });
        const s = B(a), t = m(b, f);
        s(t, a), d.emit("on-ready", a);
      });
    }), z(() => {
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
    const b = N({
      setup(f, s) {
        const t = O();
        t.parent = o, t.appContext = o.appContext, t.root = o.root, t.provides = o.provides;
        const e = s.slots.default;
        return () => m(M, e());
      }
    });
    function g(f) {
      let s = document.getElementById(u.props.id);
      return j(s, {
        height: f.height,
        width: f.width,
        ...f.config || {},
        info: f.info || {},
        encryption: f.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (e) => {
          s.tagName === "IFRAME" && s.setAttribute("src", e), f.onUpdate && h(e);
        }
      });
    }
    function p(f) {
      let s = document.getElementById(u.props.id);
      return E(s, f.config, {
        ...f.layerSetting
      });
    }
    switch (r.type) {
      case "pdf":
        u = m("iframe", {
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
        u = m("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        u = m("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: r.height ? r.height + "px" : "100%",
            width: r.width ? r.width + "px" : "100%"
          }
        });
        break;
      case "default":
        u = m("iframe", {
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
    function h(f) {
      d.emit("on-update", f);
    }
    return () => u;
  }
});
export {
  D as default
};
