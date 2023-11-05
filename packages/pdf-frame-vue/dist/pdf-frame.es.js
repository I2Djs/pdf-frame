import { CanvasGradient as S, createRadialGradient as I, createLinearGradient as q, CanvasNodeExe as x, pdfLayer as G, canvasLayer as T } from "i2djs";
import { createRenderer as A, defineComponent as C, getCurrentInstance as w, onMounted as N, nextTick as O, h as p, onUnmounted as U, watch as b, Fragment as j } from "vue";
const E = [
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
function F(r) {
  const l = {}, c = {}, u = {}, { render: h } = A({
    patchProp(e, t, n, a, s, g, f, k, R) {
      m(t)(e, a);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, a) => {
      const s = e.split("-").slice(1).join("-");
      let g = E.indexOf(e), f = null;
      switch (g === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), s) {
        case "page-template":
          f = r.createTemplate(), c[a.id] = f;
          break;
        case "page":
          f = r.addPage();
          break;
        case "linearGradient":
          f = q(), u[a.id] = f;
          break;
        case "radialGradient":
          f = I(), u[a.id] = f;
          break;
        default:
          f = y(s);
          break;
      }
      return f;
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
      e === "src" && !l[n] ? (l[n] = r.createAsyncTexture({
        attr: {
          src: n
        }
      }), l[n].then((a) => {
        l[n] = a.exportAsDataUrl(), t.setAttr(e, l[n]);
      })) : e === "src" && l[n] ? t.setAttr(e, l[n]) : e === "text" && n ? t.text(n) : e === "p-template" && t instanceof x ? t.addTemplate(c[n]) : t.setAttr(e, e === "transform" ? i(n) : n);
    else
      for (let a in n) {
        let s = n[a];
        if ((a === "fillStyle" || a === "strokeStyle") && typeof s == "string" && s.startsWith("grad")) {
          const g = s.match(/\(([^)]+)\)/)[1];
          s = o(g);
        }
        t.setStyle(a, s);
      }
  };
  function y(e, t) {
    return new x(r.ctx, {
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
      t[a.shift()] = a.map((s) => parseFloat(s));
    }
    return t;
  }
  function o(e) {
    return u[e];
  }
  return h;
}
let d = null;
const L = C({
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
    // applicable for PDF Layer only
    height: {
      type: Number,
      required: !0,
      default: 0
    },
    // applicable for PDF Layer only
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
  setup(r, l) {
    let c;
    const u = w();
    N(() => {
      O().then(() => {
        const i = l.slots.default;
        d || (r.type === "pdf" || r.type === "pdf-blob" ? d = m(r) : r.type === "canvas" ? d = y(r) : console.warn(`Unknown render context: ${r.type}`));
        const o = F(d), e = p(h, i);
        o(e, d);
      });
    }), U(() => {
      d && (d.destroy(), d = null);
    }), b(() => r.encryption, (i) => {
      d.setConfig && d.setConfig({
        encryption: i
      });
    }, {
      deep: !0
    }), b(() => r.info, (i) => {
      d.setConfig && d.setConfig({
        info: i
      });
    }, {
      deep: !0
    }), b(() => r.config, (i) => {
      d.setConfig && d.setConfig({
        ...i
      });
    }, {
      deep: !0
    });
    const h = C({
      setup(i, o) {
        const e = w();
        e.parent = u, e.appContext = u.appContext, e.root = u.root, e.provides = u.provides;
        const t = o.slots.default;
        return () => p(j, t());
      }
    });
    function m(i) {
      let o = document.getElementById(c.props.id);
      return G(o, {
        height: i.height,
        width: i.width,
        ...i.config || {},
        info: i.info || {},
        encryption: i.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (t) => {
          o.tagName === "IFRAME" && o.setAttribute("src", t), i.onUpdate && i.onUpdate(t);
        }
      });
    }
    function y(i) {
      let o = document.getElementById(c.props.id);
      return T(o, i.config, i.layerSetting);
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
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        c = p("div", {
          id: r.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "default":
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
    }
    return () => c;
  }
});
export {
  L as default
};
