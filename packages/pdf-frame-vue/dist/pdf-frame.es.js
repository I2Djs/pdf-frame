import { CanvasGradient as G, createRadialGradient as I, createLinearGradient as U, CanvasNodeExe as O, pdfLayer as j, canvasLayer as k } from "i2djs";
import { createRenderer as E, nextTick as S, defineComponent as N, getCurrentInstance as q, onMounted as F, h as m, onUnmounted as R, watch as C, Fragment as z } from "vue";
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
    patchProp(e, t, i, n, l, g, c, x, w) {
      b(t)(e, n);
    },
    insert: (e, t, i) => {
      !e || !t || !t.child || e instanceof G || (e.nodeName === "animate" ? (e.parent = t, S().then(() => {
        t.animateTo(e, e.from);
      })) : e.nodeName === "animatePath" ? (e.parent = t, S().then(() => {
        t.animatePathTo(e, e.from);
      })) : t.child([e]));
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, i, n) => {
      var w, A, T;
      const l = e.split("-").slice(1).join("-");
      let g = M.indexOf(e), c = null, x = a.ctx.type_;
      switch (g === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), l) {
        case "page-template":
          if (x !== "pdf")
            return console.warn("page-template element is invalid in canvas context"), null;
          c = a.createTemplate(), s[n.id] = c;
          break;
        case "page":
          if (x !== "pdf")
            return console.warn("Page element is invalid in canvas context"), null;
          c = a.addPage();
          break;
        case "linearGradient":
          c = U(), r[n.id] = c;
          break;
        case "radialGradient":
          c = I(), r[n.id] = c;
          break;
        case "animate":
          c = f(n), n.from && (c.from = {
            attr: {
              ...n.from,
              style: null
            },
            style: ((w = n.from) == null ? void 0 : w.style) ?? {}
          });
          break;
        case "animatePath":
          c = u(n), n.from && (c.from = {
            attr: {
              d: ((A = n == null ? void 0 : n.from) == null ? void 0 : A.d) ?? "",
              style: null
            },
            style: ((T = n.from) == null ? void 0 : T.style) ?? {}
          });
          break;
        default:
          c = y(l, n);
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
    nextSibling: (e) => (t, i) => {
    },
    querySelector: (e) => a.fetchEl(e) || null
  }), b = (e) => (t, i) => {
    if (typeof i == "function" && (i = i(t)), e !== "style")
      if (e === "src" && !d[i])
        d[i] = a.createAsyncTexture({
          attr: {
            src: i
          }
        }), d[i].then((n) => {
          d[i] = n.exportAsDataUrl(), t.setAttr(e, d[i]);
        });
      else if (e === "src" && d[i])
        t.setAttr(e, d[i]);
      else if (e === "text" && i)
        t.text(i);
      else if (e === "p-template" && t instanceof O)
        t.addTemplate(s[i]);
      else if (e === "event")
        for (let n in i)
          t.on && t.on(n, i[n]);
      else
        e === "block" ? t.block = !0 : e === "data" ? t.data(i) : e === "transform" ? t.setAttr(e, p(i)) : e === "bbox" || t.setAttr(e, i);
    else
      for (let n in i) {
        let l = i[n];
        if (typeof l == "function" && (l = l(t)), (n === "fillStyle" || n === "strokeStyle") && typeof l == "string" && l.startsWith("grad")) {
          const g = l.match(/\(([^)]+)\)/)[1];
          l = h(g);
        }
        t.setStyle(n, l);
      }
  };
  function y(e, t) {
    return new O(a.ctx, {
      el: e === "group" ? "g" : e,
      attr: {},
      style: {},
      bbox: t.bbox !== void 0 ? t.bbox : !0
    }, Math.round(Math.random() * 1e7), 0);
  }
  function p(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const i in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const n = e[i].match(/[\w\.\-]+/g);
      t[n.shift()] = n.map((l) => parseFloat(l));
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
      setAttr: function(i, n) {
      },
      setStyle: function(i, n) {
      },
      remove: function() {
        this.parent.interrupt();
      }
    };
  }
  function u(e) {
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
      setAttr: function(n, l) {
      },
      setStyle: function(n, l) {
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
  setup(a, d) {
    let s, r = null;
    const o = q();
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
    const b = N({
      setup(f, u) {
        const e = q();
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
