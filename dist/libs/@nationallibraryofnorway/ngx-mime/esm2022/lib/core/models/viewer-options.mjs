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
        header: 80,
        footer: 80, // Placeholder below viewer for footer in Dashboard View
    },
    colors: {
        canvasGroupBackgroundColor: '#fafafa',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O2tFQUVrRTtBQUVsRSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDM0IsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLElBQUk7UUFDaEIsa0JBQWtCLEVBQUUsR0FBRztRQUN2QixxRUFBcUU7UUFDckUsa0JBQWtCLEVBQUUsQ0FBQztLQUN0QjtJQUVELEdBQUcsRUFBRTtRQUNILGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQsb0VBQW9FO1FBQ3BFLHVCQUF1QixFQUFFLEVBQUU7S0FDNUI7SUFFRCx1Q0FBdUM7SUFDdkMsV0FBVyxFQUFFO1FBQ1gsa0JBQWtCLEVBQUUsR0FBRztRQUN2QixtQkFBbUIsRUFBRSxHQUFHO1FBQ3hCLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxvQ0FBb0M7S0FDNUQ7SUFFRCxRQUFRLEVBQUU7UUFDUix1RkFBdUY7UUFDdkYsZ0NBQWdDLEVBQUUsR0FBRztRQUNyQyxrRkFBa0Y7UUFDbEYsMkJBQTJCLEVBQUUsRUFBRTtLQUNoQztJQUVELE9BQU8sRUFBRTtRQUNQLHdDQUF3QztRQUN4QyxNQUFNLEVBQUUsRUFBRTtRQUNWLE1BQU0sRUFBRSxFQUFFLEVBQUUsd0RBQXdEO0tBQ3JFO0lBRUQsTUFBTSxFQUFFO1FBQ04sMEJBQTBCLEVBQUUsU0FBUztLQUN0QztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogTUlNRS12aWV3ZXIgb3B0aW9uc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmV4cG9ydCBjb25zdCBWaWV3ZXJPcHRpb25zID0ge1xuICB6b29tOiB7XG4gICAgem9vbUZhY3RvcjogMS4xNSxcbiAgICBkYmxDbGlja1pvb21GYWN0b3I6IDIuNyxcbiAgICAvLyBIb3cgbWFueSBwaXhlbHMgc2luY2UgbGFzdERpc3RhbmNlIGJlZm9yZSBpdCBpcyBjb25zaWRlcmVkIGEgcGluY2hcbiAgICBwaW5jaFpvb21UaHJlc2hvbGQ6IDMsXG4gIH0sXG5cbiAgcGFuOiB7XG4gICAgLy8gU2Vuc2l0aXZpdHkgd2hlbiBkZXRlcm1pbmluZyBzd2lwZS1kaXJlY3Rpb24uXG4gICAgLy8gSGlnaGVyIHRocmVzaG9sZCBtZWFucyB0aGF0IHN3aXBlIG11c3QgYmUgbW9yZSBmb2N1c2VkIGluXG4gICAgLy8geC1kaXJlY3Rpb24gYmVmb3JlIHRoZSBnZXN0dXJlIGlzIHJlY29nbml6ZWQgYXMgXCJsZWZ0XCIgb3IgXCJyaWdodFwiXG4gICAgc3dpcGVEaXJlY3Rpb25UaHJlc2hvbGQ6IDcwLFxuICB9LFxuXG4gIC8vIEFsbCB0cmFuc2l0aW9uIHRpbWVzIGluIG1pbGxpc2Vjb25kc1xuICB0cmFuc2l0aW9uczoge1xuICAgIHRvb2xiYXJzRWFzZUluVGltZTogNDAwLFxuICAgIHRvb2xiYXJzRWFzZU91dFRpbWU6IDUwMCxcbiAgICBPU0RBbmltYXRpb25UaW1lOiA2MDAsIC8vIEFuaW1hdGlvbi10aW1lIGZvciBPU0QtYW5pbWF0aW9uc1xuICB9LFxuXG4gIG92ZXJsYXlzOiB7XG4gICAgLy8gTWFyZ2luIGJldHdlZW4gY2FudmFzIGdyb3VwcyBpbiBEYXNoYm9hcmQgVmlldyBpbiBPcGVuU2VhZHJhZ29uIHZpZXdwb3J0LWNvb3JkaW5hdGVzXG4gICAgY2FudmFzR3JvdXBNYXJnaW5JbkRhc2hib2FyZFZpZXc6IDMwMCxcbiAgICAvLyBNYXJnaW4gYmV0d2VlbiBjYW52YXMgZ3JvdXBzIGluIFBhZ2UgVmlldyBpbiBPcGVuU2VhZHJhZ29uIHZpZXdwb3J0LWNvb3JkaW5hdGVzXG4gICAgY2FudmFzR3JvdXBNYXJnaW5JblBhZ2VWaWV3OiAyMCxcbiAgfSxcblxuICBwYWRkaW5nOiB7XG4gICAgLy8gUGFkZGluZyBpbiB2aWV3ZXIgY29udGFpbmVyIGluIHBpeGVsc1xuICAgIGhlYWRlcjogODAsIC8vIFBsYWNlaG9sZGVyIGFib3ZlIHZpZXdlciBmb3IgaGVhZGVyIGluIERhc2hib2FyZCBWaWV3XG4gICAgZm9vdGVyOiA4MCwgLy8gUGxhY2Vob2xkZXIgYmVsb3cgdmlld2VyIGZvciBmb290ZXIgaW4gRGFzaGJvYXJkIFZpZXdcbiAgfSxcblxuICBjb2xvcnM6IHtcbiAgICBjYW52YXNHcm91cEJhY2tncm91bmRDb2xvcjogJyNmYWZhZmEnLFxuICB9LFxufTtcbiJdfQ==