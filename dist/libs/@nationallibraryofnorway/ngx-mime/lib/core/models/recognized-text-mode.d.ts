export declare enum RecognizedTextMode {
    NONE = "NONE",
    ONLY = "ONLY",
    SPLIT = "SPLIT"
}
export interface RecognizedTextModeChanges {
    currentValue: RecognizedTextMode;
    previousValue?: RecognizedTextMode;
}
