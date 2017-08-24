import { MimeViewerIntl } from './viewer-intl';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  Renderer2,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';

import { IiifService } from '../core/iiif-service/iiif-service';
import { Manifest } from '../core/models/manifest';
import { Subscription } from 'rxjs/Subscription';
import { Options } from '../core/models/options';
import { ClickService } from '../core/click/click.service';
import { PageService } from '../core/page-service/page-service';
import { ViewerMode } from './viewer-mode';
import { ViewerHeaderComponent } from './viewer-header/viewer-header.component';
import { ViewerFooterComponent } from './viewer-footer/viewer-footer.component';
import '../core/ext/svg-overlay';

//declare const OpenSeadragon: any;
declare const d3: any;

@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() manifestUri: string;
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
    private iiifService: IiifService,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private clickService: ClickService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.mode = ViewerMode.DASHBOARD;
    this.createViewer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        // Allways set to dashboard-mode when manifest changes
        this.mode = ViewerMode.DASHBOARD;
        this.manifestUri = manifestUriChanges.currentValue;
        this.createViewer();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  createViewer(): void {
    if (this.manifestUri) {
      this.subscriptions.push(
        this.iiifService.getManifest(this.manifestUri)
          .subscribe((manifest: Manifest) => {
            if (this.viewer != null && this.viewer.isOpen()) {
              this.viewer.destroy();
            }
            this.tileSources = manifest.tileSource;
            this.options = new Options(this.mode, this.tileSources);
            this.viewer = new OpenSeadragon.Viewer(Object.assign({}, this.options));
            this.pageService = new PageService();

            this.pageService.numberOfPages = this.tileSources.length;

            this.setDashboardConstraints();
            this.addEventHandlers();
          })
      );
    }
  }

  toggleView(): void {
    if (this.mode === ViewerMode.DASHBOARD) {
      this.mode = ViewerMode.PAGE;
      this.header.state = this.footer.state = 'show';
      this.setPageConstraints();
    } else if (this.mode === ViewerMode.PAGE) {
      this.header.state = this.footer.state = 'hide';
      this.mode = ViewerMode.DASHBOARD;
      this.setDashboardConstraints();
    }
  }

  setDashboardConstraints(): void {
    this.viewer.panVertical = false;
  }
  setPageConstraints(): void {
    this.viewer.panVertical = true;
  }

  addEventHandlers(): void {
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
          this.toggleView();
          this.changeDetectorRef.markForCheck();
          setTimeout(() => {
            this.fitBounds(target);
          }, 250);
          this.fitBounds(target);
          this.pageService.currentPage = requestedPage;
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

}
