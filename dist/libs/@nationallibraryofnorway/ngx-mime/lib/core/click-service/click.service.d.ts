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
}
