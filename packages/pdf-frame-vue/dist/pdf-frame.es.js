import { CanvasGradient as S, createRadialGradient as w, createLinearGradient as q, CanvasNodeExe as b, pdfLayer as G, canvasLayer as T } from "i2djs";
import { createRenderer as A, defineComponent as x, getCurrentInstance as C, onMounted as I, nextTick as N, h as p, onUnmounted as O, Fragment as U } from "vue";
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
function F(r) {
  const s = {}, l = {}, m = {}, { render: y } = A({
    patchProp(e, t, n, a, o, g, c, k, E) {
      h(t)(e, a);
    },
    insert: (e, t, n) => {
      !e || !t || !t.child || e instanceof S || t.child([e]);
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, t, n, a) => {
      const o = e.split("-").slice(1).join("-");
      let g = j.indexOf(e), c = null;
      switch (g === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), o) {
        case "page-template":
          c = r.createTemplate(), l[a.id] = c;
          break;
        case "page":
          c = r.addPage();
          break;
        case "linearGradient":
          c = q(), m[a.id] = c;
          break;
        case "radialGradient":
          c = w(), m[a.id] = c;
          break;
        default:
          c = d(o);
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
    querySelector: (e) => r.fetchEl(e) || null
  }), h = (e) => (t, n) => {
    if (typeof n == "function" && (n = n(t)), e !== "style")
      e === "src" && !s[n] ? (s[n] = r.createAsyncTexture({
        attr: {
          src: n
        }
      }), s[n].then((a) => {
        s[n] = a.exportAsDataUrl(), t.setAttr(e, s[n]);
      })) : e === "src" && s[n] ? t.setAttr(e, s[n]) : e === "text" && n ? t.text(n) : e === "p-template" && t instanceof b ? t.addTemplate(l[n]) : t.setAttr(e, e === "transform" ? i(n) : n);
    else
      for (let a in n) {
        let o = n[a];
        if ((a === "fillStyle" || a === "strokeStyle") && typeof o == "string" && o.startsWith("grad")) {
          const g = o.match(/\(([^)]+)\)/)[1];
          o = u(g);
        }
        t.setStyle(a, o);
      }
  };
  function d(e, t) {
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
  function u(e) {
    return m[e];
  }
  return y;
}
let f = null;
const L = x({
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
  setup(r, s) {
    const l = C();
    I(() => {
      const i = s.slots.default;
      f || (r.type === "pdf" || r.type === "pdf-blob" ? f = y(r) : r.type === "canvas" ? f = h(r) : console.warn(`Unknown render context: ${r.type}`));
      const u = F(f);
      N().then(() => {
        const e = p(m, i);
        u(e, f);
      });
    }), O(() => {
      f && (f.destroy(), f = null);
    });
    const m = x({
      setup(i, u) {
        const e = C();
        e.parent = l, e.appContext = l.appContext, e.root = l.root, e.provides = l.provides;
        const t = u.slots.default;
        return () => p(U, t());
      }
    });
    function y(i) {
      return G(d.el, {
        height: i.height,
        width: i.width,
        ...i.config || {},
        info: i.info || {},
        encryption: i.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (e) => {
          d.el.tagName === "IFRAME" && d.el.setAttribute("src", e), i.onUpdate && i.onUpdate(e);
        }
      });
    }
    function h(i) {
      return T(d.el, i.config, i.layerSetting);
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
  L as default
};
