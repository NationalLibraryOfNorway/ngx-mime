import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService, } from '../../core/spinner-service/spinner.service';
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
ViewerSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-spinner',
                template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n",
                styles: [".mime-spinner{display:none;position:absolute;left:50%;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}"]
            },] }
];
ViewerSpinnerComponent.ctorParameters = () => [
    { type: SpinnerService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLXNwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci92aWV3ZXItc3Bpbm5lci92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQ0wsY0FBYyxHQUVmLE1BQU0sNENBQTRDLENBQUM7QUFPcEQsTUFBTSxPQUFPLHNCQUFzQjtJQUlqQyxZQUNVLGNBQThCLEVBQzlCLGlCQUFvQztRQURwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUx2QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBS3hDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7O1lBekJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsMEhBQThDOzthQUUvQzs7O1lBUkMsY0FBYztZQUhQLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIFNwaW5uZXJTZXJ2aWNlLFxuICBTcGlubmVyU3RhdGUsXG59IGZyb20gJy4uLy4uL2NvcmUvc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtc3Bpbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlclNwaW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHB1YmxpYyB2aXNpYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNwaW5uZXJTZXJ2aWNlOiBTcGlubmVyU2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuc3Bpbm5lclNlcnZpY2Uuc3Bpbm5lclN0YXRlLnN1YnNjcmliZSgoc3RhdGU6IFNwaW5uZXJTdGF0ZSkgPT4ge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBzdGF0ZS5zaG93O1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=