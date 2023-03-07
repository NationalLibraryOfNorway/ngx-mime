import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogComponent } from './content-search-dialog.component';
import { ContentSearchDialogService } from './content-search-dialog.service';
import * as i0 from "@angular/core";
export class ContentSearchDialogModule {
}
ContentSearchDialogModule.ɵfac = function ContentSearchDialogModule_Factory(t) { return new (t || ContentSearchDialogModule)(); };
ContentSearchDialogModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ContentSearchDialogModule });
ContentSearchDialogModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        ContentSearchDialogService,
        ContentSearchDialogConfigStrategyFactory,
        MimeDomHelper,
    ], imports: [SharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentSearchDialogModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ContentSearchDialogModule, { declarations: [ContentSearchDialogComponent], imports: [SharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0csT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBVzdFLE1BQU0sT0FBTyx5QkFBeUI7O2tHQUF6Qix5QkFBeUI7MkVBQXpCLHlCQUF5QjtnRkFOekI7UUFDVCwwQkFBMEI7UUFDMUIsd0NBQXdDO1FBQ3hDLGFBQWE7S0FDZCxZQU5TLFlBQVk7dUZBUVgseUJBQXlCO2NBVHJDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO2dCQUM1QyxTQUFTLEVBQUU7b0JBQ1QsMEJBQTBCO29CQUMxQix3Q0FBd0M7b0JBQ3hDLGFBQWE7aUJBQ2Q7YUFDRjs7d0ZBQ1kseUJBQXlCLG1CQVByQiw0QkFBNEIsYUFEakMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNaW1lRG9tSGVscGVyIH0gZnJvbSAnLi4vY29yZS9taW1lLWRvbS1oZWxwZXInO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi9jb250ZW50LXNlYXJjaC1kaWFsb2ctY29uZmlnLXN0cmF0ZWd5LWZhY3RvcnknO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSB9IGZyb20gJy4vY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQ29udGVudFNlYXJjaERpYWxvZ0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIENvbnRlbnRTZWFyY2hEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnksXG4gICAgTWltZURvbUhlbHBlcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29udGVudFNlYXJjaERpYWxvZ01vZHVsZSB7fVxuIl19