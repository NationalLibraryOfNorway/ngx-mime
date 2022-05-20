import { NgModule } from '@angular/core';
import 'd3';
import 'openseadragon';
import { AttributionDialogModule } from './attribution-dialog/attribution-dialog.module';
import { CanvasGroupDialogModule } from './canvas-group-dialog/canvas-group-dialog.module';
import { ContentSearchDialogModule } from './content-search-dialog/content-search-dialog.module';
import { ContentsDialogModule } from './contents-dialog/contents-dialog.module';
import { CoreModule } from './core/core.module';
import { HelpDialogModule } from './help-dialog/help-dialog.module';
import { SharedModule } from './shared/shared.module';
import { ViewDialogModule } from './view-dialog/view-dialog.module';
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';
import { RecognizedTextContentComponent } from './viewer/recognized-text-content/recognized-text-content.component';
import { CanvasGroupNavigatorComponent } from './viewer/viewer-footer/canvas-group-navigator/canvas-group-navigator.component';
import { ContentSearchNavigatorComponent } from './viewer/viewer-footer/content-search-navigator/content-search-navigator.component';
import { ViewerFooterComponent } from './viewer/viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { ViewerSpinnerComponent } from './viewer/viewer-spinner/viewer-spinner.component';
import { ViewerComponent } from './viewer/viewer.component';
import * as i0 from "@angular/core";
export class MimeModule {
}
MimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeModule, declarations: [ViewerComponent,
        ViewerHeaderComponent,
        ViewerFooterComponent,
        OsdToolbarComponent,
        ContentSearchNavigatorComponent,
        CanvasGroupNavigatorComponent,
        ViewerSpinnerComponent,
        RecognizedTextContentComponent], imports: [CoreModule,
        SharedModule,
        ContentsDialogModule,
        ViewDialogModule,
        AttributionDialogModule,
        HelpDialogModule,
        ContentSearchDialogModule,
        CanvasGroupDialogModule], exports: [ViewerComponent] });
MimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeModule, imports: [[
            CoreModule,
            SharedModule,
            ContentsDialogModule,
            ViewDialogModule,
            AttributionDialogModule,
            HelpDialogModule,
            ContentSearchDialogModule,
            CanvasGroupDialogModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: MimeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        ViewerComponent,
                        ViewerHeaderComponent,
                        ViewerFooterComponent,
                        OsdToolbarComponent,
                        ContentSearchNavigatorComponent,
                        CanvasGroupNavigatorComponent,
                        ViewerSpinnerComponent,
                        RecognizedTextContentComponent,
                    ],
                    imports: [
                        CoreModule,
                        SharedModule,
                        ContentsDialogModule,
                        ViewDialogModule,
                        AttributionDialogModule,
                        HelpDialogModule,
                        ContentSearchDialogModule,
                        CanvasGroupDialogModule,
                    ],
                    exports: [ViewerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNwSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUMvSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxvRkFBb0YsQ0FBQztBQUNySSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBeUI1RCxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVLGlCQXJCbkIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLCtCQUErQjtRQUMvQiw2QkFBNkI7UUFDN0Isc0JBQXNCO1FBQ3RCLDhCQUE4QixhQUc5QixVQUFVO1FBQ1YsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQix5QkFBeUI7UUFDekIsdUJBQXVCLGFBRWYsZUFBZTt3R0FFZCxVQUFVLFlBWlo7WUFDUCxVQUFVO1lBQ1YsWUFBWTtZQUNaLG9CQUFvQjtZQUNwQixnQkFBZ0I7WUFDaEIsdUJBQXVCO1lBQ3ZCLGdCQUFnQjtZQUNoQix5QkFBeUI7WUFDekIsdUJBQXVCO1NBQ3hCOzJGQUdVLFVBQVU7a0JBdkJ0QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLCtCQUErQjt3QkFDL0IsNkJBQTZCO3dCQUM3QixzQkFBc0I7d0JBQ3RCLDhCQUE4QjtxQkFDL0I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLGdCQUFnQjt3QkFDaEIsdUJBQXVCO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnZDMnO1xuaW1wb3J0ICdvcGVuc2VhZHJhZ29uJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDYW52YXNHcm91cERpYWxvZ01vZHVsZSB9IGZyb20gJy4vY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ01vZHVsZSB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nTW9kdWxlIH0gZnJvbSAnLi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgT3NkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci9yZWNvZ25pemVkLXRleHQtY29udGVudC9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IvY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci92aWV3ZXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItaGVhZGVyL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlclNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItc3Bpbm5lci92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFZpZXdlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJIZWFkZXJDb21wb25lbnQsXG4gICAgVmlld2VyRm9vdGVyQ29tcG9uZW50LFxuICAgIE9zZFRvb2xiYXJDb21wb25lbnQsXG4gICAgQ29udGVudFNlYXJjaE5hdmlnYXRvckNvbXBvbmVudCxcbiAgICBDYW52YXNHcm91cE5hdmlnYXRvckNvbXBvbmVudCxcbiAgICBWaWV3ZXJTcGlubmVyQ29tcG9uZW50LFxuICAgIFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvcmVNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIENvbnRlbnRzRGlhbG9nTW9kdWxlLFxuICAgIFZpZXdEaWFsb2dNb2R1bGUsXG4gICAgQXR0cmlidXRpb25EaWFsb2dNb2R1bGUsXG4gICAgSGVscERpYWxvZ01vZHVsZSxcbiAgICBDb250ZW50U2VhcmNoRGlhbG9nTW9kdWxlLFxuICAgIENhbnZhc0dyb3VwRGlhbG9nTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbVmlld2VyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTWltZU1vZHVsZSB7fVxuIl19