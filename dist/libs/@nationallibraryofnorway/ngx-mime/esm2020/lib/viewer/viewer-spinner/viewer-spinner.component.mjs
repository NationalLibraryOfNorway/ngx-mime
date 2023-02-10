import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService, } from '../../core/spinner-service/spinner.service';
import * as i0 from "@angular/core";
import * as i1 from "../../core/spinner-service/spinner.service";
import * as i2 from "@angular/material/progress-spinner";
export class ViewerSpinnerComponent {
    constructor(spinnerService, changeDetectorRef) {
        this.spinnerService = spinnerService;
        this.changeDetectorRef = changeDetectorRef;
        this.visible = false;
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.subscriptions.add(this.spinnerService.spinnerState.subscribe((state) => {
            this.visible = state.show;
            this.changeDetectorRef.detectChanges();
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
ViewerSpinnerComponent.ɵfac = function ViewerSpinnerComponent_Factory(t) { return new (t || ViewerSpinnerComponent)(i0.ɵɵdirectiveInject(i1.SpinnerService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
ViewerSpinnerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ViewerSpinnerComponent, selectors: [["mime-spinner"]], decls: 2, vars: 2, consts: [[1, "mime-spinner"]], template: function ViewerSpinnerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "mat-spinner");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassProp("mime-spinner--active", ctx.visible);
    } }, dependencies: [i2.MatProgressSpinner], styles: [".mime-spinner[_ngcontent-%COMP%]{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active[_ngcontent-%COMP%]{display:block}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ViewerSpinnerComponent, [{
        type: Component,
        args: [{ selector: 'mime-spinner', template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".mime-spinner{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}\n"] }]
    }], function () { return [{ type: i1.SpinnerService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLXNwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci92aWV3ZXItc3Bpbm5lci92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1zcGlubmVyL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUNMLGNBQWMsR0FFZixNQUFNLDRDQUE0QyxDQUFDOzs7O0FBT3BELE1BQU0sT0FBTyxzQkFBc0I7SUFJakMsWUFDVSxjQUE4QixFQUM5QixpQkFBb0M7UUFEcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMdkMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNmLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUt4QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzRGQXBCVSxzQkFBc0I7eUVBQXRCLHNCQUFzQjtRQ1puQyw4QkFBaUU7UUFDL0QsOEJBQTJCO1FBQzdCLGlCQUFNOztRQUZvQixtREFBc0M7O3VGRFluRCxzQkFBc0I7Y0FMbEMsU0FBUzsyQkFDRSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgU3Bpbm5lclNlcnZpY2UsXG4gIFNwaW5uZXJTdGF0ZSxcbn0gZnJvbSAnLi4vLi4vY29yZS9zcGlubmVyLXNlcnZpY2Uvc3Bpbm5lci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1zcGlubmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlld2VyLXNwaW5uZXIuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHVibGljIHZpc2libGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3Bpbm5lclNlcnZpY2U6IFNwaW5uZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5zcGlubmVyU2VydmljZS5zcGlubmVyU3RhdGUuc3Vic2NyaWJlKChzdGF0ZTogU3Bpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHN0YXRlLnNob3c7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtaW1lLXNwaW5uZXJcIiBbY2xhc3MubWltZS1zcGlubmVyLS1hY3RpdmVdPVwidmlzaWJsZVwiPlxuICA8bWF0LXNwaW5uZXI+PC9tYXQtc3Bpbm5lcj5cbjwvZGl2PlxuIl19