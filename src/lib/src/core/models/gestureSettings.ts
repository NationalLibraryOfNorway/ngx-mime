export class GestureSettings {
  scrollToZoom = true;
  clickToZoom = false;
  dblClickToZoom = false;
  pinchToZoom = false;
  flickEnabled = false;
  flickMinSpeed = 120;
  flickMomentum = 0.25;
  pinchRotate = false;
}

export class GestureSettingsMouse extends GestureSettings {
  scrollToZoom = false;
}

export class GestureSettingsTouch extends GestureSettings {
  pinchToZoom = false;
}

export class GestureSettingsPen extends GestureSettings {}

export class GestureSettingsUnknown extends GestureSettings {}
