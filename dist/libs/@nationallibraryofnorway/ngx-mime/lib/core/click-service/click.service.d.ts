import * as i0 from "@angular/core";
export declare class ClickService {
    private singleClickHandlers;
    private doubleClickHandlers;
    private clickCount;
    private dblClickTimeOut;
    constructor();
    reset(): void;
    addSingleClickHandler(singleClickHandler: (event: any) => void): void;
    addDoubleClickHandler(doubleClickHandler: (event: any) => void): void;
    private triggerSingleClick;
    private triggerDoubleClick;
    click: (event: any) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ClickService>;
}
