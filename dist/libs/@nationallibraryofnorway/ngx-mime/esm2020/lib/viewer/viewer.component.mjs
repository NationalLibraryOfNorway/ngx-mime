import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { RecognizedTextMode, ViewerMode, } from '../core/models';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerState } from '../core/models/viewerState';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/snack-bar";
import * as i2 from "../core/intl";
import * as i3 from "../core/iiif-manifest-service/iiif-manifest-service";
import * as i4 from "../view-dialog/view-dialog.service";
import * as i5 from "../information-dialog/information-dialog.service";
import * as i6 from "../attribution-dialog/attribution-dialog.service";
import * as i7 from "../content-search-dialog/content-search-dialog.service";
import * as i8 from "../help-dialog/help-dialog.service";
import * as i9 from "../core/viewer-service/viewer.service";
import * as i10 from "../core/mime-resize-service/mime-resize.service";
import * as i11 from "../core/mode-service/mode.service";
import * as i12 from "./../core/iiif-content-search-service/iiif-content-search.service";
import * as i13 from "../core/access-keys-handler-service/access-keys.service";
import * as i14 from "../core/canvas-service/canvas-service";
import * as i15 from "../core/viewer-layout-service/viewer-layout-service";
import * as i16 from "../core/style-service/style.service";
import * as i17 from "../core/alto-service/alto.service";
import * as i18 from "@angular/cdk/platform";
import * as i19 from "@angular/common";
import * as i20 from "@angular/flex-layout/flex";
import * as i21 from "@angular/flex-layout/extended";
import * as i22 from "@angular/material/sidenav";
import * as i23 from "./viewer-header/viewer-header.component";
import * as i24 from "./viewer-footer/viewer-footer.component";
import * as i25 from "./osd-toolbar/osd-toolbar.component";
import * as i26 from "./viewer-spinner/viewer-spinner.component";
import * as i27 from "./recognized-text-content/recognized-text-content.component";
export class ViewerComponent {
    constructor(snackBar, intl, el, iiifManifestService, viewDialogService, informationDialogService, attributionDialogService, contentSearchDialogService, helpDialogService, viewerService, resizeService, changeDetectorRef, modeService, iiifContentSearchService, accessKeysHandlerService, canvasService, viewerLayoutService, styleService, altoService, zone, platform) {
        this.snackBar = snackBar;
        this.intl = intl;
        this.el = el;
        this.iiifManifestService = iiifManifestService;
        this.viewDialogService = viewDialogService;
        this.informationDialogService = informationDialogService;
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
        this.platform = platform;
        this.canvasIndex = 0;
        this.config = new MimeViewerConfig();
        this.tabIndex = 0;
        this.viewerModeChanged = new EventEmitter();
        this.canvasChanged = new EventEmitter();
        this.qChanged = new EventEmitter();
        this.manifestChanged = new EventEmitter();
        this.recognizedTextContentModeChanged = new EventEmitter();
        this.recognizedTextMode = RecognizedTextMode;
        this.subscriptions = new Subscription();
        this.isCanvasPressed = false;
        this.viewerLayout = null;
        this.viewerState = new ViewerState();
        this.recognizedTextContentMode = RecognizedTextMode.NONE;
        this.showHeaderAndFooterState = 'hide';
        this.errorMessage = null;
        informationDialogService.el = el;
        attributionDialogService.el = el;
        viewDialogService.el = el;
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
        this.subscriptions.add(this.iiifManifestService.currentManifest.subscribe((manifest) => {
            if (manifest) {
                this.initialize();
                this.currentManifest = manifest;
                this.manifestChanged.next(manifest);
                this.viewerLayoutService.init(ManifestUtils.isManifestPaged(manifest));
                this.recognizedTextContentMode =
                    this.altoService.recognizedTextContentMode;
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
                this.viewerState.viewDialogState.isOpen =
                    this.viewDialogService.isOpen();
                this.viewerState.contentDialogState.isOpen =
                    this.informationDialogService.isOpen();
                this.viewerState.contentDialogState.selectedIndex =
                    this.informationDialogService.getSelectedIndex();
                this.viewerState.contentsSearchDialogState.isOpen =
                    this.contentSearchDialogService.isOpen();
                this.viewerState.helpDialogState.isOpen =
                    this.helpDialogService.isOpen();
                this.zone.run(() => {
                    this.viewDialogService.close();
                    this.informationDialogService.close();
                    this.contentSearchDialogService.close();
                    this.helpDialogService.close();
                });
            }
            if (mode.currentValue === ViewerMode.DASHBOARD) {
                this.zone.run(() => {
                    if (this.viewerState.viewDialogState.isOpen) {
                        this.viewDialogService.open();
                    }
                    if (this.viewerState.contentDialogState.isOpen) {
                        this.informationDialogService.open(this.viewerState.contentDialogState.selectedIndex);
                    }
                    if (this.viewerState.contentsSearchDialogState.isOpen) {
                        this.contentSearchDialogService.open();
                    }
                    if (this.viewerState.helpDialogState.isOpen) {
                        this.helpDialogService.open();
                    }
                });
            }
            this.zone.run(() => {
                this.viewerModeChanged.emit(mode.currentValue);
            });
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
                this.changeDetectorRef.markForCheck();
            }, ViewerOptions.transitions.OSDAnimationTime);
        }));
        this.subscriptions.add(this.viewerLayoutService.onChange.subscribe((viewerLayout) => {
            this.viewerLayout = viewerLayout;
        }));
        this.subscriptions.add(this.altoService.onRecognizedTextContentModeChange$.subscribe((recognizedTextModeChanges) => {
            this.recognizedTextContentMode =
                recognizedTextModeChanges.currentValue;
            this.recognizedTextContentModeChanged.emit(this.recognizedTextContentMode);
            this.changeDetectorRef.markForCheck();
        }));
    }
    ngOnChanges(changes) {
        if (changes['config']) {
            this.iiifContentSearchService.setConfig(this.config);
            this.altoService.setConfig(this.config);
            this.modeService.setConfig(this.config);
            this.modeService.initialize();
        }
        if (changes['manifestUri']) {
            this.cleanup();
            this.modeService.mode = this.config.initViewerMode;
            this.manifestUri = changes['manifestUri'].currentValue;
            this.loadManifest();
        }
        if (changes['q']) {
            this.q = changes['q'].currentValue;
            if (this.currentManifest) {
                this.iiifContentSearchService.search(this.currentManifest, this.q);
            }
        }
        if (changes['canvasIndex']) {
            this.canvasIndex = changes['canvasIndex'].currentValue;
            if (this.currentManifest) {
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
                        const canvasIndex = manifest.sequences
                            ? manifest.sequences[0]?.canvases?.findIndex((c) => c.id === startCanvasId)
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
                    this.showHeaderAndFooterState =
                        this.header.state =
                            this.footer.state =
                                'show';
                    if (this.config.navigationControlEnabled && this.osdToolbar) {
                        this.osdToolbar.state = 'hide';
                    }
                    break;
                case ViewerMode.PAGE:
                    this.showHeaderAndFooterState =
                        this.header.state =
                            this.footer.state =
                                'hide';
                    if (this.config.navigationControlEnabled && this.osdToolbar) {
                        this.osdToolbar.state = 'show';
                    }
                    break;
            }
            this.changeDetectorRef.detectChanges();
        }
    }
    loadManifest() {
        this.iiifManifestService.load(this.manifestUri).pipe(take(1)).subscribe();
    }
    initialize() {
        this.accessKeysHandlerService.initialize();
        this.attributionDialogService.initialize();
        this.viewDialogService.initialize();
        this.informationDialogService.initialize();
        this.contentSearchDialogService.initialize();
        this.helpDialogService.initialize();
        this.viewerService.initialize();
        this.resizeService.initialize();
    }
    cleanup() {
        this.viewerState = new ViewerState();
        this.accessKeysHandlerService.destroy();
        this.attributionDialogService.destroy();
        this.viewDialogService.destroy();
        this.informationDialogService.destroy();
        this.contentSearchDialogService.destroy();
        this.helpDialogService.destroy();
        this.viewerService.destroy();
        this.resizeService.destroy();
        this.resetErrorMessage();
    }
    resetCurrentManifest() {
        this.currentManifest = null;
    }
    resetErrorMessage() {
        this.errorMessage = null;
    }
    hasMixBlendModeSupport() {
        return !(this.platform.FIREFOX || this.platform.SAFARI);
    }
    goToHomeZoom() {
        if (this.recognizedTextContentMode !== this.recognizedTextMode.ONLY) {
            this.viewerService.goToHomeZoom();
        }
    }
    setClasses() {
        return {
            'mode-page': this.modeService.mode === ViewerMode.PAGE,
            'mode-page-zoomed': this.modeService.isPageZoomed(),
            'mode-dashboard': this.modeService.mode === ViewerMode.DASHBOARD,
            'layout-one-page': this.viewerLayout === ViewerLayout.ONE_PAGE,
            'layout-two-page': this.viewerLayout === ViewerLayout.TWO_PAGE,
            'canvas-pressed': this.isCanvasPressed,
            'broken-mix-blend-mode': !this.hasMixBlendModeSupport(),
        };
    }
}
ViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerComponent, deps: [{ token: i1.MatSnackBar }, { token: i2.MimeViewerIntl }, { token: i0.ElementRef }, { token: i3.IiifManifestService }, { token: i4.ViewDialogService }, { token: i5.InformationDialogService }, { token: i6.AttributionDialogService }, { token: i7.ContentSearchDialogService }, { token: i8.HelpDialogService }, { token: i9.ViewerService }, { token: i10.MimeResizeService }, { token: i0.ChangeDetectorRef }, { token: i11.ModeService }, { token: i12.IiifContentSearchService }, { token: i13.AccessKeysService }, { token: i14.CanvasService }, { token: i15.ViewerLayoutService }, { token: i16.StyleService }, { token: i17.AltoService }, { token: i0.NgZone }, { token: i18.Platform }], target: i0.ɵɵFactoryTarget.Component });
ViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: ViewerComponent, selector: "mime-viewer", inputs: { manifestUri: "manifestUri", q: "q", canvasIndex: "canvasIndex", config: "config", tabIndex: "tabIndex" }, outputs: { viewerModeChanged: "viewerModeChanged", canvasChanged: "canvasChanged", qChanged: "qChanged", manifestChanged: "manifestChanged", recognizedTextContentModeChanged: "recognizedTextContentModeChanged" }, host: { listeners: { "keydown": "handleKeys($event)", "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, viewQueries: [{ propertyName: "header", first: true, predicate: ["mimeHeader"], descendants: true, static: true }, { propertyName: "footer", first: true, predicate: ["mimeFooter"], descendants: true, static: true }, { propertyName: "osdToolbar", first: true, predicate: ["mimeOsdToolbar"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  id=\"ngx-mime-mimeViewer\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-test-id=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div id=\"openseadragon\" #openseadragon></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}#openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"], dependencies: [{ kind: "directive", type: i19.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i19.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i20.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i20.DefaultLayoutAlignDirective, selector: "  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]", inputs: ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"] }, { kind: "directive", type: i21.DefaultClassDirective, selector: "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", inputs: ["ngClass", "ngClass.xs", "ngClass.sm", "ngClass.md", "ngClass.lg", "ngClass.xl", "ngClass.lt-sm", "ngClass.lt-md", "ngClass.lt-lg", "ngClass.lt-xl", "ngClass.gt-xs", "ngClass.gt-sm", "ngClass.gt-md", "ngClass.gt-lg"] }, { kind: "component", type: i22.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i22.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i22.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "component", type: i23.ViewerHeaderComponent, selector: "mime-viewer-header" }, { kind: "component", type: i24.ViewerFooterComponent, selector: "mime-viewer-footer" }, { kind: "component", type: i25.OsdToolbarComponent, selector: "mime-osd-toolbar" }, { kind: "component", type: i26.ViewerSpinnerComponent, selector: "mime-spinner" }, { kind: "component", type: i27.RecognizedTextContentComponent, selector: "mime-recognized-text-content" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"ngx-mime-mimeViewer\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-test-id=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div id=\"openseadragon\" #openseadragon></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}#openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }, { type: i2.MimeViewerIntl }, { type: i0.ElementRef }, { type: i3.IiifManifestService }, { type: i4.ViewDialogService }, { type: i5.InformationDialogService }, { type: i6.AttributionDialogService }, { type: i7.ContentSearchDialogService }, { type: i8.HelpDialogService }, { type: i9.ViewerService }, { type: i10.MimeResizeService }, { type: i0.ChangeDetectorRef }, { type: i11.ModeService }, { type: i12.IiifContentSearchService }, { type: i13.AccessKeysService }, { type: i14.CanvasService }, { type: i15.ViewerLayoutService }, { type: i16.StyleService }, { type: i17.AltoService }, { type: i0.NgZone }, { type: i18.Platform }]; }, propDecorators: { manifestUri: [{
                type: Input
            }], q: [{
                type: Input
            }], canvasIndex: [{
                type: Input
            }], config: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], viewerModeChanged: [{
                type: Output
            }], canvasChanged: [{
                type: Output
            }], qChanged: [{
                type: Output
            }], manifestChanged: [{
                type: Output
            }], recognizedTextContentModeChanged: [{
                type: Output
            }], header: [{
                type: ViewChild,
                args: ['mimeHeader', { static: true }]
            }], footer: [{
                type: ViewChild,
                args: ['mimeFooter', { static: true }]
            }], osdToolbar: [{
                type: ViewChild,
                args: ['mimeOsdToolbar']
            }], handleKeys: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }], onDragOver: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], onDragLeave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUtMLE1BQU0sRUFFTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVFoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFHbEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFOUQsT0FBTyxFQUVMLGtCQUFrQixFQUVsQixVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQnpELE1BQU0sT0FBTyxlQUFlO0lBaUMxQixZQUNTLFFBQXFCLEVBQ3JCLElBQW9CLEVBQ25CLEVBQWMsRUFDZCxtQkFBd0MsRUFDeEMsaUJBQW9DLEVBQ3BDLHdCQUFrRCxFQUNsRCx3QkFBa0QsRUFDbEQsMEJBQXNELEVBQ3RELGlCQUFvQyxFQUNwQyxhQUE0QixF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QUdOLHVCQUF1QixDQUFDLE1BQU07c3RCQUcvQixXQUFXO3NCQUExQixLQUFLO2dCQUNVLENBQUM7c0JBQWhCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSztnQkFDVSxNQUFNO3NCQUFyQixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ0ksaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUVQLGdDQUFnQztzQkFEL0IsTUFBTTtnQkFpQkMsTUFBTTtzQkFEYixTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBR2pDLE1BQU07c0JBRGIsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUdqQyxVQUFVO3NCQURqQixTQUFTO3VCQUFDLGdCQUFnQjtnQkE2UDNCLFVBQVU7c0JBRFQsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTTVCLE1BQU07c0JBRFosWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBc0N6QixVQUFVO3NCQURoQixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFPN0IsV0FBVztzQkFEakIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRocm90dGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2luZm9ybWF0aW9uLWRpYWxvZy9pbmZvcm1hdGlvbi1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBBY2Nlc3NLZXlzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWNjZXNzLWtleXMtaGFuZGxlci1zZXJ2aWNlL2FjY2Vzcy1rZXlzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWx0b1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2FsdG8tc2VydmljZS9hbHRvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvY2FudmFzLXNlcnZpY2UvY2FudmFzLXNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZk1hbmlmZXN0U2VydmljZSB9IGZyb20gJy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3Qtc2VydmljZSc7XG5pbXBvcnQgeyBNYW5pZmVzdFV0aWxzIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC11dGlscyc7XG5pbXBvcnQgeyBNaW1lVmlld2VySW50bCB9IGZyb20gJy4uL2NvcmUvaW50bCc7XG5pbXBvcnQgeyBNaW1lUmVzaXplU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbWltZS1yZXNpemUtc2VydmljZS9taW1lLXJlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJDb25maWcgfSBmcm9tICcuLi9jb3JlL21pbWUtdmlld2VyLWNvbmZpZyc7XG5pbXBvcnQgeyBNb2RlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbW9kZS1zZXJ2aWNlL21vZGUuc2VydmljZSc7XG5pbXBvcnQge1xuICBNb2RlQ2hhbmdlcyxcbiAgUmVjb2duaXplZFRleHRNb2RlLFxuICBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLFxuICBWaWV3ZXJNb2RlLFxufSBmcm9tICcuLi9jb3JlL21vZGVscyc7XG5pbXBvcnQgeyBNYW5pZmVzdCB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL21hbmlmZXN0JztcbmltcG9ydCB7IFZpZXdlckxheW91dCB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1sYXlvdXQnO1xuaW1wb3J0IHsgVmlld2VyT3B0aW9ucyB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL3ZpZXdlci1vcHRpb25zJztcbmltcG9ydCB7IFZpZXdlclN0YXRlIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyU3RhdGUnO1xuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zdHlsZS1zZXJ2aWNlL3N0eWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0U2VydmljZSB9IGZyb20gJy4uL2NvcmUvdmlld2VyLWxheW91dC1zZXJ2aWNlL3ZpZXdlci1sYXlvdXQtc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItc2VydmljZS92aWV3ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBIZWxwRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2hlbHAtZGlhbG9nL2hlbHAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4vLi4vY29yZS9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBPc2RUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXItZm9vdGVyL3ZpZXdlci1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyLWhlYWRlci92aWV3ZXItaGVhZGVyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21pbWUtdmlld2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ZpZXdlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYW5pZmVzdFVyaSE6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHEhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjYW52YXNJbmRleCA9IDA7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcgPSBuZXcgTWltZVZpZXdlckNvbmZpZygpO1xuICBASW5wdXQoKSBwdWJsaWMgdGFiSW5kZXggPSAwO1xuICBAT3V0cHV0KCkgdmlld2VyTW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxWaWV3ZXJNb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNhbnZhc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbWFuaWZlc3RDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TWFuaWZlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxSZWNvZ25pemVkVGV4dE1vZGU+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHJlY29nbml6ZWRUZXh0TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgaXNDYW52YXNQcmVzc2VkID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudE1hbmlmZXN0ITogTWFuaWZlc3QgfCBudWxsO1xuICBwcml2YXRlIHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmlld2VyU3RhdGUgPSBuZXcgVmlld2VyU3RhdGUoKTtcblxuICByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlOiBSZWNvZ25pemVkVGV4dE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcbiAgc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID0gJ2hpZGUnO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvLyBWaWV3Y2hpbGRzXG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGhlYWRlciE6IFZpZXdlckhlYWRlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlcicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgZm9vdGVyITogVmlld2VyRm9vdGVyQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdtaW1lT3NkVG9vbGJhcicpXG4gIHByaXZhdGUgb3NkVG9vbGJhciE6IE9zZFRvb2xiYXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3RGlhbG9nU2VydmljZTogVmlld0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2U6IEluZm9ybWF0aW9uRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGF0dHJpYnV0aW9uRGlhbG9nU2VydmljZTogQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscERpYWxvZ1NlcnZpY2U6IEhlbHBEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IE1pbWVSZXNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2U6IEFjY2Vzc0tleXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlckxheW91dFNlcnZpY2U6IFZpZXdlckxheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwdWJsaWMgem9uZTogTmdab25lLFxuICAgIHB1YmxpYyBwbGF0Zm9ybTogUGxhdGZvcm1cbiAgKSB7XG4gICAgaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgdmlld0RpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGhlbHBEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgcmVzaXplU2VydmljZS5lbCA9IGVsO1xuICB9XG5cbiAgZ2V0IG1pbWVIZWFkZXJCZWZvcmVSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZGVyLm1pbWVIZWFkZXJCZWZvcmU7XG4gIH1cblxuICBnZXQgbWltZUhlYWRlckFmdGVyUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmhlYWRlci5taW1lSGVhZGVyQWZ0ZXI7XG4gIH1cblxuICBnZXQgbWltZUZvb3RlckJlZm9yZVJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5mb290ZXIubWltZUZvb3RlckJlZm9yZTtcbiAgfVxuXG4gIGdldCBtaW1lRm9vdGVyQWZ0ZXJSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyLm1pbWVGb290ZXJBZnRlcjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3R5bGVTZXJ2aWNlLmluaXRpYWxpemUoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobWFuaWZlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICAgIHRoaXMubWFuaWZlc3RDaGFuZ2VkLm5leHQobWFuaWZlc3QpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmluaXQoXG4gICAgICAgICAgICAgIE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKG1hbmlmZXN0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9XG4gICAgICAgICAgICAgIHRoaXMuYWx0b1NlcnZpY2UucmVjb2duaXplZFRleHRDb250ZW50TW9kZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnNldFVwVmlld2VyKG1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkICYmIG1hbmlmZXN0LmF0dHJpYnV0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5xKSB7XG4gICAgICAgICAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaChtYW5pZmVzdCwgdGhpcy5xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5vbk9zZFJlYWR5Q2hhbmdlLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gc3dpdGNoaW5nIGxheW91dFxuICAgICAgICBpZiAoXG4gICAgICAgICAgc3RhdGUgJiZcbiAgICAgICAgICB0aGlzLmNhbnZhc0luZGV4ICYmXG4gICAgICAgICAgIXRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyh0aGlzLmNhbnZhc0luZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZXJyb3JNZXNzYWdlLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldEN1cnJlbnRNYW5pZmVzdCgpO1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uUUNoYW5nZS5zdWJzY3JpYmUoKHE6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnFDaGFuZ2VkLmVtaXQocSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5oaWdobGlnaHQoc3IpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5pc0NhbnZhc1ByZXNzZWQuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgobW9kZTogTW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgaWYgKG1vZGUuY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVRvb2xiYXJzU3RhdGUobW9kZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb2RlLnByZXZpb3VzVmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEICYmXG4gICAgICAgICAgbW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLnZpZXdEaWFsb2dTdGF0ZS5pc09wZW4gPVxuICAgICAgICAgICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5pc09wZW4gPVxuICAgICAgICAgICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuc2VsZWN0ZWRJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50c1NlYXJjaERpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuaGVscERpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS52aWV3RGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5vcGVuKFxuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLnNlbGVjdGVkSW5kZXhcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnRzU2VhcmNoRGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuaGVscERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdlck1vZGVDaGFuZ2VkLmVtaXQobW9kZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhbnZhc0luZGV4ID1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzQnlDYW52YXNJbmRleChjYW52YXNHcm91cEluZGV4KTtcbiAgICAgICAgICBpZiAoY2FudmFzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0NoYW5nZWQuZW1pdChjYW52YXNJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemVcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGhyb3R0bGUoKHZhbCkgPT5cbiAgICAgICAgICAgIGludGVydmFsKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaG9tZSgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9LCBWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXQgPSB2aWV3ZXJMYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25SZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlJC5zdWJzY3JpYmUoXG4gICAgICAgIChyZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzOiBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID1cbiAgICAgICAgICAgIHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMuY3VycmVudFZhbHVlO1xuICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZWQuZW1pdChcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2NvbmZpZyddKSB7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5hbHRvU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ21hbmlmZXN0VXJpJ10pIHtcbiAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gdGhpcy5jb25maWcuaW5pdFZpZXdlck1vZGU7XG4gICAgICB0aGlzLm1hbmlmZXN0VXJpID0gY2hhbmdlc1snbWFuaWZlc3RVcmknXS5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmxvYWRNYW5pZmVzdCgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydxJ10pIHtcbiAgICAgIHRoaXMucSA9IGNoYW5nZXNbJ3EnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TWFuaWZlc3QpIHtcbiAgICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRoaXMuY3VycmVudE1hbmlmZXN0LCB0aGlzLnEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydjYW52YXNJbmRleCddKSB7XG4gICAgICB0aGlzLmNhbnZhc0luZGV4ID0gY2hhbmdlc1snY2FudmFzSW5kZXgnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TWFuaWZlc3QpIHtcbiAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXModGhpcy5jYW52YXNJbmRleCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUtleXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5oYW5kbGVLZXlFdmVudHMoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRyb3AoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmlzRHJvcEVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IHVybCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdVUkwnKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkwodXJsKS5zZWFyY2hQYXJhbXM7XG4gICAgICBjb25zdCBtYW5pZmVzdFVyaSA9IHBhcmFtcy5nZXQoJ21hbmlmZXN0Jyk7XG4gICAgICBjb25zdCBzdGFydENhbnZhc0lkID0gcGFyYW1zLmdldCgnY2FudmFzJyk7XG4gICAgICBpZiAobWFuaWZlc3RVcmkpIHtcbiAgICAgICAgdGhpcy5tYW5pZmVzdFVyaSA9IG1hbmlmZXN0VXJpLnN0YXJ0c1dpdGgoJy8vJylcbiAgICAgICAgICA/IGAke2xvY2F0aW9uLnByb3RvY29sfSR7bWFuaWZlc3RVcml9YFxuICAgICAgICAgIDogbWFuaWZlc3RVcmk7XG4gICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICB0aGlzLmxvYWRNYW5pZmVzdCgpO1xuICAgICAgICBpZiAoc3RhcnRDYW52YXNJZCkge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3RDaGFuZ2VkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChtYW5pZmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzSW5kZXggPSBtYW5pZmVzdC5zZXF1ZW5jZXNcbiAgICAgICAgICAgICAgPyBtYW5pZmVzdC5zZXF1ZW5jZXNbMF0/LmNhbnZhc2VzPy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgICAgICAoYykgPT4gYy5pZCA9PT0gc3RhcnRDYW52YXNJZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiAtMTtcbiAgICAgICAgICAgIGlmIChjYW52YXNJbmRleCAmJiBjYW52YXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXMoY2FudmFzSW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNuYWNrQmFyLm9wZW4odGhpcy5pbnRsLmRyb3BEaXNhYmxlZCwgdW5kZWZpbmVkLCB7XG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25EcmFnT3ZlcihldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRyYWdMZWF2ZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY2xlYW51cCgpO1xuICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuc3R5bGVTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHRvZ2dsZVRvb2xiYXJzU3RhdGUobW9kZTogVmlld2VyTW9kZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhlYWRlciAmJiB0aGlzLmZvb3Rlcikge1xuICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgIGNhc2UgVmlld2VyTW9kZS5EQVNIQk9BUkQ6XG4gICAgICAgICAgdGhpcy5zaG93SGVhZGVyQW5kRm9vdGVyU3RhdGUgPVxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuc3RhdGUgPVxuICAgICAgICAgICAgdGhpcy5mb290ZXIuc3RhdGUgPVxuICAgICAgICAgICAgICAnc2hvdyc7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCAmJiB0aGlzLm9zZFRvb2xiYXIpIHtcbiAgICAgICAgICAgIHRoaXMub3NkVG9vbGJhci5zdGF0ZSA9ICdoaWRlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld2VyTW9kZS5QQUdFOlxuICAgICAgICAgIHRoaXMuc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0YXRlID1cbiAgICAgICAgICAgICAgJ2hpZGUnO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgJiYgdGhpcy5vc2RUb29sYmFyKSB7XG4gICAgICAgICAgICB0aGlzLm9zZFRvb2xiYXIuc3RhdGUgPSAnc2hvdyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkTWFuaWZlc3QoKTogdm9pZCB7XG4gICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmxvYWQodGhpcy5tYW5pZmVzdFVyaSkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMucmVzaXplU2VydmljZS5pbml0aWFsaXplKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFudXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTdGF0ZSA9IG5ldyBWaWV3ZXJTdGF0ZSgpO1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMudmlld2VyU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZXNpemVTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnJlc2V0RXJyb3JNZXNzYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q3VycmVudE1hbmlmZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudE1hbmlmZXN0ID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRFcnJvck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNNaXhCbGVuZE1vZGVTdXBwb3J0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMucGxhdGZvcm0uRklSRUZPWCB8fCB0aGlzLnBsYXRmb3JtLlNBRkFSSSk7XG4gIH1cblxuICBnb1RvSG9tZVpvb20oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gdGhpcy5yZWNvZ25pemVkVGV4dE1vZGUuT05MWSkge1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9Ib21lWm9vbSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldENsYXNzZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdtb2RlLXBhZ2UnOiB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuUEFHRSxcbiAgICAgICdtb2RlLXBhZ2Utem9vbWVkJzogdGhpcy5tb2RlU2VydmljZS5pc1BhZ2Vab29tZWQoKSxcbiAgICAgICdtb2RlLWRhc2hib2FyZCc6IHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQsXG4gICAgICAnbGF5b3V0LW9uZS1wYWdlJzogdGhpcy52aWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5PTkVfUEFHRSxcbiAgICAgICdsYXlvdXQtdHdvLXBhZ2UnOiB0aGlzLnZpZXdlckxheW91dCA9PT0gVmlld2VyTGF5b3V0LlRXT19QQUdFLFxuICAgICAgJ2NhbnZhcy1wcmVzc2VkJzogdGhpcy5pc0NhbnZhc1ByZXNzZWQsXG4gICAgICAnYnJva2VuLW1peC1ibGVuZC1tb2RlJzogIXRoaXMuaGFzTWl4QmxlbmRNb2RlU3VwcG9ydCgpLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXZcbiAgaWQ9XCJuZ3gtbWltZS1taW1lVmlld2VyXCJcbiAgY2xhc3M9XCJ2aWV3ZXItY29udGFpbmVyXCJcbiAgW25nQ2xhc3NdPVwic2V0Q2xhc3NlcygpXCJcbiAgW2hpZGRlbl09XCJlcnJvck1lc3NhZ2UgIT09IG51bGxcIlxuICBbdGFiSW5kZXhdPVwidGFiSW5kZXhcIlxuPlxuICA8bWltZS1zcGlubmVyPjwvbWltZS1zcGlubmVyPlxuICA8bWltZS12aWV3ZXItaGVhZGVyXG4gICAgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWhlYWRlclwiXG4gICAgI21pbWVIZWFkZXJcbiAgPjwvbWltZS12aWV3ZXItaGVhZGVyPlxuICA8bWltZS1vc2QtdG9vbGJhclxuICAgICpuZ0lmPVwiY29uZmlnPy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWRcIlxuICAgICNtaW1lT3NkVG9vbGJhclxuICA+PC9taW1lLW9zZC10b29sYmFyPlxuXG4gIDxtYXQtZHJhd2VyLWNvbnRhaW5lciBjbGFzcz1cInZpZXdlci1kcmF3ZXItY29udGFpbmVyXCIgYXV0b3NpemU+XG4gICAgPG1hdC1kcmF3ZXJcbiAgICAgIGRhdGEtdGVzdC1pZD1cIm5neC1taW1lLXJlY29nbml6ZWQtdGV4dC1jb250ZW50LWNvbnRhaW5lclwiXG4gICAgICBtb2RlPVwic2lkZVwiXG4gICAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgICAob3BlbmVkQ2hhbmdlKT1cImdvVG9Ib21lWm9vbSgpXCJcbiAgICAgIFtvcGVuZWRdPVwicmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gcmVjb2duaXplZFRleHRNb2RlLk5PTkVcIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICBvbmx5OiByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID09PSByZWNvZ25pemVkVGV4dE1vZGUuT05MWSxcbiAgICAgICAgc3BsaXQ6IHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPT09IHJlY29nbml6ZWRUZXh0TW9kZS5TUExJVCxcbiAgICAgICAgb3Blbjogc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID09PSAnc2hvdydcbiAgICAgIH1cIlxuICAgICAgPjxtaW1lLXJlY29nbml6ZWQtdGV4dC1jb250ZW50XG4gICAgICAgICpuZ0lmPVwicmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gcmVjb2duaXplZFRleHRNb2RlLk5PTkVcIlxuICAgICAgPjwvbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudFxuICAgID48L21hdC1kcmF3ZXI+XG4gICAgPG1hdC1kcmF3ZXItY29udGVudD5cbiAgICAgIDxkaXYgaWQ9XCJvcGVuc2VhZHJhZ29uXCIgI29wZW5zZWFkcmFnb24+PC9kaXY+XG4gICAgPC9tYXQtZHJhd2VyLWNvbnRlbnQ+XG4gIDwvbWF0LWRyYXdlci1jb250YWluZXI+XG5cbiAgPG1pbWUtdmlld2VyLWZvb3RlclxuICAgIGNsYXNzPVwibmF2YmFyIG5hdmJhci1mb290ZXJcIlxuICAgICNtaW1lRm9vdGVyXG4gID48L21pbWUtdmlld2VyLWZvb3Rlcj5cbjwvZGl2PlxuXG48ZGl2XG4gIGNsYXNzPVwiZXJyb3ItY29udGFpbmVyXCJcbiAgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIlxuICBmeExheW91dD1cImNvbHVtblwiXG4gIGZ4TGF5b3V0QWxpZ249XCJjZW50ZXIgY2VudGVyXCJcbj5cbiAgPHNwYW4+e3sgaW50bC5zb21ldGhpbmdIYXNHb25lV3JvbmdMYWJlbCB9fTwvc3Bhbj5cbjwvZGl2PlxuIl19