import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ElementRef,
  Renderer2,
  NgZone,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { MimeViewerIntl } from './../core/viewer-intl';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../contents-dialog/contents-dialog.service';
import { Manifest } from '../core/models/manifest';
import { Options } from '../core/models/options';
import { ClickService } from '../core/click/click.service';
import { PageService } from '../core/page-service/page-service';
import { ViewerMode } from './viewer-mode';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import '../core/ext/svg-overlay';

declare const OpenSeadragon: any;
declare const d3: any;

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public manifestUri: string;
  public viewer: any;
  private options: Options;
  private subscriptions: Array<Subscription> = [];

  public mode: ViewerMode;
  ViewerMode: typeof ViewerMode = ViewerMode;

  // Viewchilds
  @ViewChild(ViewerHeaderComponent) header: ViewerHeaderComponent;
  @ViewChild(ViewerFooterComponent) footer: ViewerFooterComponent;

  // References to clickable overlays
  private overlays: Array<HTMLElement>;
  private tileSources: any[];


  constructor(
    private zone: NgZone,
    private el: ElementRef,
    private iiifManifestService: IiifManifestService,
    private contentsDialogService: ContentsDialogService,
    private dialog: MdDialog,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private clickService: ClickService,
    private pageService: PageService
  ) {
    contentsDialogService.elementRef = el;
  }

  ngOnInit(): void {
    this.mode = ViewerMode.DASHBOARD;
    this.subscriptions.push(
      this.iiifManifestService.currentManifest
        .subscribe((manifest: Manifest) => {
          this.cleanUp();
          this.setUpViewer(manifest);
        })
    );
    this.loadManifest();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        // Always set to dashboard-mode when manifest changes
        this.mode = ViewerMode.DASHBOARD;
        this.manifestUri = manifestUriChanges.currentValue;
        this.cleanUp();
        this.loadManifest();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  toggleView(): void {

    if (this.mode === ViewerMode.DASHBOARD) {
      this.mode = ViewerMode.PAGE;
      this.header.state = this.footer.state = 'hide';
      this.setPageConstraints();
    } else if (this.mode === ViewerMode.PAGE) {
      this.mode = ViewerMode.DASHBOARD;
      this.header.state = this.footer.state = 'show';
      this.setDashboardConstraints();
    }
    this.changeDetectorRef.detectChanges();
  }

  setDashboardConstraints(): void {
    this.viewer.panVertical = false;
  }
  setPageConstraints(): void {
    this.viewer.panVertical = true;
  }

  // Create SVG-overlays for each page
  createOverlays(): void {
    this.overlays = [];
    let svgOverlay = this.viewer.svgOverlay();
    let svgNode = d3.select(svgOverlay.node());

    this.tileSources.forEach((tile, i) => {
      let tiledImage = this.viewer.world.getItemAt(i);
      if (!tiledImage) { return; }

      let box = tiledImage.getBounds(true);
      svgNode.append('rect').attrs({ x: box.x, y: box.y, width: box.width, height: box.height, class: 'tile' });

      let currentOverlay: HTMLElement = svgNode._groups[0][0].children[i];
      this.overlays.push(currentOverlay);
    });
  }

  nextPage(): void {
    let nextPage = this.pageService.getNextPage();
    this.fitBoundsToPage(nextPage);
  }

  prevPage(): void {
    let prevPage = this.pageService.getPrevPage();
    this.fitBoundsToPage(prevPage);
  }

  goToPageFromUserInput(event: any) {
    let page = event.target.value;

    if (!this.isInt(page)) {
      return;
    }
    this.pageService.currentPage = page;
    this.fitBoundsToPage(+page);
  }

  fitBoundsToStart(): void {
    // Don't need to fit bounds if pages < 3
    if (this.overlays.length < 3) {
      return;
    }
    let firstpageDashboardBounds = this.viewer.viewport.getBounds();
    firstpageDashboardBounds.x = 0;
    this.viewer.viewport.fitBounds(firstpageDashboardBounds);
  }

  fitBoundsToPage(page: number): void {
    if (page < 0) {
      return;
    }
    let box = this.overlays[page];
    let pageBounds = this.createRectangel(box);
    this.viewer.viewport.fitBounds(pageBounds);
  }

  // Toggle viewport-bounds between page and dashboard
  // Make sure to update this.mode to the new mode before calling this method
  fitBounds(currentOverlay: any): void {
    if (this.mode === ViewerMode.DASHBOARD) {
      let dashboardBounds = this.viewer.viewport.getBounds();
      this.viewer.viewport.fitBounds(dashboardBounds);
      // Also need to zoom out to defaultZoomLevel for dashboard-view after bounds are fitted...
      this.viewer.viewport.zoomTo(this.options.defaultZoomLevel);
    }
    if (this.mode === ViewerMode.PAGE) {
      let pageBounds = this.createRectangel(currentOverlay);
      this.viewer.viewport.fitBounds(pageBounds);
    }
  }

  createRectangel(overlay: any): any {
    return new OpenSeadragon.Rect(
      overlay.x.baseVal.value,
      overlay.y.baseVal.value,
      overlay.width.baseVal.value,
      overlay.height.baseVal.value
    );
  }

  private isInt(value: any): boolean {
    return !isNaN(value) &&
      parseInt(value, 10) == value &&
      !isNaN(parseInt(value, 10));
  }

  private loadManifest() {
    this.iiifManifestService.load(this.manifestUri);
  }

  private cleanUp() {
    this.closeAllDialogs();
    if (this.viewer != null && this.viewer.isOpen()) {
      this.viewer.destroy();
    }
  }

  private setUpViewer(manifest: Manifest) {
    if (manifest.tileSource) {
      this.tileSources = manifest.tileSource;
      this.options = new Options(this.mode, this.tileSources);

      this.zone.runOutsideAngular(() => {
        this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
      });
      window.openSeadragonViewer = this.viewer;

      this.pageService = new PageService();
      this.pageService.numberOfPages = this.tileSources.length;
      this.setDashboardConstraints();
      this.addEvents();
    }
  }

  public closeAllDialogs() {
    this.dialog.closeAll();
  }

  addEvents(): void {
    this.addPinchEvents();

    this.clickService.reset();
    this.viewer.addHandler('open', (data: any) => {
      this.pageService.currentPage = 0;
      this.createOverlays();
      this.fitBoundsToStart();
    });

    this.clickService.addSingleClickHandler((event: any) => {
      let target: HTMLElement = event.originalEvent.target;

      if (target.nodeName === 'rect') {
        let requestedPage = this.overlays.indexOf(target);
        if (requestedPage >= 0) {

          setTimeout(() => {
            this.toggleView();
            this.fitBounds(target);
          }, 250);
          this.changeDetectorRef.markForCheck();

        }
      }
    });

    this.clickService.addDoubleClickHandler((event) => {
    });

    this.viewer.addHandler('canvas-click', this.clickService.click);

    this.viewer.addHandler('canvas-double-click', (event: any) => {
      if (this.mode === ViewerMode.DASHBOARD) {
        event.preventDefaultAction = true;
      }
    });

  }

  addPinchEvents(): void {
    let previousDistance = 0;
    this.viewer.addHandler('canvas-pinch', (data: any) => {
      if (data.lastDistance > previousDistance) {
        this.viewer.viewport.zoomTo((this.viewer.viewport.getZoom() + 0.02));
      } else {
        this.viewer.viewport.zoomTo((this.viewer.viewport.getZoom() - 0.02));
      }
      previousDistance = data.lastDistance;
    });

    this.viewer.addHandler('canvas-release', (data: any) => {
      previousDistance = 0;
    });
  }
}
