import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogService } from './content-search-dialog.service';
import * as i0 from "@angular/core";
export class ContentSearchDialogModule {
}
ContentSearchDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: ContentSearchDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ContentSearchDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.2", ngImport: i0, type: ContentSearchDialogModule, declarations: [ContentSearchDialogComponent], imports: [SharedModule] });
ContentSearchDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: ContentSearchDialogModule, providers: [
        ContentSearchDialogService,
        ContentSearchDialogConfigStrategyFactory,
        MimeDomHelper,
    ], imports: [SharedModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.2", ngImport: i0, type: ContentSearchDialogModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0csT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBVzdFLE1BQU0sT0FBTyx5QkFBeUI7O3NIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixpQkFQckIsNEJBQTRCLGFBRGpDLFlBQVk7dUhBUVgseUJBQXlCLGFBTnpCO1FBQ1QsMEJBQTBCO1FBQzFCLHdDQUF3QztRQUN4QyxhQUFhO0tBQ2QsWUFOUyxZQUFZOzJGQVFYLHlCQUF5QjtrQkFUckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUM1QyxTQUFTLEVBQUU7d0JBQ1QsMEJBQTBCO3dCQUMxQix3Q0FBd0M7d0JBQ3hDLGFBQWE7cUJBQ2Q7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWltZURvbUhlbHBlciB9IGZyb20gJy4uL2NvcmUvbWltZS1kb20taGVscGVyJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NvbnRlbnRTZWFyY2hEaWFsb2dDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSxcbiAgICBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5LFxuICAgIE1pbWVEb21IZWxwZXIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRTZWFyY2hEaWFsb2dNb2R1bGUge31cbiJdfQ==