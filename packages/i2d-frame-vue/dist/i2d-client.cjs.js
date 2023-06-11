"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const c=require("vue"),v=require("i2djs");const F=(f,i)=>{const h=f.__vccOpts||f;for(const[a,l]of i)h[a]=l;return h},V={__name:"i2d-client",props:{type:{type:String,required:!0},id:{type:String,required:!0},height:{type:Number,required:!0},width:{type:Number,required:!0},margin:{type:Number,required:!0}},setup(f){const i=f,h=c.ref({});let a=null,l={};const m=c.useSlots();c.onMounted(()=>{a&&a.flush(),a||(i.type==="pdf"?a=w(i):i.type==="canvas"?a=b("#"+i.id,{},{}):i.type==="svg"||i.type),console.log(a),setTimeout(()=>{i.type==="pdf"?S(i.id,a,{children:m.default()}):i.type==="canvas"?k(a,m.default()):i.type==="svg"&&prepareSvg(a,m.default())},500)});function I(){let e;switch(i.type){case"pdf":e=c.h("iframe",{id:i.id,class:"pdfIframe renderOutput",type:"application/pdf",src:null,style:{height:"100%",width:"100%"}});break;case"canvas":case"svg":case"webgl":e=c.h("div",{id:i.id,class:"renderOutput"});break;case"default":e=c.h("iframe",{id:i.id,class:"pdfIframe renderOutput",type:"application/pdf",src:null});break}return e}function b(e,o,n){return v.canvasLayer(e,o,n)}function w(e){return v.pdfLayer({height:e.height,width:e.width,margin:e.margin})}async function S(e,o,n){l=(await C(n,o)).reduce((t,r)=>(t[r.attr.src]=r,t),l);for(const t of n.children)if(t.type==="i-page"){const r=o.addPage(),p=t;p.props&&p.props["p-template"]&&r.addTemplate(_[p.props["p-template"]]),u(t,r)}else t.type==="i-page-template"&&N(t);return o.exportPdf(function(t){document.getElementById(e).setAttribute("src",t)}),o}function k(e,o){for(const n of o.children)u(n,e)}function C(e,o){const n=[];let s=[...e.children];for(;s.length!==0;){const t=s.shift(),r={...t.props};if(t.type==="i-image"){for(const d in r)typeof r[d]=="function"&&(r[d]=r[d](ctx));r.width&&(r.width=r.width*3),r.height&&(r.height=r.height*3),r.src&&!l[r.src]&&(n.push(o.createAsyncTexture({attr:{...r}})),l[r.src]=!0)}else t.children&&t.children.length>0&&(s=s.concat(t.children||[]))}return Promise.all(n)}function u(e,o){let n=null;const s=e.type,t={...e.props||{}},r=t.style||{};for(const p in t)typeof t[p]=="function"&&(t[p]=t[p](o)),p==="src"&&s==="i-image"&&l[t[p]]&&(t[p]=l[t[p]].exportAsDataUrl());for(const p in r)if(typeof r[p]=="string"&&r[p].startsWith("grad")){const d=r[p].match(/\(([^)]+)\)/)[1];r[p]=P(d)}if(t.transform=t.transform&&O(t.transform),["i-group","i-circle","i-line","i-path","i-ellipse","i-polygon","i-polyline","i-rect","i-text","i-image"].includes(s)){const p=s.split("-")[1];n=o.createEl({el:p,attr:t,style:r})}else if(["i-defs"].includes(s)){T(e,o);return}else if(typeof s=="object"){console.log(s);const p=c.h(resolveComponent(s),e.props),d=document.createElement("div");c.render(p,d);const y=p.component,E=y.props,M=y.renderCache,j=y.ctx,L=y.setupState,A=y.data,B=null,D=p.component.render(j,M,E,L,A,B);u(D,n||o);return}for(const p of e.children||[])u(p,n||o)}const _={};function N(e){const o=a.createTemplate();for(const n of e.children)u(n,o);_[e.props.id]=o}const g={};function T(e,o){for(const n of e.children){const s=n,r=s.type.split("-")[1];r==="linearGradient"?g[s.props.id]=q(s,o):r==="radialGradient"&&(g[s.props.id]=G(s,o))}}function P(e){return g[e]}function q(e,o){const n=e.children,s=[],t={x1:parseInt(e.props.x1)||0,x2:parseInt(e.props.x2)||0,y1:parseInt(e.props.y1)||0,y2:parseInt(e.props.y2)||0};for(const r of n)s.push({color:r.props.style["stop-color"],value:parseInt(r.props.offset),opacity:r.props.style["stop-opacity"]||1});return o.createLinearGradient({id:e.props.id,x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,spreadMethod:"repeat",colorStops:s})}function G(e,o){const n=e.children,s=[],t={r1:parseInt(e.props.r1)||0,x1:parseInt(e.props.x1)||0,x2:parseInt(e.props.x2)||0,r2:parseInt(e.props.r2)||0,y1:parseInt(e.props.y1)||0,y2:parseInt(e.props.y2)||0};for(const r of n)s.push({color:r.props.style["stop-color"],value:parseInt(r.props.offset),opacity:r.props.style["stop-opacity"]||1});return o.createRadialGradient({id:e.props.id,r1:t.r1,x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2,r2:t.r2,spreadMethod:"repeat",colorStops:s})}function O(e){const o={};for(const n in e=e.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g)){const s=e[n].match(/[\w\.\-]+/g);o[s.shift()]=s.map(t=>parseFloat(t))}return o}return(e,o)=>{const n=c.resolveComponent("i-group");return c.openBlock(),c.createElementBlock(c.Fragment,null,[c.createVNode(n,{ref_key:"i2del",ref:h},{default:c.withCtx(()=>[c.renderSlot(e.$slots,"default",{},void 0,!0)]),_:3},512),c.createVNode(I)],64)}}},R=F(V,[["__scopeId","data-v-f0d510e7"]]),U={i2dClient:R},x=U,W={install(f){Object.keys(x).forEach(i=>{f.component(i,x[i])})}};exports.default=W;