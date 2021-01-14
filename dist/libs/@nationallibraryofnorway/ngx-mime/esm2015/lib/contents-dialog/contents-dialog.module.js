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
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsNEJBQTRCLEVBQzdCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQVcvRSxNQUFNLE9BQU8sb0JBQW9COzs7WUFUaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO2dCQUN4RSxTQUFTLEVBQUU7b0JBQ1QscUJBQXFCO29CQUNyQixtQ0FBbUM7b0JBQ25DLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSw0QkFBNEIsRUFBRTtpQkFDdkU7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBFcnJvclN0YXRlTWF0Y2hlcixcbiAgU2hvd09uRGlydHlFcnJvclN0YXRlTWF0Y2hlclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2NvbnRlbnRzLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi9jb250ZW50cy1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbnRlbnRzLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWV0YWRhdGFDb21wb25lbnQgfSBmcm9tICcuL21ldGFkYXRhL21ldGFkYXRhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2NDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb250ZW50c0RpYWxvZ0NvbXBvbmVudCwgTWV0YWRhdGFDb21wb25lbnQsIFRvY0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvbnRlbnRzRGlhbG9nU2VydmljZSxcbiAgICBDb250ZW50c0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSxcbiAgICB7IHByb3ZpZGU6IEVycm9yU3RhdGVNYXRjaGVyLCB1c2VDbGFzczogU2hvd09uRGlydHlFcnJvclN0YXRlTWF0Y2hlciB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudHNEaWFsb2dNb2R1bGUge31cbiJdfQ==