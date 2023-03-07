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
ContentsDialogModule.ɵfac = function ContentsDialogModule_Factory(t) { return new (t || ContentsDialogModule)(); };
ContentsDialogModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ContentsDialogModule });
ContentsDialogModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        ContentsDialogService,
        ContentsDialogConfigStrategyFactory,
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    ], imports: [SharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContentsDialogModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ContentsDialogModule, { declarations: [ContentsDialogComponent, MetadataComponent, TocComponent], imports: [SharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudHMtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9jb250ZW50cy1kaWFsb2cvY29udGVudHMtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsNEJBQTRCLEdBQzdCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUFXL0UsTUFBTSxPQUFPLG9CQUFvQjs7d0ZBQXBCLG9CQUFvQjtzRUFBcEIsb0JBQW9COzJFQU5wQjtRQUNULHFCQUFxQjtRQUNyQixtQ0FBbUM7UUFDbkMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLDRCQUE0QixFQUFFO0tBQ3ZFLFlBTlMsWUFBWTt1RkFRWCxvQkFBb0I7Y0FUaEMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO2dCQUN4RSxTQUFTLEVBQUU7b0JBQ1QscUJBQXFCO29CQUNyQixtQ0FBbUM7b0JBQ25DLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSw0QkFBNEIsRUFBRTtpQkFDdkU7YUFDRjs7d0ZBQ1ksb0JBQW9CLG1CQVBoQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLGFBRDdELFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRXJyb3JTdGF0ZU1hdGNoZXIsXG4gIFNob3dPbkRpcnR5RXJyb3JTdGF0ZU1hdGNoZXIsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nU2VydmljZSB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL2NvbnRlbnRzLWRpYWxvZy1jb25maWctc3RyYXRlZ3ktZmFjdG9yeSc7XG5pbXBvcnQgeyBDb250ZW50c0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29udGVudHMtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXRhZGF0YUNvbXBvbmVudCB9IGZyb20gJy4vbWV0YWRhdGEvbWV0YWRhdGEuY29tcG9uZW50JztcbmltcG9ydCB7IFRvY0NvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtb2YtY29udGVudHMvdGFibGUtb2YtY29udGVudHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NvbnRlbnRzRGlhbG9nQ29tcG9uZW50LCBNZXRhZGF0YUNvbXBvbmVudCwgVG9jQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ29udGVudHNEaWFsb2dTZXJ2aWNlLFxuICAgIENvbnRlbnRzRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5LFxuICAgIHsgcHJvdmlkZTogRXJyb3JTdGF0ZU1hdGNoZXIsIHVzZUNsYXNzOiBTaG93T25EaXJ0eUVycm9yU3RhdGVNYXRjaGVyIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRzRGlhbG9nTW9kdWxlIHt9XG4iXX0=