/****************************************************************
 * MIME-viewer options
****************************************************************/

export const ViewerOptions = {
  zoom: {
    zoomFactor: 0.0002,
    dblClickZoomFactor: 0.00045
  },

  pan: {
    // Sensitivity when determining swipe-direction.
    // Higher threshold means that swipe must be more focused in
    // x-direction before the gesture is recognized as "left" or "right"
    swipeDirectionThreshold: 70
  },

  // All transition times in milliseconds
  transitions: {
    toolbarsEaseInTime: 200,
    toolbarsEaseOutTime: 250,
    OSDAnimationTime: 600 // Animation-time for OSD-animations
  },

  overlays: {
    // Margin between pages in Dashboard View in OpenSeadragon viewport-coordinates
    pageMarginDashboardView: 300,
    // Margin between pages in Page View in OpenSeadragon viewport-coordinates
    pageMarginPageView: 20
  },

  padding: {
    // Padding in viewer container in pixels
    header: 80, // Placeholder above viewer for header in Dashboard View
    footer: 80 // Placeholder below viewer for footer in Dashboard View
  },

  colors: {
    canvasBackgroundColor: '#fafafa'
  }
};
