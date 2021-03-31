import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { StyleService } from '../core/style-service/style.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
export class AttributionDialogComponent {
    constructor(intl, renderer, el, changeDetectorRef, iiifManifestService, attributionDialogResizeService, styleService, accessKeysHandlerService) {
        this.intl = intl;
        this.renderer = renderer;
        this.el = el;
        this.changeDetectorRef = changeDetectorRef;
        this.iiifManifestService = iiifManifestService;
        this.attributionDialogResizeService = attributionDialogResizeService;
        this.styleService = styleService;
        this.accessKeysHandlerService = accessKeysHandlerService;
        this.destroyed = new Subject();
        attributionDialogResizeService.el = el;
    }
    ngOnInit() {
        this.iiifManifestService.currentManifest
            .pipe(takeUntil(this.destroyed))
            .subscribe((manifest) => {
            this.manifest = manifest;
            this.changeDetectorRef.markForCheck();
        });
    }
    ngAfterViewInit() {
        this.styleService.onChange.pipe(takeUntil(this.destroyed)).subscribe(c => {
            const backgroundRgbaColor = this.styleService.convertToRgba(c, 0.3);
            this.renderer.setStyle(this.container.nativeElement, 'background-color', backgroundRgbaColor);
        });
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    handleKeys(event) {
        this.accessKeysHandlerService.handleKeyEvents(event);
    }
    onResize(event) {
        this.attributionDialogResizeService.markForCheck();
    }
    ngAfterViewChecked() {
        this.attributionDialogResizeService.markForCheck();
    }
}
AttributionDialogComponent.decorators = [
    { type: Component, args: [{
                template: "<div #container class=\"attribution-container\">\n  <mat-toolbar class=\"attribution-toolbar\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex>\n      <h1 mat-dialog-title>{{ intl.attributionLabel }}</h1>\n      <button\n        mat-icon-button\n        [aria-label]=\"intl.attributonCloseAriaLabel\"\n        [matTooltip]=\"intl.closeLabel\"\n        [matDialogClose]=\"true\"\n      >\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n  </mat-toolbar>\n  <p mat-dialog-content [innerHTML]=\"manifest?.attribution\"> </p>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".attribution-toolbar{background:transparent;font-size:14px;min-height:20px!important;padding:8px}.mat-dialog-title{font-size:16px}.mat-dialog-content{margin:0;padding:8px}::ng-deep .attribution-panel{font-family:Roboto,Helvetica Neue,sans-serif}::ng-deep .attribution-panel>.mat-dialog-container{background:transparent!important;font-size:11px;padding:0}::ng-deep .attribution-toolbar>.mat-toolbar-layout>.mat-toolbar-row{height:20px}"]
            },] }
];
AttributionDialogComponent.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: IiifManifestService },
    { type: AttributionDialogResizeService },
    { type: StyleService },
    { type: AccessKeysService }
];
AttributionDialogComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { static: true },] }],
    handleKeys: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9saWJzL25neC1taW1lL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFPckYsTUFBTSxPQUFPLDBCQUEwQjtJQU1yQyxZQUNTLElBQW9CLEVBQ25CLFFBQW1CLEVBQ25CLEVBQWMsRUFDZCxpQkFBb0MsRUFDcEMsbUJBQXdDLEVBQ3hDLDhCQUE4RCxFQUM5RCxZQUEwQixFQUMxQix3QkFBMkM7UUFQNUMsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG1DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBZ0M7UUFDOUQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtRQVg3QyxjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFFLENBQUM7UUFhL0MsOEJBQThCLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlO2FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQy9CLFNBQVMsQ0FBQyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFDNUIsa0JBQWtCLEVBQ2xCLG1CQUFtQixDQUNwQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBR0QsVUFBVSxDQUFDLEtBQW9CO1FBQzdCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdELFFBQVEsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULDBrQkFBa0Q7Z0JBRWxELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBVFEsY0FBYztZQVByQixTQUFTO1lBSlQsVUFBVTtZQUZWLGlCQUFpQjtZQVlWLG1CQUFtQjtZQUluQiw4QkFBOEI7WUFEOUIsWUFBWTtZQUpaLGlCQUFpQjs7O3dCQWdCdkIsU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7eUJBd0N2QyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3VCQUtoQyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWNjZXNzS2V5c1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9jb3JlL2ludGwvdmlld2VyLWludGwnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UgfSBmcm9tICcuL2F0dHJpYnV0aW9uLWRpYWxvZy1yZXNpemUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXR0cmlidXRpb24tZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEF0dHJpYnV0aW9uRGlhbG9nQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0NoZWNrZWQge1xuICBwdWJsaWMgbWFuaWZlc3Q6IE1hbmlmZXN0O1xuICBwcml2YXRlIGRlc3Ryb3llZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlOiBBdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFjY2Vzc0tleXNIYW5kbGVyU2VydmljZTogQWNjZXNzS2V5c1NlcnZpY2VcbiAgKSB7XG4gICAgYXR0cmlidXRpb25EaWFsb2dSZXNpemVTZXJ2aWNlLmVsID0gZWw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0XG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgobWFuaWZlc3Q6IE1hbmlmZXN0KSA9PiB7XG4gICAgICAgIHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3R5bGVTZXJ2aWNlLm9uQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSkuc3Vic2NyaWJlKGMgPT4ge1xuICAgICAgY29uc3QgYmFja2dyb3VuZFJnYmFDb2xvciA9IHRoaXMuc3R5bGVTZXJ2aWNlLmNvbnZlcnRUb1JnYmEoYywgMC4zKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJyxcbiAgICAgICAgYmFja2dyb3VuZFJnYmFDb2xvclxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaGFuZGxlS2V5RXZlbnRzKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICBvblJlc2l6ZShldmVudDogYW55KSB7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1Jlc2l6ZVNlcnZpY2UubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==