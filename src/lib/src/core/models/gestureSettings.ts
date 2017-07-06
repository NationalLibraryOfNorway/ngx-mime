export class GestureSettings {
  scrollToZoom: boolean; // true	Zoom on scroll gesture
  clickToZoom: boolean; // true	Zoom on click gesture
  dblClickToZoom: boolean; // false	Zoom on double-click gesture. Note: If set to true then clickToZoom should be set to false to prevent multiple zooms.
  pinchToZoom: boolean; // false	Zoom on pinch gesture
  flickEnabled: boolean; // false	Enable flick gesture
  flickMinSpeed: number; // 120	If flickEnabled is true, the minimum speed to initiate a flick gesture (pixels-per-second)
  flickMomentum: number; // 0.25	If flickEnabled is true, the momentum factor for the flick gesture
  pinchRotate: boolean; // false	If pinchRotate is true, the user will have the ability to rotate the image using their fingers.
}
