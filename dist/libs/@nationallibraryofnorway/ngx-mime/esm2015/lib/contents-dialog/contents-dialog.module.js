import { NgModule } from '@angular/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { SharedModule } from './../shared/shared.module';
import { ContentsDialogService } from './contents-dialog.service';
import { ContentsDialogConfigStrategyFactory } from './contents-dialog-config-strategy-factory';
import { ContentsDialogComponent } from './contents-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';
export class ContentsDialogModule {
}
ContentsDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule],
                declarations: [ContentsDialogComponent, MetadataComponent, TocComponent],
                providers: [
                    ContentsDialogService,
                    ContentsDialogConfigStrategyFactory,
                    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
                ],
                entryComponents: [ContentsDialogComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9yb25ueW0vVGVtcC9uZ3gtbWltZS9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsNEJBQTRCLEVBQzdCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQVkvRSxNQUFNLE9BQU8sb0JBQW9COzs7WUFWaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO2dCQUN4RSxTQUFTLEVBQUU7b0JBQ1QscUJBQXFCO29CQUNyQixtQ0FBbUM7b0JBQ25DLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSw0QkFBNEIsRUFBRTtpQkFDdkU7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7YUFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gIFNob3dPbkRpcnR5RXJyb3JTdGF0ZU1hdGNoZXJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IE1ldGFkYXRhQ29tcG9uZW50IH0gZnJvbSAnLi9tZXRhZGF0YS9tZXRhZGF0YS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9jQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29udGVudHNEaWFsb2dDb21wb25lbnQsIE1ldGFkYXRhQ29tcG9uZW50LCBUb2NDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgeyBwcm92aWRlOiBFcnJvclN0YXRlTWF0Y2hlciwgdXNlQ2xhc3M6IFNob3dPbkRpcnR5RXJyb3JTdGF0ZU1hdGNoZXIgfVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtDb250ZW50c0RpYWxvZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudHNEaWFsb2dNb2R1bGUge31cbiJdfQ==