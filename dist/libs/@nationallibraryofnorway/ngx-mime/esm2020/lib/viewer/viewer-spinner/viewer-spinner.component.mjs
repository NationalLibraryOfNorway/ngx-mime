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
ViewerSpinnerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerSpinnerComponent, deps: [{ token: i1.SpinnerService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ViewerSpinnerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ViewerSpinnerComponent, selector: "mime-spinner", ngImport: i0, template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".mime-spinner{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}\n"], dependencies: [{ kind: "component", type: i2.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-spinner', template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n", styles: [".mime-spinner{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.SpinnerService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLXNwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci92aWV3ZXItc3Bpbm5lci92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy9saWIvdmlld2VyL3ZpZXdlci1zcGlubmVyL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUNMLGNBQWMsR0FFZixNQUFNLDRDQUE0QyxDQUFDOzs7O0FBT3BELE1BQU0sT0FBTyxzQkFBc0I7SUFJakMsWUFDVSxjQUE4QixFQUM5QixpQkFBb0M7UUFEcEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMdkMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNmLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUt4QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7O21IQXBCVSxzQkFBc0I7dUdBQXRCLHNCQUFzQixvRENabkMsZ0hBR0E7MkZEU2Esc0JBQXNCO2tCQUxsQyxTQUFTOytCQUNFLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBTcGlubmVyU2VydmljZSxcbiAgU3Bpbm5lclN0YXRlLFxufSBmcm9tICcuLi8uLi9jb3JlL3NwaW5uZXItc2VydmljZS9zcGlubmVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXNwaW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLXNwaW5uZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJTcGlubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBwdWJsaWMgdmlzaWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzcGlubmVyU2VydmljZTogU3Bpbm5lclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnNwaW5uZXJTZXJ2aWNlLnNwaW5uZXJTdGF0ZS5zdWJzY3JpYmUoKHN0YXRlOiBTcGlubmVyU3RhdGUpID0+IHtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gc3RhdGUuc2hvdztcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm1pbWUtc3Bpbm5lclwiIFtjbGFzcy5taW1lLXNwaW5uZXItLWFjdGl2ZV09XCJ2aXNpYmxlXCI+XG4gIDxtYXQtc3Bpbm5lcj48L21hdC1zcGlubmVyPlxuPC9kaXY+XG4iXX0=