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
import { MimeViewerIntl } from './core/intl';
import * as i0 from "@angular/core";
export class MimeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, declarations: [AttributionDialogComponent,
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
            ViewerSpinnerComponent], imports: [SharedModule], exports: [ViewerComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, providers: [MimeViewerIntl], imports: [SharedModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: MimeModule, decorators: [{
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
                    providers: [MimeViewerIntl],
                    exports: [ViewerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDdkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDL0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDckYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDcEgsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDL0gsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sb0ZBQW9GLENBQUM7QUFDckksT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBMEI3QyxNQUFNLE9BQU8sVUFBVTs4R0FBVixVQUFVOytHQUFWLFVBQVUsaUJBdEJuQiwwQkFBMEI7WUFDMUIsMEJBQTBCO1lBQzFCLDZCQUE2QjtZQUM3Qiw0QkFBNEI7WUFDNUIsK0JBQStCO1lBQy9CLG1CQUFtQjtZQUNuQixhQUFhO1lBQ2IsMEJBQTBCO1lBQzFCLGlCQUFpQjtZQUNqQixtQkFBbUI7WUFDbkIsOEJBQThCO1lBQzlCLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsZUFBZTtZQUNmLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFDckIsc0JBQXNCLGFBRWQsWUFBWSxhQUVaLGVBQWU7K0dBRWQsVUFBVSxhQUhWLENBQUMsY0FBYyxDQUFDLFlBRGpCLFlBQVk7OzJGQUlYLFVBQVU7a0JBeEJ0QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWiwwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsNkJBQTZCO3dCQUM3Qiw0QkFBNEI7d0JBQzVCLCtCQUErQjt3QkFDL0IsbUJBQW1CO3dCQUNuQixhQUFhO3dCQUNiLDBCQUEwQjt3QkFDMUIsaUJBQWlCO3dCQUNqQixtQkFBbUI7d0JBQ25CLDhCQUE4Qjt3QkFDOUIsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQzNCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICdkMyc7XG5pbXBvcnQgJ29wZW5zZWFkcmFnb24nO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy9hdHRyaWJ1dGlvbi1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENhbnZhc0dyb3VwRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jYW52YXMtZ3JvdXAtZGlhbG9nL2NhbnZhcy1ncm91cC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy9jb250ZW50LXNlYXJjaC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IEhlbHBEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vaW5mb3JtYXRpb24tZGlhbG9nL2luZm9ybWF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWV0YWRhdGFDb21wb25lbnQgfSBmcm9tICcuL2luZm9ybWF0aW9uLWRpYWxvZy9tZXRhZGF0YS9tZXRhZGF0YS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9jQ29tcG9uZW50IH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1kaWFsb2cvdGFibGUtb2YtY29udGVudHMvdGFibGUtb2YtY29udGVudHMuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vdmlldy1kaWFsb2cvaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3NkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWNvZ25pemVkVGV4dENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci9yZWNvZ25pemVkLXRleHQtY29udGVudC9yZWNvZ25pemVkLXRleHQtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL2NhbnZhcy1ncm91cC1uYXZpZ2F0b3IvY2FudmFzLWdyb3VwLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yL2NvbnRlbnQtc2VhcmNoLW5hdmlnYXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci92aWV3ZXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItaGVhZGVyL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlclNwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItc3Bpbm5lci92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4vY29yZS9pbnRsJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQXR0cmlidXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgQ2FudmFzR3JvdXBEaWFsb2dDb21wb25lbnQsXG4gICAgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ0NvbXBvbmVudCxcbiAgICBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50LFxuICAgIEhlbHBEaWFsb2dDb21wb25lbnQsXG4gICAgSWNvbkNvbXBvbmVudCxcbiAgICBJbmZvcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICBNZXRhZGF0YUNvbXBvbmVudCxcbiAgICBPc2RUb29sYmFyQ29tcG9uZW50LFxuICAgIFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCxcbiAgICBUb2NDb21wb25lbnQsXG4gICAgVmlld0RpYWxvZ0NvbXBvbmVudCxcbiAgICBWaWV3ZXJDb21wb25lbnQsXG4gICAgVmlld2VyRm9vdGVyQ29tcG9uZW50LFxuICAgIFZpZXdlckhlYWRlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJTcGlubmVyQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbTWltZVZpZXdlckludGxdLFxuICBleHBvcnRzOiBbVmlld2VyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTWltZU1vZHVsZSB7fVxuIl19