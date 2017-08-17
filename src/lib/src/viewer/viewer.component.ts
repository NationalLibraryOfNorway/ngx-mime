import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { IiifService } from '../core/iiif-service/iiif-service';
import { Manifest } from '../core/models/manifest';
import { Subscription } from 'rxjs/Subscription';
import { Options } from '../core/models/options';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

declare const OpenSeadragon: any;
@Component({
  selector: 'mime-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  animations: [
    trigger('toggleView', [
      state('scroll', style({
        //transform: 'scale(1)'
      })),
      state('page', style({
        //transform: 'scale(1)'
      })),
      transition('page => scroll', [
        style({
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate('400ms ease-out', style({
          opacity: 0,
          transform: 'scale(0)'
        }))
      ]),
      transition('scroll => page', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate('400ms ease-in', style({
          opacity: 1,
          transform: 'scale(1)'
        }))
      ])
    ])
  ]
})
export class ViewerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() manifestUri: string;
  public viewer: any;
  private subscriptions: Array<Subscription> = [];
  public mode: string;

  constructor(private iiifService: IiifService) { }

  ngOnInit(): void {
    this.mode = 'scroll';
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
            this.viewer = new OpenSeadragon.Viewer(Object.assign({}, new Options(this.mode, manifest.tileSource)));
          })
      );
    }
  }

  toggleView() {

    this.mode = this.mode === 'scroll' ? 'page' : 'scroll';

    this.createViewer();
  }



}
