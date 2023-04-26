import { NgModule } from '@angular/core';
import 'd3';
import 'openseadragon';
import { AttributionDialogComponent } from './attribution-dialog/attribution-dialog.component';
import { CanvasGroupDialogComponent } from './canvas-group-dialog/canvas-group-dialog.component';
import { ContentSearchDialogComponent } from './content-search-dialog/content-search-dialog.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { MetadataComponent } from './information-dialog/metadata/metadata.component';
import { TocComponent } from './information-dialog/table-of-contents/table-of-contents.component';
import { SharedModule } from './shared/shared.module';
import { IconComponent } from './view-dialog/icon/icon.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';
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
MimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, declarations: [AttributionDialogComponent,
        CanvasGroupDialogComponent,
        CanvasGroupNavigatorComponent,
        ContentSearchDialogComponent,
        ContentSearchNavigatorComponent,
        HelpDialogComponent,
        IconComponent,
        InformationDialogComponent,
        MetadataComponent,
        OsdToolbarComponent,
        RecognizedTextContentComponent,
        TocComponent,
        ViewDialogComponent,
        ViewerComponent,
        ViewerFooterComponent,
        ViewerHeaderComponent,
        ViewerSpinnerComponent], imports: [SharedModule], exports: [ViewerComponent] });
MimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, imports: [SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: MimeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AttributionDialogComponent,
                        CanvasGroupDialogComponent,
                        CanvasGroupNavigatorComponent,
                        ContentSearchDialogComponent,
                        ContentSearchNavigatorComponent,
                        HelpDialogComponent,
                        IconComponent,
                        InformationDialogComponent,
                        MetadataComponent,
                        OsdToolbarComponent,
                        RecognizedTextContentComponent,
                        TocComponent,
                        ViewDialogComponent,
                        ViewerComponent,
                        ViewerFooterComponent,
                        ViewerHeaderComponent,
                        ViewerSpinnerComponent,
                    ],
                    imports: [SharedModule],
                    exports: [ViewerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDcEgsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDL0gsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sb0ZBQW9GLENBQUM7QUFDckksT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQXlCNUQsTUFBTSxPQUFPLFVBQVU7O3VHQUFWLFVBQVU7d0dBQVYsVUFBVSxpQkFyQm5CLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsNkJBQTZCO1FBQzdCLDRCQUE0QjtRQUM1QiwrQkFBK0I7UUFDL0IsbUJBQW1CO1FBQ25CLGFBQWE7UUFDYiwwQkFBMEI7UUFDMUIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQiw4QkFBOEI7UUFDOUIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixzQkFBc0IsYUFFZCxZQUFZLGFBQ1osZUFBZTt3R0FFZCxVQUFVLFlBSFgsWUFBWTsyRkFHWCxVQUFVO2tCQXZCdEIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDZCQUE2Qjt3QkFDN0IsNEJBQTRCO3dCQUM1QiwrQkFBK0I7d0JBQy9CLG1CQUFtQjt3QkFDbkIsYUFBYTt3QkFDYiwwQkFBMEI7d0JBQzFCLGlCQUFpQjt3QkFDakIsbUJBQW1CO3dCQUNuQiw4QkFBOEI7d0JBQzlCLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixzQkFBc0I7cUJBQ3ZCO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgJ2QzJztcbmltcG9ydCAnb3BlbnNlYWRyYWdvbic7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGVscERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXRhZGF0YUNvbXBvbmVudCB9IGZyb20gJy4vaW5mb3JtYXRpb24tZGlhbG9nL21ldGFkYXRhL21ldGFkYXRhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2NDb21wb25lbnQgfSBmcm9tICcuL2luZm9ybWF0aW9uLWRpYWxvZy90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3LWRpYWxvZy9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPc2RUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvb3NkLXRvb2xiYXIvb3NkLXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3JlY29nbml6ZWQtdGV4dC1jb250ZW50L3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY2FudmFzLWdyb3VwLW5hdmlnYXRvci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3IvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL3ZpZXdlci1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1zcGlubmVyL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQsXG4gICAgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ0NvbXBvbmVudCxcbiAgICBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIEhlbHBEaWFsb2dDb21wb25lbnQsXG4gICAgSWNvbkNvbXBvbmVudCxcbiAgICBJbmZvcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICBNZXRhZGF0YUNvbXBvbmVudCxcbiAgICBPc2RUb29sYmFyQ29tcG9uZW50LFxuICAgIFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCxcbiAgICBUb2NDb21wb25lbnQsXG4gICAgVmlld0RpYWxvZ0NvbXBvbmVudCxcbiAgICBWaWV3ZXJDb21wb25lbnQsXG4gICAgVmlld2VyRm9vdGVyQ29tcG9uZW50LFxuICAgIFZpZXdlckhlYWRlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJTcGlubmVyQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZXhwb3J0czogW1ZpZXdlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1pbWVNb2R1bGUge31cbiJdfQ==