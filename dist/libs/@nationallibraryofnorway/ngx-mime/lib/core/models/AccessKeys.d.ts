export declare class AccessKeys {
    static PAGEDOWN: number[];
    static PAGEUP: number[];
    static ARROWRIGHT: number[];
    static ARROWLEFT: number[];
    static firstCanvasGroupCodes: number[];
    static lastCanvasGroupCodes: number[];
    static zoomInCodes: number[];
    static zoomOutCodes: number[];
    static zoomHomeCodes: number[];
    static nextHit: number[];
    static previousHit: number[];
    static toggleSearchDialogCodes: number[];
    static toggleContentsDialogCodes: number[];
    static toggleFullscreenCodes: number[];
    static resetSearch: number[];
    static rotateCwCodes: number[];
    static recognizedTextContentCodes: number[];
    private keyCode;
    private altKey;
    private shiftKey;
    private ctrlkey;
    private metaKey;
    private event;
    constructor(event: KeyboardEvent);
    isArrowRightKeys(): boolean;
    isArrowLeftKeys(): boolean;
    isPageUpKeys(): boolean;
    isPageDownKeys(): boolean;
    isFirstCanvasGroupKeys(): boolean;
    isLastCanvasGroupKeys(): boolean;
    isSliderKeys(): boolean;
    isZoomInKeys(): boolean;
    isZoomOutKeys(): boolean;
    isZoomHomeKeys(): boolean;
    isNextHitKeys(): boolean;
    isPreviousHitKeys(): boolean;
    isSearchDialogKeys(): boolean;
    isContentsDialogKeys(): boolean;
    isFullscreenKeys(): boolean;
    isResetSearchKeys(): boolean;
    isRotateKeys(): boolean;
    isRecognizedTextContentKeys(): boolean;
    execute(fn: Function): void;
    private isMultiKeys;
    private arrayContainsKeys;
    private isShiftPressed;
    private isMetaPressed;
}
