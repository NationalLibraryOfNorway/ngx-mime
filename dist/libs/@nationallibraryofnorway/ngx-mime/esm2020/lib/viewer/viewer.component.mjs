import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, ViewChild, ViewContainerRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, interval } from 'rxjs';
import { take, throttle } from 'rxjs/operators';
import { AttributionDialogService } from '../attribution-dialog/attribution-dialog.service';
import { CanvasGroupDialogService } from '../canvas-group-dialog/canvas-group-dialog.service';
import { ContentSearchDialogService } from '../content-search-dialog/content-search-dialog.service';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { AltoService } from '../core/alto-service/alto.service';
import { CanvasService } from '../core/canvas-service/canvas-service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ManifestUtils } from '../core/iiif-manifest-service/iiif-manifest-utils';
import { MimeViewerIntl } from '../core/intl';
import { MimeResizeService } from '../core/mime-resize-service/mime-resize.service';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { ModeService } from '../core/mode-service/mode.service';
import { RecognizedTextMode, ViewerMode, } from '../core/models';
import { ViewerLayout } from '../core/models/viewer-layout';
import { ViewerOptions } from '../core/models/viewer-options';
import { ViewerState } from '../core/models/viewerState';
import { StyleService } from '../core/style-service/style.service';
import { ViewerLayoutService } from '../core/viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../core/viewer-service/viewer.service';
import { HelpDialogService } from '../help-dialog/help-dialog.service';
import { InformationDialogService } from '../information-dialog/information-dialog.service';
import { ViewDialogService } from '../view-dialog/view-dialog.service';
import { IiifContentSearchService } from './../core/iiif-content-search-service/iiif-content-search.service';
import { OsdToolbarComponent } from './osd-toolbar/osd-toolbar.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
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
ViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerComponent, deps: [{ token: i1.MatSnackBar }, { token: i2.MimeViewerIntl }, { token: i3.IiifManifestService }, { token: i4.ViewDialogService }, { token: i5.InformationDialogService }, { token: i6.AttributionDialogService }, { token: i7.ContentSearchDialogService }, { token: i8.HelpDialogService }, { token: i9.ViewerService }, { token: i10.MimeResizeService }, { token: i0.ChangeDetectorRef }, { token: i11.ModeService }, { token: i12.IiifContentSearchService }, { token: i13.AccessKeysService }, { token: i14.CanvasService }, { token: i15.ViewerLayoutService }, { token: i16.StyleService }, { token: i17.AltoService }, { token: i0.NgZone }, { token: i18.Platform }, { token: i19.CanvasGroupDialogService }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
ViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ViewerComponent, selector: "mime-viewer", inputs: { manifestUri: "manifestUri", q: "q", canvasIndex: "canvasIndex", config: "config", tabIndex: "tabIndex" }, outputs: { viewerModeChanged: "viewerModeChanged", canvasChanged: "canvasChanged", qChanged: "qChanged", manifestChanged: "manifestChanged", recognizedTextContentModeChanged: "recognizedTextContentModeChanged" }, host: { listeners: { "keydown": "handleKeys($event)", "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, providers: VIEWER_PROVIDERS, viewQueries: [{ propertyName: "header", first: true, predicate: ["mimeHeader"], descendants: true, static: true }, { propertyName: "footer", first: true, predicate: ["mimeFooter"], descendants: true, static: true }, { propertyName: "osdToolbar", first: true, predicate: ["mimeOsdToolbar"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    #mimeOsdToolbar\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  class=\"error-container\"\n  *ngIf=\"errorMessage\"\n  fxLayout=\"column\"\n  fxLayoutAlign=\"center center\"\n>\n  <span>{{ intl.somethingHasGoneWrongLabel }}</span>\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"], dependencies: [{ kind: "directive", type: i20.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i20.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i21.DefaultLayoutDirective, selector: "  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],  [fxLayout.gt-md], [fxLayout.gt-lg]", inputs: ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"] }, { kind: "directive", type: i21.DefaultLayoutAlignDirective, selector: "  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]", inputs: ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"] }, { kind: "directive", type: i22.DefaultClassDirective, selector: "  [ngClass], [ngClass.xs], [ngClass.sm], [ngClass.md], [ngClass.lg], [ngClass.xl],  [ngClass.lt-sm], [ngClass.lt-md], [ngClass.lt-lg], [ngClass.lt-xl],  [ngClass.gt-xs], [ngClass.gt-sm], [ngClass.gt-md], [ngClass.gt-lg]", inputs: ["ngClass", "ngClass.xs", "ngClass.sm", "ngClass.md", "ngClass.lg", "ngClass.xl", "ngClass.lt-sm", "ngClass.lt-md", "ngClass.lt-lg", "ngClass.lt-xl", "ngClass.gt-xs", "ngClass.gt-sm", "ngClass.gt-md", "ngClass.gt-lg"] }, { kind: "component", type: i23.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i23.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i23.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "component", type: i24.OsdToolbarComponent, selector: "mime-osd-toolbar" }, { kind: "component", type: i25.RecognizedTextContentComponent, selector: "mime-recognized-text-content" }, { kind: "component", type: i26.ViewerFooterComponent, selector: "mime-viewer-footer" }, { kind: "component", type: i27.ViewerHeaderComponent, selector: "mime-viewer-header" }, { kind: "component", type: i28.ViewerSpinnerComponent, selector: "mime-spinner" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ViewerComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBRU4sU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNwRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8s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O2dCQUVQLGdDQUFnQztzQkFEL0IsTUFBTTtnQkFtQkMsTUFBTTtzQkFEYixTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBR2pDLE1BQU07c0JBRGIsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUdqQyxVQUFVO3NCQURqQixTQUFTO3VCQUFDLGdCQUFnQjtnQkF3UTNCLFVBQVU7c0JBRFQsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTTVCLE1BQU07c0JBRFosWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBc0N6QixVQUFVO3NCQURoQixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFPN0IsV0FBVztzQkFEakIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRocm90dGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc0dyb3VwRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY2Vzc0tleXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hY2Nlc3Mta2V5cy1oYW5kbGVyLXNlcnZpY2UvYWNjZXNzLWtleXMuc2VydmljZSc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXV0aWxzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL2NvcmUvbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE1vZGVDaGFuZ2VzLFxuICBSZWNvZ25pemVkVGV4dE1vZGUsXG4gIFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMsXG4gIFZpZXdlck1vZGUsXG59IGZyb20gJy4uL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2VyU3RhdGUgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXJTdGF0ZSc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4vLi4vY29yZS9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBPc2RUb29sYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9vc2QtdG9vbGJhci9vc2QtdG9vbGJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VyRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXItZm9vdGVyL3ZpZXdlci1mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlckhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyLWhlYWRlci92aWV3ZXItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWSUVXRVJfUFJPVklERVJTIH0gZnJvbSAnLi92aWV3ZXIucHJvdmlkZXJzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS12aWV3ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlld2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFZJRVdFUl9QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwdWJsaWMgbWFuaWZlc3RVcmkhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBxITogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgY2FudmFzSW5kZXggPSAwO1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnID0gbmV3IE1pbWVWaWV3ZXJDb25maWcoKTtcbiAgQElucHV0KCkgcHVibGljIHRhYkluZGV4ID0gMDtcbiAgQE91dHB1dCgpIHZpZXdlck1vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Vmlld2VyTW9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjYW52YXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHFDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1hbmlmZXN0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1hbmlmZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8UmVjb2duaXplZFRleHRNb2RlPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcigpO1xuICByZWNvZ25pemVkVGV4dE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGU7XG4gIGlkID0gJ25neC1taW1lLW1pbWVWaWV3ZXInO1xuICBvcGVuc2VhZHJhZ29uSWQgPSAnb3BlbnNlYWRyYWdvbic7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIGlzQ2FudmFzUHJlc3NlZCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRNYW5pZmVzdCE6IE1hbmlmZXN0IHwgbnVsbDtcbiAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHZpZXdlclN0YXRlID0gbmV3IFZpZXdlclN0YXRlKCk7XG5cbiAgcmVjb2duaXplZFRleHRDb250ZW50TW9kZTogUmVjb2duaXplZFRleHRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlLk5PTkU7XG4gIHNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9ICdoaWRlJztcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gVmlld2NoaWxkc1xuICBAVmlld0NoaWxkKCdtaW1lSGVhZGVyJywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSBoZWFkZXIhOiBWaWV3ZXJIZWFkZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGZvb3RlciE6IFZpZXdlckZvb3RlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWltZU9zZFRvb2xiYXInKVxuICBwcml2YXRlIG9zZFRvb2xiYXIhOiBPc2RUb29sYmFyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdEaWFsb2dTZXJ2aWNlOiBWaWV3RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGluZm9ybWF0aW9uRGlhbG9nU2VydmljZTogSW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlOiBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZTogQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwRGlhbG9nU2VydmljZTogSGVscERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIGFjY2Vzc0tleXNIYW5kbGVyU2VydmljZTogQWNjZXNzS2V5c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIHN0eWxlU2VydmljZTogU3R5bGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWx0b1NlcnZpY2U6IEFsdG9TZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIGNhbnZhc0dyb3VwRGlhbG9nU2VydmljZTogQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlLFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgdGhpcy5pZCA9IHRoaXMudmlld2VyU2VydmljZS5pZDtcbiAgICB0aGlzLm9wZW5zZWFkcmFnb25JZCA9IHRoaXMudmlld2VyU2VydmljZS5vcGVuc2VhZHJhZ29uSWQ7XG4gICAgaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICB2aWV3RGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIHZpZXdEaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgaGVscERpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBoZWxwRGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICBjYW52YXNHcm91cERpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgcmVzaXplU2VydmljZS5lbCA9IGVsO1xuICB9XG5cbiAgZ2V0IG1pbWVIZWFkZXJCZWZvcmVSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuaGVhZGVyLm1pbWVIZWFkZXJCZWZvcmU7XG4gIH1cblxuICBnZXQgbWltZUhlYWRlckFmdGVyUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmhlYWRlci5taW1lSGVhZGVyQWZ0ZXI7XG4gIH1cblxuICBnZXQgbWltZUZvb3RlckJlZm9yZVJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5mb290ZXIubWltZUZvb3RlckJlZm9yZTtcbiAgfVxuXG4gIGdldCBtaW1lRm9vdGVyQWZ0ZXJSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyLm1pbWVGb290ZXJBZnRlcjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3R5bGVTZXJ2aWNlLmluaXRpYWxpemUoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuY3VycmVudE1hbmlmZXN0LnN1YnNjcmliZShcbiAgICAgICAgKG1hbmlmZXN0OiBNYW5pZmVzdCB8IG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobWFuaWZlc3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWFuaWZlc3QgPSBtYW5pZmVzdDtcbiAgICAgICAgICAgIHRoaXMubWFuaWZlc3RDaGFuZ2VkLm5leHQobWFuaWZlc3QpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLmluaXQoXG4gICAgICAgICAgICAgIE1hbmlmZXN0VXRpbHMuaXNNYW5pZmVzdFBhZ2VkKG1hbmlmZXN0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9XG4gICAgICAgICAgICAgIHRoaXMuYWx0b1NlcnZpY2UucmVjb2duaXplZFRleHRDb250ZW50TW9kZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnNldFVwVmlld2VyKG1hbmlmZXN0LCB0aGlzLmNvbmZpZyk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuYXR0cmlidXRpb25EaWFsb2dFbmFibGVkICYmIG1hbmlmZXN0LmF0dHJpYnV0aW9uKSB7XG4gICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYXR0cmlidXRpb25EaWFsb2dIaWRlVGltZW91dFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5xKSB7XG4gICAgICAgICAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaChtYW5pZmVzdCwgdGhpcy5xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5vbk9zZFJlYWR5Q2hhbmdlLnN1YnNjcmliZSgoc3RhdGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgcmVzZXQgY3VycmVudCBwYWdlIHdoZW4gc3dpdGNoaW5nIGxheW91dFxuICAgICAgICBpZiAoXG4gICAgICAgICAgc3RhdGUgJiZcbiAgICAgICAgICB0aGlzLmNhbnZhc0luZGV4ICYmXG4gICAgICAgICAgIXRoaXMuY2FudmFzU2VydmljZS5jdXJyZW50Q2FudmFzR3JvdXBJbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyh0aGlzLmNhbnZhc0luZGV4LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZXJyb3JNZXNzYWdlLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldEN1cnJlbnRNYW5pZmVzdCgpO1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uUUNoYW5nZS5zdWJzY3JpYmUoKHE6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnFDaGFuZ2VkLmVtaXQocSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5oaWdobGlnaHQoc3IpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5pc0NhbnZhc1ByZXNzZWQuc3Vic2NyaWJlKCh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmlzQ2FudmFzUHJlc3NlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgobW9kZTogTW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgaWYgKG1vZGUuY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZVRvb2xiYXJzU3RhdGUobW9kZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBtb2RlLnByZXZpb3VzVmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEICYmXG4gICAgICAgICAgbW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuUEFHRVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLnZpZXdEaWFsb2dTdGF0ZS5pc09wZW4gPVxuICAgICAgICAgICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5pc09wZW4gPVxuICAgICAgICAgICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuc2VsZWN0ZWRJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50c1NlYXJjaERpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuaGVscERpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJEKSB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS52aWV3RGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5vcGVuKFxuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLnNlbGVjdGVkSW5kZXhcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnRzU2VhcmNoRGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuaGVscERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdlck1vZGVDaGFuZ2VkLmVtaXQobW9kZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmNhbnZhc1NlcnZpY2Uub25DYW52YXNHcm91cEluZGV4Q2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKGNhbnZhc0dyb3VwSW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IGNhbnZhc0luZGV4ID1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzU2VydmljZS5maW5kQ2FudmFzQnlDYW52YXNJbmRleChjYW52YXNHcm91cEluZGV4KTtcbiAgICAgICAgICBpZiAoY2FudmFzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0NoYW5nZWQuZW1pdChjYW52YXNJbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemVcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGhyb3R0bGUoKHZhbCkgPT5cbiAgICAgICAgICAgIGludGVydmFsKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaG9tZSgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9LCBWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXQgPSB2aWV3ZXJMYXlvdXQ7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuYWx0b1NlcnZpY2Uub25SZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlJC5zdWJzY3JpYmUoXG4gICAgICAgIChyZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzOiBSZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID1cbiAgICAgICAgICAgIHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMuY3VycmVudFZhbHVlO1xuICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZWQuZW1pdChcbiAgICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2NvbmZpZyddKSB7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uuc2V0Q29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snbWFuaWZlc3RVcmknXSkge1xuICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSB0aGlzLmNvbmZpZy5pbml0Vmlld2VyTW9kZTtcbiAgICAgIHRoaXMubWFuaWZlc3RVcmkgPSBjaGFuZ2VzWydtYW5pZmVzdFVyaSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3EnXSkge1xuICAgICAgdGhpcy5xID0gY2hhbmdlc1sncSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRNYW5pZmVzdCkge1xuICAgICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWFyY2godGhpcy5jdXJyZW50TWFuaWZlc3QsIHRoaXMucSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2NhbnZhc0luZGV4J10pIHtcbiAgICAgIHRoaXMuY2FudmFzSW5kZXggPSBjaGFuZ2VzWydjYW52YXNJbmRleCddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRNYW5pZmVzdCkge1xuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyh0aGlzLmNhbnZhc0luZGV4LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlS2V5cyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmhhbmRsZUtleUV2ZW50cyhldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5jb25maWcuaXNEcm9wRW5hYmxlZCkge1xuICAgICAgY29uc3QgdXJsID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ1VSTCcpO1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTCh1cmwpLnNlYXJjaFBhcmFtcztcbiAgICAgIGNvbnN0IG1hbmlmZXN0VXJpID0gcGFyYW1zLmdldCgnbWFuaWZlc3QnKTtcbiAgICAgIGNvbnN0IHN0YXJ0Q2FudmFzSWQgPSBwYXJhbXMuZ2V0KCdjYW52YXMnKTtcbiAgICAgIGlmIChtYW5pZmVzdFVyaSkge1xuICAgICAgICB0aGlzLm1hbmlmZXN0VXJpID0gbWFuaWZlc3RVcmkuc3RhcnRzV2l0aCgnLy8nKVxuICAgICAgICAgID8gYCR7bG9jYXRpb24ucHJvdG9jb2x9JHttYW5pZmVzdFVyaX1gXG4gICAgICAgICAgOiBtYW5pZmVzdFVyaTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gICAgICAgIGlmIChzdGFydENhbnZhc0lkKSB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdENoYW5nZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKG1hbmlmZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXNJbmRleCA9IG1hbmlmZXN0LnNlcXVlbmNlc1xuICAgICAgICAgICAgICA/IG1hbmlmZXN0LnNlcXVlbmNlc1swXT8uY2FudmFzZXM/LmZpbmRJbmRleChcbiAgICAgICAgICAgICAgICAgIChjKSA9PiBjLmlkID09PSBzdGFydENhbnZhc0lkXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IC0xO1xuICAgICAgICAgICAgaWYgKGNhbnZhc0luZGV4ICYmIGNhbnZhc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyhjYW52YXNJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc25hY2tCYXIub3Blbih0aGlzLmludGwuZHJvcERpc2FibGVkLCB1bmRlZmluZWQsIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRyYWdPdmVyKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHlsZVNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgdG9nZ2xlVG9vbGJhcnNTdGF0ZShtb2RlOiBWaWV3ZXJNb2RlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMuZm9vdGVyKSB7XG4gICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgY2FzZSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDpcbiAgICAgICAgICB0aGlzLnNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5zdGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmZvb3Rlci5zdGF0ZSA9XG4gICAgICAgICAgICAgICdzaG93JztcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkICYmIHRoaXMub3NkVG9vbGJhcikge1xuICAgICAgICAgICAgdGhpcy5vc2RUb29sYmFyLnN0YXRlID0gJ2hpZGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBWaWV3ZXJNb2RlLlBBR0U6XG4gICAgICAgICAgdGhpcy5zaG93SGVhZGVyQW5kRm9vdGVyU3RhdGUgPVxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuc3RhdGUgPVxuICAgICAgICAgICAgdGhpcy5mb290ZXIuc3RhdGUgPVxuICAgICAgICAgICAgICAnaGlkZSc7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCAmJiB0aGlzLm9zZFRvb2xiYXIpIHtcbiAgICAgICAgICAgIHRoaXMub3NkVG9vbGJhci5zdGF0ZSA9ICdzaG93JztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRNYW5pZmVzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UubG9hZCh0aGlzLm1hbmlmZXN0VXJpKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMudmlld2VyU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5yZXNpemVTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW51cCgpIHtcbiAgICB0aGlzLnZpZXdlclN0YXRlID0gbmV3IFZpZXdlclN0YXRlKCk7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnJlc2l6ZVNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMucmVzZXRFcnJvck1lc3NhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDdXJyZW50TWFuaWZlc3QoKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50TWFuaWZlc3QgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEVycm9yTWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGhhc01peEJsZW5kTW9kZVN1cHBvcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEodGhpcy5wbGF0Zm9ybS5GSVJFRk9YIHx8IHRoaXMucGxhdGZvcm0uU0FGQVJJKTtcbiAgfVxuXG4gIGdvVG9Ib21lWm9vbSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlICE9PSB0aGlzLnJlY29nbml6ZWRUZXh0TW9kZS5PTkxZKSB7XG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0hvbWVab29tKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2xhc3NlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ21vZGUtcGFnZSc6IHRoaXMubW9kZVNlcnZpY2UubW9kZSA9PT0gVmlld2VyTW9kZS5QQUdFLFxuICAgICAgJ21vZGUtcGFnZS16b29tZWQnOiB0aGlzLm1vZGVTZXJ2aWNlLmlzUGFnZVpvb21lZCgpLFxuICAgICAgJ21vZGUtZGFzaGJvYXJkJzogdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCxcbiAgICAgICdsYXlvdXQtb25lLXBhZ2UnOiB0aGlzLnZpZXdlckxheW91dCA9PT0gVmlld2VyTGF5b3V0Lk9ORV9QQUdFLFxuICAgICAgJ2xheW91dC10d28tcGFnZSc6IHRoaXMudmlld2VyTGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuVFdPX1BBR0UsXG4gICAgICAnY2FudmFzLXByZXNzZWQnOiB0aGlzLmlzQ2FudmFzUHJlc3NlZCxcbiAgICAgICdicm9rZW4tbWl4LWJsZW5kLW1vZGUnOiAhdGhpcy5oYXNNaXhCbGVuZE1vZGVTdXBwb3J0KCksXG4gICAgfTtcbiAgfVxufVxuIiwiPGRpdlxuICBbaWRdPVwiaWRcIlxuICBjbGFzcz1cInZpZXdlci1jb250YWluZXJcIlxuICBbbmdDbGFzc109XCJzZXRDbGFzc2VzKClcIlxuICBbaGlkZGVuXT1cImVycm9yTWVzc2FnZSAhPT0gbnVsbFwiXG4gIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXG4+XG4gIDxtaW1lLXNwaW5uZXI+PC9taW1lLXNwaW5uZXI+XG4gIDxtaW1lLXZpZXdlci1oZWFkZXJcbiAgICBjbGFzcz1cIm5hdmJhciBuYXZiYXItaGVhZGVyXCJcbiAgICAjbWltZUhlYWRlclxuICA+PC9taW1lLXZpZXdlci1oZWFkZXI+XG4gIDxtaW1lLW9zZC10b29sYmFyXG4gICAgKm5nSWY9XCJjb25maWc/Lm5hdmlnYXRpb25Db250cm9sRW5hYmxlZFwiXG4gICAgI21pbWVPc2RUb29sYmFyXG4gID48L21pbWUtb3NkLXRvb2xiYXI+XG5cbiAgPG1hdC1kcmF3ZXItY29udGFpbmVyIGNsYXNzPVwidmlld2VyLWRyYXdlci1jb250YWluZXJcIiBhdXRvc2l6ZT5cbiAgICA8bWF0LWRyYXdlclxuICAgICAgZGF0YS10ZXN0aWQ9XCJuZ3gtbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudC1jb250YWluZXJcIlxuICAgICAgbW9kZT1cInNpZGVcIlxuICAgICAgcG9zaXRpb249XCJlbmRcIlxuICAgICAgKG9wZW5lZENoYW5nZSk9XCJnb1RvSG9tZVpvb20oKVwiXG4gICAgICBbb3BlbmVkXT1cInJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHJlY29nbml6ZWRUZXh0TW9kZS5OT05FXCJcbiAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgb25seTogcmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9PT0gcmVjb2duaXplZFRleHRNb2RlLk9OTFksXG4gICAgICAgIHNwbGl0OiByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID09PSByZWNvZ25pemVkVGV4dE1vZGUuU1BMSVQsXG4gICAgICAgIG9wZW46IHNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9PT0gJ3Nob3cnXG4gICAgICB9XCJcbiAgICAgID48bWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudFxuICAgICAgICAqbmdJZj1cInJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHJlY29nbml6ZWRUZXh0TW9kZS5OT05FXCJcbiAgICAgID48L21pbWUtcmVjb2duaXplZC10ZXh0LWNvbnRlbnRcbiAgICA+PC9tYXQtZHJhd2VyPlxuICAgIDxtYXQtZHJhd2VyLWNvbnRlbnQ+XG4gICAgICA8ZGl2IFtpZF09XCJvcGVuc2VhZHJhZ29uSWRcIiBjbGFzcz1cIm9wZW5zZWFkcmFnb25cIj48L2Rpdj5cbiAgICA8L21hdC1kcmF3ZXItY29udGVudD5cbiAgPC9tYXQtZHJhd2VyLWNvbnRhaW5lcj5cblxuICA8bWltZS12aWV3ZXItZm9vdGVyXG4gICAgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWZvb3RlclwiXG4gICAgI21pbWVGb290ZXJcbiAgPjwvbWltZS12aWV3ZXItZm9vdGVyPlxuPC9kaXY+XG5cbjxkaXZcbiAgY2xhc3M9XCJlcnJvci1jb250YWluZXJcIlxuICAqbmdJZj1cImVycm9yTWVzc2FnZVwiXG4gIGZ4TGF5b3V0PVwiY29sdW1uXCJcbiAgZnhMYXlvdXRBbGlnbj1cImNlbnRlciBjZW50ZXJcIlxuPlxuICA8c3Bhbj57eyBpbnRsLnNvbWV0aGluZ0hhc0dvbmVXcm9uZ0xhYmVsIH19PC9zcGFuPlxuPC9kaXY+XG4iXX0=