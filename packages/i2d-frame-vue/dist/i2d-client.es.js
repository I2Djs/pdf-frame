import { ref as $, useSlots as j, onMounted as R, h as m, render as V, resolveComponent as U, openBlock as W, createElementBlock as z, Fragment as H, createVNode as v, withCtx as J, renderSlot as K } from "vue";
import { canvasLayer as Q, pdfLayer as X } from "i2djs";
const Y = (d, i) => {
  const y = d.__vccOpts || d;
  for (const [c, a] of i)
    y[c] = a;
  return y;
}, Z = {
  __name: "i2d-client",
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
    }
  },
  setup(d) {
    const i = d, y = $({});
    let c = null, a = {};
    const h = j();
    R(() => {
      c && c.flush(), c || (i.type === "pdf" ? c = b(i) : i.type === "canvas" ? c = w("#" + i.id, {}, {}) : i.type === "svg" || i.type), console.log(c), setTimeout(() => {
        i.type === "pdf" ? S(i.id, c, {
          children: h.default()
        }) : i.type === "canvas" ? k(c, h.default()) : i.type === "svg" && prepareSvg(c, h.default());
      }, 500);
    });
    function I() {
      let e;
      switch (i.type) {
        case "pdf":
          e = m("iframe", {
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
        case "canvas":
        case "svg":
        case "webgl":
          e = m("div", {
            id: i.id,
            class: "renderOutput"
          });
          break;
        case "default":
          e = m("iframe", {
            id: i.id,
            class: "pdfIframe renderOutput",
            type: "application/pdf",
            src: null
          });
          break;
      }
      return e;
    }
    function w(e, o, n) {
      return Q(e, o, n);
    }
    function b(e) {
      return X({
        height: e.height,
        width: e.width,
        margin: e.margin
      });
    }
    async function S(e, o, n) {
      a = (await C(n, o)).reduce((t, r) => (t[r.attr.src] = r, t), a);
      for (const t of n.children)
        if (t.type === "i-page") {
          const r = o.addPage(), p = t;
          p.props && p.props["p-template"] && r.addTemplate(_[p.props["p-template"]]), f(t, r);
        } else
          t.type === "i-page-template" && N(t);
      return o.exportPdf(function(t) {
        document.getElementById(e).setAttribute("src", t);
      }), o;
    }
    function k(e, o) {
      for (const n of o.children)
        f(n, e);
    }
    function C(e, o) {
      const n = [];
      let s = [...e.children];
      for (; s.length !== 0; ) {
        const t = s.shift(), r = { ...t.props };
        if (t.type === "i-image") {
          for (const l in r)
            typeof r[l] == "function" && (r[l] = r[l](ctx));
          r.width && (r.width = r.width * 3), r.height && (r.height = r.height * 3), r.src && !a[r.src] && (n.push(
            o.createAsyncTexture({
              attr: {
                ...r
              }
            })
          ), a[r.src] = !0);
        } else
          t.children && t.children.length > 0 && (s = s.concat(t.children || []));
      }
      return Promise.all(n);
    }
    function f(e, o) {
      let n = null;
      const s = e.type, t = { ...e.props || {} }, r = t.style || {};
      for (const p in t)
        typeof t[p] == "function" && (t[p] = t[p](o)), p === "src" && s === "i-image" && a[t[p]] && (t[p] = a[t[p]].exportAsDataUrl());
      for (const p in r)
        if (typeof r[p] == "string" && r[p].startsWith("grad")) {
          const l = r[p].match(/\(([^)]+)\)/)[1];
          r[p] = P(l);
        }
      if (t.transform = t.transform && E(t.transform), [
        "i-group",
        "i-circle",
        "i-line",
        "i-path",
        "i-ellipse",
        "i-polygon",
        "i-polyline",
        "i-rect",
        "i-text",
        "i-image"
      ].includes(s)) {
        const p = s.split("-")[1];
        n = o.createEl({
          el: p,
          attr: t,
          style: r
        });
      } else if (["i-defs"].includes(s)) {
        T(e, o);
        return;
      } else if (typeof s == "object") {
        console.log(s);
        const p = m(resolveComponent(s), e.props), l = document.createElement("div");
        V(p, l);
        const u = p.component, O = u.props, L = u.renderCache, A = u.ctx, B = u.setupState, D = u.data, F = null, M = p.component.render(A, L, O, B, D, F);
        f(M, n || o);
        return;
      }
      for (const p of e.children || [])
        f(p, n || o);
    }
    const _ = {};
    function N(e) {
      const o = c.createTemplate();
      for (const n of e.children)
        f(n, o);
      _[e.props.id] = o;
    }
    const g = {};
    function T(e, o) {
      for (const n of e.children) {
        const s = n, r = s.type.split("-")[1];
        r === "linearGradient" ? g[s.props.id] = G(s, o) : r === "radialGradient" && (g[s.props.id] = q(s, o));
      }
    }
    function P(e) {
      return g[e];
    }
    function G(e, o) {
      const n = e.children, s = [], t = {
        x1: parseInt(e.props.x1) || 0,
        x2: parseInt(e.props.x2) || 0,
        y1: parseInt(e.props.y1) || 0,
        y2: parseInt(e.props.y2) || 0
      };
      for (const r of n)
        s.push({
          color: r.props.style["stop-color"],
          value: parseInt(r.props.offset),
          opacity: r.props.style["stop-opacity"] || 1
        });
      return o.createLinearGradient({
        id: e.props.id,
        x1: t.x1,
        y1: t.y1,
        x2: t.x2,
        y2: t.y2,
        spreadMethod: "repeat",
        colorStops: s
      });
    }
    function q(e, o) {
      const n = e.children, s = [], t = {
        r1: parseInt(e.props.r1) || 0,
        x1: parseInt(e.props.x1) || 0,
        x2: parseInt(e.props.x2) || 0,
        r2: parseInt(e.props.r2) || 0,
        y1: parseInt(e.props.y1) || 0,
        y2: parseInt(e.props.y2) || 0
      };
      for (const r of n)
        s.push({
          color: r.props.style["stop-color"],
          value: parseInt(r.props.offset),
          opacity: r.props.style["stop-opacity"] || 1
        });
      return o.createRadialGradient({
        id: e.props.id,
        r1: t.r1,
        x1: t.x1,
        y1: t.y1,
        x2: t.x2,
        y2: t.y2,
        r2: t.r2,
        spreadMethod: "repeat",
        colorStops: s
      });
    }
    function E(e) {
      const o = {};
      for (const n in e = e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)) {
        const s = e[n].match(/[\w\.\-]+/g);
        o[s.shift()] = s.map((t) => parseFloat(t));
      }
      return o;
    }
    return (e, o) => {
      const n = U("i-group");
      return W(), z(H, null, [
        v(n, {
          ref_key: "i2del",
          ref: y
        }, {
          default: J(() => [
            K(e.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }, 512),
        v(I)
      ], 64);
    };
  }
}, ee = /* @__PURE__ */ Y(Z, [["__scopeId", "data-v-f0d510e7"]]), te = { i2dClient: ee }, x = te, se = {
  install(d) {
    Object.keys(x).forEach((i) => {
      d.component(i, x[i]);
    });
  }
};
export {
  se as default
};
