import { CanvasGradient as S, createRadialGradient as w, createLinearGradient as T, CanvasNodeExe as x, pdfLayer as N, canvasLayer as q } from "i2djs";
import { createRenderer as A, defineComponent as C, getCurrentInstance as b, onMounted as G, nextTick as I, h as m, Fragment as j } from "vue";
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
  const c = {}, f = {}, p = {}, { render: h } = A({
    patchProp(e, t, r, i, a, g, d, E, R) {
      y(t)(e, i);
    },
    insert: (e, t, r) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, r, i) => {
      const a = e.split("-").slice(1).join("-");
      let g = O.indexOf(e), d = null;
      switch (g === -1 && console.warn(`Unknown I2Djs tag: ${e}`), a) {
        case "page-template":
          d = n.createTemplate(), f[i.id] = d;
          break;
        case "page":
          d = n.addPage();
          break;
        case "linearGradient":
          d = T(), p[i.id] = d;
          break;
        case "radialGradient":
          d = w(), p[i.id] = d;
          break;
        default:
          d = l(a);
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
    nextSibling: (e) => (t, r) => {
    },
    querySelector: (e) => n.fetchEl(e) || null
  }), y = (e) => (t, r) => {
    if (typeof r == "function" && (r = r(t)), e !== "style")
      e === "src" && !c[r] ? (c[r] = n.createAsyncTexture({
        attr: {
          src: r
        }
      }), c[r].then((i) => {
        c[r] = i.exportAsDataUrl(), t.setAttr(e, c[r]);
      })) : e === "src" && c[r] ? t.setAttr(e, c[r]) : e === "text" && r ? t.text(r) : e === "p-template" && t instanceof x ? t.addTemplate(f[r]) : t.setAttr(e, e === "transform" ? s(r) : r);
    else
      for (let i in r) {
        let a = r[i];
        if ((i === "fillStyle" || i === "strokeStyle") && typeof a == "string" && a.startsWith("grad")) {
          const g = a.match(/\(([^)]+)\)/)[1];
          a = o(g);
        }
        t.setStyle(i, a);
      }
  };
  function l(e, t) {
    return new x(n.ctx, {
      el: e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function s(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const t = {};
    for (const r in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const i = e[r].match(/[\w\.\-]+/g);
      t[i.shift()] = i.map((a) => parseFloat(a));
    }
    return t;
  }
  function o(e) {
    return p[e];
  }
  return h;
}
let u = null;
const M = C({
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
  setup(n, c) {
    const f = b();
    G(() => {
      const s = c.slots.default;
      u && u.flush(), u || (n.type === "pdf" ? u = h(n) : n.type === "canvas" ? u = y("#" + n.id, n.ctxConfig, n.layerSetting) : console.warn(`Unknown render context: ${n.type}`));
      const o = k(u);
      I().then(() => {
        const e = m(p, s);
        o(e, u);
      });
    });
    const p = C({
      setup(s, o) {
        const e = b();
        e.parent = f, e.appContext = f.appContext, e.root = f.root, e.provides = f.provides;
        const t = o.slots.default;
        return () => m(j, t());
      }
    });
    function h(s) {
      const o = N(l.el, {
        height: s.height,
        width: s.width,
        margin: s.margin
      }, {
        onUpdate: (e) => {
          l.el.setAttribute("src", e);
        }
      });
      return console.log(o), o;
    }
    function y(s, o, e) {
      return q(s, o, e);
    }
    let l;
    switch (n.type) {
      case "pdf":
        l = m("iframe", {
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
        l = m("div", {
          id: n.id,
          class: "renderOutput"
        });
        break;
      case "default":
        l = m("iframe", {
          id: n.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null
        });
        break;
    }
    return () => l;
  }
});
export {
  M as default
};
