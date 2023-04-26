import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { RecognizedTextMode, ViewerMode, } from '../core/models';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerState } from '../core/models/viewerState';
import { VIEWER_PROVIDERS } from './viewer.providers';
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
import * as i19 from "../canvas-group-dialog/canvas-group-dialog.service";
import * as i20 from "@angular/common";
import * as i21 from "@angular/flex-layout/flex";
import * as i22 from "@angular/flex-layout/extended";
import * as i23 from "@angular/material/sidenav";
import * as i24 from "./osd-toolbar/osd-toolbar.component";
import * as i25 from "./recognized-text-content/recognized-text-content.component";
import * as i26 from "./viewer-footer/viewer-footer.component";
import * as i27 from "./viewer-header/viewer-header.component";
import * as i28 from "./viewer-spinner/viewer-spinner.component";
export class ViewerComponent {
    constructor(snackBar, intl, iiifManifestService, viewDialogService, informationDialogService, attributionDialogService, contentSearchDialogService, helpDialogService, viewerService, resizeService, changeDetectorRef, modeService, iiifContentSearchService, accessKeysHandlerService, canvasService, viewerLayoutService, styleService, altoService, zone, platform, canvasGroupDialogService, el, viewContainerRef) {
        this.snackBar = snackBar;
        this.intl = intl;
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
        this.id = 'ngx-mime-mimeViewer';
        this.openseadragonId = 'openseadragon';
        this.subscriptions = new Subscription();
        this.isCanvasPressed = false;
        this.viewerLayout = null;
        this.viewerState = new ViewerState();
        this.recognizedTextContentMode = RecognizedTextMode.NONE;
        this.showHeaderAndFooterState = 'hide';
        this.errorMessage = null;
        this.id = this.viewerService.id;
        this.openseadragonId = this.viewerService.openseadragonId;
        informationDialogService.el = el;
        informationDialogService.viewContainerRef = viewContainerRef;
        attributionDialogService.el = el;
        attributionDialogService.viewContainerRef = viewContainerRef;
        viewDialogService.el = el;
        viewDialogService.viewContainerRef = viewContainerRef;
        contentSearchDialogService.el = el;
        contentSearchDialogService.viewContainerRef = viewContainerRef;
        helpDialogService.el = el;
        helpDialogService.viewContainerRef = viewContainerRef;
        canvasGroupDialogService.viewContainerRef = viewContainerRef;
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
            this.viewerService.setConfig(this.config);
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
ViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerComponent, deps: [{ token: i1.MatSnackBar }, { token: i2.MimeViewerIntl }, { token: i3.IiifManifestService }, { token: i4.ViewDialogService }, { token: i5.InformationDialogService }, { token: i6.AttributionDialogService }, { token: i7.ContentSearchDialogService }, { token: i8.HelpDialogService }, { token: i9.ViewerService }, { token: i10.MimeResizeService }, { token: i0.ChangeDetectorRef }, { token: i11.ModeService }, { token: i12.IiifContentSearchService }, { token: i13.AccessKeysService }, { token: i14.CanvasService }, { token: i15.ViewerLayoutService }, { token: i16.StyleService }, { token: i17.AltoService }, { token: i0.NgZone }, { token: i18.Platform }, { token: i19.CanvasGroupDialogService }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: ViewerComponent, selector: "mime-viewer", inputs: { manifestUri: "manifestUri", q: "q", canvasIndex: "canvasIndex", config: "config", tabIndex: "tabIndex" }, outputs: { viewerModeChanged: "viewerModeChanged", canvasChanged: "canvasChanged", qChanged: "qChanged", manifestChanged: "manifestChanged", recognizedTextContentModeChanged: "recognizedTextContentModeChanged" }, host: { listeners: { "keydown": "handleKeys($event)", "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, providers: VIEWER_PROVIDERS, viewQueries: [{ propertyName: "header", first: true, predicate: ["mimeHeader"], descendants: true, static: true }, { propertyName: "footer", first: true, predicate: ["mimeFooter"], descendants: true, static: true }, { propertyName: "osdToolbar", first: true, predicate: ["mimeOsdToolbar"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"], dependencies: [{ kind: "directive", type: i20.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i20.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i21.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i21.DefaultLayoutAlignDirective, selector: "  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]", inputs: ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"] }, { kind: "directive", type: i22.DefaultClassDirective, selector: "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", inputs: ["ngClass", "ngClass.xs", "ngClass.sm", "ngClass.md", "ngClass.lg", "ngClass.xl", "ngClass.lt-sm", "ngClass.lt-md", "ngClass.lt-lg", "ngClass.lt-xl", "ngClass.gt-xs", "ngClass.gt-sm", "ngClass.gt-md", "ngClass.gt-lg"] }, { kind: "component", type: i23.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i23.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i23.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "component", type: i24.OsdToolbarComponent, selector: "mime-osd-toolbar" }, { kind: "component", type: i25.RecognizedTextContentComponent, selector: "mime-recognized-text-content" }, { kind: "component", type: i26.ViewerFooterComponent, selector: "mime-viewer-footer" }, { kind: "component", type: i27.ViewerHeaderComponent, selector: "mime-viewer-header" }, { kind: "component", type: i28.ViewerSpinnerComponent, selector: "mime-spinner" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: ViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer', changeDetection: ChangeDetectionStrategy.OnPush, providers: VIEWER_PROVIDERS, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.MatSnackBar }, { type: i2.MimeViewerIntl }, { type: i3.IiifManifestService }, { type: i4.ViewDialogService }, { type: i5.InformationDialogService }, { type: i6.AttributionDialogService }, { type: i7.ContentSearchDialogService }, { type: i8.HelpDialogService }, { type: i9.ViewerService }, { type: i10.MimeResizeService }, { type: i0.ChangeDetectorRef }, { type: i11.ModeService }, { type: i12.IiifContentSearchService }, { type: i13.AccessKeysService }, { type: i14.CanvasService }, { type: i15.ViewerLayoutService }, { type: i16.StyleService }, { type: i17.AltoService }, { type: i0.NgZone }, { type: i18.Platform }, { type: i19.CanvasGroupDialogService }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { manifestUri: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUtMLE1BQU0sRUFFTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVFoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFHbEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFOUQsT0FBTyxFQUVMLGtCQUFrQixFQUVsQixVQUFVLEdBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVl6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBU3RELE1BQU0sT0FBTyxlQUFlO0lBbUMxQixZQUNTLFFBQXFCLEVBQ3JCLElBQW9CLEVBQ25CLG1CQUF3QyxFQUN4QyxpQkFBb0MsRUFDcEMsd0JBQWtELEVBQ2xELHdCQUFrRCxFQUNs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LFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBR2pDLFVBQVU7c0JBRGpCLFNBQVM7dUJBQUMsZ0JBQWdCO2dCQXdRM0IsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNNUIsTUFBTTtzQkFEWixZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFzQ3pCLFVBQVU7c0JBRGhCLFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU83QixXQUFXO3NCQURqQixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGhyb3R0bGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjZXNzS2V5c1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsdG9TZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3RVdGlscyB9IGZyb20gJy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9jb3JlL2ludGwnO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vY29yZS9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgTW9kZUNoYW5nZXMsXG4gIFJlY29nbml6ZWRUZXh0TW9kZSxcbiAgUmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcyxcbiAgVmlld2VyTW9kZSxcbn0gZnJvbSAnLi4vY29yZS9tb2RlbHMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTdGF0ZSB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL3ZpZXdlclN0YXRlJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2luZm9ybWF0aW9uLWRpYWxvZy9pbmZvcm1hdGlvbi1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nU2VydmljZSB9IGZyb20gJy4uL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IE9zZFRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL29zZC10b29sYmFyL29zZC10b29sYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXItaGVhZGVyL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZJRVdFUl9QUk9WSURFUlMgfSBmcm9tICcuL3ZpZXdlci5wcm92aWRlcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogVklFV0VSX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYW5pZmVzdFVyaSE6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHEhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBjYW52YXNJbmRleCA9IDA7XG4gIEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IE1pbWVWaWV3ZXJDb25maWcgPSBuZXcgTWltZVZpZXdlckNvbmZpZygpO1xuICBASW5wdXQoKSBwdWJsaWMgdGFiSW5kZXggPSAwO1xuICBAT3V0cHV0KCkgdmlld2VyTW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxWaWV3ZXJNb2RlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNhbnZhc0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbWFuaWZlc3RDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8TWFuaWZlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KClcbiAgcmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxSZWNvZ25pemVkVGV4dE1vZGU+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHJlY29nbml6ZWRUZXh0TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZTtcbiAgaWQgPSAnbmd4LW1pbWUtbWltZVZpZXdlcic7XG4gIG9wZW5zZWFkcmFnb25JZCA9ICdvcGVuc2VhZHJhZ29uJztcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgaXNDYW52YXNQcmVzc2VkID0gZmFsc2U7XG4gIHByaXZhdGUgY3VycmVudE1hbmlmZXN0ITogTWFuaWZlc3QgfCBudWxsO1xuICBwcml2YXRlIHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmlld2VyU3RhdGUgPSBuZXcgVmlld2VyU3RhdGUoKTtcblxuICByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlOiBSZWNvZ25pemVkVGV4dE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGUuTk9ORTtcbiAgc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID0gJ2hpZGUnO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvLyBWaWV3Y2hpbGRzXG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGhlYWRlciE6IFZpZXdlckhlYWRlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlcicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgZm9vdGVyITogVmlld2VyRm9vdGVyQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdtaW1lT3NkVG9vbGJhcicpXG4gIHByaXZhdGUgb3NkVG9vbGJhciE6IE9zZFRvb2xiYXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNuYWNrQmFyOiBNYXRTbmFja0JhcixcbiAgICBwdWJsaWMgaW50bDogTWltZVZpZXdlckludGwsXG4gICAgcHJpdmF0ZSBpaWlmTWFuaWZlc3RTZXJ2aWNlOiBJaWlmTWFuaWZlc3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld0RpYWxvZ1NlcnZpY2U6IFZpZXdEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlOiBJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2U6IEF0dHJpYnV0aW9uRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlOiBDb250ZW50U2VhcmNoRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGhlbHBEaWFsb2dTZXJ2aWNlOiBIZWxwRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZXNpemVTZXJ2aWNlOiBNaW1lUmVzaXplU2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIG1vZGVTZXJ2aWNlOiBNb2RlU2VydmljZSxcbiAgICBwcml2YXRlIGlpaWZDb250ZW50U2VhcmNoU2VydmljZTogSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlOiBBY2Nlc3NLZXlzU2VydmljZSxcbiAgICBwcml2YXRlIGNhbnZhc1NlcnZpY2U6IENhbnZhc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXRTZXJ2aWNlOiBWaWV3ZXJMYXlvdXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhbHRvU2VydmljZTogQWx0b1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgY2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlOiBDYW52YXNHcm91cERpYWxvZ1NlcnZpY2UsXG4gICAgZWw6IEVsZW1lbnRSZWYsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApIHtcbiAgICB0aGlzLmlkID0gdGhpcy52aWV3ZXJTZXJ2aWNlLmlkO1xuICAgIHRoaXMub3BlbnNlYWRyYWdvbklkID0gdGhpcy52aWV3ZXJTZXJ2aWNlLm9wZW5zZWFkcmFnb25JZDtcbiAgICBpbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBpbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIHZpZXdEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgdmlld0RpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICBoZWxwRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGhlbHBEaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIGNhbnZhc0dyb3VwRGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICByZXNpemVTZXJ2aWNlLmVsID0gZWw7XG4gIH1cblxuICBnZXQgbWltZUhlYWRlckJlZm9yZVJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXIubWltZUhlYWRlckJlZm9yZTtcbiAgfVxuXG4gIGdldCBtaW1lSGVhZGVyQWZ0ZXJSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZGVyLm1pbWVIZWFkZXJBZnRlcjtcbiAgfVxuXG4gIGdldCBtaW1lRm9vdGVyQmVmb3JlUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmZvb3Rlci5taW1lRm9vdGVyQmVmb3JlO1xuICB9XG5cbiAgZ2V0IG1pbWVGb290ZXJBZnRlclJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5mb290ZXIubWltZUZvb3RlckFmdGVyO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdHlsZVNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5jdXJyZW50TWFuaWZlc3Quc3Vic2NyaWJlKFxuICAgICAgICAobWFuaWZlc3Q6IE1hbmlmZXN0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChtYW5pZmVzdCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYW5pZmVzdCA9IG1hbmlmZXN0O1xuICAgICAgICAgICAgdGhpcy5tYW5pZmVzdENoYW5nZWQubmV4dChtYW5pZmVzdCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2UuaW5pdChcbiAgICAgICAgICAgICAgTWFuaWZlc3RVdGlscy5pc01hbmlmZXN0UGFnZWQobWFuaWZlc3QpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID1cbiAgICAgICAgICAgICAgdGhpcy5hbHRvU2VydmljZS5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2Uuc2V0VXBWaWV3ZXIobWFuaWZlc3QsIHRoaXMuY29uZmlnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQgJiYgbWFuaWZlc3QuYXR0cmlidXRpb24pIHtcbiAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2Uub3BlbihcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnEpIHtcbiAgICAgICAgICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2VhcmNoKG1hbmlmZXN0LCB0aGlzLnEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLm9uT3NkUmVhZHlDaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAvLyBEb24ndCByZXNldCBjdXJyZW50IHBhZ2Ugd2hlbiBzd2l0Y2hpbmcgbGF5b3V0XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzdGF0ZSAmJlxuICAgICAgICAgIHRoaXMuY2FudmFzSW5kZXggJiZcbiAgICAgICAgICAhdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKHRoaXMuY2FudmFzSW5kZXgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5lcnJvck1lc3NhZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoZXJyb3I6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICAgICAgICB0aGlzLnJlc2V0Q3VycmVudE1hbmlmZXN0KCk7XG4gICAgICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvcjtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25RQ2hhbmdlLnN1YnNjcmliZSgocTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMucUNoYW5nZWQuZW1pdChxKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKHNyOiBTZWFyY2hSZXN1bHQpID0+IHtcbiAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhpZ2hsaWdodChzcik7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmlzQ2FudmFzUHJlc3NlZC5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIHRoaXMuaXNDYW52YXNQcmVzc2VkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChtb2RlOiBNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlVG9vbGJhcnNTdGF0ZShtb2RlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1vZGUucHJldmlvdXNWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQgJiZcbiAgICAgICAgICBtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5QQUdFXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUudmlld0RpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5zZWxlY3RlZEluZGV4ID1cbiAgICAgICAgICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnRzU2VhcmNoRGlhbG9nU3RhdGUuaXNPcGVuID1cbiAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5oZWxwRGlhbG9nU3RhdGUuaXNPcGVuID1cbiAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLnZpZXdEaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuc2VsZWN0ZWRJbmRleFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuY29udGVudHNTZWFyY2hEaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5oZWxwRGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudmlld2VyTW9kZUNoYW5nZWQuZW1pdChtb2RlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuY2FudmFzU2VydmljZS5vbkNhbnZhc0dyb3VwSW5kZXhDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAoY2FudmFzR3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2FudmFzSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLmZpbmRDYW52YXNCeUNhbnZhc0luZGV4KGNhbnZhc0dyb3VwSW5kZXgpO1xuICAgICAgICAgIGlmIChjYW52YXNJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzQ2hhbmdlZC5lbWl0KGNhbnZhc0luZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMucmVzaXplU2VydmljZS5vblJlc2l6ZVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0aHJvdHRsZSgodmFsKSA9PlxuICAgICAgICAgICAgaW50ZXJ2YWwoVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5ob21lKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0sIFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSk7XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAodmlld2VyTGF5b3V0OiBWaWV3ZXJMYXlvdXQpID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdlckxheW91dCA9IHZpZXdlckxheW91dDtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5vblJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2UkLnN1YnNjcmliZShcbiAgICAgICAgKHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXM6IFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPVxuICAgICAgICAgICAgcmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlZC5lbWl0KFxuICAgICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snY29uZmlnJ10pIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2V0Q29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uuc2V0Q29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uuc2V0Q29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydtYW5pZmVzdFVyaSddKSB7XG4gICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgIHRoaXMubW9kZVNlcnZpY2UubW9kZSA9IHRoaXMuY29uZmlnLmluaXRWaWV3ZXJNb2RlO1xuICAgICAgdGhpcy5tYW5pZmVzdFVyaSA9IGNoYW5nZXNbJ21hbmlmZXN0VXJpJ10uY3VycmVudFZhbHVlO1xuICAgICAgdGhpcy5sb2FkTWFuaWZlc3QoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1sncSddKSB7XG4gICAgICB0aGlzLnEgPSBjaGFuZ2VzWydxJ10uY3VycmVudFZhbHVlO1xuICAgICAgaWYgKHRoaXMuY3VycmVudE1hbmlmZXN0KSB7XG4gICAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaCh0aGlzLmN1cnJlbnRNYW5pZmVzdCwgdGhpcy5xKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snY2FudmFzSW5kZXgnXSkge1xuICAgICAgdGhpcy5jYW52YXNJbmRleCA9IGNoYW5nZXNbJ2NhbnZhc0luZGV4J10uY3VycmVudFZhbHVlO1xuICAgICAgaWYgKHRoaXMuY3VycmVudE1hbmlmZXN0KSB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKHRoaXMuY2FudmFzSW5kZXgsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICBoYW5kbGVLZXlzKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaGFuZGxlS2V5RXZlbnRzKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Ecm9wKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5pc0Ryb3BFbmFibGVkKSB7XG4gICAgICBjb25zdCB1cmwgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnVVJMJyk7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMKHVybCkuc2VhcmNoUGFyYW1zO1xuICAgICAgY29uc3QgbWFuaWZlc3RVcmkgPSBwYXJhbXMuZ2V0KCdtYW5pZmVzdCcpO1xuICAgICAgY29uc3Qgc3RhcnRDYW52YXNJZCA9IHBhcmFtcy5nZXQoJ2NhbnZhcycpO1xuICAgICAgaWYgKG1hbmlmZXN0VXJpKSB7XG4gICAgICAgIHRoaXMubWFuaWZlc3RVcmkgPSBtYW5pZmVzdFVyaS5zdGFydHNXaXRoKCcvLycpXG4gICAgICAgICAgPyBgJHtsb2NhdGlvbi5wcm90b2NvbH0ke21hbmlmZXN0VXJpfWBcbiAgICAgICAgICA6IG1hbmlmZXN0VXJpO1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgdGhpcy5sb2FkTWFuaWZlc3QoKTtcbiAgICAgICAgaWYgKHN0YXJ0Q2FudmFzSWQpIHtcbiAgICAgICAgICB0aGlzLm1hbmlmZXN0Q2hhbmdlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgobWFuaWZlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc0luZGV4ID0gbWFuaWZlc3Quc2VxdWVuY2VzXG4gICAgICAgICAgICAgID8gbWFuaWZlc3Quc2VxdWVuY2VzWzBdPy5jYW52YXNlcz8uZmluZEluZGV4KFxuICAgICAgICAgICAgICAgICAgKGMpID0+IGMuaWQgPT09IHN0YXJ0Q2FudmFzSWRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogLTE7XG4gICAgICAgICAgICBpZiAoY2FudmFzSW5kZXggJiYgY2FudmFzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKGNhbnZhc0luZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbmFja0Jhci5vcGVuKHRoaXMuaW50bC5kcm9wRGlzYWJsZWQsIHVuZGVmaW5lZCwge1xuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0eWxlU2VydmljZS5kZXN0cm95KCk7XG4gIH1cblxuICB0b2dnbGVUb29sYmFyc1N0YXRlKG1vZGU6IFZpZXdlck1vZGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgdGhpcy5mb290ZXIpIHtcbiAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICBjYXNlIFZpZXdlck1vZGUuREFTSEJPQVJEOlxuICAgICAgICAgIHRoaXMuc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0YXRlID1cbiAgICAgICAgICAgICAgJ3Nob3cnO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgJiYgdGhpcy5vc2RUb29sYmFyKSB7XG4gICAgICAgICAgICB0aGlzLm9zZFRvb2xiYXIuc3RhdGUgPSAnaGlkZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFZpZXdlck1vZGUuUEFHRTpcbiAgICAgICAgICB0aGlzLnNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5zdGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmZvb3Rlci5zdGF0ZSA9XG4gICAgICAgICAgICAgICdoaWRlJztcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkICYmIHRoaXMub3NkVG9vbGJhcikge1xuICAgICAgICAgICAgdGhpcy5vc2RUb29sYmFyLnN0YXRlID0gJ3Nob3cnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZE1hbmlmZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5sb2FkKHRoaXMubWFuaWZlc3RVcmkpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnJlc2l6ZVNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbnVwKCkge1xuICAgIHRoaXMudmlld2VyU3RhdGUgPSBuZXcgVmlld2VyU3RhdGUoKTtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMucmVzaXplU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZXNldEVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEN1cnJlbnRNYW5pZmVzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRNYW5pZmVzdCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXJyb3JNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzTWl4QmxlbmRNb2RlU3VwcG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLnBsYXRmb3JtLkZJUkVGT1ggfHwgdGhpcy5wbGF0Zm9ybS5TQUZBUkkpO1xuICB9XG5cbiAgZ29Ub0hvbWVab29tKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHRoaXMucmVjb2duaXplZFRleHRNb2RlLk9OTFkpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvSG9tZVpvb20oKTtcbiAgICB9XG4gIH1cblxuICBzZXRDbGFzc2VzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbW9kZS1wYWdlJzogdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UsXG4gICAgICAnbW9kZS1wYWdlLXpvb21lZCc6IHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCksXG4gICAgICAnbW9kZS1kYXNoYm9hcmQnOiB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJELFxuICAgICAgJ2xheW91dC1vbmUtcGFnZSc6IHRoaXMudmlld2VyTGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UsXG4gICAgICAnbGF5b3V0LXR3by1wYWdlJzogdGhpcy52aWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRSxcbiAgICAgICdjYW52YXMtcHJlc3NlZCc6IHRoaXMuaXNDYW52YXNQcmVzc2VkLFxuICAgICAgJ2Jyb2tlbi1taXgtYmxlbmQtbW9kZSc6ICF0aGlzLmhhc01peEJsZW5kTW9kZVN1cHBvcnQoKSxcbiAgICB9O1xuICB9XG59XG4iLCI8ZGl2XG4gIFtpZF09XCJpZFwiXG4gIGNsYXNzPVwidmlld2VyLWNvbnRhaW5lclwiXG4gIFtuZ0NsYXNzXT1cInNldENsYXNzZXMoKVwiXG4gIFtoaWRkZW5dPVwiZXJyb3JNZXNzYWdlICE9PSBudWxsXCJcbiAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcbj5cbiAgPG1pbWUtc3Bpbm5lcj48L21pbWUtc3Bpbm5lcj5cbiAgPG1pbWUtdmlld2VyLWhlYWRlclxuICAgIGNsYXNzPVwibmF2YmFyIG5hdmJhci1oZWFkZXJcIlxuICAgICNtaW1lSGVhZGVyXG4gID48L21pbWUtdmlld2VyLWhlYWRlcj5cbiAgPG1pbWUtb3NkLXRvb2xiYXJcbiAgICAqbmdJZj1cImNvbmZpZz8ubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkXCJcbiAgICAjbWltZU9zZFRvb2xiYXJcbiAgPjwvbWltZS1vc2QtdG9vbGJhcj5cblxuICA8bWF0LWRyYXdlci1jb250YWluZXIgY2xhc3M9XCJ2aWV3ZXItZHJhd2VyLWNvbnRhaW5lclwiIGF1dG9zaXplPlxuICAgIDxtYXQtZHJhd2VyXG4gICAgICBkYXRhLXRlc3RpZD1cIm5neC1taW1lLXJlY29nbml6ZWQtdGV4dC1jb250ZW50LWNvbnRhaW5lclwiXG4gICAgICBtb2RlPVwic2lkZVwiXG4gICAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgICAob3BlbmVkQ2hhbmdlKT1cImdvVG9Ib21lWm9vbSgpXCJcbiAgICAgIFtvcGVuZWRdPVwicmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gcmVjb2duaXplZFRleHRNb2RlLk5PTkVcIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICBvbmx5OiByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID09PSByZWNvZ25pemVkVGV4dE1vZGUuT05MWSxcbiAgICAgICAgc3BsaXQ6IHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPT09IHJlY29nbml6ZWRUZXh0TW9kZS5TUExJVCxcbiAgICAgICAgb3Blbjogc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID09PSAnc2hvdydcbiAgICAgIH1cIlxuICAgICAgPjxtaW1lLXJlY29nbml6ZWQtdGV4dC1jb250ZW50XG4gICAgICAgICpuZ0lmPVwicmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gcmVjb2duaXplZFRleHRNb2RlLk5PTkVcIlxuICAgICAgPjwvbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudFxuICAgID48L21hdC1kcmF3ZXI+XG4gICAgPG1hdC1kcmF3ZXItY29udGVudD5cbiAgICAgIDxkaXYgW2lkXT1cIm9wZW5zZWFkcmFnb25JZFwiIGNsYXNzPVwib3BlbnNlYWRyYWdvblwiPjwvZGl2PlxuICAgIDwvbWF0LWRyYXdlci1jb250ZW50PlxuICA8L21hdC1kcmF3ZXItY29udGFpbmVyPlxuXG4gIDxtaW1lLXZpZXdlci1mb290ZXJcbiAgICBjbGFzcz1cIm5hdmJhciBuYXZiYXItZm9vdGVyXCJcbiAgICAjbWltZUZvb3RlclxuICA+PC9taW1lLXZpZXdlci1mb290ZXI+XG48L2Rpdj5cblxuPGRpdlxuICBjbGFzcz1cImVycm9yLWNvbnRhaW5lclwiXG4gICpuZ0lmPVwiZXJyb3JNZXNzYWdlXCJcbiAgZnhMYXlvdXQ9XCJjb2x1bW5cIlxuICBmeExheW91dEFsaWduPVwiY2VudGVyIGNlbnRlclwiXG4+XG4gIDxzcGFuPnt7IGludGwuc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgfX08L3NwYW4+XG48L2Rpdj5cbiJdfQ==