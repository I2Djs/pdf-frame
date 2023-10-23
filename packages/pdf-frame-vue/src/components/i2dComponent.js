import { canvasLayer, pdfLayer } from "i2djs";
import createI2djsRenderer from "./runtime";
import {
    defineComponent,
    Fragment,
    watchEffect,
    h,
    onMounted,
    onUpdated,
    onUnmounted,
    ref,
    getCurrentInstance,
} from "vue";

import { nextTick } from "vue";

let layerInstance = null;

let resolvedImages = {};

export const pdfFrame = defineComponent({
    props: {
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
        layerSetting: {
            type: Object,
            required: false,
            default: () => {}
        },
        onUpdate: {
            type: Function,
            required: false
        },
        config: {
            type: Object,
            required: false,
            default: () => {}
        },
        info: {
            type: Object,
            required: false,
            default: () => {}
        },
        encryption: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    setup(props, setupContext) {

        const i2dComponentInstance = getCurrentInstance();

        onMounted(() => {
            const defaultSlot = setupContext.slots.default;

            if (!layerInstance) {
                if (props.type === "pdf") {
                    layerInstance = createPdfInstance(props);
                } else if (props.type === "pdf-blob") {
                    layerInstance = createPdfInstance(props);
                } else if (props.type === "canvas") {
                    layerInstance = createCanvasInstance(props);
                } else {
                    console.warn(`Unknown render context: ${props.type}`);
                }
            }

            const i2dRenderer = createI2djsRenderer(layerInstance);

            nextTick().then(() => {
                const node = h(Connector, defaultSlot);
                i2dRenderer(node, layerInstance);
            });
        });

        onUnmounted(() => {
            if (layerInstance) {
                layerInstance.destroy();
                layerInstance= null;
            }
        });

        /**
         * Since I2d-pdf-frame uses its own renderer, the ancestor vue's appContext, root and provides would normally be lost in
         * the I2d component.
         *
         * We can fix this by overriding the component's parent, root, appContext and provides before rendering the slot
         * contents.
         */

        const Connector = defineComponent({
            setup(props, setupContext) {
                const instance = getCurrentInstance();

                instance.parent = i2dComponentInstance;
                instance.appContext = i2dComponentInstance.appContext;
                instance.root = i2dComponentInstance.root;
                instance.provides = i2dComponentInstance.provides;

                const defaultSlot = setupContext.slots.default;
                return () => h(Fragment, defaultSlot());
            },
        });

        function createPdfInstance(props) {
            const pdfInstance = pdfLayer(vNode.el, {
                height: props.height,
                width: props.width,
                ...(props.config || {}),
                info:(props.info || {}),
                encryption: (props.encryption || {})
            }, {
                autoUpdate: true,
                onUpdate: (url) => {
                    if (vNode.el.tagName === "IFRAME") {
                        vNode.el.setAttribute("src", url);
                    }
                    if (props.onUpdate) {
                        props.onUpdate(url);
                    }
                }
            });
            return pdfInstance;
        }

        function createCanvasInstance(props) {
            return canvasLayer(vNode.el, props.config, props.layerSetting);
        }

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
            case "pdf-blob":
                vNode = h("div", {
                    id: props.id,
                    class: "renderOutput",
                });
                break;
            case "canvas":
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

        return () => {
                return vNode;
        };
    },
});