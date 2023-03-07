import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HelpDialogComponent } from './help-dialog.component';
import { HelpDialogService } from './help-dialog.service';
import { HelpDialogConfigStrategyFactory } from './help-dialog-config-strategy-factory';
import * as i0 from "@angular/core";
export class HelpDialogModule {
}
HelpDialogModule.ɵfac = function HelpDialogModule_Factory(t) { return new (t || HelpDialogModule)(); };
HelpDialogModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: HelpDialogModule });
HelpDialogModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [HelpDialogService, HelpDialogConfigStrategyFactory], imports: [SharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDialogModule, [{
        type: NgModule,
        args: [{
                imports: [SharedModule],
                declarations: [HelpDialogComponent],
                providers: [HelpDialogService, HelpDialogConfigStrategyFactory],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(HelpDialogModule, { declarations: [HelpDialogComponent], imports: [SharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFPeEYsTUFBTSxPQUFPLGdCQUFnQjs7Z0ZBQWhCLGdCQUFnQjtrRUFBaEIsZ0JBQWdCO3VFQUZoQixDQUFDLGlCQUFpQixFQUFFLCtCQUErQixDQUFDLFlBRnJELFlBQVk7dUZBSVgsZ0JBQWdCO2NBTDVCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSwrQkFBK0IsQ0FBQzthQUNoRTs7d0ZBQ1ksZ0JBQWdCLG1CQUhaLG1CQUFtQixhQUR4QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2hlbHAtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nU2VydmljZSB9IGZyb20gJy4vaGVscC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nQ29uZmlnU3RyYXRlZ3lGYWN0b3J5IH0gZnJvbSAnLi9oZWxwLWRpYWxvZy1jb25maWctc3RyYXRlZ3ktZmFjdG9yeSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtIZWxwRGlhbG9nQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbSGVscERpYWxvZ1NlcnZpY2UsIEhlbHBEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnldLFxufSlcbmV4cG9ydCBjbGFzcyBIZWxwRGlhbG9nTW9kdWxlIHt9XG4iXX0=