import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogService } from './content-search-dialog.service';
import * as i0 from "@angular/core";
export class ContentSearchDialogModule {
}
ContentSearchDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContentSearchDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, declarations: [ContentSearchDialogComponent], imports: [SharedModule] });
ContentSearchDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, providers: [
        ContentSearchDialogService,
        ContentSearchDialogConfigStrategyFactory,
        MimeDomHelper,
    ], imports: [[SharedModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.4", ngImport: i0, type: ContentSearchDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SharedModule],
                    declarations: [ContentSearchDialogComponent],
                    providers: [
                        ContentSearchDialogService,
                        ContentSearchDialogConfigStrategyFactory,
                        MimeDomHelper,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0csT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBVzdFLE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixpQkFQckIsNEJBQTRCLGFBRGpDLFlBQVk7dUhBUVgseUJBQXlCLGFBTnpCO1FBQ1QsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4QyxhQUFhO0tBQ2QsWUFOUSxDQUFDLFlBQVksQ0FBQzsyRkFRWix5QkFBeUI7a0JBVHJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztvQkFDNUMsU0FBUyxFQUFFO3dCQUNULDBCQUEwQjt3QkFDMUIsd0NBQXdDO3dCQUN4QyxhQUFhO3FCQUNkO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy1jb25maWctc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2cuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb250ZW50U2VhcmNoRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UsXG4gICAgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSxcbiAgICBNaW1lRG9tSGVscGVyLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb250ZW50U2VhcmNoRGlhbG9nTW9kdWxlIHt9XG4iXX0=