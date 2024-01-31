/****************************************************************
 * MIME-viewer options
 ****************************************************************/
export const ViewerOptions = {
    zoom: {
        zoomFactor: 1.15,
        dblClickZoomFactor: 2.7,
        // How many pixels since lastDistance before it is considered a pinch
        pinchZoomThreshold: 3,
    },
    pan: {
        // Sensitivity when determining swipe-direction.
        // Higher threshold means that swipe must be more focused in
        // x-direction before the gesture is recognized as "left" or "right"
        swipeDirectionThreshold: 70,
    },
    // All transition times in milliseconds
    transitions: {
        toolbarsEaseInTime: 400,
        toolbarsEaseOutTime: 500,
        OSDAnimationTime: 600, // Animation-time for OSD-animations
    },
    overlays: {
        // Margin between canvas groups in Dashboard View in OpenSeadragon viewport-coordinates
        canvasGroupMarginInDashboardView: 300,
        // Margin between canvas groups in Page View in OpenSeadragon viewport-coordinates
        canvasGroupMarginInPageView: 20,
    },
    padding: {
        // Padding in viewer container in pixels
        header: 80, // Placeholder above viewer for header in Dashboard View
        footer: 80, // Placeholder below viewer for footer in Dashboard View
    },
    colors: {
        canvasGroupBackgroundColor: '#fafafa',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O2tFQUVrRTtBQUVsRSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDM0IsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLElBQUk7UUFDaEIsa0JBQWtCLEVBQUUsR0FBRztRQUN2QixxRUFBcUU7UUFDckUsa0JBQWtCLEVBQUUsQ0FBQztLQUN0QjtJQUVELEdBQUcsRUFBRTtRQUNILGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQsb0VBQW9FO1FBQ3BFLHVCQUF1QixFQUFFLEVBQUU7S0FDNUI7SUFFRCx1Q0FBdUM7SUFDdkMsV0FBVyxFQUFFO1FBQ1gsa0JBQWtCLEVBQUUsR0FBRztRQUN2QixtQkFBbUIsRUFBRSxHQUFHO1FBQ3hCLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxvQ0FBb0M7S0FDNUQ7SUFFRCxRQUFRLEVBQUU7UUFDUix1RkFBdUY7UUFDdkYsZ0NBQWdDLEVBQUUsR0FBRztRQUNyQyxrRkFBa0Y7UUFDbEYsMkJBQTJCLEVBQUUsRUFBRTtLQUNoQztJQUVELE9BQU8sRUFBRTtRQUNQLHdDQUF3QztRQUN4QyxNQUFNLEVBQUUsRUFBRSxFQUFFLHdEQUF3RDtRQUNwRSxNQUFNLEVBQUUsRUFBRSxFQUFFLHdEQUF3RDtLQUNyRTtJQUVELE1BQU0sRUFBRTtRQUNOLDBCQUEwQixFQUFFLFNBQVM7S0FDdEM7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIE1JTUUtdmlld2VyIG9wdGlvbnNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5leHBvcnQgY29uc3QgVmlld2VyT3B0aW9ucyA9IHtcbiAgem9vbToge1xuICAgIHpvb21GYWN0b3I6IDEuMTUsXG4gICAgZGJsQ2xpY2tab29tRmFjdG9yOiAyLjcsXG4gICAgLy8gSG93IG1hbnkgcGl4ZWxzIHNpbmNlIGxhc3REaXN0YW5jZSBiZWZvcmUgaXQgaXMgY29uc2lkZXJlZCBhIHBpbmNoXG4gICAgcGluY2hab29tVGhyZXNob2xkOiAzLFxuICB9LFxuXG4gIHBhbjoge1xuICAgIC8vIFNlbnNpdGl2aXR5IHdoZW4gZGV0ZXJtaW5pbmcgc3dpcGUtZGlyZWN0aW9uLlxuICAgIC8vIEhpZ2hlciB0aHJlc2hvbGQgbWVhbnMgdGhhdCBzd2lwZSBtdXN0IGJlIG1vcmUgZm9jdXNlZCBpblxuICAgIC8vIHgtZGlyZWN0aW9uIGJlZm9yZSB0aGUgZ2VzdHVyZSBpcyByZWNvZ25pemVkIGFzIFwibGVmdFwiIG9yIFwicmlnaHRcIlxuICAgIHN3aXBlRGlyZWN0aW9uVGhyZXNob2xkOiA3MCxcbiAgfSxcblxuICAvLyBBbGwgdHJhbnNpdGlvbiB0aW1lcyBpbiBtaWxsaXNlY29uZHNcbiAgdHJhbnNpdGlvbnM6IHtcbiAgICB0b29sYmFyc0Vhc2VJblRpbWU6IDQwMCxcbiAgICB0b29sYmFyc0Vhc2VPdXRUaW1lOiA1MDAsXG4gICAgT1NEQW5pbWF0aW9uVGltZTogNjAwLCAvLyBBbmltYXRpb24tdGltZSBmb3IgT1NELWFuaW1hdGlvbnNcbiAgfSxcblxuICBvdmVybGF5czoge1xuICAgIC8vIE1hcmdpbiBiZXR3ZWVuIGNhbnZhcyBncm91cHMgaW4gRGFzaGJvYXJkIFZpZXcgaW4gT3BlblNlYWRyYWdvbiB2aWV3cG9ydC1jb29yZGluYXRlc1xuICAgIGNhbnZhc0dyb3VwTWFyZ2luSW5EYXNoYm9hcmRWaWV3OiAzMDAsXG4gICAgLy8gTWFyZ2luIGJldHdlZW4gY2FudmFzIGdyb3VwcyBpbiBQYWdlIFZpZXcgaW4gT3BlblNlYWRyYWdvbiB2aWV3cG9ydC1jb29yZGluYXRlc1xuICAgIGNhbnZhc0dyb3VwTWFyZ2luSW5QYWdlVmlldzogMjAsXG4gIH0sXG5cbiAgcGFkZGluZzoge1xuICAgIC8vIFBhZGRpbmcgaW4gdmlld2VyIGNvbnRhaW5lciBpbiBwaXhlbHNcbiAgICBoZWFkZXI6IDgwLCAvLyBQbGFjZWhvbGRlciBhYm92ZSB2aWV3ZXIgZm9yIGhlYWRlciBpbiBEYXNoYm9hcmQgVmlld1xuICAgIGZvb3RlcjogODAsIC8vIFBsYWNlaG9sZGVyIGJlbG93IHZpZXdlciBmb3IgZm9vdGVyIGluIERhc2hib2FyZCBWaWV3XG4gIH0sXG5cbiAgY29sb3JzOiB7XG4gICAgY2FudmFzR3JvdXBCYWNrZ3JvdW5kQ29sb3I6ICcjZmFmYWZhJyxcbiAgfSxcbn07XG4iXX0=