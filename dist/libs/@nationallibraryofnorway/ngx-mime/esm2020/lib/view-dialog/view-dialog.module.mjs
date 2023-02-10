import { NgModule } from '@angular/core';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { SharedModule } from '../shared/shared.module';
import { IconComponent } from './icon/icon.component';
import { ViewDialogConfigStrategyFactory } from './view-dialog-config-strategy-factory';
import { ViewDialogComponent } from './view-dialog.component';
import { ViewDialogService } from './view-dialog.service';
import * as i0 from "@angular/core";
export class ViewDialogModule {
}
ViewDialogModule.ɵfac = function ViewDialogModule_Factory(t) { return new (t || ViewDialogModule)(); };
ViewDialogModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ViewDialogModule });
ViewDialogModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        ViewDialogService,
        ViewDialogConfigStrategyFactory,
        MimeDomHelper,
    ], imports: [SharedModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ViewDialogModule, [{
        type: NgModule,
        args: [{
                imports: [SharedModule],
                declarations: [ViewDialogComponent, IconComponent],
                providers: [
                    ViewDialogService,
                    ViewDialogConfigStrategyFactory,
                    MimeDomHelper,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ViewDialogModule, { declarations: [ViewDialogComponent, IconComponent], imports: [SharedModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQVcxRCxNQUFNLE9BQU8sZ0JBQWdCOztnRkFBaEIsZ0JBQWdCO2tFQUFoQixnQkFBZ0I7dUVBTmhCO1FBQ1QsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQixhQUFhO0tBQ2QsWUFOUyxZQUFZO3VGQVFYLGdCQUFnQjtjQVQ1QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUM7Z0JBQ2xELFNBQVMsRUFBRTtvQkFDVCxpQkFBaUI7b0JBQ2pCLCtCQUErQjtvQkFDL0IsYUFBYTtpQkFDZDthQUNGOzt3RkFDWSxnQkFBZ0IsbUJBUFosbUJBQW1CLEVBQUUsYUFBYSxhQUR2QyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1pbWVEb21IZWxwZXIgfSBmcm9tICcuLi9jb3JlL21pbWUtZG9tLWhlbHBlcic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdEaWFsb2dDb25maWdTdHJhdGVneUZhY3RvcnkgfSBmcm9tICcuL3ZpZXctZGlhbG9nLWNvbmZpZy1zdHJhdGVneS1mYWN0b3J5JztcbmltcG9ydCB7IFZpZXdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3ZpZXctZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nU2VydmljZSB9IGZyb20gJy4vdmlldy1kaWFsb2cuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTaGFyZWRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtWaWV3RGlhbG9nQ29tcG9uZW50LCBJY29uQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgVmlld0RpYWxvZ1NlcnZpY2UsXG4gICAgVmlld0RpYWxvZ0NvbmZpZ1N0cmF0ZWd5RmFjdG9yeSxcbiAgICBNaW1lRG9tSGVscGVyLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3RGlhbG9nTW9kdWxlIHt9XG4iXX0=