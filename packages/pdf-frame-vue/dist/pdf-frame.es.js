import { CanvasGradient as S, createRadialGradient as w, createLinearGradient as T, CanvasNodeExe as x, pdfLayer as I, canvasLayer as N } from "i2djs";
import { createRenderer as q, defineComponent as C, getCurrentInstance as b, onMounted as A, nextTick as G, h as m, Fragment as j } from "vue";
const O = [
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
  "i-page-template"
];
function k(n) {
  const d = {}, f = {}, p = {}, { render: g } = q({
    patchProp(e, t, r, i, s, h, o, E, R) {
      y(t)(e, i);
    },
    insert: (e, t, r) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, r, i) => {
      const s = e.split("-").slice(1).join("-");
      let h = O.indexOf(e), o = null;
      switch (h === -1 && console.warn(`Unknown I2Djs tag: ${e}`), s) {
        case "page-template":
          o = n.createTemplate(), f[i.id] = o;
          break;
        case "page":
          o = n.addPage();
          break;
        case "linearGradient":
          o = T(), p[i.id] = o;
          break;
        case "radialGradient":
          o = w(), p[i.id] = o;
          break;
        default:
          o = c(s);
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
    nextSibling: (e) => (t, r) => {
    },
    querySelector: (e) => n.fetchEl(e) || null
  }), y = (e) => (t, r) => {
    if (typeof r == "function" && (r = r(t)), e !== "style")
      e === "src" && !d[r] ? (d[r] = n.createAsyncTexture({
        attr: {
          src: r
        }
      }), d[r].then((i) => {
        d[r] = i.exportAsDataUrl(), t.setAttr(e, d[r]);
      })) : e === "src" && d[r] ? t.setAttr(e, d[r]) : e === "text" && r ? t.text(r) : e === "p-template" && t instanceof x ? t.addTemplate(f[r]) : t.setAttr(e, e === "transform" ? a(r) : r);
    else
      for (let i in r) {
        let s = r[i];
        if ((i === "fillStyle" || i === "strokeStyle") && typeof s == "string" && s.startsWith("grad")) {
          const h = s.match(/\(([^)]+)\)/)[1];
          s = u(h);
        }
        t.setStyle(i, s);
      }
  };
  function c(e, t) {
    return new x(n.ctx, {
      el: e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function a(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const r in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const i = e[r].match(/[\w\.\-]+/g);
      t[i.shift()] = i.map((s) => parseFloat(s));
    }
    return t;
  }
  function u(e) {
    return p[e];
  }
  return g;
}
let l = null;
const L = C({
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
      required: !0
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
    }
  },
  setup(n, d) {
    const f = b();
    A(() => {
      const a = d.slots.default;
      l && l.flush(), l || (n.type === "pdf" ? l = g(n) : n.type === "canvas" ? l = y(n) : console.warn(`Unknown render context: ${n.type}`));
      const u = k(l);
      G().then(() => {
        const e = m(p, a);
        u(e, l);
      });
    });
    const p = C({
      setup(a, u) {
        const e = b();
        e.parent = f, e.appContext = f.appContext, e.root = f.root, e.provides = f.provides;
        const t = u.slots.default;
        return () => m(j, t());
      }
    });
    function g(a) {
      return I(c.el, {
        height: a.height,
        width: a.width,
        margin: a.margin
      }, {
        onUpdate: (e) => {
          c.el.setAttribute("src", e);
        }
      });
    }
    function y(a) {
      return N(c.el, a.ctxConfig, a.layerSetting);
    }
    let c;
    switch (n.type) {
      case "pdf":
        c = m("iframe", {
          id: n.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null,
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        c = m("div", {
          id: n.id,
          class: "renderOutput"
        });
        break;
      case "default":
        c = m("iframe", {
          id: n.id,
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
  L as default
};
