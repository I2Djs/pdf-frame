import { createRenderer, nextTick } from "vue";
import { CanvasNodeExe, CanvasGradient, createRadialGradient, createLinearGradient } from "i2djs";


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
            if (!child || !parent || !parent.child) return;
            if (child instanceof CanvasGradient) return;
            if (child.nodeName === 'animate') {
                child.parent = parent;
                nextTick().then(() => {
                    parent.animateTo(child, child.from);
                })
            } else if (child.nodeName === 'animatePath') {
                child.parent = parent;
                nextTick().then(() => {
                    parent.animatePathTo(child);
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
            if (found === -1) {
                console.warn(`Unknown PDF-Frame tag: ${tag}`);
            }

            switch(elType) {
                case "page-template":
                    node = layerInstance.createTemplate();
                    templates[vnodeProps.id] = node;
                    break;
                case "page":
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
                    node = {
                            nodeName: 'animate',
                            from: {
                                attr: {
                                    ...vnodeProps.from,
                                    style: null
                                },
                                style: vnodeProps?.from?.style ?? {}
                            },
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
                                // console.log(this.parent);
                            },
                            setStyle: function (key, value) {
                                // console.log(this.parent);
                            },
                            remove: function () {
                                this.parent.interrupt();
                            }
                        }
                    console.log(node);
                    break;
                case "animatePath":
                    node = {
                            nodeName: 'animatePath',
                            from: {
                                attr: {
                                    ...vnodeProps.from,
                                    style: null
                                },
                                style: vnodeProps?.from?.style ?? {}
                            },
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
                                // console.log(this.parent);
                            },
                            setStyle: function (key, value) {
                                // console.log(this.parent);
                            },
                            remove: function () {
                                this.parent.interrupt();
                            }
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
        return (el, value) => {
            if (typeof value === 'function') {
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
                } else if (key ==='p-template' && el instanceof CanvasNodeExe) {
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
        return new CanvasNodeExe(layerInstance.ctx, {
                    el: (el === "group" ? "g" : el),
                    attr: {},
                    style: {},
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

    return render;
}