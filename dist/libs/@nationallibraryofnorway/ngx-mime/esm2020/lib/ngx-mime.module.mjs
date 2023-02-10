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
MimeModule.ɵfac = function MimeModule_Factory(t) { return new (t || MimeModule)(); };
MimeModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: MimeModule });
MimeModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CoreModule,
        SharedModule,
        ContentsDialogModule,
        ViewDialogModule,
        AttributionDialogModule,
        HelpDialogModule,
        ContentSearchDialogModule,
        CanvasGroupDialogModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MimeModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MimeModule, { declarations: [ViewerComponent,
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
        CanvasGroupDialogModule], exports: [ViewerComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNwSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUMvSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxvRkFBb0YsQ0FBQztBQUNySSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBeUI1RCxNQUFNLE9BQU8sVUFBVTs7b0VBQVYsVUFBVTs0REFBVixVQUFVO2dFQVhuQixVQUFVO1FBQ1YsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQix5QkFBeUI7UUFDekIsdUJBQXVCO3VGQUlkLFVBQVU7Y0F2QnRCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsbUJBQW1CO29CQUNuQiwrQkFBK0I7b0JBQy9CLDZCQUE2QjtvQkFDN0Isc0JBQXNCO29CQUN0Qiw4QkFBOEI7aUJBQy9CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxVQUFVO29CQUNWLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQixnQkFBZ0I7b0JBQ2hCLHVCQUF1QjtvQkFDdkIsZ0JBQWdCO29CQUNoQix5QkFBeUI7b0JBQ3pCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQzNCOzt3RkFDWSxVQUFVLG1CQXJCbkIsZUFBZTtRQUNmLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIsbUJBQW1CO1FBQ25CLCtCQUErQjtRQUMvQiw2QkFBNkI7UUFDN0Isc0JBQXNCO1FBQ3RCLDhCQUE4QixhQUc5QixVQUFVO1FBQ1YsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQix5QkFBeUI7UUFDekIsdUJBQXVCLGFBRWYsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ2QzJztcbmltcG9ydCAnb3BlbnNlYWRyYWdvbic7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ01vZHVsZSB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ01vZHVsZSB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dNb2R1bGUgfSBmcm9tICcuL2NvbnRlbnRzLWRpYWxvZy9jb250ZW50cy1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tICcuL2NvcmUvY29yZS5tb2R1bGUnO1xuaW1wb3J0IHsgSGVscERpYWxvZ01vZHVsZSB9IGZyb20gJy4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ01vZHVsZSB9IGZyb20gJy4vdmlldy1kaWFsb2cvdmlldy1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IE9zZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVjb2duaXplZFRleHRDb250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvcmVjb2duaXplZC10ZXh0LWNvbnRlbnQvcmVjb2duaXplZC10ZXh0LWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IENhbnZhc0dyb3VwTmF2aWdhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hOYXZpZ2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRvci9jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWhlYWRlci92aWV3ZXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLXNwaW5uZXIvdmlld2VyLXNwaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBWaWV3ZXJDb21wb25lbnQsXG4gICAgVmlld2VySGVhZGVyQ29tcG9uZW50LFxuICAgIFZpZXdlckZvb3RlckNvbXBvbmVudCxcbiAgICBPc2RUb29sYmFyQ29tcG9uZW50LFxuICAgIENvbnRlbnRTZWFyY2hOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgVmlld2VyU3Bpbm5lckNvbXBvbmVudCxcbiAgICBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQsXG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb3JlTW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBDb250ZW50c0RpYWxvZ01vZHVsZSxcbiAgICBWaWV3RGlhbG9nTW9kdWxlLFxuICAgIEF0dHJpYnV0aW9uRGlhbG9nTW9kdWxlLFxuICAgIEhlbHBEaWFsb2dNb2R1bGUsXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ01vZHVsZSxcbiAgICBDYW52YXNHcm91cERpYWxvZ01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1ZpZXdlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1pbWVNb2R1bGUge31cbiJdfQ==