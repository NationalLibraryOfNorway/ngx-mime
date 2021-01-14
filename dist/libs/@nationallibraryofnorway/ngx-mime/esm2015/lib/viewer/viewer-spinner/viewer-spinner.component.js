import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { SpinnerService } from '../../core/spinner-service/spinner.service';
export class ViewerSpinnerComponent {
    constructor(spinnerService, changeDetectorRef) {
        this.spinnerService = spinnerService;
        this.changeDetectorRef = changeDetectorRef;
        this.visible = false;
    }
    ngOnInit() {
        this.spinnerSub = this.spinnerService.spinnerState.subscribe((state) => {
            this.visible = state.show;
            this.changeDetectorRef.detectChanges();
        });
    }
    ngOnDestroy() {
        this.spinnerSub.unsubscribe();
    }
}
ViewerSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-spinner',
                template: "<div class=\"mime-spinner\" [class.mime-spinner--active]=\"visible\">\n  <mat-spinner></mat-spinner>\n</div>\n",
                styles: [".mime-spinner{display:none;left:50%;position:absolute;top:45%;transform:translate(-50%);z-index:9999}.mime-spinner--active{display:block}"]
            },] }
];
ViewerSpinnerComponent.ctorParameters = () => [
    { type: SpinnerService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLXNwaW5uZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjLyIsInNvdXJjZXMiOlsibGliL3ZpZXdlci92aWV3ZXItc3Bpbm5lci92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFFTCxjQUFjLEVBQ2YsTUFBTSw0Q0FBNEMsQ0FBQztBQU9wRCxNQUFNLE9BQU8sc0JBQXNCO0lBSWpDLFlBQ1UsY0FBOEIsRUFDOUIsaUJBQW9DO1FBRHBDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTHZDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFNcEIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FDMUQsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7WUF6QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QiwwSEFBOEM7O2FBRS9DOzs7WUFQQyxjQUFjO1lBTlAsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBTcGlubmVyU3RhdGUsXG4gIFNwaW5uZXJTZXJ2aWNlXG59IGZyb20gJy4uLy4uL2NvcmUvc3Bpbm5lci1zZXJ2aWNlL3NwaW5uZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtc3Bpbm5lcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXItc3Bpbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpZXdlci1zcGlubmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyU3Bpbm5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcHVibGljIHZpc2libGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzcGlubmVyU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzcGlubmVyU2VydmljZTogU3Bpbm5lclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Bpbm5lclN1YiA9IHRoaXMuc3Bpbm5lclNlcnZpY2Uuc3Bpbm5lclN0YXRlLnN1YnNjcmliZShcbiAgICAgIChzdGF0ZTogU3Bpbm5lclN0YXRlKSA9PiB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHN0YXRlLnNob3c7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnNwaW5uZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19