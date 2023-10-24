import { CanvasGradient as S, createRadialGradient as w, createLinearGradient as I, CanvasNodeExe as b, pdfLayer as q, canvasLayer as G } from "i2djs";
import { createRenderer as T, defineComponent as x, getCurrentInstance as C, onMounted as A, nextTick as N, h as p, onUnmounted as O, Fragment as U } from "vue";
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
function E(r) {
  const f = {}, c = {}, u = {}, { render: g } = T({
    patchProp(e, t, n, a, o, y, s, F, k) {
      m(t)(e, a);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, a) => {
      const o = e.split("-").slice(1).join("-");
      let y = j.indexOf(e), s = null;
      switch (y === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), o) {
        case "page-template":
          s = r.createTemplate(), c[a.id] = s;
          break;
        case "page":
          s = r.addPage();
          break;
        case "linearGradient":
          s = I(), u[a.id] = s;
          break;
        case "radialGradient":
          s = w(), u[a.id] = s;
          break;
        default:
          s = h(o);
          break;
      }
      return s;
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
    querySelector: (e) => r.fetchEl(e) || null
  }), m = (e) => (t, n) => {
    if (typeof n == "function" && (n = n(t)), e !== "style")
      e === "src" && !f[n] ? (f[n] = r.createAsyncTexture({
        attr: {
          src: n
        }
      }), f[n].then((a) => {
        f[n] = a.exportAsDataUrl(), t.setAttr(e, f[n]);
      })) : e === "src" && f[n] ? t.setAttr(e, f[n]) : e === "text" && n ? t.text(n) : e === "p-template" && t instanceof b ? t.addTemplate(c[n]) : t.setAttr(e, e === "transform" ? i(n) : n);
    else
      for (let a in n) {
        let o = n[a];
        if ((a === "fillStyle" || a === "strokeStyle") && typeof o == "string" && o.startsWith("grad")) {
          const y = o.match(/\(([^)]+)\)/)[1];
          o = d(y);
        }
        t.setStyle(a, o);
      }
  };
  function h(e, t) {
    return new b(r.ctx, {
      el: e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function i(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const a = e[n].match(/[\w\.\-]+/g);
      t[a.shift()] = a.map((o) => parseFloat(o));
    }
    return t;
  }
  function d(e) {
    return u[e];
  }
  return g;
}
let l = null;
const B = x({
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
      required: !0,
      default: 0
    },
    width: {
      type: Number,
      required: !0,
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
    info: {
      type: Object,
      required: !1,
      default: () => {
      }
    },
    encryption: {
      type: Object,
      required: !1,
      default: () => {
      }
    }
  },
  setup(r, f) {
    let c;
    const u = C();
    A(() => {
      N().then(() => {
        const i = f.slots.default;
        l || (r.type === "pdf" || r.type === "pdf-blob" ? l = m(r) : r.type === "canvas" ? l = h(r) : console.warn(`Unknown render context: ${r.type}`));
        const d = E(l), e = p(g, i);
        d(e, l);
      });
    }), O(() => {
      l && (l.destroy(), l = null);
    });
    const g = x({
      setup(i, d) {
        const e = C();
        e.parent = u, e.appContext = u.appContext, e.root = u.root, e.provides = u.provides;
        const t = d.slots.default;
        return () => p(U, t());
      }
    });
    function m(i) {
      let d = document.getElementById(c.props.id);
      return q(d, {
        height: i.height,
        width: i.width,
        ...i.config || {},
        info: i.info || {},
        encryption: i.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (t) => {
          d.tagName === "IFRAME" && d.setAttribute("src", t), i.onUpdate && i.onUpdate(t);
        }
      });
    }
    function h(i) {
      let d = document.getElementById(c.props.id);
      return G(d, i.config, i.layerSetting);
    }
    switch (r.type) {
      case "pdf":
        c = p("iframe", {
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
        c = p("div", {
          id: r.id,
          class: "renderOutput"
        });
        break;
      case "canvas":
        c = p("div", {
          id: r.id,
          class: "renderOutput"
        });
        break;
      case "default":
        c = p("iframe", {
          id: r.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null
        });
        break;
    }
    return () => c;
  }
});
export {
  B as default
};
