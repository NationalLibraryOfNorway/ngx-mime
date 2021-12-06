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
        header: 80,
        footer: 80 // Placeholder below viewer for footer in Dashboard View
    },
    colors: {
        canvasGroupBackgroundColor: '#fafafa'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLW9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O2tFQUVrRTtBQUVsRSxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUc7SUFDM0IsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLElBQUk7UUFDaEIsa0JBQWtCLEVBQUUsR0FBRztRQUN2QixxRUFBcUU7UUFDckUsa0JBQWtCLEVBQUUsQ0FBQztLQUN0QjtJQUVELEdBQUcsRUFBRTtRQUNILGdEQUFnRDtRQUNoRCw0REFBNEQ7UUFDNUQsb0VBQW9FO1FBQ3BFLHVCQUF1QixFQUFFLEVBQUU7S0FDNUI7SUFFRCx1Q0FBdUM7SUFDdkMsV0FBVyxFQUFFO1FBQ1gsa0JBQWtCLEVBQUUsR0FBRztRQUN2QixtQkFBbUIsRUFBRSxHQUFHO1FBQ3hCLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxvQ0FBb0M7S0FDM0Q7SUFFRCxRQUFRLEVBQUU7UUFDUix1RkFBdUY7UUFDdkYsZ0NBQWdDLEVBQUUsR0FBRztRQUNyQyxrRkFBa0Y7UUFDbEYsMkJBQTJCLEVBQUUsRUFBRTtLQUNoQztJQUVELE9BQU8sRUFBRTtRQUNQLHdDQUF3QztRQUN4QyxNQUFNLEVBQUUsRUFBRTtRQUNWLE1BQU0sRUFBRSxFQUFFLENBQUMsd0RBQXdEO0tBQ3BFO0lBRUQsTUFBTSxFQUFFO1FBQ04sMEJBQTBCLEVBQUUsU0FBUztLQUN0QztDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogTUlNRS12aWV3ZXIgb3B0aW9uc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmV4cG9ydCBjb25zdCBWaWV3ZXJPcHRpb25zID0ge1xuICB6b29tOiB7XG4gICAgem9vbUZhY3RvcjogMS4xNSxcbiAgICBkYmxDbGlja1pvb21GYWN0b3I6IDIuNyxcbiAgICAvLyBIb3cgbWFueSBwaXhlbHMgc2luY2UgbGFzdERpc3RhbmNlIGJlZm9yZSBpdCBpcyBjb25zaWRlcmVkIGEgcGluY2hcbiAgICBwaW5jaFpvb21UaHJlc2hvbGQ6IDNcbiAgfSxcblxuICBwYW46IHtcbiAgICAvLyBTZW5zaXRpdml0eSB3aGVuIGRldGVybWluaW5nIHN3aXBlLWRpcmVjdGlvbi5cbiAgICAvLyBIaWdoZXIgdGhyZXNob2xkIG1lYW5zIHRoYXQgc3dpcGUgbXVzdCBiZSBtb3JlIGZvY3VzZWQgaW5cbiAgICAvLyB4LWRpcmVjdGlvbiBiZWZvcmUgdGhlIGdlc3R1cmUgaXMgcmVjb2duaXplZCBhcyBcImxlZnRcIiBvciBcInJpZ2h0XCJcbiAgICBzd2lwZURpcmVjdGlvblRocmVzaG9sZDogNzBcbiAgfSxcblxuICAvLyBBbGwgdHJhbnNpdGlvbiB0aW1lcyBpbiBtaWxsaXNlY29uZHNcbiAgdHJhbnNpdGlvbnM6IHtcbiAgICB0b29sYmFyc0Vhc2VJblRpbWU6IDQwMCxcbiAgICB0b29sYmFyc0Vhc2VPdXRUaW1lOiA1MDAsXG4gICAgT1NEQW5pbWF0aW9uVGltZTogNjAwIC8vIEFuaW1hdGlvbi10aW1lIGZvciBPU0QtYW5pbWF0aW9uc1xuICB9LFxuXG4gIG92ZXJsYXlzOiB7XG4gICAgLy8gTWFyZ2luIGJldHdlZW4gY2FudmFzIGdyb3VwcyBpbiBEYXNoYm9hcmQgVmlldyBpbiBPcGVuU2VhZHJhZ29uIHZpZXdwb3J0LWNvb3JkaW5hdGVzXG4gICAgY2FudmFzR3JvdXBNYXJnaW5JbkRhc2hib2FyZFZpZXc6IDMwMCxcbiAgICAvLyBNYXJnaW4gYmV0d2VlbiBjYW52YXMgZ3JvdXBzIGluIFBhZ2UgVmlldyBpbiBPcGVuU2VhZHJhZ29uIHZpZXdwb3J0LWNvb3JkaW5hdGVzXG4gICAgY2FudmFzR3JvdXBNYXJnaW5JblBhZ2VWaWV3OiAyMFxuICB9LFxuXG4gIHBhZGRpbmc6IHtcbiAgICAvLyBQYWRkaW5nIGluIHZpZXdlciBjb250YWluZXIgaW4gcGl4ZWxzXG4gICAgaGVhZGVyOiA4MCwgLy8gUGxhY2Vob2xkZXIgYWJvdmUgdmlld2VyIGZvciBoZWFkZXIgaW4gRGFzaGJvYXJkIFZpZXdcbiAgICBmb290ZXI6IDgwIC8vIFBsYWNlaG9sZGVyIGJlbG93IHZpZXdlciBmb3IgZm9vdGVyIGluIERhc2hib2FyZCBWaWV3XG4gIH0sXG5cbiAgY29sb3JzOiB7XG4gICAgY2FudmFzR3JvdXBCYWNrZ3JvdW5kQ29sb3I6ICcjZmFmYWZhJ1xuICB9XG59O1xuIl19