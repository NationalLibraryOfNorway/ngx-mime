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
import { OsdToolbarComponent } from './viewer/osd-toolbar/osd-toolbar.component';
import { RecognizedTextContentComponent } from './viewer/recognized-text-content/recognized-text-content.component';
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
                    IconComponent,
                    RecognizedTextContentComponent,
                ],
                imports: [
                    CoreModule,
                    SharedModule,
                    ContentsDialogModule,
                    AttributionDialogModule,
                    HelpDialogModule,
                    ContentSearchDialogModule,
                    CanvasGroupDialogModule,
                ],
                exports: [ViewerComponent],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNwSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUMvSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxvRkFBb0YsQ0FBQztBQUNySSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBeUI1RCxNQUFNLE9BQU8sVUFBVTs7O1lBdkJ0QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNaLGVBQWU7b0JBQ2YscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIsK0JBQStCO29CQUMvQiw2QkFBNkI7b0JBQzdCLHNCQUFzQjtvQkFDdEIsYUFBYTtvQkFDYiw4QkFBOEI7aUJBQy9CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxVQUFVO29CQUNWLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQix1QkFBdUI7b0JBQ3ZCLGdCQUFnQjtvQkFDaEIseUJBQXlCO29CQUN6Qix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzthQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ2QzJztcbmltcG9ydCAnb3BlbnNlYWRyYWdvbic7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ01vZHVsZSB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ01vZHVsZSB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2NvbnRlbnRzLWRpYWxvZy9jb250ZW50cy1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICcuL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHsgSGVscERpYWxvZ01vZHVsZSB9IGZyb20gJy4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgT3NkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci9yZWNvZ25pemVkLXRleHQtY29udGVudC9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IvY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci92aWV3ZXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWhlYWRlci9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1zcGlubmVyL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVmlld2VyQ29tcG9uZW50LFxuICAgIFZpZXdlckhlYWRlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJGb290ZXJDb21wb25lbnQsXG4gICAgT3NkVG9vbGJhckNvbXBvbmVudCxcbiAgICBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIENhbnZhc0dyb3VwTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIFZpZXdlclNwaW5uZXJDb21wb25lbnQsXG4gICAgSWNvbkNvbXBvbmVudCxcbiAgICBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb3JlTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBDb250ZW50c0RpYWxvZ01vZHVsZSxcbiAgICBBdHRyaWJ1dGlvbkRpYWxvZ01vZHVsZSxcbiAgICBIZWxwRGlhbG9nTW9kdWxlLFxuICAgIENvbnRlbnRTZWFyY2hEaWFsb2dNb2R1bGUsXG4gICAgQ2FudmFzR3JvdXBEaWFsb2dNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtWaWV3ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBNaW1lTW9kdWxlIHt9XG4iXX0=