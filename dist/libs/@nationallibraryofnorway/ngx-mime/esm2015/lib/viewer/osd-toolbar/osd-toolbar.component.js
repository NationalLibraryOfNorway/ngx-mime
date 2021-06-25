import { animate, group, state, style, transition, trigger, } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Renderer2, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
import { IiifManifestService } from '../../core/iiif-manifest-service/iiif-manifest-service';
import { ViewerOptions } from '../../core/models/viewer-options';
import { ViewingDirection } from '../../core/models/viewing-direction';
import { StyleService } from '../../core/style-service/style.service';
import { CanvasService } from './../../core/canvas-service/canvas-service';
import { MimeViewerIntl } from './../../core/intl/viewer-intl';
import { MimeResizeService } from './../../core/mime-resize-service/mime-resize.service';
import { ViewerService } from './../../core/viewer-service/viewer.service';
export class OsdToolbarComponent {
    constructor(intl, renderer, changeDetectorRef, mimeService, viewerService, canvasService, styleService, iiifManifestService) {
        this.intl = intl;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.mimeService = mimeService;
        this.viewerService = viewerService;
        this.canvasService = canvasService;
        this.styleService = styleService;
        this.iiifManifestService = iiifManifestService;
        this.osdToolbarStyle = {};
        this.numberOfCanvasGroups = 0;
        this.isFirstCanvasGroup = false;
        this.isLastCanvasGroup = false;
        this.state = 'hide';
        this.invert = false;
        this.subscriptions = new Subscription();
    }
    get osdToolbarState() {
        return this.state;
    }
    ngOnInit() {
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.invert = manifest.viewingDirection === ViewingDirection.LTR;
                this.changeDetectorRef.detectChanges();
            }
        }));
        this.subscriptions.add(this.mimeService.onResize.subscribe((dimensions) => {
            this.osdToolbarStyle = {
                top: dimensions.top + 110 + 'px',
            };
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.viewerService.onCanvasGroupIndexChange.subscribe((currentCanvasGroupIndex) => {
            this.numberOfCanvasGroups = this.canvasService.numberOfCanvasGroups;
            this.isFirstCanvasGroup = this.isOnFirstCanvasGroup(currentCanvasGroupIndex);
            this.isLastCanvasGroup = this.isOnLastCanvasGroup(currentCanvasGroupIndex);
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.intl.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
    }
    ngAfterViewInit() {
        this.subscriptions.add(this.styleService.onChange.subscribe((c) => {
            const backgroundRgbaColor = this.styleService.convertToRgba(c, 0.3);
            this.renderer.setStyle(this.container.nativeElement, 'background-color', backgroundRgbaColor);
        }));
    }
    zoomIn() {
        this.viewerService.zoomIn();
    }
    zoomOut() {
        this.viewerService.zoomOut();
    }
    home() {
        this.viewerService.home();
    }
    rotate() {
        this.viewerService.rotate();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    goToPreviousCanvasGroup() {
        this.viewerService.goToPreviousCanvasGroup();
    }
    goToNextCanvasGroup() {
        this.viewerService.goToNextCanvasGroup();
    }
    isOnFirstCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === 0;
    }
    isOnLastCanvasGroup(currentCanvasGroupIndex) {
        return currentCanvasGroupIndex === this.numberOfCanvasGroups - 1;
    }
}
OsdToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-osd-toolbar',
                template: "<div #container class=\"osd-toolbar\" [ngStyle]=\"osdToolbarStyle\">\n  <div fxHide fxShow.gt-sm=\"true\">\n    <div\n      class=\"osd-toolbar-container\"\n      fxLayout=\"column\"\n      fxLayoutAlign=\"center center\"\n    >\n      <div class=\"osd-toolbar-row\"> </div>\n      <div class=\"osd-toolbar-row\">\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_before</mat-icon>\n          </button>\n        </ng-container>\n        <button\n          (click)=\"home()\"\n          id=\"homeButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.homeLabel\"\n          [matTooltip]=\"intl.homeLabel\"\n        >\n          <mat-icon>home</mat-icon>\n        </button>\n        <ng-container *ngIf=\"invert\">\n          <button\n            id=\"navigateNextButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.nextPageLabel\"\n            [matTooltip]=\"intl.nextPageLabel\"\n            [disabled]=\"isLastCanvasGroup\"\n            (click)=\"goToNextCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"!invert\">\n          <button\n            id=\"navigateBeforeButton\"\n            mat-icon-button\n            [attr.aria-label]=\"intl.previousPageLabel\"\n            [matTooltip]=\"intl.previousPageLabel\"\n            [disabled]=\"isFirstCanvasGroup\"\n            (click)=\"goToPreviousCanvasGroup()\"\n          >\n            <mat-icon>navigate_next</mat-icon>\n          </button>\n        </ng-container>\n      </div>\n\n      <div class=\"osd-toolbar-row\">\n        <button\n          (click)=\"zoomIn()\"\n          id=\"zoomInButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomInLabel\"\n          [matTooltip]=\"intl.zoomInLabel\"\n        >\n          <mat-icon>zoom_in</mat-icon>\n        </button>\n\n        <button\n          (click)=\"rotate()\"\n          id=\"rotateButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.rotateCwLabel\"\n          [matTooltip]=\"intl.rotateCwLabel\"\n        >\n          <mat-icon>rotate_right</mat-icon>\n        </button>\n        <button\n          (click)=\"zoomOut()\"\n          id=\"zoomOutButton\"\n          mat-icon-button\n          [attr.aria-label]=\"intl.zoomOutLabel\"\n          [matTooltip]=\"intl.zoomOutLabel\"\n        >\n          <mat-icon>zoom_out</mat-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('osdToolbarState', [
                        state('hide', style({
                            transform: 'translate(-120px, 0)',
                            display: 'none',
                        })),
                        state('show', style({
                            transform: 'translate(0px, 0px)',
                            display: 'block',
                        })),
                        transition('hide => show', [
                            group([
                                style({ display: 'block' }),
                                animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
                            ]),
                        ]),
                        transition('show => hide', animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`)),
                    ]),
                ],
                styles: [":host{z-index:1}::ng-deep .osd-toolbar-row>.mat-toolbar-row{height:40px}.osd-toolbar{position:absolute;z-index:2;background:transparent;width:auto;border-radius:8px;margin-left:16px}"]
            },] }
];
OsdToolbarComponent.ctorParameters = () => [
    { type: MimeViewerIntl },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: MimeResizeService },
    { type: ViewerService },
    { type: CanvasService },
    { type: StyleService },
    { type: IiifManifestService }
];
OsdToolbarComponent.propDecorators = {
    container: [{ type: ViewChild, args: ['container', { static: true },] }],
    osdToolbarState: [{ type: HostBinding, args: ['@osdToolbarState',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NkLXRvb2xiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3gtbWltZS9zcmMvbGliL3ZpZXdlci9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxHQUNSLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFdBQVcsRUFHWCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFFN0YsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBRXpGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQW9DM0UsTUFBTSxPQUFPLG1CQUFtQjtJQWM5QixZQUNTLElBQW9CLEVBQ25CLFFBQW1CLEVBQ25CLGlCQUFvQyxFQUNwQyxXQUE4QixFQUM5QixhQUE0QixFQUM1QixhQUE0QixFQUM1QixZQUEwQixFQUMxQixtQkFBd0M7UUFQ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LE1BQU0sRUFDTixLQUFLLENBQUM7NEJBQ0osU0FBUyxFQUFFLHFCQUFxQjs0QkFDaEMsT0FBTyxFQUFFLE9BQU87eUJBQ2pCLENBQUMsQ0FDSDt3QkFDRCxVQUFVLENBQUMsY0FBYyxFQUFFOzRCQUN6QixLQUFLLENBQUM7Z0NBQ0osS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2dDQUMzQixPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLGtCQUFrQixhQUFhLENBQUM7NkJBQ3RFLENBQUM7eUJBQ0gsQ0FBQzt3QkFDRixVQUFVLENBQ1IsY0FBYyxFQUNkLE9BQU8sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLFlBQVksQ0FBQyxDQUN0RTtxQkFDRixDQUFDO2lCQUNIOzthQUNGOzs7WUF0Q1EsY0FBYztZQVZyQixTQUFTO1lBTlQsaUJBQWlCO1lBaUJWLGlCQUFpQjtZQUVqQixhQUFhO1lBSmIsYUFBYTtZQURiLFlBQVk7WUFKWixtQkFBbUI7Ozt3QkE4Q3pCLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzhCQUN2QyxXQUFXLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgZ3JvdXAsXG4gIHN0YXRlLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2luZ0RpcmVjdGlvbiB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3ZpZXdpbmctZGlyZWN0aW9uJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLy4uLy4uL2NvcmUvY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLy4uLy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4vLi4vLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4vLi4vLi4vY29yZS9tb2RlbHMvZGltZW5zaW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS1vc2QtdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9vc2QtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL29zZC10b29sYmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignb3NkVG9vbGJhclN0YXRlJywgW1xuICAgICAgc3RhdGUoXG4gICAgICAgICdoaWRlJyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtMTIwcHgsIDApJyxcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RhdGUoXG4gICAgICAgICdzaG93JyxcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLFxuICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbignaGlkZSA9PiBzaG93JywgW1xuICAgICAgICBncm91cChbXG4gICAgICAgICAgc3R5bGUoeyBkaXNwbGF5OiAnYmxvY2snIH0pLFxuICAgICAgICAgIGFuaW1hdGUoYCR7Vmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy50b29sYmFyc0Vhc2VJblRpbWV9bXMgZWFzZS1vdXRgKSxcbiAgICAgICAgXSksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oXG4gICAgICAgICdzaG93ID0+IGhpZGUnLFxuICAgICAgICBhbmltYXRlKGAke1ZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMudG9vbGJhcnNFYXNlT3V0VGltZX1tcyBlYXNlLWluYClcbiAgICAgICksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9zZFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRhaW5lciE6IEVsZW1lbnRSZWY7XG4gIEBIb3N0QmluZGluZygnQG9zZFRvb2xiYXJTdGF0ZScpXG4gIGdldCBvc2RUb29sYmFyU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cbiAgcHVibGljIG9zZFRvb2xiYXJTdHlsZSA9IHt9O1xuICBwdWJsaWMgbnVtYmVyT2ZDYW52YXNHcm91cHMgPSAwO1xuICBwdWJsaWMgaXNGaXJzdENhbnZhc0dyb3VwID0gZmFsc2U7XG4gIHB1YmxpYyBpc0xhc3RDYW52YXNHcm91cCA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGUgPSAnaGlkZSc7XG4gIGludmVydCA9IGZhbHNlO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG1pbWVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmludmVydCA9IG1hbmlmZXN0LnZpZXdpbmdEaXJlY3Rpb24gPT09IFZpZXdpbmdEaXJlY3Rpb24uTFRSO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1pbWVTZXJ2aWNlLm9uUmVzaXplLnN1YnNjcmliZSgoZGltZW5zaW9uczogRGltZW5zaW9ucykgPT4ge1xuICAgICAgICB0aGlzLm9zZFRvb2xiYXJTdHlsZSA9IHtcbiAgICAgICAgICB0b3A6IGRpbWVuc2lvbnMudG9wICsgMTEwICsgJ3B4JyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjdXJyZW50Q2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyA9IHRoaXMuY2FudmFzU2VydmljZS5udW1iZXJPZkNhbnZhc0dyb3VwcztcbiAgICAgICAgICB0aGlzLmlzRmlyc3RDYW52YXNHcm91cCA9IHRoaXMuaXNPbkZpcnN0Q2FudmFzR3JvdXAoXG4gICAgICAgICAgICBjdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5pc0xhc3RDYW52YXNHcm91cCA9IHRoaXMuaXNPbkxhc3RDYW52YXNHcm91cChcbiAgICAgICAgICAgIGN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5pbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5zdHlsZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChjKSA9PiB7XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRSZ2JhQ29sb3IgPSB0aGlzLnN0eWxlU2VydmljZS5jb252ZXJ0VG9SZ2JhKGMsIDAuMyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcicsXG4gICAgICAgICAgYmFja2dyb3VuZFJnYmFDb2xvclxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgem9vbUluKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS56b29tSW4oKTtcbiAgfVxuXG4gIHpvb21PdXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnpvb21PdXQoKTtcbiAgfVxuXG4gIGhvbWUoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhvbWUoKTtcbiAgfVxuXG4gIHJvdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2Uucm90YXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvUHJldmlvdXNDYW52YXNHcm91cCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub1ByZXZpb3VzQ2FudmFzR3JvdXAoKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvTmV4dENhbnZhc0dyb3VwKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvTmV4dENhbnZhc0dyb3VwKCk7XG4gIH1cblxuICBwcml2YXRlIGlzT25GaXJzdENhbnZhc0dyb3VwKGN1cnJlbnRDYW52YXNHcm91cEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY3VycmVudENhbnZhc0dyb3VwSW5kZXggPT09IDA7XG4gIH1cblxuICBwcml2YXRlIGlzT25MYXN0Q2FudmFzR3JvdXAoY3VycmVudENhbnZhc0dyb3VwSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjdXJyZW50Q2FudmFzR3JvdXBJbmRleCA9PT0gdGhpcy5udW1iZXJPZkNhbnZhc0dyb3VwcyAtIDE7XG4gIH1cbn1cbiJdfQ==