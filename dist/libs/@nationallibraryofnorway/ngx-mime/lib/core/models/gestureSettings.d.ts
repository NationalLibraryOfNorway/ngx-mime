export declare class GestureSettings {
    scrollToZoom: boolean;
    clickToZoom: boolean;
    dblClickToZoom: boolean;
    pinchToZoom: boolean;
    flickEnabled: boolean;
    flickMinSpeed: number;
    flickMomentum: number;
    pinchRotate: boolean;
}
export declare class GestureSettingsMouse extends GestureSettings {
}
export declare class GestureSettingsTouch extends GestureSettings {
}
export declare class GestureSettingsPen extends GestureSettings {
}
export declare class GestureSettingsUnknown extends GestureSettings {
}
