/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare namespace service {
    export interface IScreen {
        height: number;
        width: number;
        touch: boolean;
    }
}

declare module "chartjs-plugin-annotation";
