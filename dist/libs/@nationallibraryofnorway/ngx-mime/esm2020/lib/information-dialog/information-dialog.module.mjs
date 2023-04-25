import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { InformationDialogService } from './information-dialog.service';
import { InformationDialogConfigStrategyFactory } from './information-dialog-config-strategy-factory';
import { InformationDialogComponent } from './information-dialog.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TocComponent } from './table-of-contents/table-of-contents.component';
import * as i0 from "@angular/core";
export class InformationDialogModule {
}
InformationDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
InformationDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogModule, declarations: [InformationDialogComponent, MetadataComponent, TocComponent], imports: [SharedModule] });
InformationDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogModule, providers: [InformationDialogService, InformationDialogConfigStrategyFactory], imports: [SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: InformationDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [InformationDialogComponent, MetadataComponent, TocComponent],
                    providers: [InformationDialogService, InformationDialogConfigStrategyFactory],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24tZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN0RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saURBQWlELENBQUM7O0FBTy9FLE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixpQkFIbkIsMEJBQTBCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxhQURoRSxZQUFZO3FIQUlYLHVCQUF1QixhQUZ2QixDQUFDLHdCQUF3QixFQUFFLHNDQUFzQyxDQUFDLFlBRm5FLFlBQVk7MkZBSVgsdUJBQXVCO2tCQUxuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsMEJBQTBCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO29CQUMzRSxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxzQ0FBc0MsQ0FBQztpQkFDOUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2luZm9ybWF0aW9uLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi9pbmZvcm1hdGlvbi1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2luZm9ybWF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWV0YWRhdGFDb21wb25lbnQgfSBmcm9tICcuL21ldGFkYXRhL21ldGFkYXRhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2NDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtJbmZvcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCwgTWV0YWRhdGFDb21wb25lbnQsIFRvY0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0luZm9ybWF0aW9uRGlhbG9nU2VydmljZSwgSW5mb3JtYXRpb25EaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnldLFxufSlcbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvbkRpYWxvZ01vZHVsZSB7fVxuIl19