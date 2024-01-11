import { CanvasGradient as I, createRadialGradient as N, createLinearGradient as U, CanvasNodeExe as O, pdfLayer as j, canvasLayer as k } from "i2djs";
import { createRenderer as E, nextTick as S, defineComponent as q, getCurrentInstance as G, onMounted as F, h as m, onUnmounted as R, watch as C, Fragment as z } from "vue";
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
function B(a) {
  const d = {}, s = {}, r = {}, { render: o } = E({
    patchProp(e, t, n, i, l, g, c, x, w) {
      b(t)(e, i);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof I || (e.nodeName === "animate" ? (e.parent = t, S().then(() => {
        t.animateTo(e, e.from);
      })) : e.nodeName === "animatePath" ? (e.parent = t, S().then(() => {
        t.animatePathTo(e, e.from);
      })) : t.child([e]));
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, i) => {
      var w, A, T;
      const l = e.split("-").slice(1).join("-");
      let g = M.indexOf(e), c = null, x = a.ctx.type_;
      switch (g === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), l) {
        case "page-template":
          if (x !== "pdf")
            return console.warn("page-template element is invalid in canvas context"), null;
          c = a.createTemplate(), s[i.id] = c;
          break;
        case "page":
          if (x !== "pdf")
            return console.warn("Page element is invalid in canvas context"), null;
          c = a.addPage();
          break;
        case "linearGradient":
          c = U(), r[i.id] = c;
          break;
        case "radialGradient":
          c = N(), r[i.id] = c;
          break;
        case "animate":
          c = f(i), i.from && (c.from = {
            attr: {
              ...i.from,
              style: null
            },
            style: ((w = i.from) == null ? void 0 : w.style) ?? {}
          });
          break;
        case "animatePath":
          c = u(i), i.from && (c.from = {
            attr: {
              d: ((A = i == null ? void 0 : i.from) == null ? void 0 : A.d) ?? "",
              style: null
            },
            style: ((T = i.from) == null ? void 0 : T.style) ?? {}
          });
          break;
        default:
          c = y(l, i);
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
    querySelector: (e) => a.fetchEl(e) || null
  }), b = (e) => (t, n) => {
    if (typeof n == "function" && (n = n(t)), e !== "style")
      if (e === "src" && !d[n])
        d[n] = a.createAsyncTexture({
          attr: {
            src: n
          }
        }), d[n].then((i) => {
          d[n] = i.exportAsDataUrl(), t.setAttr(e, d[n]);
        });
      else if (e === "src" && d[n])
        t.setAttr(e, d[n]);
      else if (e === "text" && n)
        t.text(n);
      else if (e === "p-template" && t instanceof O)
        t.addTemplate(s[n]);
      else if (e === "event")
        for (let i in n)
          t.on && t.on(i, n[i]);
      else
        e === "block" ? t.block = !0 : e === "data" ? t.data(n) : e === "transform" ? t.setAttr(e, p(n)) : e === "bbox" ? t.bbox = n : t.setAttr(e, n);
    else
      for (let i in n) {
        let l = n[i];
        if (typeof l == "function" && (l = l(t)), (i === "fillStyle" || i === "strokeStyle") && typeof l == "string" && l.startsWith("grad")) {
          const g = l.match(/\(([^)]+)\)/)[1];
          l = h(g);
        }
        t.setStyle(i, l);
      }
  };
  function y(e, t) {
    return new O(a.ctx, {
      el: e === "group" ? "g" : e,
      attr: {},
      style: {},
      bbox: t && t.bbox !== void 0 ? t.bbox : !0
    }, Math.round(Math.random() * 1e7), 0);
  }
  function p(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const i = e[n].match(/[\w\.\-]+/g);
      t[i.shift()] = i.map((l) => parseFloat(l));
    }
    return t;
  }
  function h(e) {
    return r[e];
  }
  function f(e) {
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
      setAttr: function(n, i) {
      },
      setStyle: function(n, i) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  function u(e) {
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
      setAttr: function(i, l) {
      },
      setStyle: function(i, l) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  return o;
}
const D = q({
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
  setup(a, d) {
    let s, r = null;
    const o = G();
    F(() => {
      S().then(() => {
        const f = d.slots.default;
        r || (a.type === "pdf" || a.type === "pdf-blob" ? r = y(a) : a.type === "canvas" ? r = p(a) : console.warn(`Unknown render context: ${a.type}`)), r && r.onResize && r.onResize(() => {
          d.emit("on-resize", {
            height: r.height,
            width: r.width
          });
        });
        const u = B(r), e = m(b, f);
        u(e, r), d.emit("on-ready", r);
      });
    }), R(() => {
      r && (r.destroy(), r = null);
    }), C(() => a.encryption, (f) => {
      r.setConfig && r.setConfig({
        encryption: f
      });
    }, {
      deep: !0
    }), C(() => a.info, (f) => {
      r.setConfig && r.setConfig({
        info: f
      });
    }, {
      deep: !0
    }), C(() => a.config, (f) => {
      r.setConfig && r.setConfig({
        ...f
      });
    }, {
      deep: !0
    });
    const b = q({
      setup(f, u) {
        const e = G();
        e.parent = o, e.appContext = o.appContext, e.root = o.root, e.provides = o.provides;
        const t = u.slots.default;
        return () => m(z, t());
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
        onUpdate: (t) => {
          u.tagName === "IFRAME" && u.setAttribute("src", t), f.onUpdate && h(t);
        }
      });
    }
    function p(f) {
      let u = document.getElementById(s.props.id);
      return k(u, f.config, {
        ...f.layerSetting,
        onUpdate: () => {
          h();
        }
      });
    }
    switch (a.type) {
      case "pdf":
        s = m("iframe", {
          id: a.id,
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
          id: a.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        s = m("div", {
          id: a.id,
          class: "renderOutput",
          style: {
            height: a.height ? a.height + "px" : "100%",
            width: a.width ? a.width + "px" : "100%"
          }
        });
        break;
      case "default":
        s = m("iframe", {
          id: a.id,
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
    return () => s;
  }
});
export {
  D as default
};
