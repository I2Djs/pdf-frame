import { CanvasGradient as G, createRadialGradient as O, createLinearGradient as U, CanvasNodeExe as T, pdfLayer as k, canvasLayer as j } from "i2djs";
import { createRenderer as E, nextTick as S, defineComponent as I, getCurrentInstance as q, onMounted as F, h as s, onUnmounted as R, watch as C, Fragment as z } from "vue";
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
  const d = {}, c = {}, r = {}, { render: u } = E({
    patchProp(e, i, n, t, f, y, l, p, b) {
      h(i)(e, t);
    },
    insert: (e, i, n) => {
      !e || !i || !i.child || e instanceof G || (e.nodeName === "animate" ? (e.parent = i, S().then(() => {
        i.animateTo(e, e.from);
      })) : e.nodeName === "animatePath" ? (e.parent = i, S().then(() => {
        i.animatePathTo(e);
      })) : i.child([e]));
    },
    remove: (e) => {
      e != null && e.remove();
    },
    createElement: (e, i, n, t) => {
      var p, b, N, A;
      const f = e.split("-").slice(1).join("-");
      let y = M.indexOf(e), l = null;
      switch (y === -1 && console.warn(`Unknown PDF-Frame tag: ${e}`), f) {
        case "page-template":
          l = a.createTemplate(), c[t.id] = l;
          break;
        case "page":
          l = a.addPage();
          break;
        case "linearGradient":
          l = U(), r[t.id] = l;
          break;
        case "radialGradient":
          l = O(), r[t.id] = l;
          break;
        case "animate":
          l = {
            nodeName: "animate",
            attr: {
              ...(t == null ? void 0 : t.to) ?? {},
              style: null
            },
            style: ((p = t == null ? void 0 : t.to) == null ? void 0 : p.style) ?? {},
            duration: t.duration || 0,
            ease: t.ease || "default",
            loop: t.loop || 0,
            end: t.end || null,
            delay: t.delay || 0,
            direction: t.direction || "default",
            setAttr: function(w, x) {
            },
            setStyle: function(w, x) {
            },
            remove: function() {
              this.parent.interrupt();
            }
          }, t.from && (l.from = {
            attr: {
              ...t.from,
              style: null
            },
            style: ((b = t.from) == null ? void 0 : b.style) ?? {}
          });
          break;
        case "animatePath":
          l = {
            nodeName: "animatePath",
            from: {
              attr: {
                ...t.from,
                style: null
              },
              style: ((N = t == null ? void 0 : t.from) == null ? void 0 : N.style) ?? {}
            },
            attr: {
              ...(t == null ? void 0 : t.to) ?? {},
              style: null
            },
            style: ((A = t == null ? void 0 : t.to) == null ? void 0 : A.style) ?? {},
            duration: t.duration || 0,
            ease: t.ease || "default",
            loop: t.loop || 0,
            end: t.end || null,
            delay: t.delay || 0,
            direction: t.direction || "default",
            setAttr: function(w, x) {
            },
            setStyle: function(w, x) {
            },
            remove: function() {
              this.parent.interrupt();
            }
          };
          break;
        default:
          l = o(f);
          break;
      }
      return l;
    },
    createText: (e) => {
    },
    createComment: (e) => {
    },
    setText: (e, i) => {
    },
    setElementText: (e, i) => {
    },
    parentNode: (e) => e && e.dom.parent ? e.dom.parent : null,
    nextSibling: (e) => (i, n) => {
    },
    querySelector: (e) => a.fetchEl(e) || null
  }), h = (e) => (i, n) => {
    if (typeof n == "function" && (n = n(i)), e !== "style")
      if (e === "src" && !d[n])
        d[n] = a.createAsyncTexture({
          attr: {
            src: n
          }
        }), d[n].then((t) => {
          d[n] = t.exportAsDataUrl(), i.setAttr(e, d[n]);
        });
      else if (e === "src" && d[n])
        i.setAttr(e, d[n]);
      else if (e === "text" && n)
        i.text(n);
      else if (e === "p-template" && i instanceof T)
        i.addTemplate(c[n]);
      else if (e === "event")
        for (let t in n)
          i.on && i.on(t, n[t]);
      else
        e === "block" ? i.block = !0 : e === "data" ? i.data(n) : e === "transform" ? i.setAttr(e, g(n)) : i.setAttr(e, n);
    else
      for (let t in n) {
        let f = n[t];
        if (typeof f == "function" && (f = f(i)), (t === "fillStyle" || t === "strokeStyle") && typeof f == "string" && f.startsWith("grad")) {
          const y = f.match(/\(([^)]+)\)/)[1];
          f = m(y);
        }
        i.setStyle(t, f);
      }
  };
  function o(e, i) {
    return new T(a.ctx, {
      el: e === "group" ? "g" : e,
      attr: {},
      style: {}
    }, Math.round(Math.random() * 1e7), 0);
  }
  function g(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null)
      return e;
    const i = {};
    for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
      const t = e[n].match(/[\w\.\-]+/g);
      i[t.shift()] = t.map((f) => parseFloat(f));
    }
    return i;
  }
  function m(e) {
    return r[e];
  }
  return u;
}
const D = I({
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
    let c, r = null;
    const u = q();
    F(() => {
      S().then(() => {
        const e = d.slots.default;
        r || (a.type === "pdf" || a.type === "pdf-blob" ? r = o(a) : a.type === "canvas" ? r = g(a) : console.warn(`Unknown render context: ${a.type}`)), r && r.onResize && r.onResize(() => {
          d.emit("on-resize", {
            height: r.height,
            width: r.width
          });
        });
        const i = B(r), n = s(h, e);
        i(n, r), d.emit("on-ready", r);
      });
    }), R(() => {
      r && (r.destroy(), r = null);
    }), C(() => a.encryption, (e) => {
      r.setConfig && r.setConfig({
        encryption: e
      });
    }, {
      deep: !0
    }), C(() => a.info, (e) => {
      r.setConfig && r.setConfig({
        info: e
      });
    }, {
      deep: !0
    }), C(() => a.config, (e) => {
      r.setConfig && r.setConfig({
        ...e
      });
    }, {
      deep: !0
    });
    const h = I({
      setup(e, i) {
        const n = q();
        n.parent = u, n.appContext = u.appContext, n.root = u.root, n.provides = u.provides;
        const t = i.slots.default;
        return () => s(z, t());
      }
    });
    function o(e) {
      let i = document.getElementById(c.props.id);
      return k(i, {
        height: e.height,
        width: e.width,
        ...e.config || {},
        info: e.info || {},
        encryption: e.encryption || {}
      }, {
        autoUpdate: !0,
        onUpdate: (t) => {
          i.tagName === "IFRAME" && i.setAttribute("src", t), e.onUpdate && m(t);
        }
      });
    }
    function g(e) {
      let i = document.getElementById(c.props.id);
      return j(i, e.config, {
        ...e.layerSetting,
        onUpdate: () => {
          m();
        }
      });
    }
    switch (a.type) {
      case "pdf":
        c = s("iframe", {
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
        c = s("div", {
          id: a.id,
          class: "renderOutput",
          style: {
            height: "100%",
            width: "100%"
          }
        });
        break;
      case "canvas":
        c = s("div", {
          id: a.id,
          class: "renderOutput",
          style: {
            height: a.height ? a.height + "px" : "100%",
            width: a.width ? a.width + "px" : "100%"
          }
        });
        break;
      case "default":
        c = s("iframe", {
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
    function m(e) {
      d.emit("on-update", e);
    }
    return () => c;
  }
});
export {
  D as default
};
