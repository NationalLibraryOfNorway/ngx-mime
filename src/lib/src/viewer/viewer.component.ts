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
  public tileSources: any[];


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
            this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(this.mode, this.tileSources)));

            this.addEvents();
          },
          () => { },
          () => { })
      );
    }
  }


  toggleView(): void {
    this.mode = this.mode === 'dashboard' ? 'page' : 'dashboard';
    console.log('viewer is in mode: ' + this.mode);

    this.createViewer();
  }


  addEvents(): void {
    this.viewer.addHandler('canvas-click', (data: any) => {
      data.preventDefaultAction = true;
    });


    this.viewer.addHandler('open', (data: any) => {
      this.createOverlays();
    });
  }

  // Create SVG-overlays for each page
  createOverlays(): void {
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
        .style('opacity', 0.5)
        .style('cursor', 'pointer')
        .attrs({
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height
        });

      // Fit bounds on click
      let currentOverlay = overlay._groups[0][0].children[i];
      this.renderer.listen(currentOverlay, 'click', (evt) => {
        if(this.mode === 'dashboard') {
          this.mode = 'scroll';
        }
        this.viewer.viewport.fitBounds(new OpenSeadragon.Rect(
          currentOverlay.x.baseVal.value,
          currentOverlay.y.baseVal.value,
          currentOverlay.width.baseVal.value,
          currentOverlay.height.baseVal.value
        ));

      })
    });
  }

}
