import { CanvasGradient as S, createRadialGradient as w, createLinearGradient as N, CanvasNodeExe as x, pdfLayer as I, canvasLayer as T } from "i2djs";
import { createRenderer as q, defineComponent as b, getCurrentInstance as C, onMounted as A, nextTick as G, h as p, Fragment as O } from "vue";
const U = [
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
  "i-page-template"
];
function j(r) {
  const c = {}, f = {}, m = {}, { render: g } = q({
    patchProp(e, t, n, i, s, h, o, k, E) {
      y(t)(e, i);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, i) => {
      const s = e.split("-").slice(1).join("-");
      let h = U.indexOf(e), o = null;
      switch (h === -1 && console.warn(`Unknown I2Djs tag: ${e}`), s) {
        case "page-template":
          o = r.createTemplate(), f[i.id] = o;
          break;
        case "page":
          o = r.addPage();
          break;
        case "linearGradient":
          o = N(), m[i.id] = o;
          break;
        case "radialGradient":
          o = w(), m[i.id] = o;
          break;
        default:
          o = d(s);
          break;
      }
      return o;
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
  }), y = (e) => (t, n) => {
    if (typeof n == "function" && (n = n(t)), e !== "style")
      e === "src" && !c[n] ? (c[n] = r.createAsyncTexture({
        attr: {
          src: n
        }
      }), c[n].then((i) => {
        c[n] = i.exportAsDataUrl(), t.setAttr(e, c[n]);
      })) : e === "src" && c[n] ? t.setAttr(e, c[n]) : e === "text" && n ? t.text(n) : e === "p-template" && t instanceof x ? t.addTemplate(f[n]) : t.setAttr(e, e === "transform" ? a(n) : n);
    else
      for (let i in n) {
        let s = n[i];
        if ((i === "fillStyle" || i === "strokeStyle") && typeof s == "string" && s.startsWith("grad")) {
          const h = s.match(/\(([^)]+)\)/)[1];
          s = u(h);
        }
        t.setStyle(i, s);
      }
  };
  function d(e, t) {
    return new x(r.ctx, {
      el: e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function a(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const i = e[n].match(/[\w\.\-]+/g);
      t[i.shift()] = i.map((s) => parseFloat(s));
    }
    return t;
  }
  function u(e) {
    return m[e];
  }
  return g;
}
let l = null;
const M = b({
  props: {
    type: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    height: {
      type: Number,
      required: !0
    },
    width: {
      type: Number,
      required: !0
    },
    margin: {
      type: Number,
      required: !1,
      default: 0
    },
    ctxConfig: {
      type: Object,
      required: !1,
      default: () => {
      }
    },
    layerSetting: {
      type: Object,
      required: !1,
      default: () => {
      }
    },
    onUpdate: {
      type: Function,
      required: !1
    }
  },
  setup(r, c) {
    const f = C();
    A(() => {
      const a = c.slots.default;
      l && l.flush(), l || (r.type === "pdf" || r.type === "pdf-blob" ? l = g(r) : r.type === "canvas" ? l = y(r) : console.warn(`Unknown render context: ${r.type}`));
      const u = j(l);
      G().then(() => {
        const e = p(m, a);
        u(e, l);
      });
    });
    const m = b({
      setup(a, u) {
        const e = C();
        e.parent = f, e.appContext = f.appContext, e.root = f.root, e.provides = f.provides;
        const t = u.slots.default;
        return () => p(O, t());
      }
    });
    function g(a) {
      return I(d.el, {
        height: a.height,
        width: a.width,
        margin: a.margin || 0
      }, {
        onUpdate: (e) => {
          console.log(d.el.tagName), d.el.tagName === "IFRAME" && d.el.setAttribute("src", e), a.onUpdate && a.onUpdate(e);
        }
      });
    }
    function y(a) {
      return T(d.el, a.ctxConfig, a.layerSetting);
    }
    let d;
    switch (r.type) {
      case "pdf":
        d = p("iframe", {
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
        d = p("div", {
          id: r.id,
          class: "renderOutput"
        });
        break;
      case "canvas":
        d = p("div", {
          id: r.id,
          class: "renderOutput"
        });
        break;
      case "default":
        d = p("iframe", {
          id: r.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null
        });
        break;
    }
    return () => d;
  }
});
export {
  M as default
};
