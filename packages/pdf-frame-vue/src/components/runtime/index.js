import { createRenderer, nextTick } from "vue";
import { canvasNodeExe, canvasGradient, createRadialGradient, createLinearGradient } from "i2djs";


/*
** List of valid Element types supported by I2Djs
*/
const validNodeTypes = [
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
            "i-animatePath"];

function nooperation(fn) {
  // throw Error(`no-op: ${fn}`)
}

export default function createI2djsRenderer(layerInstance) {
    const imgCache = {};
    const templates = {};
    const gradientCache = {};
    const { render } = createRenderer({
        patchProp(
            el,
            key,
            prevValue,
            nextValue,
            isSVG,
            prevChildren,
            parentComponent,
            parentSuspense,
            unmountChildren,
        ) {
            getSetter(key)(el, nextValue);
        },
        insert: (child, parent, anchor) => {
            if (!parent) {
                parent = layerInstance;
            }
            if (!child || !parent || !parent.child) return;
            if (child instanceof canvasGradient) return;
            if (child.nodeName === 'animate') {
                child.parent = parent;
                nextTick().then(() => {
                    parent.animateTo(child, child.from);
                })
            } else if (child.nodeName === 'animatePath') {
                child.parent = parent;
                nextTick().then(() => {
                    parent.animatePathTo(child, child.from);
                })
            } else {
                parent.child([child]);
            }
            
            return;
        },

        remove: (child) => {
            if (child != null) {
                child.remove();
            }
        },

        createElement: (tag, isSVG, isCustomizedBuiltIn, vnodeProps) => {
            const elType = tag.split("-").slice(1).join("-");
            let found = validNodeTypes.indexOf(tag);
            let node = null;
            let ctxType = layerInstance.ctx.type_;
            if (found === -1) {
                console.warn(`Unknown PDF-Frame tag: ${tag}`);
            }

            switch(elType) {
                case "page-template":
                    if (ctxType !== 'pdf') {
                        console.warn("page-template element is invalid in canvas context");
                        return null;
                    }
                    node = layerInstance.createTemplate();
                    templates[vnodeProps.id] = node;
                    break;
                case "page":
                    if (ctxType !== 'pdf') {
                        console.warn("Page element is invalid in canvas context");
                        return null
                    };
                    node = layerInstance.addPage();
                    break;
                case "linearGradient":
                    node = createLinearGradient();
                    gradientCache[vnodeProps.id] = node;
                    break;
                case "radialGradient":
                    node = createRadialGradient();
                    gradientCache[vnodeProps.id] = node;
                    break;
                case "animate":
                    node = getAnimateObject(vnodeProps);
                    if (vnodeProps.from) {
                        node.from = {
                                attr: {
                                    ...vnodeProps.from,
                                    style: null
                                },
                                style: vnodeProps.from?.style ?? {}
                            };
                    }
                    break;
                case "animatePath":
                    node = getAnimatePathToObject(vnodeProps);
                    if (vnodeProps.from) {
                        node.from = {
                                attr: {
                                    d : vnodeProps?.from?.d ?? '',
                                    style: null
                                },
                                style: vnodeProps.from?.style ?? {}
                            };
                    }
                    break;
                default:
                    node = renderNode(elType, vnodeProps);
                    break;
            }
            return node;
        },

        createText: (text) => {
            nooperation('comment');
        },

        createComment: (text) => {
            nooperation('comment');
        },

        setText: (node, text) => {
            // Noop
            nooperation('setText');
        },

        setElementText: (node, text) => {
            // node.setElementText(text);
        },

        parentNode: (node) => {
            return (node && node.dom.parent) ? node.dom.parent : null
        },

        nextSibling: (node) => (node, text) => {
            nooperation('setText');
        },

        querySelector: (selector) => {
            return layerInstance.fetchEl(selector) || null;
        },
    });

    /*
    * @getSetter : Method which handles attribute settings
    */
    const getSetter = (key) => {
        if (key.includes('-')) {
          key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        }

        return (el, value) => {
            if (/^on[A-Z]/.test(key)) {
              const eventName = key.slice(2).toLowerCase();
                if (el.on) {
                    el.on(eventName, value);
                }
            } else if (typeof value === 'function') {
                value = value(el);
            }

            if (key !== "style") {
                if (key === 'src' && !imgCache[value]) {
                    imgCache[value]= layerInstance.createAsyncTexture({
                        attr: {
                            src: value
                        },
                    });

                    imgCache[value].then((ins) => {
                        imgCache[value] = ins.exportAsDataUrl();
                        el.setAttr(key, imgCache[value]);
                    });
                } else if (key === 'src' && imgCache[value]) {
                    el.setAttr(key, imgCache[value]);
                } else if (key === 'text' && value) {
                    el.text(value);
                } else if (((key ==='p-template') || (key ==='pTemplate'))  && el instanceof canvasNodeExe) {
                    el.addTemplate(templates[value]);
                } else if (key === 'event') {
                    for (let e in value) {
                        if (el.on) {
                            el.on(e, value[e]);
                        }
                    }
                } else if (key === 'block') {
                    el.block = true;
                } else if (key === 'data') {
                    el.data(value);
                } else if (key === 'transform') {
                    el.setAttr(key, parseTransformStr(value))
                } else if (key === 'bbox') {
                    el.bbox = value;
                } else {
                    el.setAttr(key, value);
                }
            } else {
                for (let sKey in value) {
                    let v = value[sKey];
                    if (typeof v === 'function') {
                        v = v(el);
                    }
                    if (sKey === 'fillStyle' || sKey === 'strokeStyle') {
                        if (typeof v === "string" && v.startsWith('grad')) {
                            const gtId = v.match(/\(([^)]+)\)/)[1];
                            v = getGrad(gtId);
                        }
                    }
                    el.setStyle(sKey, v);
                }
            }
        };
    };

    /*
    * @renderNode : Creates i2djs vnode based on args, returns vNode of a rendered element
    */
    function renderNode (el, vNodeProps) {
        return new canvasNodeExe(layerInstance.ctx, {
                    el: (el === "group" ? "g" : el),
                    attr: {},
                    style: {},
                    bbox: vNodeProps && vNodeProps.bbox !== undefined ? vNodeProps.bbox : true,
                }, Math.round(Math.random() * 10000000), 0);
    }

    /*
    * @parseTransformStr : Parse transform string, converts it to standard I2Djs transform object.  
    */
    function parseTransformStr(a) {
        if (typeof a === "object" && !Array.isArray(a) && a !== null) {
            return a;
        }
        const b = {};
        for (const i in (a = a.match(/(\w+\((\-?\d+\.?\d*e?\-?\d*,?)+\))+/g))) {
            const c = a[i].match(/[\w\.\-]+/g);
            b[c.shift()] = c.map((v) => parseFloat(v));
        }
        return b;
    }

    function getGrad (gradId) {
        return gradientCache[gradId];
    }

    function getAnimateObject(vnodeProps) {
        return {
                nodeName: 'animate',
                attr: {
                    ...vnodeProps?.to ?? {},
                    style: null
                },
                style: vnodeProps?.to?.style ?? {},
                duration: vnodeProps.duration || 0,
                ease: vnodeProps.ease || 'default',
                loop: vnodeProps.loop || 0,
                end: vnodeProps.end || null,
                delay: vnodeProps.delay || 0,
                direction: vnodeProps.direction || 'default',
                setAttr: function (key, value) {
                },
                setStyle: function (key, value) {
                },
                remove: function () {
                    this.parent.interrupt();
                }
            }
    }

    function getAnimatePathToObject(vnodeProps) {
        return {
                            nodeName: 'animatePath',
                            attr: {
                                d: vnodeProps?.to?.d ?? '',
                                style: null
                            },
                            style: vnodeProps?.to?.style ?? {},
                            duration: vnodeProps.duration || 0,
                            ease: vnodeProps.ease || 'default',
                            loop: vnodeProps.loop || 0,
                            end: vnodeProps.end || null,
                            delay: vnodeProps.delay || 0,
                            direction: vnodeProps.direction || 'default',
                            setAttr: function (key, value) {
                                // console.log(this.parent);
                            },
                            setStyle: function (key, value) {
                                // console.log(this.parent);
                            },
                            remove: function () {
                                this.parent.interrupt();
                            }
                        }
    }

    return render;
}