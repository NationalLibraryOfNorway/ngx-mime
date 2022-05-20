import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogService } from './content-search-dialog.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import * as i0 from "@angular/core";
export class ContentSearchDialogModule {
}
ContentSearchDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContentSearchDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, declarations: [ContentSearchDialogComponent], imports: [SharedModule] });
ContentSearchDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, providers: [
        ContentSearchDialogService,
        ContentSearchDialogConfigStrategyFactory,
    ], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [ContentSearchDialogComponent],
                    providers: [
                        ContentSearchDialogService,
                        ContentSearchDialogConfigStrategyFactory,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFVakYsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLGlCQU5yQiw0QkFBNEIsYUFEakMsWUFBWTt1SEFPWCx5QkFBeUIsYUFMekI7UUFDVCwwQkFBMEI7UUFDMUIsd0NBQXdDO0tBQ3pDLFlBTFEsQ0FBQyxZQUFZLENBQUM7MkZBT1oseUJBQXlCO2tCQVJyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQzVDLFNBQVMsRUFBRTt3QkFDVCwwQkFBMEI7d0JBQzFCLHdDQUF3QztxQkFDekM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb250ZW50U2VhcmNoRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UsXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaERpYWxvZ01vZHVsZSB7fVxuIl19