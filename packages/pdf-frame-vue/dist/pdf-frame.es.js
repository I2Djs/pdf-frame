import { CanvasGradient as S, createRadialGradient as w, createLinearGradient as I, CanvasNodeExe as x, pdfLayer as T, canvasLayer as N } from "i2djs";
import { createRenderer as q, defineComponent as C, getCurrentInstance as b, onMounted as G, h as m, Fragment as A } from "@vue/runtime-core";
import { nextTick as E } from "vue";
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
function j(r) {
  const c = {}, l = {}, p = {}, { render: h } = q({
    patchProp(e, t, n, i, d, g, s, k, R) {
      y(t)(e, i);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, i) => {
      const d = e.split("-").slice(1).join("-");
      let g = O.indexOf(e), s = null;
      switch (g === -1 && console.warn(`Unknown I2Djs tag: ${e}`), d) {
        case "page-template":
          s = r.createTemplate(), l[i.id] = s;
          break;
        case "page":
          s = r.addPage();
          break;
        case "linearGradient":
          s = I(), p[i.id] = s;
          break;
        case "radialGradient":
          s = w(), p[i.id] = s;
          break;
        default:
          s = f(d);
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
  }), y = (e) => (t, n) => {
    if (typeof n == "function" && (n = n(t)), e !== "style")
      e === "src" && !c[n] ? (c[n] = r.createAsyncTexture({
        attr: {
          src: n
        }
      }), c[n].then((i) => {
        c[n] = i.exportAsDataUrl(), t.setAttr(e, c[n]);
      })) : e === "src" && c[n] ? t.setAttr(e, c[n]) : e === "p-template" && t instanceof x ? t.addTemplate(l[n]) : t.setAttr(e, e === "transform" ? a(n) : n);
    else
      for (let i in n) {
        let d = n[i];
        if ((i === "fillStyle" || i === "strokeStyle") && typeof d == "string" && d.startsWith("grad")) {
          const g = d.match(/\(([^)]+)\)/)[1];
          d = o(g);
        }
        t.setStyle(i, d);
      }
  };
  function f(e, t) {
    return new x(r.ctx, {
      el: e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function a(e) {
    const t = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const i = e[n].match(/[\w\.\-]+/g);
      t[i.shift()] = i.map((d) => parseFloat(d));
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
      required: !0,
      default: () => {
      }
    },
    layerSetting: {
      type: Object,
      required: !0,
      default: () => {
      }
    }
  },
  setup(r, c) {
    const l = b();
    G(() => {
      const a = c.slots.default;
      u && u.flush(), u || (r.type === "pdf" ? u = h(r) : r.type === "canvas" ? u = y("#" + r.id, r.ctxConfig, r.layerSetting) : console.warn(`Unknown render context: ${r.type}`));
      const o = j(u);
      E().then(() => {
        const e = m(p, a);
        o(e, u);
      });
    });
    const p = C({
      setup(a, o) {
        const e = b();
        e.parent = l, e.appContext = l.appContext, e.root = l.root, e.provides = l.provides;
        const t = o.slots.default;
        return () => m(A, t());
      }
    });
    function h(a) {
      const o = T({
        height: a.height,
        width: a.width,
        margin: a.margin,
        el: document.getElementById(a.id)
      }, {
        onUpdate: (e) => {
          document.getElementById(a.id).setAttribute("src", e);
        }
      });
      return console.log(o), o;
    }
    function y(a, o, e) {
      return N(a, o, e);
    }
    let f;
    switch (r.type) {
      case "pdf":
        f = m("iframe", {
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
      case "canvas":
        f = m("div", {
          id: r.id,
          class: "renderOutput"
        });
        break;
      case "default":
        f = m("iframe", {
          id: r.id,
          class: "pdfIframe renderOutput",
          type: "application/pdf",
          src: null
        });
        break;
    }
    return () => f;
  }
});
export {
  M as default
};
