import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, Renderer2 } from '@angular/core';
import { IiifService } from '../core/iiif-service/iiif-service';
import { Manifest } from '../core/models/manifest';
import { Subscription } from 'rxjs/Subscription';
import { Options } from '../core/models/options';
import '../core/ext/svg-overlay';

//declare const OpenSeadragon: any;
declare const d3: any;


@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {

  @Input() manifestUri: string;
  public viewer: any;

  private subscriptions: Array<Subscription> = [];
  private mode: string;
  private options: Options;
  private tileSources: any[];

  // References to clickable overlays
  private overlays: any[];
  private currentPage: number;


  constructor(
    private iiifService: IiifService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.mode = 'dashboard';
    this.createViewer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestUri']) {
      const manifestUriChanges: SimpleChange = changes['manifestUri'];
      if (!manifestUriChanges.isFirstChange() && manifestUriChanges.currentValue !== manifestUriChanges.firstChange) {
        this.manifestUri = manifestUriChanges.currentValue;
        this.createViewer();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  createViewer() {
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
            this.addEvents();
          },
          () => { },
          () => { })
      );
    }
  }


  toggleView(): void {
    this.mode = this.mode === 'dashboard' ? 'page' : 'dashboard';
    //this.createViewer();
  }


  addEvents(): void {
    this.viewer.addHandler('canvas-click', (data: any) => {
      data.preventDefaultAction = true;
    });


    this.viewer.addHandler('open', (data: any) => {
      this.currentPage = 0;
      this.createOverlays();

      // Start at first page
      this.fitBoundsToStart();
    });
  }

  // Create SVG-overlays for each page
  createOverlays(): void {
    this.overlays = [];
    let svgOverlay = this.viewer.svgOverlay();
    let overlay = d3.select(svgOverlay.node());

    this.tileSources.forEach((tile, i) => {
      let tiledImage = this.viewer.world.getItemAt(i);
      //console.log('checking ' + i)

      if (!tiledImage) {
        return;
      }
      let box = tiledImage.getBounds(true);

      overlay.append('rect')
        .style('fill', '#ffcc00')
        .style('fill-opacity', 0)
        .style('opacity', 0.5)
        .style('cursor', 'pointer')
        .attrs({
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height
        });


      let currentOverlay = overlay._groups[0][0].children[i];
      this.overlays.push(currentOverlay);

      // Fit bounds on click and toggle view-change
      this.renderer.listen(currentOverlay, 'click', (evt) => {
        this.fitBounds(currentOverlay);
        this.toggleView();
        this.currentPage = i;
      });
    });
  }

  // Toggle viewport-bounds between page and dashboard
  fitBounds(currentOverlay: any): void {

    // If we currently are in page-mode, then switch to dashboard-bounds
    if (this.mode === 'page') {
      console.log('switching to dashboard-bounds')
      let dashboardBounds = this.viewer.viewport.getBounds();
      this.viewer.viewport.fitBounds(dashboardBounds);
      // Also need to zoom out to defaultZoomLevel for dashboard-view after bounds are fitted...
      this.viewer.viewport.zoomTo(this.options.defaultZoomLevel);
    }

    // If we currently are in dashboard-mode, then switch to page-bounds
    if (this.mode === 'dashboard') {
      console.log('switching to page-bounds');
      let pageBounds = this.createRectangel(currentOverlay);
      this.viewer.viewport.fitBounds(pageBounds);
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 > this.overlays.length - 1) {
      return;
    }
    this.currentPage++;
    let box = this.overlays[this.currentPage];
    let pageBounds = this.createRectangel(box);
    this.viewer.viewport.fitBounds(pageBounds);
  }

  prevPage(): void {
    if (this.currentPage === 0) {
      return;
    }
    this.currentPage--;
    let box = this.overlays[this.currentPage];
    let pageBounds = this.createRectangel(box);
    this.viewer.viewport.fitBounds(pageBounds);
  }


  createRectangel(overlay: any): any {
    return new OpenSeadragon.Rect(
      overlay.x.baseVal.value,
      overlay.y.baseVal.value,
      overlay.width.baseVal.value,
      overlay.height.baseVal.value
    );
  }

  fitBoundsToStart(): void {
    if (this.overlays.length < 3) {
      return;
    }
    let firstpageDashboardBounds = this.viewer.viewport.getBounds();
    firstpageDashboardBounds.x = 0;
    this.viewer.viewport.fitBounds(firstpageDashboardBounds);
  }

}
