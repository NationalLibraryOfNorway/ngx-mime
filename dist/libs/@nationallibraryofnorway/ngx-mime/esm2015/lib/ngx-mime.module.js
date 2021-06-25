import { NgModule } from '@angular/core';
import 'd3';
import 'openseadragon';
import { AttributionDialogModule } from './attribution-dialog/attribution-dialog.module';
import { CanvasGroupDialogModule } from './canvas-group-dialog/canvas-group-dialog.module';
import { ContentSearchDialogModule } from './content-search-dialog/content-search-dialog.module';
import { HelpDialogModule } from './help-dialog/help-dialog.module';
import { ContentsDialogModule } from './contents-dialog/contents-dialog.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';
import { CanvasGroupNavigatorComponent } from './viewer/viewer-footer/canvas-group-navigator/canvas-group-navigator.component';
import { ContentSearchNavigatorComponent } from './viewer/viewer-footer/content-search-navigator/content-search-navigator.component';
import { ViewerFooterComponent } from './viewer/viewer-footer/viewer-footer.component';
import { IconComponent } from './viewer/viewer-header/icon/icon.component';
import { ViewerHeaderComponent } from './viewer/viewer-header/viewer-header.component';
import { ViewerSpinnerComponent } from './viewer/viewer-spinner/viewer-spinner.component';
import { ViewerComponent } from './viewer/viewer.component';
export class MimeModule {
}
MimeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ViewerComponent,
                    ViewerHeaderComponent,
                    ViewerFooterComponent,
                    OsdToolbarComponent,
                    ContentSearchNavigatorComponent,
                    CanvasGroupNavigatorComponent,
                    ViewerSpinnerComponent,
                    IconComponent
                ],
                imports: [
                    CoreModule,
                    SharedModule,
                    ContentsDialogModule,
                    AttributionDialogModule,
                    HelpDialogModule,
                    ContentSearchDialogModule,
                    CanvasGroupDialogModule
                ],
                exports: [ViewerComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUMvSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxvRkFBb0YsQ0FBQztBQUNySSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBd0I1RCxNQUFNLE9BQU8sVUFBVTs7O1lBdEJ0QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsK0JBQStCO29CQUMvQiw2QkFBNkI7b0JBQzdCLHNCQUFzQjtvQkFDdEIsYUFBYTtpQkFDZDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsVUFBVTtvQkFDVixZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIsdUJBQXVCO29CQUN2QixnQkFBZ0I7b0JBQ2hCLHlCQUF5QjtvQkFDekIsdUJBQXVCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7YUFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdkMyc7XG5pbXBvcnQgJ29wZW5zZWFkcmFnb24nO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dNb2R1bGUgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy9hdHRyaWJ1dGlvbi1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENhbnZhc0dyb3VwRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtZGlhbG9nL2NhbnZhcy1ncm91cC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ01vZHVsZSB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IE9zZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IvY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci92aWV3ZXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWhlYWRlci9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1zcGlubmVyL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVmlld2VyQ29tcG9uZW50LFxuICAgIFZpZXdlckhlYWRlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJGb290ZXJDb21wb25lbnQsXG4gICAgT3NkVG9vbGJhckNvbXBvbmVudCxcbiAgICBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIENhbnZhc0dyb3VwTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIFZpZXdlclNwaW5uZXJDb21wb25lbnQsXG4gICAgSWNvbkNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29yZU1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gICAgQ29udGVudHNEaWFsb2dNb2R1bGUsXG4gICAgQXR0cmlidXRpb25EaWFsb2dNb2R1bGUsXG4gICAgSGVscERpYWxvZ01vZHVsZSxcbiAgICBDb250ZW50U2VhcmNoRGlhbG9nTW9kdWxlLFxuICAgIENhbnZhc0dyb3VwRGlhbG9nTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtWaWV3ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1pbWVNb2R1bGUge31cbiJdfQ==