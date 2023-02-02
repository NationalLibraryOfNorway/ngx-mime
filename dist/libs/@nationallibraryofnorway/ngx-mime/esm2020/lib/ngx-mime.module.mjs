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
MimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, declarations: [ViewerComponent,
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
MimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, imports: [CoreModule,
        SharedModule,
        ContentsDialogModule,
        ViewDialogModule,
        AttributionDialogModule,
        HelpDialogModule,
        ContentSearchDialogModule,
        CanvasGroupDialogModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNwSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUMvSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxvRkFBb0YsQ0FBQztBQUNySSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBeUI1RCxNQUFNLE9BQU8sVUFBVTs7dUdBQVYsVUFBVTt3R0FBVixVQUFVLGlCQXJCbkIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLCtCQUErQjtRQUMvQiw2QkFBNkI7UUFDN0Isc0JBQXNCO1FBQ3RCLDhCQUE4QixhQUc5QixVQUFVO1FBQ1YsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQix5QkFBeUI7UUFDekIsdUJBQXVCLGFBRWYsZUFBZTt3R0FFZCxVQUFVLFlBWG5CLFVBQVU7UUFDVixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQix1QkFBdUI7UUFDdkIsZ0JBQWdCO1FBQ2hCLHlCQUF5QjtRQUN6Qix1QkFBdUI7MkZBSWQsVUFBVTtrQkF2QnRCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsK0JBQStCO3dCQUMvQiw2QkFBNkI7d0JBQzdCLHNCQUFzQjt3QkFDdEIsOEJBQThCO3FCQUMvQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsVUFBVTt3QkFDVixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsZ0JBQWdCO3dCQUNoQix1QkFBdUI7d0JBQ3ZCLGdCQUFnQjt3QkFDaEIseUJBQXlCO3dCQUN6Qix1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdkMyc7XG5pbXBvcnQgJ29wZW5zZWFkcmFnb24nO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dNb2R1bGUgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy9hdHRyaWJ1dGlvbi1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENhbnZhc0dyb3VwRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtZGlhbG9nL2NhbnZhcy1ncm91cC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSAnLi9jb3JlL2NvcmUubW9kdWxlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFZpZXdEaWFsb2dNb2R1bGUgfSBmcm9tICcuL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBPc2RUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvb3NkLXRvb2xiYXIvb3NkLXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3JlY29nbml6ZWQtdGV4dC1jb250ZW50L3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY2FudmFzLWdyb3VwLW5hdmlnYXRvci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3IvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL3ZpZXdlci1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1zcGlubmVyL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVmlld2VyQ29tcG9uZW50LFxuICAgIFZpZXdlckhlYWRlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJGb290ZXJDb21wb25lbnQsXG4gICAgT3NkVG9vbGJhckNvbXBvbmVudCxcbiAgICBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIENhbnZhc0dyb3VwTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIFZpZXdlclNwaW5uZXJDb21wb25lbnQsXG4gICAgUmVjb2duaXplZFRleHRDb250ZW50Q29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29yZU1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUsXG4gICAgQ29udGVudHNEaWFsb2dNb2R1bGUsXG4gICAgVmlld0RpYWxvZ01vZHVsZSxcbiAgICBBdHRyaWJ1dGlvbkRpYWxvZ01vZHVsZSxcbiAgICBIZWxwRGlhbG9nTW9kdWxlLFxuICAgIENvbnRlbnRTZWFyY2hEaWFsb2dNb2R1bGUsXG4gICAgQ2FudmFzR3JvdXBEaWFsb2dNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtWaWV3ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBNaW1lTW9kdWxlIHt9XG4iXX0=