import { NgModule } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, } from '@angular/material/core';
import { SharedModule } from './../shared/shared.module';
import { ContentsDialogService } from './contents-dialog.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';
import * as i0 from "@angular/core";
export class ContentsDialogModule {
}
ContentsDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContentsDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogModule, declarations: [ContentsDialogComponent, MetadataComponent, TocComponent], imports: [SharedModule] });
ContentsDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogModule, providers: [
        ContentsDialogService,
        ContentsDialogConfigStrategyFactory,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentsDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [ContentsDialogComponent, MetadataComponent, TocComponent],
                    providers: [
                        ContentsDialogService,
                        ContentsDialogConfigStrategyFactory,
                        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsNEJBQTRCLEdBQzdCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUFXL0UsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLGlCQVBoQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLGFBRDdELFlBQVk7a0hBUVgsb0JBQW9CLGFBTnBCO1FBQ1QscUJBQXFCO1FBQ3JCLG1DQUFtQztRQUNuQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUU7S0FDdkUsWUFOUSxDQUFDLFlBQVksQ0FBQzsyRkFRWixvQkFBb0I7a0JBVGhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLENBQUM7b0JBQ3hFLFNBQVMsRUFBRTt3QkFDVCxxQkFBcUI7d0JBQ3JCLG1DQUFtQzt3QkFDbkMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFO3FCQUN2RTtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgU2hvd09uRGlydHlFcnJvclN0YXRlTWF0Y2hlcixcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE1ldGFkYXRhQ29tcG9uZW50IH0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9jQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29udGVudHNEaWFsb2dDb21wb25lbnQsIE1ldGFkYXRhQ29tcG9uZW50LCBUb2NDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgeyBwcm92aWRlOiBFcnJvclN0YXRlTWF0Y2hlciwgdXNlQ2xhc3M6IFNob3dPbkRpcnR5RXJyb3JTdGF0ZU1hdGNoZXIgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudHNEaWFsb2dNb2R1bGUge31cbiJdfQ==