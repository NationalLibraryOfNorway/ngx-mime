/****************************************************************
 * MIME-viewer options
 ****************************************************************/

export const ViewerOptions = {
  zoom: {
    zoomFactor: 1.15,
    dblClickZoomFactor: 2.7,
    // How many pixels since lastDistance before it is considered a pinch
    pinchZoomThreshold: 3
  },

  pan: {
    // Sensitivity when determining swipe-direction.
    // Higher threshold means that swipe must be more focused in
    // x-direction before the gesture is recognized as "left" or "right"
    swipeDirectionThreshold: 70
  },

  // All transition times in milliseconds
  transitions: {
    toolbarsEaseInTime: 400,
    toolbarsEaseOutTime: 500,
    OSDAnimationTime: 600 // Animation-time for OSD-animations
  },

  overlays: {
    // Margin between canvas groups in Dashboard View in OpenSeadragon viewport-coordinates
    canvasGroupMarginInDashboardView: 300,
    // Margin between canvas groups in Page View in OpenSeadragon viewport-coordinates
    canvasGroupMarginInPageView: 20
  },

  padding: {
    // Padding in viewer container in pixels
    header: 80, // Placeholder above viewer for header in Dashboard View
    footer: 80 // Placeholder below viewer for footer in Dashboard View
  },

  colors: {
    canvasGroupBackgroundColor: '#fafafa'
  }
};
