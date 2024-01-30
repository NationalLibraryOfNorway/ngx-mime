import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, Output, ViewChild, ViewContainerRef, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
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
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { VIEWER_PROVIDERS } from './viewer.providers';
import { slideInLeft } from './../shared/animations';
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
import * as i21 from "@angular/material/sidenav";
import * as i22 from "./osd-toolbar/osd-toolbar.component";
import * as i23 from "./recognized-text-content/recognized-text-content.component";
import * as i24 from "./viewer-footer/viewer-footer.component";
import * as i25 from "./viewer-header/viewer-header.component";
import * as i26 from "./viewer-spinner/viewer-spinner.component";
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
        this.manifestUri = null;
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
        this.osdToolbarState = 'hide';
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
            this.viewerLayoutService.setConfig(this.config);
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
                    if (this.config.navigationControlEnabled && this.osdToolbarState) {
                        this.osdToolbarState = 'hide';
                    }
                    break;
                case ViewerMode.PAGE:
                    this.showHeaderAndFooterState =
                        this.header.state =
                            this.footer.state =
                                'hide';
                    if (this.config.navigationControlEnabled && this.osdToolbarState) {
                        this.osdToolbarState = 'show';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerComponent, deps: [{ token: i1.MatSnackBar }, { token: i2.MimeViewerIntl }, { token: i3.IiifManifestService }, { token: i4.ViewDialogService }, { token: i5.InformationDialogService }, { token: i6.AttributionDialogService }, { token: i7.ContentSearchDialogService }, { token: i8.HelpDialogService }, { token: i9.ViewerService }, { token: i10.MimeResizeService }, { token: i0.ChangeDetectorRef }, { token: i11.ModeService }, { token: i12.IiifContentSearchService }, { token: i13.AccessKeysService }, { token: i14.CanvasService }, { token: i15.ViewerLayoutService }, { token: i16.StyleService }, { token: i17.AltoService }, { token: i0.NgZone }, { token: i18.Platform }, { token: i19.CanvasGroupDialogService }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.1", type: ViewerComponent, selector: "mime-viewer", inputs: { manifestUri: "manifestUri", q: "q", canvasIndex: "canvasIndex", config: "config", tabIndex: "tabIndex" }, outputs: { viewerModeChanged: "viewerModeChanged", canvasChanged: "canvasChanged", qChanged: "qChanged", manifestChanged: "manifestChanged", recognizedTextContentModeChanged: "recognizedTextContentModeChanged" }, host: { listeners: { "keydown": "handleKeys($event)", "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, providers: VIEWER_PROVIDERS, viewQueries: [{ propertyName: "header", first: true, predicate: ["mimeHeader"], descendants: true, static: true }, { propertyName: "footer", first: true, predicate: ["mimeFooter"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    [@slideInLeft]=\"osdToolbarState\"\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  *ngIf=\"errorMessage\"\n  class=\"error-container flex items-center justify-center\"\n>\n  {{ intl.somethingHasGoneWrongLabel }}\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"], dependencies: [{ kind: "directive", type: i20.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i20.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i21.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i21.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i21.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "component", type: i22.OsdToolbarComponent, selector: "mime-osd-toolbar" }, { kind: "component", type: i23.RecognizedTextContentComponent, selector: "mime-recognized-text-content" }, { kind: "component", type: i24.ViewerFooterComponent, selector: "mime-viewer-footer" }, { kind: "component", type: i25.ViewerHeaderComponent, selector: "mime-viewer-header" }, { kind: "component", type: i26.ViewerSpinnerComponent, selector: "mime-spinner" }], animations: [slideInLeft], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.1", ngImport: i0, type: ViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer', animations: [slideInLeft], changeDetection: ChangeDetectionStrategy.OnPush, providers: VIEWER_PROVIDERS, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  <mime-osd-toolbar\n    *ngIf=\"config?.navigationControlEnabled\"\n    [@slideInLeft]=\"osdToolbarState\"\n  ></mime-osd-toolbar>\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n      ><mime-recognized-text-content\n        *ngIf=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      ></mime-recognized-text-content\n    ></mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n<div\n  *ngIf=\"errorMessage\"\n  class=\"error-container flex items-center justify-center\"\n>\n  {{ intl.somethingHasGoneWrongLabel }}\n</div>\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBRU4sU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNwRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8s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Q1UsTUFBTTtzQkFBckIsS0FBSztnQkFDVSxRQUFRO3NCQUF2QixLQUFLO2dCQUNJLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csZUFBZTtzQkFBeEIsTUFBTTtnQkFFUCxnQ0FBZ0M7c0JBRC9CLE1BQU07Z0JBb0JDLE1BQU07c0JBRGIsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUdqQyxNQUFNO3NCQURiLFNBQVM7dUJBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkF5UXpDLFVBQVU7c0JBRFQsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTTVCLE1BQU07c0JBRFosWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBc0N6QixVQUFVO3NCQURoQixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFPN0IsV0FBVztzQkFEakIsWUFBWTt1QkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IGludGVydmFsLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRocm90dGxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vYXR0cmlidXRpb24tZGlhbG9nL2F0dHJpYnV0aW9uLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc0dyb3VwRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2NhbnZhcy1ncm91cC1kaWFsb2cvY2FudmFzLWdyb3VwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY29udGVudC1zZWFyY2gtZGlhbG9nL2NvbnRlbnQtc2VhcmNoLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEFjY2Vzc0tleXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hY2Nlc3Mta2V5cy1oYW5kbGVyLXNlcnZpY2UvYWNjZXNzLWtleXMuc2VydmljZSc7XG5pbXBvcnQgeyBBbHRvU2VydmljZSB9IGZyb20gJy4uL2NvcmUvYWx0by1zZXJ2aWNlL2FsdG8uc2VydmljZSc7XG5pbXBvcnQgeyBDYW52YXNTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9jYW52YXMtc2VydmljZS9jYW52YXMtc2VydmljZSc7XG5pbXBvcnQgeyBJaWlmTWFuaWZlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlJztcbmltcG9ydCB7IE1hbmlmZXN0VXRpbHMgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXV0aWxzJztcbmltcG9ydCB7IE1pbWVWaWV3ZXJJbnRsIH0gZnJvbSAnLi4vY29yZS9pbnRsJztcbmltcG9ydCB7IE1pbWVSZXNpemVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9taW1lLXJlc2l6ZS1zZXJ2aWNlL21pbWUtcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWltZVZpZXdlckNvbmZpZyB9IGZyb20gJy4uL2NvcmUvbWltZS12aWV3ZXItY29uZmlnJztcbmltcG9ydCB7IE1vZGVTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9tb2RlLXNlcnZpY2UvbW9kZS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE1vZGVDaGFuZ2VzLFxuICBSZWNvZ25pemVkVGV4dE1vZGUsXG4gIFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMsXG4gIFZpZXdlck1vZGUsXG59IGZyb20gJy4uL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7IE1hbmlmZXN0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvbWFuaWZlc3QnO1xuaW1wb3J0IHsgVmlld2VyTGF5b3V0IH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLWxheW91dCc7XG5pbXBvcnQgeyBWaWV3ZXJPcHRpb25zIH0gZnJvbSAnLi4vY29yZS9tb2RlbHMvdmlld2VyLW9wdGlvbnMnO1xuaW1wb3J0IHsgVmlld2VyU3RhdGUgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXJTdGF0ZSc7XG5pbXBvcnQgeyBTdHlsZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3N0eWxlLXNlcnZpY2Uvc3R5bGUuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXRTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS92aWV3ZXItbGF5b3V0LXNlcnZpY2Uvdmlld2VyLWxheW91dC1zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1zZXJ2aWNlL3ZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEhlbHBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vaGVscC1kaWFsb2cvaGVscC1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9pbmZvcm1hdGlvbi1kaWFsb2cvaW5mb3JtYXRpb24tZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld0RpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi92aWV3LWRpYWxvZy92aWV3LWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZDb250ZW50U2VhcmNoU2VydmljZSB9IGZyb20gJy4vLi4vY29yZS9paWlmLWNvbnRlbnQtc2VhcmNoLXNlcnZpY2UvaWlpZi1jb250ZW50LXNlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdCB9IGZyb20gJy4vLi4vY29yZS9tb2RlbHMvc2VhcmNoLXJlc3VsdCc7XG5pbXBvcnQgeyBWaWV3ZXJGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci1mb290ZXIvdmlld2VyLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VySGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3ZXItaGVhZGVyL3ZpZXdlci1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZJRVdFUl9QUk9WSURFUlMgfSBmcm9tICcuL3ZpZXdlci5wcm92aWRlcnMnO1xuaW1wb3J0IHsgc2xpZGVJbkxlZnQgfSBmcm9tICcuLy4uL3NoYXJlZC9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWltZS12aWV3ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdmlld2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtzbGlkZUluTGVmdF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFZJRVdFUl9QUk9WSURFUlMsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwdWJsaWMgbWFuaWZlc3RVcmk6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgcSE6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGNhbnZhc0luZGV4ID0gMDtcbiAgQElucHV0KCkgcHVibGljIGNvbmZpZzogTWltZVZpZXdlckNvbmZpZyA9IG5ldyBNaW1lVmlld2VyQ29uZmlnKCk7XG4gIEBJbnB1dCgpIHB1YmxpYyB0YWJJbmRleCA9IDA7XG4gIEBPdXRwdXQoKSB2aWV3ZXJNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFZpZXdlck1vZGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY2FudmFzQ2hhbmdlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBxQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBtYW5pZmVzdENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxNYW5pZmVzdD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPFJlY29nbml6ZWRUZXh0TW9kZT4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcmVjb2duaXplZFRleHRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlO1xuICBpZCA9ICduZ3gtbWltZS1taW1lVmlld2VyJztcbiAgb3BlbnNlYWRyYWdvbklkID0gJ29wZW5zZWFkcmFnb24nO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSBpc0NhbnZhc1ByZXNzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjdXJyZW50TWFuaWZlc3QhOiBNYW5pZmVzdCB8IG51bGw7XG4gIHByaXZhdGUgdmlld2VyTGF5b3V0OiBWaWV3ZXJMYXlvdXQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB2aWV3ZXJTdGF0ZSA9IG5ldyBWaWV3ZXJTdGF0ZSgpO1xuXG4gIHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGU6IFJlY29nbml6ZWRUZXh0TW9kZSA9IFJlY29nbml6ZWRUZXh0TW9kZS5OT05FO1xuICBzaG93SGVhZGVyQW5kRm9vdGVyU3RhdGUgPSAnaGlkZSc7XG4gIG9zZFRvb2xiYXJTdGF0ZSA9ICdoaWRlJztcbiAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gVmlld2NoaWxkc1xuICBAVmlld0NoaWxkKCdtaW1lSGVhZGVyJywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSBoZWFkZXIhOiBWaWV3ZXJIZWFkZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ21pbWVGb290ZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGZvb3RlciE6IFZpZXdlckZvb3RlckNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgIHB1YmxpYyBpbnRsOiBNaW1lVmlld2VySW50bCxcbiAgICBwcml2YXRlIGlpaWZNYW5pZmVzdFNlcnZpY2U6IElpaWZNYW5pZmVzdFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3RGlhbG9nU2VydmljZTogVmlld0RpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2U6IEluZm9ybWF0aW9uRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGF0dHJpYnV0aW9uRGlhbG9nU2VydmljZTogQXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2U6IENvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgaGVscERpYWxvZ1NlcnZpY2U6IEhlbHBEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyU2VydmljZTogVmlld2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJlc2l6ZVNlcnZpY2U6IE1pbWVSZXNpemVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgbW9kZVNlcnZpY2U6IE1vZGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlOiBJaWlmQ29udGVudFNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBhY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2U6IEFjY2Vzc0tleXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FudmFzU2VydmljZTogQ2FudmFzU2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdlckxheW91dFNlcnZpY2U6IFZpZXdlckxheW91dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcbiAgICBwcml2YXRlIGFsdG9TZXJ2aWNlOiBBbHRvU2VydmljZSxcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBjYW52YXNHcm91cERpYWxvZ1NlcnZpY2U6IENhbnZhc0dyb3VwRGlhbG9nU2VydmljZSxcbiAgICBlbDogRWxlbWVudFJlZixcbiAgICB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIHRoaXMuaWQgPSB0aGlzLnZpZXdlclNlcnZpY2UuaWQ7XG4gICAgdGhpcy5vcGVuc2VhZHJhZ29uSWQgPSB0aGlzLnZpZXdlclNlcnZpY2Uub3BlbnNlYWRyYWdvbklkO1xuICAgIGluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGluZm9ybWF0aW9uRGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0RpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICB2aWV3RGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIGhlbHBEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgaGVscERpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgY2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIHJlc2l6ZVNlcnZpY2UuZWwgPSBlbDtcbiAgfVxuXG4gIGdldCBtaW1lSGVhZGVyQmVmb3JlUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmhlYWRlci5taW1lSGVhZGVyQmVmb3JlO1xuICB9XG5cbiAgZ2V0IG1pbWVIZWFkZXJBZnRlclJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXIubWltZUhlYWRlckFmdGVyO1xuICB9XG5cbiAgZ2V0IG1pbWVGb290ZXJCZWZvcmVSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyLm1pbWVGb290ZXJCZWZvcmU7XG4gIH1cblxuICBnZXQgbWltZUZvb3RlckFmdGVyUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmZvb3Rlci5taW1lRm9vdGVyQWZ0ZXI7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0eWxlU2VydmljZS5pbml0aWFsaXplKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgICAgICB0aGlzLm1hbmlmZXN0Q2hhbmdlZC5uZXh0KG1hbmlmZXN0KTtcbiAgICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5pbml0KFxuICAgICAgICAgICAgICBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZChtYW5pZmVzdClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPVxuICAgICAgICAgICAgICB0aGlzLmFsdG9TZXJ2aWNlLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5zZXRVcFZpZXdlcihtYW5pZmVzdCwgdGhpcy5jb25maWcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmF0dHJpYnV0aW9uRGlhbG9nRW5hYmxlZCAmJiBtYW5pZmVzdC5hdHRyaWJ1dGlvbikge1xuICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5vcGVuKFxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmF0dHJpYnV0aW9uRGlhbG9nSGlkZVRpbWVvdXRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucSkge1xuICAgICAgICAgICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWFyY2gobWFuaWZlc3QsIHRoaXMucSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2Uub25Pc2RSZWFkeUNoYW5nZS5zdWJzY3JpYmUoKHN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIC8vIERvbid0IHJlc2V0IGN1cnJlbnQgcGFnZSB3aGVuIHN3aXRjaGluZyBsYXlvdXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN0YXRlICYmXG4gICAgICAgICAgdGhpcy5jYW52YXNJbmRleCAmJlxuICAgICAgICAgICF0aGlzLmNhbnZhc1NlcnZpY2UuY3VycmVudENhbnZhc0dyb3VwSW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXModGhpcy5jYW52YXNJbmRleCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmVycm9yTWVzc2FnZS5zdWJzY3JpYmUoXG4gICAgICAgIChlcnJvcjogc3RyaW5nIHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVzZXRDdXJyZW50TWFuaWZlc3QoKTtcbiAgICAgICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IGVycm9yO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5vblFDaGFuZ2Uuc3Vic2NyaWJlKChxOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy5xQ2hhbmdlZC5lbWl0KHEpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZSgoc3I6IFNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaGlnaGxpZ2h0KHNyKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaXNDYW52YXNQcmVzc2VkLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5tb2RlU2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoKG1vZGU6IE1vZGVDaGFuZ2VzKSA9PiB7XG4gICAgICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVUb29sYmFyc1N0YXRlKG1vZGUuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgbW9kZS5wcmV2aW91c1ZhbHVlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCAmJlxuICAgICAgICAgIG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLlBBR0VcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS52aWV3RGlhbG9nU3RhdGUuaXNPcGVuID1cbiAgICAgICAgICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuaXNPcGVuID1cbiAgICAgICAgICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLnNlbGVjdGVkSW5kZXggPVxuICAgICAgICAgICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudHNTZWFyY2hEaWFsb2dTdGF0ZS5pc09wZW4gPVxuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmhlbHBEaWFsb2dTdGF0ZS5pc09wZW4gPVxuICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGUuY3VycmVudFZhbHVlID09PSBWaWV3ZXJNb2RlLkRBU0hCT0FSRCkge1xuICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUudmlld0RpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2Uub3BlbihcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5zZWxlY3RlZEluZGV4XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50c1NlYXJjaERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmhlbHBEaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJNb2RlQ2hhbmdlZC5lbWl0KG1vZGUuY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjYW52YXNJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0J5Q2FudmFzSW5kZXgoY2FudmFzR3JvdXBJbmRleCk7XG4gICAgICAgICAgaWYgKGNhbnZhc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDaGFuZ2VkLmVtaXQoY2FudmFzSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5yZXNpemVTZXJ2aWNlLm9uUmVzaXplXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRocm90dGxlKCh2YWwpID0+XG4gICAgICAgICAgICBpbnRlcnZhbChWaWV3ZXJPcHRpb25zLnRyYW5zaXRpb25zLk9TREFuaW1hdGlvblRpbWUpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhvbWUoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgfSwgVmlld2VyT3B0aW9ucy50cmFuc2l0aW9ucy5PU0RBbmltYXRpb25UaW1lKTtcbiAgICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5vbkNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICh2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCkgPT4ge1xuICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0ID0gdmlld2VyTGF5b3V0O1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLm9uUmVjb2duaXplZFRleHRDb250ZW50TW9kZUNoYW5nZSQuc3Vic2NyaWJlKFxuICAgICAgICAocmVjb2duaXplZFRleHRNb2RlQ2hhbmdlczogUmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICAgIHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9XG4gICAgICAgICAgICByZWNvZ25pemVkVGV4dE1vZGVDaGFuZ2VzLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VkLmVtaXQoXG4gICAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydjb25maWcnXSkge1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLnZpZXdlckxheW91dFNlcnZpY2Uuc2V0Q29uZmlnKHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmFsdG9TZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snbWFuaWZlc3RVcmknXSkge1xuICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPSB0aGlzLmNvbmZpZy5pbml0Vmlld2VyTW9kZTtcbiAgICAgIHRoaXMubWFuaWZlc3RVcmkgPSBjaGFuZ2VzWydtYW5pZmVzdFVyaSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3EnXSkge1xuICAgICAgdGhpcy5xID0gY2hhbmdlc1sncSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRNYW5pZmVzdCkge1xuICAgICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZWFyY2godGhpcy5jdXJyZW50TWFuaWZlc3QsIHRoaXMucSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ2NhbnZhc0luZGV4J10pIHtcbiAgICAgIHRoaXMuY2FudmFzSW5kZXggPSBjaGFuZ2VzWydjYW52YXNJbmRleCddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRNYW5pZmVzdCkge1xuICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyh0aGlzLmNhbnZhc0luZGV4LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlS2V5cyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmhhbmRsZUtleUV2ZW50cyhldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJvcChldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5jb25maWcuaXNEcm9wRW5hYmxlZCkge1xuICAgICAgY29uc3QgdXJsID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ1VSTCcpO1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTCh1cmwpLnNlYXJjaFBhcmFtcztcbiAgICAgIGNvbnN0IG1hbmlmZXN0VXJpID0gcGFyYW1zLmdldCgnbWFuaWZlc3QnKTtcbiAgICAgIGNvbnN0IHN0YXJ0Q2FudmFzSWQgPSBwYXJhbXMuZ2V0KCdjYW52YXMnKTtcbiAgICAgIGlmIChtYW5pZmVzdFVyaSkge1xuICAgICAgICB0aGlzLm1hbmlmZXN0VXJpID0gbWFuaWZlc3RVcmkuc3RhcnRzV2l0aCgnLy8nKVxuICAgICAgICAgID8gYCR7bG9jYXRpb24ucHJvdG9jb2x9JHttYW5pZmVzdFVyaX1gXG4gICAgICAgICAgOiBtYW5pZmVzdFVyaTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMubG9hZE1hbmlmZXN0KCk7XG4gICAgICAgIGlmIChzdGFydENhbnZhc0lkKSB7XG4gICAgICAgICAgdGhpcy5tYW5pZmVzdENoYW5nZWQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKG1hbmlmZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYW52YXNJbmRleCA9IG1hbmlmZXN0LnNlcXVlbmNlc1xuICAgICAgICAgICAgICA/IG1hbmlmZXN0LnNlcXVlbmNlc1swXT8uY2FudmFzZXM/LmZpbmRJbmRleChcbiAgICAgICAgICAgICAgICAgIChjKSA9PiBjLmlkID09PSBzdGFydENhbnZhc0lkXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IC0xO1xuICAgICAgICAgICAgaWYgKGNhbnZhc0luZGV4ICYmIGNhbnZhc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2UuZ29Ub0NhbnZhcyhjYW52YXNJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc25hY2tCYXIub3Blbih0aGlzLmludGwuZHJvcERpc2FibGVkLCB1bmRlZmluZWQsIHtcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRyYWdPdmVyKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5zdHlsZVNlcnZpY2UuZGVzdHJveSgpO1xuICB9XG5cbiAgdG9nZ2xlVG9vbGJhcnNTdGF0ZShtb2RlOiBWaWV3ZXJNb2RlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGVhZGVyICYmIHRoaXMuZm9vdGVyKSB7XG4gICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgY2FzZSBWaWV3ZXJNb2RlLkRBU0hCT0FSRDpcbiAgICAgICAgICB0aGlzLnNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5zdGF0ZSA9XG4gICAgICAgICAgICB0aGlzLmZvb3Rlci5zdGF0ZSA9XG4gICAgICAgICAgICAgICdzaG93JztcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkICYmIHRoaXMub3NkVG9vbGJhclN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9zZFRvb2xiYXJTdGF0ZSA9ICdoaWRlJztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVmlld2VyTW9kZS5QQUdFOlxuICAgICAgICAgIHRoaXMuc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0YXRlID1cbiAgICAgICAgICAgICAgJ2hpZGUnO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgJiYgdGhpcy5vc2RUb29sYmFyU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub3NkVG9vbGJhclN0YXRlID0gJ3Nob3cnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZE1hbmlmZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuaWlpZk1hbmlmZXN0U2VydmljZS5sb2FkKHRoaXMubWFuaWZlc3RVcmkpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemUoKSB7XG4gICAgdGhpcy5hY2Nlc3NLZXlzSGFuZGxlclNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnJlc2l6ZVNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbnVwKCkge1xuICAgIHRoaXMudmlld2VyU3RhdGUgPSBuZXcgVmlld2VyU3RhdGUoKTtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMucmVzaXplU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZXNldEVycm9yTWVzc2FnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEN1cnJlbnRNYW5pZmVzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRNYW5pZmVzdCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0RXJyb3JNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgaGFzTWl4QmxlbmRNb2RlU3VwcG9ydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLnBsYXRmb3JtLkZJUkVGT1ggfHwgdGhpcy5wbGF0Zm9ybS5TQUZBUkkpO1xuICB9XG5cbiAgZ29Ub0hvbWVab29tKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHRoaXMucmVjb2duaXplZFRleHRNb2RlLk9OTFkpIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvSG9tZVpvb20oKTtcbiAgICB9XG4gIH1cblxuICBzZXRDbGFzc2VzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbW9kZS1wYWdlJzogdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UsXG4gICAgICAnbW9kZS1wYWdlLXpvb21lZCc6IHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCksXG4gICAgICAnbW9kZS1kYXNoYm9hcmQnOiB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJELFxuICAgICAgJ2xheW91dC1vbmUtcGFnZSc6IHRoaXMudmlld2VyTGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UsXG4gICAgICAnbGF5b3V0LXR3by1wYWdlJzogdGhpcy52aWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRSxcbiAgICAgICdjYW52YXMtcHJlc3NlZCc6IHRoaXMuaXNDYW52YXNQcmVzc2VkLFxuICAgICAgJ2Jyb2tlbi1taXgtYmxlbmQtbW9kZSc6ICF0aGlzLmhhc01peEJsZW5kTW9kZVN1cHBvcnQoKSxcbiAgICB9O1xuICB9XG59XG4iLCI8ZGl2XG4gIFtpZF09XCJpZFwiXG4gIGNsYXNzPVwidmlld2VyLWNvbnRhaW5lclwiXG4gIFtuZ0NsYXNzXT1cInNldENsYXNzZXMoKVwiXG4gIFtoaWRkZW5dPVwiZXJyb3JNZXNzYWdlICE9PSBudWxsXCJcbiAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcbj5cbiAgPG1pbWUtc3Bpbm5lcj48L21pbWUtc3Bpbm5lcj5cbiAgPG1pbWUtdmlld2VyLWhlYWRlclxuICAgIGNsYXNzPVwibmF2YmFyIG5hdmJhci1oZWFkZXJcIlxuICAgICNtaW1lSGVhZGVyXG4gID48L21pbWUtdmlld2VyLWhlYWRlcj5cbiAgPG1pbWUtb3NkLXRvb2xiYXJcbiAgICAqbmdJZj1cImNvbmZpZz8ubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkXCJcbiAgICBbQHNsaWRlSW5MZWZ0XT1cIm9zZFRvb2xiYXJTdGF0ZVwiXG4gID48L21pbWUtb3NkLXRvb2xiYXI+XG5cbiAgPG1hdC1kcmF3ZXItY29udGFpbmVyIGNsYXNzPVwidmlld2VyLWRyYXdlci1jb250YWluZXJcIiBhdXRvc2l6ZT5cbiAgICA8bWF0LWRyYXdlclxuICAgICAgZGF0YS10ZXN0aWQ9XCJuZ3gtbWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudC1jb250YWluZXJcIlxuICAgICAgbW9kZT1cInNpZGVcIlxuICAgICAgcG9zaXRpb249XCJlbmRcIlxuICAgICAgKG9wZW5lZENoYW5nZSk9XCJnb1RvSG9tZVpvb20oKVwiXG4gICAgICBbb3BlbmVkXT1cInJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHJlY29nbml6ZWRUZXh0TW9kZS5OT05FXCJcbiAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgb25seTogcmVjb2duaXplZFRleHRDb250ZW50TW9kZSA9PT0gcmVjb2duaXplZFRleHRNb2RlLk9OTFksXG4gICAgICAgIHNwbGl0OiByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID09PSByZWNvZ25pemVkVGV4dE1vZGUuU1BMSVQsXG4gICAgICAgIG9wZW46IHNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9PT0gJ3Nob3cnXG4gICAgICB9XCJcbiAgICAgID48bWltZS1yZWNvZ25pemVkLXRleHQtY29udGVudFxuICAgICAgICAqbmdJZj1cInJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgIT09IHJlY29nbml6ZWRUZXh0TW9kZS5OT05FXCJcbiAgICAgID48L21pbWUtcmVjb2duaXplZC10ZXh0LWNvbnRlbnRcbiAgICA+PC9tYXQtZHJhd2VyPlxuICAgIDxtYXQtZHJhd2VyLWNvbnRlbnQ+XG4gICAgICA8ZGl2IFtpZF09XCJvcGVuc2VhZHJhZ29uSWRcIiBjbGFzcz1cIm9wZW5zZWFkcmFnb25cIj48L2Rpdj5cbiAgICA8L21hdC1kcmF3ZXItY29udGVudD5cbiAgPC9tYXQtZHJhd2VyLWNvbnRhaW5lcj5cblxuICA8bWltZS12aWV3ZXItZm9vdGVyXG4gICAgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWZvb3RlclwiXG4gICAgI21pbWVGb290ZXJcbiAgPjwvbWltZS12aWV3ZXItZm9vdGVyPlxuPC9kaXY+XG5cbjxkaXZcbiAgKm5nSWY9XCJlcnJvck1lc3NhZ2VcIlxuICBjbGFzcz1cImVycm9yLWNvbnRhaW5lciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiXG4+XG4gIHt7IGludGwuc29tZXRoaW5nSGFzR29uZVdyb25nTGFiZWwgfX1cbjwvZGl2PlxuIl19