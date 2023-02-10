import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MimeMaterialModule } from './mime-material.module';
import { SpinnerService } from '../core/spinner-service/spinner.service';
import * as i0 from "@angular/core";
export class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule });
SharedModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [SpinnerService], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MimeMaterialModule, CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MimeMaterialModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MimeMaterialModule,
                ],
                exports: [
                    CommonModule,
                    FlexLayoutModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MimeMaterialModule,
                ],
                providers: [SpinnerService],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MimeMaterialModule], exports: [CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MimeMaterialModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztBQW1CekUsTUFBTSxPQUFPLFlBQVk7O3dFQUFaLFlBQVk7OERBQVosWUFBWTttRUFGWixDQUFDLGNBQWMsQ0FBQyxZQWJ6QixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsa0JBQWtCLEVBR2xCLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixrQkFBa0I7dUZBSVQsWUFBWTtjQWpCeEIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixnQkFBZ0I7b0JBQ2hCLGtCQUFrQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsa0JBQWtCO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFjLENBQUM7YUFDNUI7O3dGQUNZLFlBQVksY0FmckIsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGtCQUFrQixhQUdsQixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbmltcG9ydCB7IE1pbWVNYXRlcmlhbE1vZHVsZSB9IGZyb20gJy4vbWltZS1tYXRlcmlhbC5tb2R1bGUnO1xuaW1wb3J0IHsgU3Bpbm5lclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3NwaW5uZXItc2VydmljZS9zcGlubmVyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBNaW1lTWF0ZXJpYWxNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRmxleExheW91dE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1pbWVNYXRlcmlhbE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbU3Bpbm5lclNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge31cbiJdfQ==