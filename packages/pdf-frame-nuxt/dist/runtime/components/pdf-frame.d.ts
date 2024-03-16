declare const pdfFrameVueComponent: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: true;
        default: string;
    };
    id: {
        type: StringConstructor;
        required: true;
        default: string;
    };
    height: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    width: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    layerSetting: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    onUpdate: {
        type: FunctionConstructor;
        required: false;
        default: () => void;
    };
    config: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    info: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    encryption: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
}, () => any, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("on-resize" | "on-ready" | "on-update")[], "on-resize" | "on-ready" | "on-update", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: true;
        default: string;
    };
    id: {
        type: StringConstructor;
        required: true;
        default: string;
    };
    height: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    width: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    layerSetting: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    onUpdate: {
        type: FunctionConstructor;
        required: false;
        default: () => void;
    };
    config: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    info: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    encryption: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
}>> & {
    "onOn-resize"?: ((...args: any[]) => any) | undefined;
    "onOn-ready"?: ((...args: any[]) => any) | undefined;
    "onOn-update"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    id: string;
    height: number;
    width: number;
    layerSetting: Record<string, any>;
    onUpdate: Function;
    config: Record<string, any>;
    info: Record<string, any>;
    encryption: Record<string, any>;
}, {}>;
export default pdfFrameVueComponent;
