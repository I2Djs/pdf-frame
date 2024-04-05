import { createRenderer, nextTick } from "vue";
import { canvasNodeExe, canvasGradient, createRadialGradient, createLinearGradient, PDFCreator } from "i2djs";


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
            if (el) {
                getSetter(key)(el, nextValue);
            }
        },
        insert: (child, parent, anchor) => {
            
            parent = parent || layerInstance;

            if ( child && parent instanceof PDFCreator && parent.pages ) {
                if (!["template", "page"].includes(child.nodeName)) {
                    parent = parent.pages.length ? parent.pages[0] : parent.addPage();
                }
            }

            if (!child || !parent?.child) return;
            if (child instanceof canvasGradient) return;

            if (child.nodeName === 'animate' || child.nodeName === 'animatePath') {
                const animationMethod = child.nodeName === 'animate' ? 'animateTo' : 'animatePathTo';
                child.parent = parent;
                nextTick().then(() => {
                    parent[animationMethod](child, child.from);
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
            let ctxType = layerInstance instanceof PDFCreator ? 'pdf' : 'canvas';
            if (found === -1) {
                console.warn(`Unknown PDF-Frame tag: ${tag}`);
            }

            if ((elType === "animate" || elType === "animatePath") && ctxType === "pdf") {
                return null;
            }

            switch(elType) {
                case "page-template":
                    if (ctxType !== 'pdf') {
                        console.warn("page-template element is invalid in canvas context");
                        return null;
                    }
                    node = layerInstance.createTemplate();
                    node.nodeName = "template";
                    templates[vnodeProps.id] = node;
                    break;
                case "page":
                    if (ctxType !== 'pdf') {
                        console.warn("Page element is invalid in canvas context");
                        return null
                    };
                    node = layerInstance.addPage();
                    node.nodeName = "page";
                    break;
                case "linearGradient":
                    node = createLinearGradient();
                    gradientCache[vnodeProps.id] = node;
                    node.nodeName = "linearGradient";
                    break;
                case "radialGradient":
                    node = createRadialGradient();
                    gradientCache[vnodeProps.id] = node;
                    node.nodeName = "radialGradient";
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

    const normalizeKey = (key) => key.includes('-') ? key.replace(/-([a-z])/g, (_, char) => char.toUpperCase()) : key;

    const setAttribute = (key, el, value) => {
        if (!el) {
            return;
        }
        switch (key) {
            case 'src':
                if (!imgCache[value]) {
                    imgCache[value] = layerInstance.createAsyncTexture({ attr: { src: value } });
                    imgCache[value].then((ins) => {
                        imgCache[value] = ins.exportAsDataUrl();
                        el.setAttr(key, imgCache[value]);
                    });
                } else {
                    el.setAttr(key, imgCache[value]);
                }
                break;
            case 'text':
                el.text(value);
                break;
            case 'p-template':
            case 'pTemplate':
                if (el instanceof canvasNodeExe) el.addTemplate(templates[value]);
                break;
            case 'event':
                Object.entries(value).forEach(([eventName, handler]) => el.on?.(eventName, handler));
                break;
            case 'block':
                el.block = true;
                break;
            case 'data':
                el.data(value);
                break;
            case 'transform':
                el.setAttr(key, parseTransformStr(value));
                break;
            case 'bbox':
                el.bbox = value;
                break;
            default:
                el.setAttr(key, value);
        }
    };

    const setStyle = (el, styles) => {
        Object.entries(styles).forEach(([styleKey, styleValue]) => {
            let v = typeof styleValue === 'function' ? styleValue(el) : styleValue;
            if ((styleKey === 'fillStyle' || styleKey === 'strokeStyle') && typeof v === 'string' && v.startsWith('grad')) {
                const gtId = v.match(/\(([^)]+)\)/)[1];
                v = getGrad(gtId);
            }
            el.setStyle(styleKey, v);
        });
    };
    

    /*
    * @getSetter : Method which handles attribute settings
    */
    const getSetter = (key) => {

        key = normalizeKey(key);

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
                setAttribute(key, el, value);
            } else {
                setStyle(el, value);
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