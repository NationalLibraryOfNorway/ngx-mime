import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, ViewChild, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerMode } from '../core/models/viewer-mode';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerState } from '../core/models/viewerState';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
export class ViewerComponent {
    constructor(snackBar, intl, el, iiifManifestService, contentsDialogService, attributionDialogService, contentSearchDialogService, helpDialogService, viewerService, resizeService, changeDetectorRef, modeService, iiifContentSearchService, accessKeysHandlerService, canvasService, viewerLayoutService, styleService, altoService, zone) {
        this.snackBar = snackBar;
        this.intl = intl;
        this.el = el;
        this.iiifManifestService = iiifManifestService;
        this.contentsDialogService = contentsDialogService;
        this.attributionDialogService = attributionDialogService;
        this.contentSearchDialogService = contentSearchDialogService;
        this.helpDialogService = helpDialogService;
        this.viewerService = viewerService;
        this.resizeService = resizeService;
        this.changeDetectorRef = changeDetectorRef;
        this.modeService = modeService;
        this.iiifContentSearchService = iiifContentSearchService;
        this.accessKeysHandlerService = accessKeysHandlerService;
        this.canvasService = canvasService;
        this.viewerLayoutService = viewerLayoutService;
        this.styleService = styleService;
        this.altoService = altoService;
        this.zone = zone;
        this.canvasIndex = 0;
        this.config = new MimeViewerConfig();
        this.tabIndex = 0;
        this.viewerModeChanged = new EventEmitter();
        this.canvasChanged = new EventEmitter();
        this.qChanged = new EventEmitter();
        this.manifestChanged = new EventEmitter();
        this.recognizedTextContentToggleChanged = new EventEmitter();
        this.subscriptions = new Subscription();
        this.isCanvasPressed = false;
        this.viewerLayout = null;
        this.viewerState = new ViewerState();
        this.isRecognizedTextContentToggled = false;
        this.showHeaderAndFooterState = 'hide';
        this.errorMessage = null;
        contentsDialogService.el = el;
        attributionDialogService.el = el;
        contentSearchDialogService.el = el;
        helpDialogService.el = el;
        resizeService.el = el;
    }
    get mimeHeaderBeforeRef() {
        return this.header.mimeHeaderBefore;
    }
    get mimeHeaderAfterRef() {
        return this.header.mimeHeaderAfter;
    }
    get mimeFooterBeforeRef() {
        return this.footer.mimeFooterBefore;
    }
    get mimeFooterAfterRef() {
        return this.footer.mimeFooterAfter;
    }
    ngOnInit() {
        this.styleService.initialize();
        this.modeService.initialMode = this.config.initViewerMode;
        this.altoService.onRecognizedTextContentToggle = this.config.initRecognizedTextContentToggle;
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.initialize();
                this.currentManifest = manifest;
                this.manifestChanged.next(manifest);
                this.viewerLayoutService.init(ManifestUtils.isManifestPaged(manifest));
                this.isRecognizedTextContentToggled =
                    this.altoService.onRecognizedTextContentToggle && manifest
                        ? ManifestUtils.hasRecognizedTextContent(manifest)
                        : false;
                this.changeDetectorRef.detectChanges();
                this.viewerService.setUpViewer(manifest, this.config);
                if (this.config.attributionDialogEnabled && manifest.attribution) {
                    this.attributionDialogService.open(this.config.attributionDialogHideTimeout);
                }
                if (this.q) {
                    this.iiifContentSearchService.search(manifest, this.q);
                }
            }
        }));
        this.subscriptions.add(this.viewerService.onOsdReadyChange.subscribe((state) => {
            // Don't reset current page when switching layout
            if (state &&
                this.canvasIndex &&
                !this.canvasService.currentCanvasGroupIndex) {
                this.viewerService.goToCanvas(this.canvasIndex, false);
            }
        }));
        this.subscriptions.add(this.iiifManifestService.errorMessage.subscribe((error) => {
            this.resetCurrentManifest();
            this.errorMessage = error;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.iiifContentSearchService.onQChange.subscribe((q) => {
            this.qChanged.emit(q);
        }));
        this.subscriptions.add(this.iiifContentSearchService.onChange.subscribe((sr) => {
            this.viewerService.highlight(sr);
        }));
        this.subscriptions.add(this.viewerService.isCanvasPressed.subscribe((value) => {
            this.isCanvasPressed = value;
            this.changeDetectorRef.detectChanges();
        }));
        this.subscriptions.add(this.modeService.onChange.subscribe((mode) => {
            if (mode.currentValue !== undefined) {
                this.toggleToolbarsState(mode.currentValue);
            }
            if (mode.previousValue === ViewerMode.DASHBOARD &&
                mode.currentValue === ViewerMode.PAGE) {
                this.viewerState.contentDialogState.isOpen = this.contentsDialogService.isOpen();
                this.viewerState.contentDialogState.selectedIndex = this.contentsDialogService.getSelectedIndex();
                this.viewerState.contentsSearchDialogState.isOpen = this.contentSearchDialogService.isOpen();
                this.viewerState.helpDialogState.isOpen = this.helpDialogService.isOpen();
                this.zone.run(() => {
                    this.contentsDialogService.close();
                    this.contentSearchDialogService.close();
                    this.helpDialogService.close();
                });
            }
            if (mode.currentValue === ViewerMode.DASHBOARD) {
                this.zone.run(() => {
                    if (this.viewerState.contentDialogState.isOpen) {
                        this.contentsDialogService.open(this.viewerState.contentDialogState.selectedIndex);
                    }
                    if (this.viewerState.contentsSearchDialogState.isOpen) {
                        this.contentSearchDialogService.open();
                    }
                    if (this.viewerState.helpDialogState.isOpen) {
                        this.helpDialogService.open();
                    }
                });
            }
            this.viewerModeChanged.emit(mode.currentValue);
        }));
        this.subscriptions.add(this.canvasService.onCanvasGroupIndexChange.subscribe((canvasGroupIndex) => {
            const canvasIndex = this.canvasService.findCanvasByCanvasIndex(canvasGroupIndex);
            if (canvasIndex !== -1) {
                this.canvasChanged.emit(canvasIndex);
            }
        }));
        this.subscriptions.add(this.resizeService.onResize
            .pipe(throttle((val) => interval(ViewerOptions.transitions.OSDAnimationTime)))
            .subscribe(() => {
            setTimeout(() => {
                this.viewerService.home();
            }, ViewerOptions.transitions.OSDAnimationTime);
        }));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentToggleChange$.subscribe((isRecognizedTextContentToggled) => {
            this.isRecognizedTextContentToggled = isRecognizedTextContentToggled;
            this.recognizedTextContentToggleChanged.emit(isRecognizedTextContentToggled);
        }));
        this.loadManifest();
    }
    ngOnChanges(changes) {
        let manifestUriIsChanged = false;
        let qIsChanged = false;
        let canvasIndexChanged = false;
        if (changes['q']) {
            const qChanges = changes['q'];
            if (!qChanges.isFirstChange() &&
                qChanges.currentValue !== qChanges.firstChange) {
                this.q = qChanges.currentValue;
                qIsChanged = true;
            }
        }
        if (changes['canvasIndex']) {
            const canvasIndexChanges = changes['canvasIndex'];
            if (!canvasIndexChanges.isFirstChange() &&
                canvasIndexChanges.currentValue !== canvasIndexChanges.firstChange) {
                this.canvasIndex = canvasIndexChanges.currentValue;
                canvasIndexChanged = true;
            }
        }
        if (changes['manifestUri']) {
            const manifestUriChanges = changes['manifestUri'];
            if (!manifestUriChanges.isFirstChange()) {
                this.cleanup();
            }
            if (!manifestUriChanges.isFirstChange() &&
                manifestUriChanges.currentValue !== manifestUriChanges.previousValue) {
                this.modeService.mode = this.config.initViewerMode;
                this.manifestUri = manifestUriChanges.currentValue;
                manifestUriIsChanged = true;
            }
        }
        if (manifestUriIsChanged) {
            this.loadManifest();
        }
        else {
            if (qIsChanged && this.currentManifest) {
                this.iiifContentSearchService.search(this.currentManifest, this.q);
            }
            if (canvasIndexChanged) {
                this.viewerService.goToCanvas(this.canvasIndex, true);
            }
        }
    }
    handleKeys(event) {
        this.accessKeysHandlerService.handleKeyEvents(event);
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.config.isDropEnabled) {
            const url = event.dataTransfer.getData('URL');
            const params = new URL(url).searchParams;
            const manifestUri = params.get('manifest');
            const startCanvasId = params.get('canvas');
            if (manifestUri) {
                this.manifestUri = manifestUri.startsWith('//')
                    ? `${location.protocol}${manifestUri}`
                    : manifestUri;
                this.cleanup();
                this.loadManifest();
                if (startCanvasId) {
                    this.manifestChanged.pipe(take(1)).subscribe((manifest) => {
                        var _a, _b;
                        const canvasIndex = manifest.sequences
                            ? (_b = (_a = manifest.sequences[0]) === null || _a === void 0 ? void 0 : _a.canvases) === null || _b === void 0 ? void 0 : _b.findIndex((c) => c.id === startCanvasId)
                            : -1;
                        if (canvasIndex && canvasIndex !== -1) {
                            setTimeout(() => {
                                this.viewerService.goToCanvas(canvasIndex, true);
                            }, 0);
                        }
                    });
                }
            }
        }
        else {
            this.snackBar.open(this.intl.dropDisabled, undefined, {
                duration: 3000,
            });
        }
    }
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.cleanup();
        this.iiifManifestService.destroy();
        this.iiifContentSearchService.destroy();
        this.styleService.destroy();
    }
    toggleToolbarsState(mode) {
        if (this.header && this.footer) {
            switch (mode) {
                case ViewerMode.DASHBOARD:
                    this.showHeaderAndFooterState = this.header.state = this.footer.state =
                        'show';
                    if (this.config.navigationControlEnabled && this.osdToolbar) {
                        this.osdToolbar.state = 'hide';
                    }
                    break;
                case ViewerMode.PAGE:
                    this.showHeaderAndFooterState = this.header.state = this.footer.state =
                        'hide';
                    if (this.config.navigationControlEnabled && this.osdToolbar) {
                        this.osdToolbar.state = 'show';
                    }
                    break;
            }
            this.changeDetectorRef.detectChanges();
        }
    }
    ngAfterViewChecked() {
        this.resizeService.markForCheck();
    }
    loadManifest() {
        this.iiifManifestService.load(this.manifestUri).pipe(take(1)).subscribe();
    }
    initialize() {
        this.accessKeysHandlerService.initialize();
        this.attributionDialogService.initialize();
        this.contentsDialogService.initialize();
        this.contentSearchDialogService.initialize();
        this.helpDialogService.initialize();
        this.viewerService.initialize();
    }
    cleanup() {
        this.viewerState = new ViewerState();
        this.accessKeysHandlerService.destroy();
        this.attributionDialogService.destroy();
        this.contentsDialogService.destroy();
        this.contentSearchDialogService.destroy();
        this.helpDialogService.destroy();
        this.viewerService.destroy();
        this.resetErrorMessage();
    }
    resetCurrentManifest() {
        this.currentManifest = null;
    }
    resetErrorMessage() {
        this.errorMessage = null;
    }
    setClasses() {
        return {
            'mode-page': this.modeService.mode === ViewerMode.PAGE,
            'mode-page-zoomed': this.modeService.mode === ViewerMode.PAGE_ZOOMED,
            'mode-dashboard': this.modeService.mode === ViewerMode.DASHBOARD,
            'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
            'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
            'canvas-pressed': this.isCanvasPressed,
        };
    }
}
ViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mime-viewer',
                template: "<div\n  id=\"ngx-mime-mimeViewer\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\">\n    <mat-drawer\n      mode=\"side\"\n      position=\"end\"\n      [opened]=\"isRecognizedTextContentToggled\"\n      [ngClass]=\"{'open': showHeaderAndFooterState === 'show'}\"\n      ><mime-recognized-text-content\n        *ngIf=\"isRecognizedTextContentToggled\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content><div id=\"openseadragon\"></div></mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}:host::ng-deep.openseadragon-container{flex-grow:1}:host::ng-deep.openseadragon-canvas:focus{outline:none}.viewer-drawer-container{width:100%;height:100%}mat-drawer{width:25%}@media only screen and (max-width:599px){mat-drawer{width:33%}}#openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}::ng-deep .viewer-container.mode-page-zoomed .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep.tile:hover{cursor:grabbing;cursor:-webkit-grabbing}::ng-deep .viewer-container .tile{cursor:pointer;fill-opacity:0}::ng-deep .viewer-container.mode-dashboard.layout-one-page .tile,::ng-deep .viewer-container.mode-dashboard.layout-two-page .page-group .tile{stroke:rgba(0,0,0,.15);stroke-width:8;transition:stroke .25s ease}::ng-deep .viewer-container.mode-dashboard.layout-one-page .tile:hover,::ng-deep .viewer-container.mode-dashboard.layout-two-page .page-group:hover .tile{stroke:rgba(0,0,0,.45)}::ng-deep .viewer-container .hit{fill:rgba(255,255,0,.6)}::ng-deep .viewer-container .selected{fill:rgba(255,225,0,.6)}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0;width:100%}.navbar-footer{bottom:0}::ng-deep .cdk-overlay-container{z-index:2147483647}.error-container{width:100%;height:100%}[hidden]{display:none}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width:599px){.open{height:calc(100% - 112px)!important;top:56px}}"]
            },] }
];
ViewerComponent.ctorParameters = () => [
    { type: MatSnackBar },
    { type: MimeViewerIntl },
    { type: ElementRef },
    { type: IiifManifestService },
    { type: ContentsDialogService },
    { type: AttributionDialogService },
    { type: ContentSearchDialogService },
    { type: HelpDialogService },
    { type: ViewerService },
    { type: MimeResizeService },
    { type: ChangeDetectorRef },
    { type: ModeService },
    { type: IiifContentSearchService },
    { type: AccessKeysService },
    { type: CanvasService },
    { type: ViewerLayoutService },
    { type: StyleService },
    { type: AltoService },
    { type: NgZone }
];
ViewerComponent.propDecorators = {
    manifestUri: [{ type: Input }],
    q: [{ type: Input }],
    canvasIndex: [{ type: Input }],
    config: [{ type: Input }],
    tabIndex: [{ type: Input }],
    viewerModeChanged: [{ type: Output }],
    canvasChanged: [{ type: Output }],
    qChanged: [{ type: Output }],
    manifestChanged: [{ type: Output }],
    recognizedTextContentToggleChanged: [{ type: Output }],
    header: [{ type: ViewChild, args: ['mimeHeader', { static: true },] }],
    footer: [{ type: ViewChild, args: ['mimeFooter', { static: true },] }],
    osdToolbar: [{ type: ViewChild, args: ['mimeOsdToolbar',] }],
    handleKeys: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBR04sU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFP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LFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQU1uQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRocm90dGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRzRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2NvbnRlbnRzLWRpYWxvZy9jb250ZW50cy1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWNjZXNzLWtleXMtaGFuZGxlci1zZXJ2aWNlL2FjY2Vzcy1rZXlzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC11dGlscyc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2NvcmUvaW50bC92aWV3ZXItaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbWltZS1yZXNpemUtc2VydmljZS9taW1lLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9jb3JlL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBNb2RlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IE1vZGVDaGFuZ2VzIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvbW9kZUNoYW5nZXMnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJNb2RlIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLW1vZGUnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFZpZXdlclN0YXRlIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyU3RhdGUnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IE9zZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXItaGVhZGVyL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS12aWV3ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlld2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgcHVibGljIG1hbmlmZXN0VXJpITogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgcSE6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGNhbnZhc0luZGV4ID0gMDtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZyA9IG5ldyBNaW1lVmlld2VyQ29uZmlnKCk7XG4gIEBJbnB1dCgpIHB1YmxpYyB0YWJJbmRleCA9IDA7XG4gIEBPdXRwdXQoKSB2aWV3ZXJNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFZpZXdlck1vZGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2FudmFzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBxQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtYW5pZmVzdENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNYW5pZmVzdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICByZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIGlzQ2FudmFzUHJlc3NlZCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRNYW5pZmVzdCE6IE1hbmlmZXN0IHwgbnVsbDtcbiAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHZpZXdlclN0YXRlID0gbmV3IFZpZXdlclN0YXRlKCk7XG5cbiAgaXNSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVkID0gZmFsc2U7XG4gIHNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9ICdoaWRlJztcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gVmlld2NoaWxkc1xuICBAVmlld0NoaWxkKCdtaW1lSGVhZGVyJywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSBoZWFkZXIhOiBWaWV3ZXJIZWFkZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGZvb3RlciE6IFZpZXdlckZvb3RlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWltZU9zZFRvb2xiYXInKVxuICBwcml2YXRlIG9zZFRvb2xiYXIhOiBPc2RUb29sYmFyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudHNEaWFsb2dTZXJ2aWNlOiBDb250ZW50c0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2U6IEF0dHJpYnV0aW9uRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlOiBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGhlbHBEaWFsb2dTZXJ2aWNlOiBIZWxwRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG1vZGVTZXJ2aWNlOiBNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlOiBBY2Nlc3NLZXlzU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2UsXG4gICAgcHVibGljIHpvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb250ZW50c0RpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGhlbHBEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgcmVzaXplU2VydmljZS5lbCA9IGVsO1xuICB9XG5cbiAgZ2V0IG1pbWVIZWFkZXJCZWZvcmVSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZGVyLm1pbWVIZWFkZXJCZWZvcmU7XG4gIH1cblxuICBnZXQgbWltZUhlYWRlckFmdGVyUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmhlYWRlci5taW1lSGVhZGVyQWZ0ZXI7XG4gIH1cblxuICBnZXQgbWltZUZvb3RlckJlZm9yZVJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5mb290ZXIubWltZUZvb3RlckJlZm9yZTtcbiAgfVxuXG4gIGdldCBtaW1lRm9vdGVyQWZ0ZXJSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyLm1pbWVGb290ZXJBZnRlcjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3R5bGVTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLm1vZGVTZXJ2aWNlLmluaXRpYWxNb2RlID0gdGhpcy5jb25maWcuaW5pdFZpZXdlck1vZGU7XG4gICAgdGhpcy5hbHRvU2VydmljZS5vblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSA9IHRoaXMuY29uZmlnLmluaXRSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGU7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgICAgICB0aGlzLm1hbmlmZXN0Q2hhbmdlZC5uZXh0KG1hbmlmZXN0KTtcbiAgICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5pbml0KFxuICAgICAgICAgICAgICBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZChtYW5pZmVzdClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmlzUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlZCA9XG4gICAgICAgICAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25SZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGUgJiYgbWFuaWZlc3RcbiAgICAgICAgICAgICAgICA/IE1hbmlmZXN0VXRpbHMuaGFzUmVjb2duaXplZFRleHRDb250ZW50KG1hbmlmZXN0KVxuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5zZXRVcFZpZXdlcihtYW5pZmVzdCwgdGhpcy5jb25maWcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZCAmJiBtYW5pZmVzdC5hdHRyaWJ1dGlvbikge1xuICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5vcGVuKFxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucSkge1xuICAgICAgICAgICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWFyY2gobWFuaWZlc3QsIHRoaXMucSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uub25Pc2RSZWFkeUNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIC8vIERvbid0IHJlc2V0IGN1cnJlbnQgcGFnZSB3aGVuIHN3aXRjaGluZyBsYXlvdXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXRlICYmXG4gICAgICAgICAgdGhpcy5jYW52YXNJbmRleCAmJlxuICAgICAgICAgICF0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXModGhpcy5jYW52YXNJbmRleCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmVycm9yTWVzc2FnZS5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcjogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzZXRDdXJyZW50TWFuaWZlc3QoKTtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblFDaGFuZ2Uuc3Vic2NyaWJlKChxOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5xQ2hhbmdlZC5lbWl0KHEpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3I6IFNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaGlnaGxpZ2h0KHNyKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaXNDYW52YXNQcmVzc2VkLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKG1vZGU6IE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVUb29sYmFyc1N0YXRlKG1vZGUuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kZS5wcmV2aW91c1ZhbHVlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCAmJlxuICAgICAgICAgIG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0VcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuaXNPcGVuID0gdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuc2VsZWN0ZWRJbmRleCA9IHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnRzU2VhcmNoRGlhbG9nU3RhdGUuaXNPcGVuID0gdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmhlbHBEaWFsb2dTdGF0ZS5pc09wZW4gPSB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuc2VsZWN0ZWRJbmRleFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuY29udGVudHNTZWFyY2hEaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5oZWxwRGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlld2VyTW9kZUNoYW5nZWQuZW1pdChtb2RlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjYW52YXNJbmRleCA9IHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzQnlDYW52YXNJbmRleChcbiAgICAgICAgICAgIGNhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChjYW52YXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ2hhbmdlZC5lbWl0KGNhbnZhc0luZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0aHJvdHRsZSgodmFsKSA9PlxuICAgICAgICAgICAgaW50ZXJ2YWwoVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5ob21lKCk7XG4gICAgICAgICAgfSwgVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICh2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLm9uUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlQ2hhbmdlJC5zdWJzY3JpYmUoXG4gICAgICAgIChpc1JlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICB0aGlzLmlzUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlZCA9IGlzUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlZDtcbiAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZUNoYW5nZWQuZW1pdChcbiAgICAgICAgICAgIGlzUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlZFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5sb2FkTWFuaWZlc3QoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgbWFuaWZlc3RVcmlJc0NoYW5nZWQgPSBmYWxzZTtcbiAgICBsZXQgcUlzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIGxldCBjYW52YXNJbmRleENoYW5nZWQgPSBmYWxzZTtcbiAgICBpZiAoY2hhbmdlc1sncSddKSB7XG4gICAgICBjb25zdCBxQ2hhbmdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1sncSddO1xuICAgICAgaWYgKFxuICAgICAgICAhcUNoYW5nZXMuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAgIHFDaGFuZ2VzLmN1cnJlbnRWYWx1ZSAhPT0gcUNoYW5nZXMuZmlyc3RDaGFuZ2VcbiAgICAgICkge1xuICAgICAgICB0aGlzLnEgPSBxQ2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgICAgIHFJc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snY2FudmFzSW5kZXgnXSkge1xuICAgICAgY29uc3QgY2FudmFzSW5kZXhDaGFuZ2VzOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzWydjYW52YXNJbmRleCddO1xuICAgICAgaWYgKFxuICAgICAgICAhY2FudmFzSW5kZXhDaGFuZ2VzLmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgICBjYW52YXNJbmRleENoYW5nZXMuY3VycmVudFZhbHVlICE9PSBjYW52YXNJbmRleENoYW5nZXMuZmlyc3RDaGFuZ2VcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNhbnZhc0luZGV4ID0gY2FudmFzSW5kZXhDaGFuZ2VzLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgY2FudmFzSW5kZXhDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21hbmlmZXN0VXJpJ10pIHtcbiAgICAgIGNvbnN0IG1hbmlmZXN0VXJpQ2hhbmdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1snbWFuaWZlc3RVcmknXTtcbiAgICAgIGlmICghbWFuaWZlc3RVcmlDaGFuZ2VzLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgIW1hbmlmZXN0VXJpQ2hhbmdlcy5pc0ZpcnN0Q2hhbmdlKCkgJiZcbiAgICAgICAgbWFuaWZlc3RVcmlDaGFuZ2VzLmN1cnJlbnRWYWx1ZSAhPT0gbWFuaWZlc3RVcmlDaGFuZ2VzLnByZXZpb3VzVmFsdWVcbiAgICAgICkge1xuICAgICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSB0aGlzLmNvbmZpZy5pbml0Vmlld2VyTW9kZTtcbiAgICAgICAgdGhpcy5tYW5pZmVzdFVyaSA9IG1hbmlmZXN0VXJpQ2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgICAgIG1hbmlmZXN0VXJpSXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWFuaWZlc3RVcmlJc0NoYW5nZWQpIHtcbiAgICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChxSXNDaGFuZ2VkICYmIHRoaXMuY3VycmVudE1hbmlmZXN0KSB7XG4gICAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLmN1cnJlbnRNYW5pZmVzdCwgdGhpcy5xKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYW52YXNJbmRleENoYW5nZWQpIHtcbiAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXModGhpcy5jYW52YXNJbmRleCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaGFuZGxlS2V5RXZlbnRzKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Ecm9wKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5pc0Ryb3BFbmFibGVkKSB7XG4gICAgICBjb25zdCB1cmwgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnVVJMJyk7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMKHVybCkuc2VhcmNoUGFyYW1zO1xuICAgICAgY29uc3QgbWFuaWZlc3RVcmkgPSBwYXJhbXMuZ2V0KCdtYW5pZmVzdCcpO1xuICAgICAgY29uc3Qgc3RhcnRDYW52YXNJZCA9IHBhcmFtcy5nZXQoJ2NhbnZhcycpO1xuICAgICAgaWYgKG1hbmlmZXN0VXJpKSB7XG4gICAgICAgIHRoaXMubWFuaWZlc3RVcmkgPSBtYW5pZmVzdFVyaS5zdGFydHNXaXRoKCcvLycpXG4gICAgICAgICAgPyBgJHtsb2NhdGlvbi5wcm90b2NvbH0ke21hbmlmZXN0VXJpfWBcbiAgICAgICAgICA6IG1hbmlmZXN0VXJpO1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgdGhpcy5sb2FkTWFuaWZlc3QoKTtcbiAgICAgICAgaWYgKHN0YXJ0Q2FudmFzSWQpIHtcbiAgICAgICAgICB0aGlzLm1hbmlmZXN0Q2hhbmdlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgobWFuaWZlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc0luZGV4ID0gbWFuaWZlc3Quc2VxdWVuY2VzXG4gICAgICAgICAgICAgID8gbWFuaWZlc3Quc2VxdWVuY2VzWzBdPy5jYW52YXNlcz8uZmluZEluZGV4KFxuICAgICAgICAgICAgICAgICAgKGMpID0+IGMuaWQgPT09IHN0YXJ0Q2FudmFzSWRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogLTE7XG4gICAgICAgICAgICBpZiAoY2FudmFzSW5kZXggJiYgY2FudmFzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKGNhbnZhc0luZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbmFja0Jhci5vcGVuKHRoaXMuaW50bC5kcm9wRGlzYWJsZWQsIHVuZGVmaW5lZCwge1xuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0eWxlU2VydmljZS5kZXN0cm95KCk7XG4gIH1cblxuICB0b2dnbGVUb29sYmFyc1N0YXRlKG1vZGU6IFZpZXdlck1vZGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgdGhpcy5mb290ZXIpIHtcbiAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICBjYXNlIFZpZXdlck1vZGUuREFTSEJPQVJEOlxuICAgICAgICAgIHRoaXMuc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID0gdGhpcy5oZWFkZXIuc3RhdGUgPSB0aGlzLmZvb3Rlci5zdGF0ZSA9XG4gICAgICAgICAgICAnc2hvdyc7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCAmJiB0aGlzLm9zZFRvb2xiYXIpIHtcbiAgICAgICAgICAgIHRoaXMub3NkVG9vbGJhci5zdGF0ZSA9ICdoaWRlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld2VyTW9kZS5QQUdFOlxuICAgICAgICAgIHRoaXMuc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID0gdGhpcy5oZWFkZXIuc3RhdGUgPSB0aGlzLmZvb3Rlci5zdGF0ZSA9XG4gICAgICAgICAgICAnaGlkZSc7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCAmJiB0aGlzLm9zZFRvb2xiYXIpIHtcbiAgICAgICAgICAgIHRoaXMub3NkVG9vbGJhci5zdGF0ZSA9ICdzaG93JztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5yZXNpemVTZXJ2aWNlLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkTWFuaWZlc3QoKTogdm9pZCB7XG4gICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmxvYWQodGhpcy5tYW5pZmVzdFVyaSkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbnVwKCkge1xuICAgIHRoaXMudmlld2VyU3RhdGUgPSBuZXcgVmlld2VyU3RhdGUoKTtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuY29udGVudHNEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDdXJyZW50TWFuaWZlc3QoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50TWFuaWZlc3QgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEVycm9yTWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gIH1cblxuICBzZXRDbGFzc2VzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbW9kZS1wYWdlJzogdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UsXG4gICAgICAnbW9kZS1wYWdlLXpvb21lZCc6IHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFX1pPT01FRCxcbiAgICAgICdtb2RlLWRhc2hib2FyZCc6IHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQsXG4gICAgICAnbGF5b3V0LW9uZS1wYWdlJzogdGhpcy52aWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSxcbiAgICAgICdsYXlvdXQtdHdvLXBhZ2UnOiB0aGlzLnZpZXdlckxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFLFxuICAgICAgJ2NhbnZhcy1wcmVzc2VkJzogdGhpcy5pc0NhbnZhc1ByZXNzZWQsXG4gICAgfTtcbiAgfVxufVxuIl19