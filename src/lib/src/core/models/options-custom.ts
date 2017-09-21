/****************************************************************
 * Custom options not related to the OpenSeadragon-Viewer-object
****************************************************************/

export const CustomOptions = {
  zoom: {
    zoomFactor: 0.0002
  },

  pan: {
    // How many pixels before we reach end of page.
    // Used to determine if we are dragging outside of current page
    sensitivityMargin: 40
  },

  // All transition times in milliseconds
  transitions: {
    toolbarsEaseInTime: 200,
    toolbarsEaseOutTime: 250,
    OSDAnimationTime: 600 // Animation-time for OSD-animations
  },

  overlays: {
    pageMarginDashboardView: 300, // Margin between pages in Dashboard View in OpenSeadragon viewport-coordinates
    pageMarginPageView: 20 // Margin between pages in Page View in OpenSeadragon viewport-coordinates
  }
};
