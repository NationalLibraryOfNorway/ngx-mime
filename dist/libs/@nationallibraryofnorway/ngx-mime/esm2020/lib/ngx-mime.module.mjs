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
import * as i0 from "@angular/core";
export class MimeModule {
}
MimeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MimeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeModule, declarations: [ViewerComponent,
        ViewerHeaderComponent,
        ViewerFooterComponent,
        OsdToolbarComponent,
        ContentSearchNavigatorComponent,
        CanvasGroupNavigatorComponent,
        ViewerSpinnerComponent,
        IconComponent,
        RecognizedTextContentComponent], imports: [CoreModule,
        SharedModule,
        ContentsDialogModule,
        AttributionDialogModule,
        HelpDialogModule,
        ContentSearchDialogModule,
        CanvasGroupDialogModule], exports: [ViewerComponent] });
MimeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeModule, imports: [[
            CoreModule,
            SharedModule,
            ContentsDialogModule,
            AttributionDialogModule,
            HelpDialogModule,
            ContentSearchDialogModule,
            CanvasGroupDialogModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.2", ngImport: i0, type: MimeModule, decorators: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1pbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL25neC1taW1lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sSUFBSSxDQUFDO0FBQ1osT0FBTyxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDM0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDakcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDaEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNqRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNwSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnRkFBZ0YsQ0FBQztBQUMvSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxvRkFBb0YsQ0FBQztBQUNySSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQXlCNUQsTUFBTSxPQUFPLFVBQVU7O3VHQUFWLFVBQVU7d0dBQVYsVUFBVSxpQkFyQm5CLGVBQWU7UUFDZixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQiwrQkFBK0I7UUFDL0IsNkJBQTZCO1FBQzdCLHNCQUFzQjtRQUN0QixhQUFhO1FBQ2IsOEJBQThCLGFBRzlCLFVBQVU7UUFDVixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2QixnQkFBZ0I7UUFDaEIseUJBQXlCO1FBQ3pCLHVCQUF1QixhQUVmLGVBQWU7d0dBRWQsVUFBVSxZQVhaO1lBQ1AsVUFBVTtZQUNWLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIsdUJBQXVCO1lBQ3ZCLGdCQUFnQjtZQUNoQix5QkFBeUI7WUFDekIsdUJBQXVCO1NBQ3hCOzJGQUdVLFVBQVU7a0JBdkJ0QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLHFCQUFxQjt3QkFDckIscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLCtCQUErQjt3QkFDL0IsNkJBQTZCO3dCQUM3QixzQkFBc0I7d0JBQ3RCLGFBQWE7d0JBQ2IsOEJBQThCO3FCQUMvQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsVUFBVTt3QkFDVixZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsdUJBQXVCO3dCQUN2QixnQkFBZ0I7d0JBQ2hCLHlCQUF5Qjt3QkFDekIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAnZDMnO1xuaW1wb3J0ICdvcGVuc2VhZHJhZ29uJztcbmltcG9ydCB7IEF0dHJpYnV0aW9uRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDYW52YXNHcm91cERpYWxvZ01vZHVsZSB9IGZyb20gJy4vY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ01vZHVsZSB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS9jb3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBPc2RUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvb3NkLXRvb2xiYXIvb3NkLXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3JlY29nbml6ZWQtdGV4dC1jb250ZW50L3JlY29nbml6ZWQtdGV4dC1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW52YXNHcm91cE5hdmlnYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci1mb290ZXIvY2FudmFzLWdyb3VwLW5hdmlnYXRvci9jYW52YXMtZ3JvdXAtbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoTmF2aWdhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWZvb3Rlci9jb250ZW50LXNlYXJjaC1uYXZpZ2F0b3IvY29udGVudC1zZWFyY2gtbmF2aWdhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItZm9vdGVyL3ZpZXdlci1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEljb25Db21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci92aWV3ZXItaGVhZGVyL2ljb24vaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLWhlYWRlci92aWV3ZXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJTcGlubmVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXIvdmlld2VyLXNwaW5uZXIvdmlld2VyLXNwaW5uZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyL3ZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBWaWV3ZXJDb21wb25lbnQsXG4gICAgVmlld2VySGVhZGVyQ29tcG9uZW50LFxuICAgIFZpZXdlckZvb3RlckNvbXBvbmVudCxcbiAgICBPc2RUb29sYmFyQ29tcG9uZW50LFxuICAgIENvbnRlbnRTZWFyY2hOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgQ2FudmFzR3JvdXBOYXZpZ2F0b3JDb21wb25lbnQsXG4gICAgVmlld2VyU3Bpbm5lckNvbXBvbmVudCxcbiAgICBJY29uQ29tcG9uZW50LFxuICAgIFJlY29nbml6ZWRUZXh0Q29udGVudENvbXBvbmVudCxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvcmVNb2R1bGUsXG4gICAgU2hhcmVkTW9kdWxlLFxuICAgIENvbnRlbnRzRGlhbG9nTW9kdWxlLFxuICAgIEF0dHJpYnV0aW9uRGlhbG9nTW9kdWxlLFxuICAgIEhlbHBEaWFsb2dNb2R1bGUsXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ01vZHVsZSxcbiAgICBDYW52YXNHcm91cERpYWxvZ01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1ZpZXdlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1pbWVNb2R1bGUge31cbiJdfQ==