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
            this.changeDetectorRef.markForCheck();
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
    goToHomeZoom() {
        this.viewerService.goToHomeZoom();
    }
    setClasses() {
        return {
            'mode-page': this.modeService.mode === ViewerMode.PAGE,
            'mode-page-zoomed': this.modeService.isPageZoomed(),
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
                template: "<div\n  id=\"ngx-mime-mimeViewer\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\">\n    <mat-drawer\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"isRecognizedTextContentToggled\"\n      [ngClass]=\"{'open': showHeaderAndFooterState === 'show'}\"\n      ><mime-recognized-text-content\n        *ngIf=\"isRecognizedTextContentToggled\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content><div id=\"openseadragon\"></div></mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}:host::ng-deep .openseadragon-container{flex-grow:1}:host::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-drawer-container{width:100%;height:100%}mat-drawer{width:25%}@media only screen and (max-width: 599px){mat-drawer{width:33%}}#openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}::ng-deep .viewer-container.mode-page-zoomed .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}::ng-deep .viewer-container .tile{cursor:pointer;fill-opacity:0}::ng-deep .viewer-container.mode-dashboard.layout-one-page .tile,::ng-deep .viewer-container.mode-dashboard.layout-two-page .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}::ng-deep .viewer-container.mode-dashboard.layout-one-page .tile:hover,::ng-deep .viewer-container.mode-dashboard.layout-two-page .page-group:hover .tile{stroke:#00000073}::ng-deep .viewer-container .hit{fill:#ff09}::ng-deep .viewer-container .selected{fill:#ffe10099}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0;width:100%}.navbar-footer{bottom:0}::ng-deep .cdk-overlay-container{z-index:2147483647}.error-container{width:100%;height:100%}[hidden]{display:none}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBR04sU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzVGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlEQUF5RCxDQUFDO0FBQzVGLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNwRixPQUFP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WUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFLaEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFxQy9CLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBTW5DLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGhyb3R0bGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudHNEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY29udGVudHMtZGlhbG9nL2NvbnRlbnRzLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY2Vzc0tleXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hY2Nlc3Mta2V5cy1oYW5kbGVyLXNlcnZpY2UvYWNjZXNzLWtleXMuc2VydmljZSc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXV0aWxzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsL3ZpZXdlci1pbnRsJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL2NvcmUvbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgTW9kZUNoYW5nZXMgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tb2RlQ2hhbmdlcyc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck1vZGUgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItbW9kZSc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2VyU3RhdGUgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXJTdGF0ZSc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuLy4uL2NvcmUvaWlpZi1jb250ZW50LXNlYXJjaC1zZXJ2aWNlL2lpaWYtY29udGVudC1zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHQgfSBmcm9tICcuLy4uL2NvcmUvbW9kZWxzL3NlYXJjaC1yZXN1bHQnO1xuaW1wb3J0IHsgT3NkVG9vbGJhckNvbXBvbmVudCB9IGZyb20gJy4vb3NkLXRvb2xiYXIvb3NkLXRvb2xiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyLWZvb3Rlci92aWV3ZXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwdWJsaWMgbWFuaWZlc3RVcmkhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBxITogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgY2FudmFzSW5kZXggPSAwO1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnID0gbmV3IE1pbWVWaWV3ZXJDb25maWcoKTtcbiAgQElucHV0KCkgcHVibGljIHRhYkluZGV4ID0gMDtcbiAgQE91dHB1dCgpIHZpZXdlck1vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Vmlld2VyTW9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjYW52YXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHFDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1hbmlmZXN0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1hbmlmZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgaXNDYW52YXNQcmVzc2VkID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudE1hbmlmZXN0ITogTWFuaWZlc3QgfCBudWxsO1xuICBwcml2YXRlIHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmlld2VyU3RhdGUgPSBuZXcgVmlld2VyU3RhdGUoKTtcblxuICBpc1JlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZWQgPSBmYWxzZTtcbiAgc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID0gJ2hpZGUnO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvLyBWaWV3Y2hpbGRzXG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGhlYWRlciE6IFZpZXdlckhlYWRlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlcicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgZm9vdGVyITogVmlld2VyRm9vdGVyQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdtaW1lT3NkVG9vbGJhcicpXG4gIHByaXZhdGUgb3NkVG9vbGJhciE6IE9zZFRvb2xiYXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50c0RpYWxvZ1NlcnZpY2U6IENvbnRlbnRzRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGF0dHJpYnV0aW9uRGlhbG9nU2VydmljZTogQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscERpYWxvZ1NlcnZpY2U6IEhlbHBEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IE1pbWVSZXNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2U6IEFjY2Vzc0tleXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlckxheW91dFNlcnZpY2U6IFZpZXdlckxheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwdWJsaWMgem9uZTogTmdab25lXG4gICkge1xuICAgIGNvbnRlbnRzRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgaGVscERpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICByZXNpemVTZXJ2aWNlLmVsID0gZWw7XG4gIH1cblxuICBnZXQgbWltZUhlYWRlckJlZm9yZVJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXIubWltZUhlYWRlckJlZm9yZTtcbiAgfVxuXG4gIGdldCBtaW1lSGVhZGVyQWZ0ZXJSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZGVyLm1pbWVIZWFkZXJBZnRlcjtcbiAgfVxuXG4gIGdldCBtaW1lRm9vdGVyQmVmb3JlUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmZvb3Rlci5taW1lRm9vdGVyQmVmb3JlO1xuICB9XG5cbiAgZ2V0IG1pbWVGb290ZXJBZnRlclJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5mb290ZXIubWltZUZvb3RlckFmdGVyO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdHlsZVNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMubW9kZVNlcnZpY2UuaW5pdGlhbE1vZGUgPSB0aGlzLmNvbmZpZy5pbml0Vmlld2VyTW9kZTtcbiAgICB0aGlzLmFsdG9TZXJ2aWNlLm9uUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlID0gdGhpcy5jb25maWcuaW5pdFJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobWFuaWZlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICAgIHRoaXMubWFuaWZlc3RDaGFuZ2VkLm5leHQobWFuaWZlc3QpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmluaXQoXG4gICAgICAgICAgICAgIE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKG1hbmlmZXN0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuaXNSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVkID1cbiAgICAgICAgICAgICAgdGhpcy5hbHRvU2VydmljZS5vblJlY29nbml6ZWRUZXh0Q29udGVudFRvZ2dsZSAmJiBtYW5pZmVzdFxuICAgICAgICAgICAgICAgID8gTWFuaWZlc3RVdGlscy5oYXNSZWNvZ25pemVkVGV4dENvbnRlbnQobWFuaWZlc3QpXG4gICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnNldFVwVmlld2VyKG1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkICYmIG1hbmlmZXN0LmF0dHJpYnV0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5xKSB7XG4gICAgICAgICAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaChtYW5pZmVzdCwgdGhpcy5xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5vbk9zZFJlYWR5Q2hhbmdlLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gc3dpdGNoaW5nIGxheW91dFxuICAgICAgICBpZiAoXG4gICAgICAgICAgc3RhdGUgJiZcbiAgICAgICAgICB0aGlzLmNhbnZhc0luZGV4ICYmXG4gICAgICAgICAgIXRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyh0aGlzLmNhbnZhc0luZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZXJyb3JNZXNzYWdlLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldEN1cnJlbnRNYW5pZmVzdCgpO1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uUUNoYW5nZS5zdWJzY3JpYmUoKHE6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnFDaGFuZ2VkLmVtaXQocSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5oaWdobGlnaHQoc3IpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5pc0NhbnZhc1ByZXNzZWQuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgobW9kZTogTW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgaWYgKG1vZGUuY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVRvb2xiYXJzU3RhdGUobW9kZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb2RlLnByZXZpb3VzVmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEICYmXG4gICAgICAgICAgbW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5pc09wZW4gPSB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5zZWxlY3RlZEluZGV4ID0gdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2UuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudHNTZWFyY2hEaWFsb2dTdGF0ZS5pc09wZW4gPSB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuaGVscERpYWxvZ1N0YXRlLmlzT3BlbiA9IHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5jb250ZW50c0RpYWxvZ1NlcnZpY2Uub3BlbihcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5zZWxlY3RlZEluZGV4XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50c1NlYXJjaERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmhlbHBEaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52aWV3ZXJNb2RlQ2hhbmdlZC5lbWl0KG1vZGUuY3VycmVudFZhbHVlKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhbnZhc0luZGV4ID0gdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNCeUNhbnZhc0luZGV4KFxuICAgICAgICAgICAgY2FudmFzR3JvdXBJbmRleFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGNhbnZhc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDaGFuZ2VkLmVtaXQoY2FudmFzSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRocm90dGxlKCh2YWwpID0+XG4gICAgICAgICAgICBpbnRlcnZhbChWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhvbWUoKTtcbiAgICAgICAgICB9LCBWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXQgPSB2aWV3ZXJMYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25SZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVDaGFuZ2UkLnN1YnNjcmliZShcbiAgICAgICAgKGlzUmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuaXNSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVkID0gaXNSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVkO1xuICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50VG9nZ2xlQ2hhbmdlZC5lbWl0KFxuICAgICAgICAgICAgaXNSZWNvZ25pemVkVGV4dENvbnRlbnRUb2dnbGVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IG1hbmlmZXN0VXJpSXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgbGV0IHFJc0NoYW5nZWQgPSBmYWxzZTtcbiAgICBsZXQgY2FudmFzSW5kZXhDaGFuZ2VkID0gZmFsc2U7XG4gICAgaWYgKGNoYW5nZXNbJ3EnXSkge1xuICAgICAgY29uc3QgcUNoYW5nZXM6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbJ3EnXTtcbiAgICAgIGlmIChcbiAgICAgICAgIXFDaGFuZ2VzLmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgICBxQ2hhbmdlcy5jdXJyZW50VmFsdWUgIT09IHFDaGFuZ2VzLmZpcnN0Q2hhbmdlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5xID0gcUNoYW5nZXMuY3VycmVudFZhbHVlO1xuICAgICAgICBxSXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2NhbnZhc0luZGV4J10pIHtcbiAgICAgIGNvbnN0IGNhbnZhc0luZGV4Q2hhbmdlczogU2ltcGxlQ2hhbmdlID0gY2hhbmdlc1snY2FudmFzSW5kZXgnXTtcbiAgICAgIGlmIChcbiAgICAgICAgIWNhbnZhc0luZGV4Q2hhbmdlcy5pc0ZpcnN0Q2hhbmdlKCkgJiZcbiAgICAgICAgY2FudmFzSW5kZXhDaGFuZ2VzLmN1cnJlbnRWYWx1ZSAhPT0gY2FudmFzSW5kZXhDaGFuZ2VzLmZpcnN0Q2hhbmdlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jYW52YXNJbmRleCA9IGNhbnZhc0luZGV4Q2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgICAgIGNhbnZhc0luZGV4Q2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtYW5pZmVzdFVyaSddKSB7XG4gICAgICBjb25zdCBtYW5pZmVzdFVyaUNoYW5nZXM6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXNbJ21hbmlmZXN0VXJpJ107XG4gICAgICBpZiAoIW1hbmlmZXN0VXJpQ2hhbmdlcy5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFtYW5pZmVzdFVyaUNoYW5nZXMuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICAgIG1hbmlmZXN0VXJpQ2hhbmdlcy5jdXJyZW50VmFsdWUgIT09IG1hbmlmZXN0VXJpQ2hhbmdlcy5wcmV2aW91c1ZhbHVlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gdGhpcy5jb25maWcuaW5pdFZpZXdlck1vZGU7XG4gICAgICAgIHRoaXMubWFuaWZlc3RVcmkgPSBtYW5pZmVzdFVyaUNoYW5nZXMuY3VycmVudFZhbHVlO1xuICAgICAgICBtYW5pZmVzdFVyaUlzQ2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1hbmlmZXN0VXJpSXNDaGFuZ2VkKSB7XG4gICAgICB0aGlzLmxvYWRNYW5pZmVzdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocUlzQ2hhbmdlZCAmJiB0aGlzLmN1cnJlbnRNYW5pZmVzdCkge1xuICAgICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWFyY2godGhpcy5jdXJyZW50TWFuaWZlc3QsIHRoaXMucSk7XG4gICAgICB9XG4gICAgICBpZiAoY2FudmFzSW5kZXhDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKHRoaXMuY2FudmFzSW5kZXgsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlS2V5cyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmhhbmRsZUtleUV2ZW50cyhldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5jb25maWcuaXNEcm9wRW5hYmxlZCkge1xuICAgICAgY29uc3QgdXJsID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ1VSTCcpO1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTCh1cmwpLnNlYXJjaFBhcmFtcztcbiAgICAgIGNvbnN0IG1hbmlmZXN0VXJpID0gcGFyYW1zLmdldCgnbWFuaWZlc3QnKTtcbiAgICAgIGNvbnN0IHN0YXJ0Q2FudmFzSWQgPSBwYXJhbXMuZ2V0KCdjYW52YXMnKTtcbiAgICAgIGlmIChtYW5pZmVzdFVyaSkge1xuICAgICAgICB0aGlzLm1hbmlmZXN0VXJpID0gbWFuaWZlc3RVcmkuc3RhcnRzV2l0aCgnLy8nKVxuICAgICAgICAgID8gYCR7bG9jYXRpb24ucHJvdG9jb2x9JHttYW5pZmVzdFVyaX1gXG4gICAgICAgICAgOiBtYW5pZmVzdFVyaTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gICAgICAgIGlmIChzdGFydENhbnZhc0lkKSB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdENoYW5nZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKG1hbmlmZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXNJbmRleCA9IG1hbmlmZXN0LnNlcXVlbmNlc1xuICAgICAgICAgICAgICA/IG1hbmlmZXN0LnNlcXVlbmNlc1swXT8uY2FudmFzZXM/LmZpbmRJbmRleChcbiAgICAgICAgICAgICAgICAgIChjKSA9PiBjLmlkID09PSBzdGFydENhbnZhc0lkXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IC0xO1xuICAgICAgICAgICAgaWYgKGNhbnZhc0luZGV4ICYmIGNhbnZhc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyhjYW52YXNJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc25hY2tCYXIub3Blbih0aGlzLmludGwuZHJvcERpc2FibGVkLCB1bmRlZmluZWQsIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRyYWdPdmVyKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHlsZVNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgdG9nZ2xlVG9vbGJhcnNTdGF0ZShtb2RlOiBWaWV3ZXJNb2RlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMuZm9vdGVyKSB7XG4gICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgY2FzZSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDpcbiAgICAgICAgICB0aGlzLnNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9IHRoaXMuaGVhZGVyLnN0YXRlID0gdGhpcy5mb290ZXIuc3RhdGUgPVxuICAgICAgICAgICAgJ3Nob3cnO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgJiYgdGhpcy5vc2RUb29sYmFyKSB7XG4gICAgICAgICAgICB0aGlzLm9zZFRvb2xiYXIuc3RhdGUgPSAnaGlkZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFZpZXdlck1vZGUuUEFHRTpcbiAgICAgICAgICB0aGlzLnNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9IHRoaXMuaGVhZGVyLnN0YXRlID0gdGhpcy5mb290ZXIuc3RhdGUgPVxuICAgICAgICAgICAgJ2hpZGUnO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgJiYgdGhpcy5vc2RUb29sYmFyKSB7XG4gICAgICAgICAgICB0aGlzLm9zZFRvb2xiYXIuc3RhdGUgPSAnc2hvdyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMucmVzaXplU2VydmljZS5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZE1hbmlmZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5sb2FkKHRoaXMubWFuaWZlc3RVcmkpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW51cCgpIHtcbiAgICB0aGlzLnZpZXdlclN0YXRlID0gbmV3IFZpZXdlclN0YXRlKCk7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbnRlbnRzRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnJlc2V0RXJyb3JNZXNzYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q3VycmVudE1hbmlmZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudE1hbmlmZXN0ID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRFcnJvck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICB9XG5cbiAgZ29Ub0hvbWVab29tKCk6IHZvaWQge1xuICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvSG9tZVpvb20oKTtcbiAgfVxuXG4gIHNldENsYXNzZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdtb2RlLXBhZ2UnOiB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSxcbiAgICAgICdtb2RlLXBhZ2Utem9vbWVkJzogdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSxcbiAgICAgICdtb2RlLWRhc2hib2FyZCc6IHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQsXG4gICAgICAnbGF5b3V0LW9uZS1wYWdlJzogdGhpcy52aWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSxcbiAgICAgICdsYXlvdXQtdHdvLXBhZ2UnOiB0aGlzLnZpZXdlckxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFLFxuICAgICAgJ2NhbnZhcy1wcmVzc2VkJzogdGhpcy5pc0NhbnZhc1ByZXNzZWQsXG4gICAgfTtcbiAgfVxufVxuIl19