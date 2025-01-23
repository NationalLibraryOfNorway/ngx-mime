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
            this.viewerService.home();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ViewerComponent, deps: [{ token: i1.MatSnackBar }, { token: i2.MimeViewerIntl }, { token: i3.IiifManifestService }, { token: i4.ViewDialogService }, { token: i5.InformationDialogService }, { token: i6.AttributionDialogService }, { token: i7.ContentSearchDialogService }, { token: i8.HelpDialogService }, { token: i9.ViewerService }, { token: i10.MimeResizeService }, { token: i0.ChangeDetectorRef }, { token: i11.ModeService }, { token: i12.IiifContentSearchService }, { token: i13.AccessKeysService }, { token: i14.CanvasService }, { token: i15.ViewerLayoutService }, { token: i16.StyleService }, { token: i17.AltoService }, { token: i0.NgZone }, { token: i18.Platform }, { token: i19.CanvasGroupDialogService }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.9", type: ViewerComponent, selector: "mime-viewer", inputs: { manifestUri: "manifestUri", q: "q", canvasIndex: "canvasIndex", config: "config", tabIndex: "tabIndex" }, outputs: { viewerModeChanged: "viewerModeChanged", canvasChanged: "canvasChanged", qChanged: "qChanged", manifestChanged: "manifestChanged", recognizedTextContentModeChanged: "recognizedTextContentModeChanged" }, host: { listeners: { "keydown": "handleKeys($event)", "drop": "onDrop($event)", "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)" } }, providers: VIEWER_PROVIDERS, viewQueries: [{ propertyName: "header", first: true, predicate: ["mimeHeader"], descendants: true, static: true }, { propertyName: "footer", first: true, predicate: ["mimeFooter"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  @if (config.navigationControlEnabled) {\n    <mime-osd-toolbar [@slideInLeft]=\"osdToolbarState\"></mime-osd-toolbar>\n  }\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n    >\n      @if (recognizedTextContentMode !== recognizedTextMode.NONE) {\n        <mime-recognized-text-content></mime-recognized-text-content>\n      }\n    </mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n@if (errorMessage) {\n  <div class=\"error-container flex items-center justify-center\">\n    {{ intl.somethingHasGoneWrongLabel }}\n  </div>\n}\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container .openseadragon{-webkit-user-select:none;user-select:none}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"], dependencies: [{ kind: "directive", type: i20.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: i21.MatDrawer, selector: "mat-drawer", inputs: ["position", "mode", "disableClose", "autoFocus", "opened"], outputs: ["openedChange", "opened", "openedStart", "closed", "closedStart", "positionChanged"], exportAs: ["matDrawer"] }, { kind: "component", type: i21.MatDrawerContainer, selector: "mat-drawer-container", inputs: ["autosize", "hasBackdrop"], outputs: ["backdropClick"], exportAs: ["matDrawerContainer"] }, { kind: "component", type: i21.MatDrawerContent, selector: "mat-drawer-content" }, { kind: "component", type: i22.OsdToolbarComponent, selector: "mime-osd-toolbar" }, { kind: "component", type: i23.RecognizedTextContentComponent, selector: "mime-recognized-text-content" }, { kind: "component", type: i24.ViewerFooterComponent, selector: "mime-viewer-footer" }, { kind: "component", type: i25.ViewerHeaderComponent, selector: "mime-viewer-header" }, { kind: "component", type: i26.ViewerSpinnerComponent, selector: "mime-spinner" }], animations: [slideInLeft], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.9", ngImport: i0, type: ViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mime-viewer', animations: [slideInLeft], changeDetection: ChangeDetectionStrategy.OnPush, providers: VIEWER_PROVIDERS, template: "<div\n  [id]=\"id\"\n  class=\"viewer-container\"\n  [ngClass]=\"setClasses()\"\n  [hidden]=\"errorMessage !== null\"\n  [tabIndex]=\"tabIndex\"\n>\n  <mime-spinner></mime-spinner>\n  <mime-viewer-header\n    class=\"navbar navbar-header\"\n    #mimeHeader\n  ></mime-viewer-header>\n  @if (config.navigationControlEnabled) {\n    <mime-osd-toolbar [@slideInLeft]=\"osdToolbarState\"></mime-osd-toolbar>\n  }\n\n  <mat-drawer-container class=\"viewer-drawer-container\" autosize>\n    <mat-drawer\n      data-testid=\"ngx-mime-recognized-text-content-container\"\n      mode=\"side\"\n      position=\"end\"\n      (openedChange)=\"goToHomeZoom()\"\n      [opened]=\"recognizedTextContentMode !== recognizedTextMode.NONE\"\n      [ngClass]=\"{\n        only: recognizedTextContentMode === recognizedTextMode.ONLY,\n        split: recognizedTextContentMode === recognizedTextMode.SPLIT,\n        open: showHeaderAndFooterState === 'show'\n      }\"\n    >\n      @if (recognizedTextContentMode !== recognizedTextMode.NONE) {\n        <mime-recognized-text-content></mime-recognized-text-content>\n      }\n    </mat-drawer>\n    <mat-drawer-content>\n      <div [id]=\"openseadragonId\" class=\"openseadragon\"></div>\n    </mat-drawer-content>\n  </mat-drawer-container>\n\n  <mime-viewer-footer\n    class=\"navbar navbar-footer\"\n    #mimeFooter\n  ></mime-viewer-footer>\n</div>\n\n@if (errorMessage) {\n  <div class=\"error-container flex items-center justify-center\">\n    {{ intl.somethingHasGoneWrongLabel }}\n  </div>\n}\n", styles: [".viewer-container{overflow:hidden;box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column}.viewer-container .openseadragon{-webkit-user-select:none;user-select:none}.viewer-container.mode-page-zoomed::ng-deep .tile:hover{cursor:-webkit-grab}.viewer-container.canvas-pressed,.viewer-container.canvas-pressed::ng-deep .tile:hover{cursor:grabbing;cursor:-webkit-grabbing}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group .tile{stroke:#00000026;stroke-width:8;transition:.25s ease stroke}.viewer-container.mode-dashboard.layout-one-page::ng-deep .tile:hover,.viewer-container.mode-dashboard.layout-two-page::ng-deep .page-group:hover .tile{stroke:#00000073}.viewer-container.broken-mix-blend-mode ::ng-deep .hit{mix-blend-mode:unset!important;fill:#ff09}.viewer-container.broken-mix-blend-mode ::ng-deep .selected{fill:#ff890099}.viewer-container ::ng-deep .openseadragon-container{flex-grow:1}.viewer-container ::ng-deep .openseadragon-canvas:focus{outline:none}.viewer-container ::ng-deep .tile{cursor:pointer;fill-opacity:0}.viewer-container ::ng-deep .hit{mix-blend-mode:multiply;fill:#ff0}.viewer-container ::ng-deep .selected{fill:#ff8900;stroke:#613400;stroke-width:4px}.viewer-container .viewer-drawer-container{width:100%;height:100%}.openseadragon{display:flex;flex-grow:1;flex-direction:column;opacity:0;width:100%;height:100%}.navbar{position:absolute;width:100%;overflow:hidden;z-index:2}.navbar-header{top:0}.navbar-footer{bottom:0}.error-container{width:100%;height:100%}[hidden]{display:none}mat-drawer.split{width:25%}@media only screen and (max-width: 599px){mat-drawer.split{width:33%}}mat-drawer.only{width:100%}mat-drawer.only ::ng-deep mime-recognized-text-content .content{max-width:980px}.open{height:calc(100% - 128px)!important;top:64px}@media only screen and (max-width: 599px){.open{height:calc(100% - 112px)!important;top:56px}}\n"] }]
        }], ctorParameters: () => [{ type: i1.MatSnackBar }, { type: i2.MimeViewerIntl }, { type: i3.IiifManifestService }, { type: i4.ViewDialogService }, { type: i5.InformationDialogService }, { type: i6.AttributionDialogService }, { type: i7.ContentSearchDialogService }, { type: i8.HelpDialogService }, { type: i9.ViewerService }, { type: i10.MimeResizeService }, { type: i0.ChangeDetectorRef }, { type: i11.ModeService }, { type: i12.IiifContentSearchService }, { type: i13.AccessKeysService }, { type: i14.CanvasService }, { type: i15.ViewerLayoutService }, { type: i16.StyleService }, { type: i17.AltoService }, { type: i0.NgZone }, { type: i18.Platform }, { type: i19.CanvasGroupDialogService }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }], propDecorators: { manifestUri: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmd4LW1pbWUvc3JjL2xpYi92aWV3ZXIvdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBRU4sU0FBUyxFQUNULGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNwRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8s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QUFJLENBQUMsc0JBQXNCLEVBQUU7U0FDeEQsQ0FBQztJQUNKLENBQUM7OEdBdmJVLGVBQWU7a0dBQWYsZUFBZSx5Z0JBRmYsZ0JBQWdCLHdRQzlEN0IsOC9DQWlEQSx5aEdEV2MsQ0FBQyxXQUFXLENBQUM7OzJGQUlkLGVBQWU7a0JBUjNCLFNBQVM7K0JBQ0UsYUFBYSxjQUdYLENBQUMsV0FBVyxDQUFDLG1CQUNSLHVCQUF1QixDQUFDLE1BQU0sYUFDcEMsZ0JBQWdCOzJ3QkFHWCxXQUFXO3NCQUExQixLQUFLO2dCQUNVLENBQUM7c0JBQWhCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSztnQkFDVSxNQUFNO3NCQUFyQixLQUFLO2dCQUNVLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ0ksaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUVQLGdDQUFnQztzQkFEL0IsTUFBTTtnQkFvQkMsTUFBTTtzQkFEYixTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBR2pDLE1BQU07c0JBRGIsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQXlRekMsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNNUIsTUFBTTtzQkFEWixZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFzQ3pCLFVBQVU7c0JBRGhCLFlBQVk7dUJBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU83QixXQUFXO3NCQURqQixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSwgdGhyb3R0bGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9hdHRyaWJ1dGlvbi1kaWFsb2cvYXR0cmlidXRpb24tZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vY2FudmFzLWdyb3VwLWRpYWxvZy9jYW52YXMtZ3JvdXAtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9jb250ZW50LXNlYXJjaC1kaWFsb2cvY29udGVudC1zZWFyY2gtZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWNjZXNzS2V5c1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2FjY2Vzcy1rZXlzLWhhbmRsZXItc2VydmljZS9hY2Nlc3Mta2V5cy5zZXJ2aWNlJztcbmltcG9ydCB7IEFsdG9TZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9hbHRvLXNlcnZpY2UvYWx0by5zZXJ2aWNlJztcbmltcG9ydCB7IENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2NhbnZhcy1zZXJ2aWNlL2NhbnZhcy1zZXJ2aWNlJztcbmltcG9ydCB7IElpaWZNYW5pZmVzdFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL2lpaWYtbWFuaWZlc3Qtc2VydmljZS9paWlmLW1hbmlmZXN0LXNlcnZpY2UnO1xuaW1wb3J0IHsgTWFuaWZlc3RVdGlscyB9IGZyb20gJy4uL2NvcmUvaWlpZi1tYW5pZmVzdC1zZXJ2aWNlL2lpaWYtbWFuaWZlc3QtdXRpbHMnO1xuaW1wb3J0IHsgTWltZVZpZXdlckludGwgfSBmcm9tICcuLi9jb3JlL2ludGwnO1xuaW1wb3J0IHsgTWltZVJlc2l6ZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL21pbWUtcmVzaXplLXNlcnZpY2UvbWltZS1yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBNaW1lVmlld2VyQ29uZmlnIH0gZnJvbSAnLi4vY29yZS9taW1lLXZpZXdlci1jb25maWcnO1xuaW1wb3J0IHsgTW9kZVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL21vZGUtc2VydmljZS9tb2RlLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgTW9kZUNoYW5nZXMsXG4gIFJlY29nbml6ZWRUZXh0TW9kZSxcbiAgUmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcyxcbiAgVmlld2VyTW9kZSxcbn0gZnJvbSAnLi4vY29yZS9tb2RlbHMnO1xuaW1wb3J0IHsgTWFuaWZlc3QgfSBmcm9tICcuLi9jb3JlL21vZGVscy9tYW5pZmVzdCc7XG5pbXBvcnQgeyBWaWV3ZXJMYXlvdXQgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItbGF5b3V0JztcbmltcG9ydCB7IFZpZXdlck9wdGlvbnMgfSBmcm9tICcuLi9jb3JlL21vZGVscy92aWV3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBWaWV3ZXJTdGF0ZSB9IGZyb20gJy4uL2NvcmUvbW9kZWxzL3ZpZXdlclN0YXRlJztcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc3R5bGUtc2VydmljZS9zdHlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IFZpZXdlckxheW91dFNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3ZpZXdlci1sYXlvdXQtc2VydmljZS92aWV3ZXItbGF5b3V0LXNlcnZpY2UnO1xuaW1wb3J0IHsgVmlld2VyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvdmlld2VyLXNlcnZpY2Uvdmlld2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgSGVscERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9oZWxwLWRpYWxvZy9oZWxwLWRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IEluZm9ybWF0aW9uRGlhbG9nU2VydmljZSB9IGZyb20gJy4uL2luZm9ybWF0aW9uLWRpYWxvZy9pbmZvcm1hdGlvbi1kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBWaWV3RGlhbG9nU2VydmljZSB9IGZyb20gJy4uL3ZpZXctZGlhbG9nL3ZpZXctZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgSWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb3JlL2lpaWYtY29udGVudC1zZWFyY2gtc2VydmljZS9paWlmLWNvbnRlbnQtc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0IH0gZnJvbSAnLi8uLi9jb3JlL21vZGVscy9zZWFyY2gtcmVzdWx0JztcbmltcG9ydCB7IFZpZXdlckZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld2VyLWZvb3Rlci92aWV3ZXItZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdlci1oZWFkZXIvdmlld2VyLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVklFV0VSX1BST1ZJREVSUyB9IGZyb20gJy4vdmlld2VyLnByb3ZpZGVycyc7XG5pbXBvcnQgeyBzbGlkZUluTGVmdCB9IGZyb20gJy4vLi4vc2hhcmVkL2FuaW1hdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtaW1lLXZpZXdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi92aWV3ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW3NsaWRlSW5MZWZ0XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogVklFV0VSX1BST1ZJREVSUyxcbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHB1YmxpYyBtYW5pZmVzdFVyaTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHB1YmxpYyBxITogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgY2FudmFzSW5kZXggPSAwO1xuICBASW5wdXQoKSBwdWJsaWMgY29uZmlnOiBNaW1lVmlld2VyQ29uZmlnID0gbmV3IE1pbWVWaWV3ZXJDb25maWcoKTtcbiAgQElucHV0KCkgcHVibGljIHRhYkluZGV4ID0gMDtcbiAgQE91dHB1dCgpIHZpZXdlck1vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Vmlld2VyTW9kZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjYW52YXNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHFDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG1hbmlmZXN0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPE1hbmlmZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpXG4gIHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8UmVjb2duaXplZFRleHRNb2RlPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcigpO1xuICByZWNvZ25pemVkVGV4dE1vZGUgPSBSZWNvZ25pemVkVGV4dE1vZGU7XG4gIGlkID0gJ25neC1taW1lLW1pbWVWaWV3ZXInO1xuICBvcGVuc2VhZHJhZ29uSWQgPSAnb3BlbnNlYWRyYWdvbic7XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcml2YXRlIGlzQ2FudmFzUHJlc3NlZCA9IGZhbHNlO1xuICBwcml2YXRlIGN1cnJlbnRNYW5pZmVzdCE6IE1hbmlmZXN0IHwgbnVsbDtcbiAgcHJpdmF0ZSB2aWV3ZXJMYXlvdXQ6IFZpZXdlckxheW91dCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHZpZXdlclN0YXRlID0gbmV3IFZpZXdlclN0YXRlKCk7XG5cbiAgcmVjb2duaXplZFRleHRDb250ZW50TW9kZTogUmVjb2duaXplZFRleHRNb2RlID0gUmVjb2duaXplZFRleHRNb2RlLk5PTkU7XG4gIHNob3dIZWFkZXJBbmRGb290ZXJTdGF0ZSA9ICdoaWRlJztcbiAgb3NkVG9vbGJhclN0YXRlID0gJ2hpZGUnO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICAvLyBWaWV3Y2hpbGRzXG4gIEBWaWV3Q2hpbGQoJ21pbWVIZWFkZXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICBwcml2YXRlIGhlYWRlciE6IFZpZXdlckhlYWRlckNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWltZUZvb3RlcicsIHsgc3RhdGljOiB0cnVlIH0pXG4gIHByaXZhdGUgZm9vdGVyITogVmlld2VyRm9vdGVyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBzbmFja0JhcjogTWF0U25hY2tCYXIsXG4gICAgcHVibGljIGludGw6IE1pbWVWaWV3ZXJJbnRsLFxuICAgIHByaXZhdGUgaWlpZk1hbmlmZXN0U2VydmljZTogSWlpZk1hbmlmZXN0U2VydmljZSxcbiAgICBwcml2YXRlIHZpZXdEaWFsb2dTZXJ2aWNlOiBWaWV3RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGluZm9ybWF0aW9uRGlhbG9nU2VydmljZTogSW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgYXR0cmlidXRpb25EaWFsb2dTZXJ2aWNlOiBBdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZTogQ29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBoZWxwRGlhbG9nU2VydmljZTogSGVscERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3ZXJTZXJ2aWNlOiBWaWV3ZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogTWltZVJlc2l6ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBtb2RlU2VydmljZTogTW9kZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBpaWlmQ29udGVudFNlYXJjaFNlcnZpY2U6IElpaWZDb250ZW50U2VhcmNoU2VydmljZSxcbiAgICBwcml2YXRlIGFjY2Vzc0tleXNIYW5kbGVyU2VydmljZTogQWNjZXNzS2V5c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYW52YXNTZXJ2aWNlOiBDYW52YXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld2VyTGF5b3V0U2VydmljZTogVmlld2VyTGF5b3V0U2VydmljZSxcbiAgICBwcml2YXRlIHN0eWxlU2VydmljZTogU3R5bGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWx0b1NlcnZpY2U6IEFsdG9TZXJ2aWNlLFxuICAgIHByaXZhdGUgem9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIGNhbnZhc0dyb3VwRGlhbG9nU2VydmljZTogQ2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlLFxuICAgIGVsOiBFbGVtZW50UmVmLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICkge1xuICAgIHRoaXMuaWQgPSB0aGlzLnZpZXdlclNlcnZpY2UuaWQ7XG4gICAgdGhpcy5vcGVuc2VhZHJhZ29uSWQgPSB0aGlzLnZpZXdlclNlcnZpY2Uub3BlbnNlYWRyYWdvbklkO1xuICAgIGluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGluZm9ybWF0aW9uRGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICBhdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgdmlld0RpYWxvZ1NlcnZpY2UuZWwgPSBlbDtcbiAgICB2aWV3RGlhbG9nU2VydmljZS52aWV3Q29udGFpbmVyUmVmID0gdmlld0NvbnRhaW5lclJlZjtcbiAgICBjb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5lbCA9IGVsO1xuICAgIGNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIGhlbHBEaWFsb2dTZXJ2aWNlLmVsID0gZWw7XG4gICAgaGVscERpYWxvZ1NlcnZpY2Uudmlld0NvbnRhaW5lclJlZiA9IHZpZXdDb250YWluZXJSZWY7XG4gICAgY2FudmFzR3JvdXBEaWFsb2dTZXJ2aWNlLnZpZXdDb250YWluZXJSZWYgPSB2aWV3Q29udGFpbmVyUmVmO1xuICAgIHJlc2l6ZVNlcnZpY2UuZWwgPSBlbDtcbiAgfVxuXG4gIGdldCBtaW1lSGVhZGVyQmVmb3JlUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmhlYWRlci5taW1lSGVhZGVyQmVmb3JlO1xuICB9XG5cbiAgZ2V0IG1pbWVIZWFkZXJBZnRlclJlZigpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gdGhpcy5oZWFkZXIubWltZUhlYWRlckFmdGVyO1xuICB9XG5cbiAgZ2V0IG1pbWVGb290ZXJCZWZvcmVSZWYoKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIHRoaXMuZm9vdGVyLm1pbWVGb290ZXJCZWZvcmU7XG4gIH1cblxuICBnZXQgbWltZUZvb3RlckFmdGVyUmVmKCk6IFZpZXdDb250YWluZXJSZWYge1xuICAgIHJldHVybiB0aGlzLmZvb3Rlci5taW1lRm9vdGVyQWZ0ZXI7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0eWxlU2VydmljZS5pbml0aWFsaXplKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmN1cnJlbnRNYW5pZmVzdC5zdWJzY3JpYmUoXG4gICAgICAgIChtYW5pZmVzdDogTWFuaWZlc3QgfCBudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG1hbmlmZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1hbmlmZXN0ID0gbWFuaWZlc3Q7XG4gICAgICAgICAgICB0aGlzLm1hbmlmZXN0Q2hhbmdlZC5uZXh0KG1hbmlmZXN0KTtcbiAgICAgICAgICAgIHRoaXMudmlld2VyTGF5b3V0U2VydmljZS5pbml0KFxuICAgICAgICAgICAgICBNYW5pZmVzdFV0aWxzLmlzTWFuaWZlc3RQYWdlZChtYW5pZmVzdCksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID1cbiAgICAgICAgICAgICAgdGhpcy5hbHRvU2VydmljZS5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdlclNlcnZpY2Uuc2V0VXBWaWV3ZXIobWFuaWZlc3QsIHRoaXMuY29uZmlnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5hdHRyaWJ1dGlvbkRpYWxvZ0VuYWJsZWQgJiYgbWFuaWZlc3QuYXR0cmlidXRpb24pIHtcbiAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2Uub3BlbihcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5hdHRyaWJ1dGlvbkRpYWxvZ0hpZGVUaW1lb3V0LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5xKSB7XG4gICAgICAgICAgICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLnNlYXJjaChtYW5pZmVzdCwgdGhpcy5xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLm9uT3NkUmVhZHlDaGFuZ2Uuc3Vic2NyaWJlKChzdGF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAvLyBEb24ndCByZXNldCBjdXJyZW50IHBhZ2Ugd2hlbiBzd2l0Y2hpbmcgbGF5b3V0XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzdGF0ZSAmJlxuICAgICAgICAgIHRoaXMuY2FudmFzSW5kZXggJiZcbiAgICAgICAgICAhdGhpcy5jYW52YXNTZXJ2aWNlLmN1cnJlbnRDYW52YXNHcm91cEluZGV4XG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKHRoaXMuY2FudmFzSW5kZXgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZXJyb3JNZXNzYWdlLnN1YnNjcmliZShcbiAgICAgICAgKGVycm9yOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZXNldEN1cnJlbnRNYW5pZmVzdCgpO1xuICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3I7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25RQ2hhbmdlLnN1YnNjcmliZSgocTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHRoaXMucUNoYW5nZWQuZW1pdChxKTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChzcjogU2VhcmNoUmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5oaWdobGlnaHQoc3IpO1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnZpZXdlclNlcnZpY2UuaXNDYW52YXNQcmVzc2VkLnN1YnNjcmliZSgodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5pc0NhbnZhc1ByZXNzZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMubW9kZVNlcnZpY2Uub25DaGFuZ2Uuc3Vic2NyaWJlKChtb2RlOiBNb2RlQ2hhbmdlcykgPT4ge1xuICAgICAgICBpZiAobW9kZS5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudG9nZ2xlVG9vbGJhcnNTdGF0ZShtb2RlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIG1vZGUucHJldmlvdXNWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQgJiZcbiAgICAgICAgICBtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5QQUdFXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUudmlld0RpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmlzT3BlbigpO1xuICAgICAgICAgIHRoaXMudmlld2VyU3RhdGUuY29udGVudERpYWxvZ1N0YXRlLmlzT3BlbiA9XG4gICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5pc09wZW4oKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnREaWFsb2dTdGF0ZS5zZWxlY3RlZEluZGV4ID1cbiAgICAgICAgICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICAgICAgICB0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnRzU2VhcmNoRGlhbG9nU3RhdGUuaXNPcGVuID1cbiAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5oZWxwRGlhbG9nU3RhdGUuaXNPcGVuID1cbiAgICAgICAgICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuaXNPcGVuKCk7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdEaWFsb2dTZXJ2aWNlLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLmluZm9ybWF0aW9uRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50U2VhcmNoRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5oZWxwRGlhbG9nU2VydmljZS5jbG9zZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlLmN1cnJlbnRWYWx1ZSA9PT0gVmlld2VyTW9kZS5EQVNIQk9BUkQpIHtcbiAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLnZpZXdEaWFsb2dTdGF0ZS5pc09wZW4pIHtcbiAgICAgICAgICAgICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5vcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLm9wZW4oXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3ZXJTdGF0ZS5jb250ZW50RGlhbG9nU3RhdGUuc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXdlclN0YXRlLmNvbnRlbnRzU2VhcmNoRGlhbG9nU3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2Uub3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmlld2VyU3RhdGUuaGVscERpYWxvZ1N0YXRlLmlzT3Blbikge1xuICAgICAgICAgICAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLm9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnZpZXdlck1vZGVDaGFuZ2VkLmVtaXQobW9kZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5jYW52YXNTZXJ2aWNlLm9uQ2FudmFzR3JvdXBJbmRleENoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgIChjYW52YXNHcm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjYW52YXNJbmRleCA9XG4gICAgICAgICAgICB0aGlzLmNhbnZhc1NlcnZpY2UuZmluZENhbnZhc0J5Q2FudmFzSW5kZXgoY2FudmFzR3JvdXBJbmRleCk7XG4gICAgICAgICAgaWYgKGNhbnZhc0luZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNDaGFuZ2VkLmVtaXQoY2FudmFzSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnJlc2l6ZVNlcnZpY2Uub25SZXNpemVcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGhyb3R0bGUoKHZhbCkgPT5cbiAgICAgICAgICAgIGludGVydmFsKFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5ob21lKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0sIFZpZXdlck9wdGlvbnMudHJhbnNpdGlvbnMuT1NEQW5pbWF0aW9uVGltZSk7XG4gICAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLm9uQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHZpZXdlckxheW91dDogVmlld2VyTGF5b3V0KSA9PiB7XG4gICAgICAgICAgdGhpcy52aWV3ZXJMYXlvdXQgPSB2aWV3ZXJMYXlvdXQ7XG4gICAgICAgIH0sXG4gICAgICApLFxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5hbHRvU2VydmljZS5vblJlY29nbml6ZWRUZXh0Q29udGVudE1vZGVDaGFuZ2UkLnN1YnNjcmliZShcbiAgICAgICAgKHJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXM6IFJlY29nbml6ZWRUZXh0TW9kZUNoYW5nZXMpID0+IHtcbiAgICAgICAgICB0aGlzLnJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPVxuICAgICAgICAgICAgcmVjb2duaXplZFRleHRNb2RlQ2hhbmdlcy5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlQ2hhbmdlZC5lbWl0KFxuICAgICAgICAgICAgdGhpcy5yZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSxcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snY29uZmlnJ10pIHtcbiAgICAgIHRoaXMudmlld2VyU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy52aWV3ZXJMYXlvdXRTZXJ2aWNlLnNldENvbmZpZyh0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLmlpaWZDb250ZW50U2VhcmNoU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5hbHRvU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5zZXRDb25maWcodGhpcy5jb25maWcpO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ21hbmlmZXN0VXJpJ10pIHtcbiAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgdGhpcy5tb2RlU2VydmljZS5tb2RlID0gdGhpcy5jb25maWcuaW5pdFZpZXdlck1vZGU7XG4gICAgICB0aGlzLm1hbmlmZXN0VXJpID0gY2hhbmdlc1snbWFuaWZlc3RVcmknXS5jdXJyZW50VmFsdWU7XG4gICAgICB0aGlzLmxvYWRNYW5pZmVzdCgpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydxJ10pIHtcbiAgICAgIHRoaXMucSA9IGNoYW5nZXNbJ3EnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TWFuaWZlc3QpIHtcbiAgICAgICAgdGhpcy5paWlmQ29udGVudFNlYXJjaFNlcnZpY2Uuc2VhcmNoKHRoaXMuY3VycmVudE1hbmlmZXN0LCB0aGlzLnEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydjYW52YXNJbmRleCddKSB7XG4gICAgICB0aGlzLmNhbnZhc0luZGV4ID0gY2hhbmdlc1snY2FudmFzSW5kZXgnXS5jdXJyZW50VmFsdWU7XG4gICAgICBpZiAodGhpcy5jdXJyZW50TWFuaWZlc3QpIHtcbiAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmdvVG9DYW52YXModGhpcy5jYW52YXNJbmRleCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUtleXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5oYW5kbGVLZXlFdmVudHMoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRyb3AoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLmlzRHJvcEVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IHVybCA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdVUkwnKTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkwodXJsKS5zZWFyY2hQYXJhbXM7XG4gICAgICBjb25zdCBtYW5pZmVzdFVyaSA9IHBhcmFtcy5nZXQoJ21hbmlmZXN0Jyk7XG4gICAgICBjb25zdCBzdGFydENhbnZhc0lkID0gcGFyYW1zLmdldCgnY2FudmFzJyk7XG4gICAgICBpZiAobWFuaWZlc3RVcmkpIHtcbiAgICAgICAgdGhpcy5tYW5pZmVzdFVyaSA9IG1hbmlmZXN0VXJpLnN0YXJ0c1dpdGgoJy8vJylcbiAgICAgICAgICA/IGAke2xvY2F0aW9uLnByb3RvY29sfSR7bWFuaWZlc3RVcml9YFxuICAgICAgICAgIDogbWFuaWZlc3RVcmk7XG4gICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICB0aGlzLmxvYWRNYW5pZmVzdCgpO1xuICAgICAgICBpZiAoc3RhcnRDYW52YXNJZCkge1xuICAgICAgICAgIHRoaXMubWFuaWZlc3RDaGFuZ2VkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKChtYW5pZmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FudmFzSW5kZXggPSBtYW5pZmVzdC5zZXF1ZW5jZXNcbiAgICAgICAgICAgICAgPyBtYW5pZmVzdC5zZXF1ZW5jZXNbMF0/LmNhbnZhc2VzPy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgICAgICAoYykgPT4gYy5pZCA9PT0gc3RhcnRDYW52YXNJZCxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogLTE7XG4gICAgICAgICAgICBpZiAoY2FudmFzSW5kZXggJiYgY2FudmFzSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld2VyU2VydmljZS5nb1RvQ2FudmFzKGNhbnZhc0luZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbmFja0Jhci5vcGVuKHRoaXMuaW50bC5kcm9wRGlzYWJsZWQsIHVuZGVmaW5lZCwge1xuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB0aGlzLmlpaWZNYW5pZmVzdFNlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaWlpZkNvbnRlbnRTZWFyY2hTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnN0eWxlU2VydmljZS5kZXN0cm95KCk7XG4gIH1cblxuICB0b2dnbGVUb29sYmFyc1N0YXRlKG1vZGU6IFZpZXdlck1vZGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oZWFkZXIgJiYgdGhpcy5mb290ZXIpIHtcbiAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICBjYXNlIFZpZXdlck1vZGUuREFTSEJPQVJEOlxuICAgICAgICAgIHRoaXMuc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0YXRlID1cbiAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0YXRlID1cbiAgICAgICAgICAgICAgJ3Nob3cnO1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5uYXZpZ2F0aW9uQ29udHJvbEVuYWJsZWQgJiYgdGhpcy5vc2RUb29sYmFyU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub3NkVG9vbGJhclN0YXRlID0gJ2hpZGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBWaWV3ZXJNb2RlLlBBR0U6XG4gICAgICAgICAgdGhpcy5zaG93SGVhZGVyQW5kRm9vdGVyU3RhdGUgPVxuICAgICAgICAgICAgdGhpcy5oZWFkZXIuc3RhdGUgPVxuICAgICAgICAgICAgdGhpcy5mb290ZXIuc3RhdGUgPVxuICAgICAgICAgICAgICAnaGlkZSc7XG4gICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5hdmlnYXRpb25Db250cm9sRW5hYmxlZCAmJiB0aGlzLm9zZFRvb2xiYXJTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vc2RUb29sYmFyU3RhdGUgPSAnc2hvdyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkTWFuaWZlc3QoKTogdm9pZCB7XG4gICAgdGhpcy5paWlmTWFuaWZlc3RTZXJ2aWNlLmxvYWQodGhpcy5tYW5pZmVzdFVyaSkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZSgpIHtcbiAgICB0aGlzLmFjY2Vzc0tleXNIYW5kbGVyU2VydmljZS5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5hdHRyaWJ1dGlvbkRpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMudmlld0RpYWxvZ1NlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMuaW5mb3JtYXRpb25EaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmNvbnRlbnRTZWFyY2hEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLmhlbHBEaWFsb2dTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB0aGlzLnZpZXdlclNlcnZpY2UuaW5pdGlhbGl6ZSgpO1xuICAgIHRoaXMucmVzaXplU2VydmljZS5pbml0aWFsaXplKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFudXAoKSB7XG4gICAgdGhpcy52aWV3ZXJTdGF0ZSA9IG5ldyBWaWV3ZXJTdGF0ZSgpO1xuICAgIHRoaXMuYWNjZXNzS2V5c0hhbmRsZXJTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLmF0dHJpYnV0aW9uRGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy52aWV3RGlhbG9nU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5pbmZvcm1hdGlvbkRpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuY29udGVudFNlYXJjaERpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMuaGVscERpYWxvZ1NlcnZpY2UuZGVzdHJveSgpO1xuICAgIHRoaXMudmlld2VyU2VydmljZS5kZXN0cm95KCk7XG4gICAgdGhpcy5yZXNpemVTZXJ2aWNlLmRlc3Ryb3koKTtcbiAgICB0aGlzLnJlc2V0RXJyb3JNZXNzYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q3VycmVudE1hbmlmZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudE1hbmlmZXN0ID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRFcnJvck1lc3NhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNNaXhCbGVuZE1vZGVTdXBwb3J0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMucGxhdGZvcm0uRklSRUZPWCB8fCB0aGlzLnBsYXRmb3JtLlNBRkFSSSk7XG4gIH1cblxuICBnb1RvSG9tZVpvb20oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gdGhpcy5yZWNvZ25pemVkVGV4dE1vZGUuT05MWSkge1xuICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLmhvbWUoKTtcbiAgICB9XG4gIH1cblxuICBzZXRDbGFzc2VzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnbW9kZS1wYWdlJzogdGhpcy5tb2RlU2VydmljZS5tb2RlID09PSBWaWV3ZXJNb2RlLlBBR0UsXG4gICAgICAnbW9kZS1wYWdlLXpvb21lZCc6IHRoaXMubW9kZVNlcnZpY2UuaXNQYWdlWm9vbWVkKCksXG4gICAgICAnbW9kZS1kYXNoYm9hcmQnOiB0aGlzLm1vZGVTZXJ2aWNlLm1vZGUgPT09IFZpZXdlck1vZGUuREFTSEJPQVJELFxuICAgICAgJ2xheW91dC1vbmUtcGFnZSc6IHRoaXMudmlld2VyTGF5b3V0ID09PSBWaWV3ZXJMYXlvdXQuT05FX1BBR0UsXG4gICAgICAnbGF5b3V0LXR3by1wYWdlJzogdGhpcy52aWV3ZXJMYXlvdXQgPT09IFZpZXdlckxheW91dC5UV09fUEFHRSxcbiAgICAgICdjYW52YXMtcHJlc3NlZCc6IHRoaXMuaXNDYW52YXNQcmVzc2VkLFxuICAgICAgJ2Jyb2tlbi1taXgtYmxlbmQtbW9kZSc6ICF0aGlzLmhhc01peEJsZW5kTW9kZVN1cHBvcnQoKSxcbiAgICB9O1xuICB9XG59XG4iLCI8ZGl2XG4gIFtpZF09XCJpZFwiXG4gIGNsYXNzPVwidmlld2VyLWNvbnRhaW5lclwiXG4gIFtuZ0NsYXNzXT1cInNldENsYXNzZXMoKVwiXG4gIFtoaWRkZW5dPVwiZXJyb3JNZXNzYWdlICE9PSBudWxsXCJcbiAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcbj5cbiAgPG1pbWUtc3Bpbm5lcj48L21pbWUtc3Bpbm5lcj5cbiAgPG1pbWUtdmlld2VyLWhlYWRlclxuICAgIGNsYXNzPVwibmF2YmFyIG5hdmJhci1oZWFkZXJcIlxuICAgICNtaW1lSGVhZGVyXG4gID48L21pbWUtdmlld2VyLWhlYWRlcj5cbiAgQGlmIChjb25maWcubmF2aWdhdGlvbkNvbnRyb2xFbmFibGVkKSB7XG4gICAgPG1pbWUtb3NkLXRvb2xiYXIgW0BzbGlkZUluTGVmdF09XCJvc2RUb29sYmFyU3RhdGVcIj48L21pbWUtb3NkLXRvb2xiYXI+XG4gIH1cblxuICA8bWF0LWRyYXdlci1jb250YWluZXIgY2xhc3M9XCJ2aWV3ZXItZHJhd2VyLWNvbnRhaW5lclwiIGF1dG9zaXplPlxuICAgIDxtYXQtZHJhd2VyXG4gICAgICBkYXRhLXRlc3RpZD1cIm5neC1taW1lLXJlY29nbml6ZWQtdGV4dC1jb250ZW50LWNvbnRhaW5lclwiXG4gICAgICBtb2RlPVwic2lkZVwiXG4gICAgICBwb3NpdGlvbj1cImVuZFwiXG4gICAgICAob3BlbmVkQ2hhbmdlKT1cImdvVG9Ib21lWm9vbSgpXCJcbiAgICAgIFtvcGVuZWRdPVwicmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gcmVjb2duaXplZFRleHRNb2RlLk5PTkVcIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICBvbmx5OiByZWNvZ25pemVkVGV4dENvbnRlbnRNb2RlID09PSByZWNvZ25pemVkVGV4dE1vZGUuT05MWSxcbiAgICAgICAgc3BsaXQ6IHJlY29nbml6ZWRUZXh0Q29udGVudE1vZGUgPT09IHJlY29nbml6ZWRUZXh0TW9kZS5TUExJVCxcbiAgICAgICAgb3Blbjogc2hvd0hlYWRlckFuZEZvb3RlclN0YXRlID09PSAnc2hvdydcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIEBpZiAocmVjb2duaXplZFRleHRDb250ZW50TW9kZSAhPT0gcmVjb2duaXplZFRleHRNb2RlLk5PTkUpIHtcbiAgICAgICAgPG1pbWUtcmVjb2duaXplZC10ZXh0LWNvbnRlbnQ+PC9taW1lLXJlY29nbml6ZWQtdGV4dC1jb250ZW50PlxuICAgICAgfVxuICAgIDwvbWF0LWRyYXdlcj5cbiAgICA8bWF0LWRyYXdlci1jb250ZW50PlxuICAgICAgPGRpdiBbaWRdPVwib3BlbnNlYWRyYWdvbklkXCIgY2xhc3M9XCJvcGVuc2VhZHJhZ29uXCI+PC9kaXY+XG4gICAgPC9tYXQtZHJhd2VyLWNvbnRlbnQ+XG4gIDwvbWF0LWRyYXdlci1jb250YWluZXI+XG5cbiAgPG1pbWUtdmlld2VyLWZvb3RlclxuICAgIGNsYXNzPVwibmF2YmFyIG5hdmJhci1mb290ZXJcIlxuICAgICNtaW1lRm9vdGVyXG4gID48L21pbWUtdmlld2VyLWZvb3Rlcj5cbjwvZGl2PlxuXG5AaWYgKGVycm9yTWVzc2FnZSkge1xuICA8ZGl2IGNsYXNzPVwiZXJyb3ItY29udGFpbmVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAge3sgaW50bC5zb21ldGhpbmdIYXNHb25lV3JvbmdMYWJlbCB9fVxuICA8L2Rpdj5cbn1cbiJdfQ==