import { canvasLayer, pdfLayer, PDFCreator } from "i2djs";
import createI2djsRenderer from "./runtime";
import {
    defineComponent,
    Fragment,
    h,
    watch,
    onMounted,
    onUnmounted,
    ref,
    getCurrentInstance
} from "vue";

import { nextTick } from "vue";

export const pdfFrame = defineComponent({
    props: {
        type: {
            type: String,
            required: true,
            default: "pdf"
        },
        id: {
            type: String,
            required: true,
            default: "pdf-frame-id"
        },
        height: {
            type: Number,
            required: false,
            default: undefined
        },
        width: {
            type: Number,
            required: false,
            default: undefined
        },
        layerSetting: {
            type: Object,
            required: false,
            default: () => {}
        },
        needOnAfterRender: {
            type: Boolean,
            required: false,
            default: false
        },
        setCtxClear: {
            type: Function,
            required: false,
            default: null
        },
        config: {
            type: Object,
            required: false,
            default: () => {}
        },
        // applicable for PDF Layer only
        info: {
            type: Object,
            required: false,
            default: () => {}
        },
        // applicable for PDF Layer only
        encryption: {
            type: Object,
            required: false,
            default: () => {}
        },
        // applicable for PDF Layer only
        autoPagination: {
            type: Boolean,
            required: false,
            default: true
        },

    },
    emits: ['on-resize', 'on-ready', 'on-after-render'],
    setup(props, setupContext) {
        let vNode;
        let layerInstance = null;
        const i2dComponentInstance = getCurrentInstance();
        onMounted(() => {
            nextTick().then(() => {
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

                if (layerInstance?.onResize) {
                    layerInstance.onResize(() => {
                        setupContext.emit("on-resize", {
                            height: layerInstance.height,
                            width: layerInstance.width
                        });
                    });
                }

                if (layerInstance?.onChange) {
                    layerInstance.onChange((url)=>{
                        if (layerInstance instanceof PDFCreator && layerInstance?.container?.tagName === "IFRAME") {
                            layerInstance.container.setAttribute("src", url);
                        }
                        if (props.needOnAfterRender) {
                            setupContext.emit("on-after-render", url);
                        }
                    })
                }

                if (layerInstance?.setClear && typeof props.setCtxClear === 'function') {
                    layerInstance.setClear(props.setCtxClear);
                }

                const i2dRenderer = createI2djsRenderer(layerInstance);
                const node = h(Connector, defaultSlot);
                i2dRenderer(node, layerInstance);

                setupContext.emit("on-ready", layerInstance);
            });
        });

        onUnmounted(() => {
            if (layerInstance) {
                layerInstance.destroy();
                layerInstance= null;
            }
        });

        watch([()=> props.height,()=> props.width] , (newValue) => {
            // applicable for PDF Layer only
            if (layerInstance.setSize) {
                layerInstance.setSize(props.width, props.height)
            }
            }, {
                deep: true,
        });

        watch(()=> props.encryption, (newValue) => {
            // applicable for PDF Layer only
            if (layerInstance.setConfig) {
                layerInstance.setConfig({
                    encryption: newValue
                })
            }
            }, {
                deep: true,
        });

        watch(()=> props.info, (newValue) => {
            // applicable for PDF Layer only
            if (layerInstance.setConfig) {
                layerInstance.setConfig({
                    info: newValue
                });
            }
            }, {
                deep: true,
        });

        watch(()=> props.config, (newValue) => {
            // applicable for PDF Layer only
            if (layerInstance.setConfig) {
                layerInstance.setConfig({
                    ...newValue
                });
            }
            }, {
                deep: true,
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
            let el = document.getElementById(vNode.props.id);
            let config = {
                ...((props.height !== undefined) && {height: props.height}),
                ...((props.width !== undefined) && {width: props.width}),
                ...(props.config || {}),
                info:(props.info || {}),
                encryption: (props.encryption || {})
            };
            const pdfInstance = pdfLayer(el, config, {
                autoUpdate: true,
                autoPagination: props.autoPagination
            });
            return pdfInstance;
        }

        function createCanvasInstance(props) {
            let el = document.getElementById(vNode.props.id);
            const canvasInstance = canvasLayer(el, props.config, {
                ...props.layerSetting
            });

            return canvasInstance;
        }

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
                    style: {
                        height: "100%",
                        width: "100%",
                    },
                });
                break;
            case "canvas":
                vNode = h("div", {
                    id: props.id,
                    class: "renderOutput",
                    style: {
                        height: props.height ? (props.height + 'px') : "100%",
                        width: props.width ? (props.width + 'px') : "100%",
                    },
                });
                break;
            case "default":
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
        }

        return () => {
                return vNode;
        };
    },
});