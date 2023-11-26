import { CanvasGradient as C, createRadialGradient as S, createLinearGradient as I, CanvasNodeExe as b, pdfLayer as q, canvasLayer as G } from "i2djs";
import { createRenderer as O, defineComponent as w, getCurrentInstance as x, onMounted as T, nextTick as U, h as l, onUnmounted as A, watch as y, Fragment as N } from "vue";
const j = [
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
  "i-page-template"
];
function E(i) {
  const d = {}, s = {}, r = {}, { render: f } = O({
    patchProp(e, t, n, a, o, h, c, F, R) {
      m(t)(e, a);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof C || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, a) => {
      const o = e.split("-").slice(1).join("-");
      let h = j.indexOf(e), c = null;
      switch (h === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), o) {
        case "page-template":
          c = i.createTemplate(), s[a.id] = c;
          break;
        case "page":
          c = i.addPage();
          break;
        case "linearGradient":
          c = I(), r[a.id] = c;
          break;
        case "radialGradient":
          c = S(), r[a.id] = c;
          break;
        default:
          c = u(o);
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
  }), m = (e) => (t, n) => {
    if (typeof n == "function" && (n = n(t)), e !== "style")
      e === "src" && !d[n] ? (d[n] = i.createAsyncTexture({
        attr: {
          src: n
        }
      }), d[n].then((a) => {
        d[n] = a.exportAsDataUrl(), t.setAttr(e, d[n]);
      })) : e === "src" && d[n] ? t.setAttr(e, d[n]) : e === "text" && n ? t.text(n) : e === "p-template" && t instanceof b ? t.addTemplate(s[n]) : t.setAttr(e, e === "transform" ? g(n) : n);
    else
      for (let a in n) {
        let o = n[a];
        if ((a === "fillStyle" || a === "strokeStyle") && typeof o == "string" && o.startsWith("grad")) {
          const h = o.match(/\(([^)]+)\)/)[1];
          o = p(h);
        }
        t.setStyle(a, o);
      }
  };
  function u(e, t) {
    return new b(i.ctx, {
      el: e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function g(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const a = e[n].match(/[\w\.\-]+/g);
      t[a.shift()] = a.map((o) => parseFloat(o));
    }
    return t;
  }
  function p(e) {
    return r[e];
  }
  return f;
}
const M = w({
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
  setup(i, d) {
    let s, r = null;
    const f = x();
    T(() => {
      U().then(() => {
        const e = d.slots.default;
        r || (i.type === "pdf" || i.type === "pdf-blob" ? r = u(i) : i.type === "canvas" ? r = g(i) : console.warn(`Unknown render context: ${i.type}`)), r && r.onResize && r.onResize(() => {
          d.emit("on-resize", {
            height: r.height,
            width: r.width
          });
        });
        const t = E(r), n = l(m, e);
        t(n, r), d.emit("on-ready", r);
      });
    }), A(() => {
      r && (r.destroy(), r = null);
    }), y(() => i.encryption, (e) => {
      r.setConfig && r.setConfig({
        encryption: e
      });
    }, {
      deep: !0
    }), y(() => i.info, (e) => {
      r.setConfig && r.setConfig({
        info: e
      });
    }, {
      deep: !0
    }), y(() => i.config, (e) => {
      r.setConfig && r.setConfig({
        ...e
      });
    }, {
      deep: !0
    });
    const m = w({
      setup(e, t) {
        const n = x();
        n.parent = f, n.appContext = f.appContext, n.root = f.root, n.provides = f.provides;
        const a = t.slots.default;
        return () => l(N, a());
      }
    });
    function u(e) {
      let t = document.getElementById(s.props.id);
      return q(t, {
        height: e.height,
        width: e.width,
        ...e.config || {},
        info: e.info || {},
        encryption: e.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (a) => {
          t.tagName === "IFRAME" && t.setAttribute("src", a), e.onUpdate && p(a);
        }
      });
    }
    function g(e) {
      let t = document.getElementById(s.props.id);
      return G(t, e.config, {
        ...e.layerSetting,
        onUpdate: () => {
          p();
        }
      });
    }
    switch (i.type) {
      case "pdf":
        s = l("iframe", {
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
        s = l("div", {
          id: i.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        s = l("div", {
          id: i.id,
          class: "renderOutput",
          style: {
            height: i.height ? i.height + "px" : "100%",
            width: i.width ? i.width + "px" : "100%"
          }
        });
        break;
      case "default":
        s = l("iframe", {
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
    function p(e) {
      d.emit("on-update", e);
    }
    return () => s;
  }
});
export {
  M as default
};
