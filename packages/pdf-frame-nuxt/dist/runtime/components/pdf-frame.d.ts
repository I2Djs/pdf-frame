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
        default: undefined;
    };
    width: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    layerSetting: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    needOnUpdated: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    setCtxClear: {
        type: FunctionConstructor;
        required: false;
        default: null;
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
    autoPagination: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, () => any, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("on-resize" | "on-ready" | "on-updated")[], "on-resize" | "on-ready" | "on-updated", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
        default: undefined;
    };
    width: {
        type: NumberConstructor;
        required: false;
        default: undefined;
    };
    layerSetting: {
        type: ObjectConstructor;
        required: false;
        default: () => void;
    };
    needOnUpdated: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    setCtxClear: {
        type: FunctionConstructor;
        required: false;
        default: null;
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
    autoPagination: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    "onOn-resize"?: ((...args: any[]) => any) | undefined;
    "onOn-ready"?: ((...args: any[]) => any) | undefined;
    "onOn-updated"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    id: string;
    height: number;
    width: number;
    layerSetting: Record<string, any>;
    needOnUpdated: boolean;
    setCtxClear: Function;
    config: Record<string, any>;
    info: Record<string, any>;
    encryption: Record<string, any>;
    autoPagination: boolean;
}, {}>;
export default pdfFrameVueComponent;
