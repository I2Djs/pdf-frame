<!-- eslint-disable no-useless-escape -->
<template>
  <i-group ref="i2del">
    <slot />
  </i-group>
  <render />
</template>

<script setup>
import { canvasLayer, pdfLayer } from "i2djs";
import { h, onMounted, useSlots, render as vueRender, ref } from "vue";

const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    margin: {
        type: Number,
        required: true,
    },
});

const i2del = ref({});
let layerInstance = null;

let resolvedImages = {};
const slots = useSlots();

onMounted(() => {
    if (layerInstance) {
        layerInstance.flush();
    }
    if (!layerInstance) {
        if (props.type === "pdf") {
            layerInstance = createPdfInstance(props);
        } else if (props.type === "canvas") {
            layerInstance = createCanvasInstance("#" + props.id, {}, {});
        } else if (props.type === "svg") {
            // layerInstance = svgLayer("#" + props.id, {}, {});
        } else if (props.type === "webgl") {
            // layerInstance = webGlLayer("#" + props.id, {}, {});
        } else {
            // console.log("unknown type");
        }
    }

    console.log(layerInstance);

    setTimeout(() => {
        if (props.type === "pdf") {
            preparePdf(props.id, layerInstance, {
                children: slots.default(),
            });
        } else if (props.type === "canvas") {
            prepareCanvas(layerInstance, slots.default());
        } else if (props.type === "svg") {
            prepareSvg(layerInstance, slots.default());
        }
    }, 500);
});

// onUpdated(() => {
//     console.log("on Update called");
//     if (layerInstance) {
//         layerInstance.flush();
//     }
//     if (!layerInstance) {
//         if (props.type === "pdf") {
//             layerInstance = createPdfInstance(props);
//         } else if (props.type === "canvas") {
//             layerInstance = createCanvasInstance("#" + props.id, {}, {});
//         } else if (props.type === "svg") {
//             // layerInstance = svgLayer("#" + props.id, {}, {});
//         } else if (props.type === "webgl") {
//             // layerInstance = webGlLayer("#" + props.id, {}, {});
//         } else {
//             // console.log("unknown type");
//         }
//     }

//     setTimeout(() => {
//         console.log(i2del.value);

//         if (props.type === "pdf") {
//             preparePdf(props.id, layerInstance, i2del.value);
//         } else if (props.type === "canvas") {
//             prepareCanvas(layerInstance, i2del.value);
//         } else if (props.type === "svg") {
//             prepareSvg(layerInstance, i2del.value);
//         }
//     }, 500);
// });

function render() {
    let vNode;

    switch (props.type) {
        case "pdf":
            vNode = h("iframe", {
                id: props.id,
                class: "pdfIframe renderOutput",
                type: "application/pdf",
                src: null,
                style: {
                    height: "100%",
                    width: "100%",
                },
            });
            break;
        case "canvas":
        case "svg":
        case "webgl":
            vNode = h("div", {
                id: props.id,
                class: "renderOutput",
            });
            break;
        case "default":
            vNode = h("iframe", {
                id: props.id,
                class: "pdfIframe renderOutput",
                type: "application/pdf",
                src: null,
            });
            break;
    }

    return vNode;
}

// function createSvgInstance(id, ctxCfg, layerCfg) {
//     return svgLayer(id, layerCfg);
// }

function createCanvasInstance(id, ctxCfg, layerCfg) {
    return canvasLayer(id, ctxCfg, layerCfg);
}

function createPdfInstance(props) {
    const pdfInstance = pdfLayer({
        height: props.height,
        width: props.width,
        margin: props.margin,
    });

    return pdfInstance;
}

async function preparePdf(id, pdfInstance, template) {
    const tempImages = await prepareTexturesForImages(template, pdfInstance);
    resolvedImages = tempImages.reduce((p, c) => {
        p[c.attr.src] = c;
        return p;
    }, resolvedImages);

    for (const n of template.children) {
        if (n.type === "i-page") {
            const page = pdfInstance.addPage();
            const vNode = n;
            if (vNode.props && vNode.props["p-template"]) {
                page.addTemplate(templates[vNode.props["p-template"]]);
            }
            drawNode(n, page);
        } else if (n.type === "i-page-template") {
            preparePageTemplate(n);
        }
    }

    pdfInstance.exportPdf(function (url) {
        document.getElementById(id).setAttribute("src", url);
    });

    return pdfInstance;
}

function prepareCanvas(canvasInstance, template) {
    for (const n of template.children) {
        drawNode(n, canvasInstance);
    }
}

function prepareTexturesForImages(template, pdfExe) {
    const imageProxies = [];
    let nodeStack = [...template.children] || [];

    while (nodeStack.length !== 0) {
        const vNode = nodeStack.shift();
        const props = { ...vNode.props } || {};
        const type = vNode.type;
        // console.log(vNode);
        if (type === "i-image") {
            for (const key in props) {
                if (typeof props[key] === "function") {
                    props[key] = props[key](ctx);
                }
            }

            if (props.width) {
                props.width = props.width * 3;
            }

            if (props.height) {
                props.height = props.height * 3;
            }

            if (props.src && !resolvedImages[props.src]) {
                imageProxies.push(
                    pdfExe.createAsyncTexture({
                        attr: {
                            ...props,
                        },
                    })
                );
                resolvedImages[props.src] = true;
            }
        } else if (vNode.children && vNode.children.length > 0) {
            nodeStack = nodeStack.concat(vNode.children || []);
        }
    }
    return Promise.all(imageProxies);
}

function drawNode(vNode, ctx) {
    let el = null;
    const type = vNode.type;
    const props = { ...(vNode.props || {}) } || {};
    const style = props.style || {};

    for (const key in props) {
        if (typeof props[key] === "function") {
            props[key] = props[key](ctx);
        }
        if (key === "src" && type === "i-image" && resolvedImages[props[key]]) {
            props[key] = resolvedImages[props[key]].exportAsDataUrl();
        }
    }

    for (const st in style) {
        if (typeof style[st] === "string" && style[st].startsWith("grad")) {
            const gtId = style[st].match(/\(([^)]+)\)/)[1];
            style[st] = grad(gtId);
        }
    }

    props.transform = props.transform && parseTransformStr(props.transform);

    if (
        [
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
        ].includes(type)
    ) {
        const type_ = type.split("-")[1];
        el = ctx.createEl({
            el: type_,
            attr: props,
            style,
        });
    } else if (["i-defs"].includes(type)) {
        prepareDefs(vNode, ctx);
        return;
    } else if (typeof type === "object") {
        console.log(type);
        const cVNode = h(resolveComponent(type), vNode.props);
        const outNode = document.createElement("div");

        vueRender(cVNode, outNode);
        const component = cVNode.component;
        const props = component.props;
        const cache = component.renderCache;
        const ctx_ = component.ctx;
        const setup = component.setupState;
        const data = component.data;
        const options = null;
        const compiledvNode = cVNode.component.render(ctx_, cache, props, setup, data, options);
        drawNode(compiledvNode, el || ctx);
        return;
    }

    for (const n of vNode.children || []) {
        drawNode(n, el || ctx);
    }
}

const templates = {};
function preparePageTemplate(node) {
    const pTemp = layerInstance.createTemplate();
    for (const n of node.children) {
        drawNode(n, pTemp);
    }
    templates[node.props.id] = pTemp;
}

const preDefs = {};
function prepareDefs(n, ctx) {
    for (const node of n.children) {
        const vNode = node;
        const type = vNode.type;
        const type_ = type.split("-")[1];
        if (type_ === "linearGradient") {
            preDefs[vNode.props.id] = buildLinearGradient(vNode, ctx);
        } else if (type_ === "radialGradient") {
            preDefs[vNode.props.id] = buildRadialGradient(vNode, ctx);
        }
    }
}

function grad(id) {
    return preDefs[id];
}

function buildLinearGradient(n, ctx) {
    const colorStops = n.children;
    const colors = [];
    const attr = {
        x1: parseInt(n.props.x1) || 0,
        x2: parseInt(n.props.x2) || 0,
        y1: parseInt(n.props.y1) || 0,
        y2: parseInt(n.props.y2) || 0,
    };

    for (const stop of colorStops) {
        colors.push({
            color: stop.props.style["stop-color"],
            value: parseInt(stop.props.offset),
            opacity: stop.props.style["stop-opacity"] || 1,
        });
    }

    return ctx.createLinearGradient({
        id: n.props.id,
        x1: attr.x1,
        y1: attr.y1,
        x2: attr.x2,
        y2: attr.y2,
        spreadMethod: "repeat",
        colorStops: colors,
    });
}

function buildRadialGradient(n, ctx) {
    const colorStops = n.children;
    const colors = [];
    const attr = {
        r1: parseInt(n.props.r1) || 0,
        x1: parseInt(n.props.x1) || 0,
        x2: parseInt(n.props.x2) || 0,
        r2: parseInt(n.props.r2) || 0,
        y1: parseInt(n.props.y1) || 0,
        y2: parseInt(n.props.y2) || 0,
    };

    for (const stop of colorStops) {
        colors.push({
            color: stop.props.style["stop-color"],
            value: parseInt(stop.props.offset),
            opacity: stop.props.style["stop-opacity"] || 1,
        });
    }

    return ctx.createRadialGradient({
        id: n.props.id,
        r1: attr.r1,
        x1: attr.x1,
        y1: attr.y1,
        x2: attr.x2,
        y2: attr.y2,
        r2: attr.r2,
        spreadMethod: "repeat",
        colorStops: colors,
    });
}

function parseTransformStr(a) {
    const b = {};
    // eslint-disable-next-line no-useless-escape
    for (const i in (a = a.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g))) {
        // eslint-disable-next-line no-useless-escape
        const c = a[i].match(/[\w\.\-]+/g);
        b[c.shift()] = c.map((v) => parseFloat(v));
    }
    return b;
}
</script>
<style scoped>
.renderOutput {
    height: 100%;
    width: 100%;
}
</style>
