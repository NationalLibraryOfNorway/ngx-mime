import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';

@Component({
  templateUrl: './attribution-dialog.component.html',
  styleUrls: ['./attribution-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributionDialogComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  public manifest: Manifest;
  private subscriptions = new Subscription();
  @ViewChild('container', { static: true }) container: ElementRef;

  constructor(
    public intl: MimeViewerIntl,
    private renderer: Renderer2,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private attributionDialogResizeService: AttributionDialogResizeService,
    private styleService: StyleService,
    private accessKeysHandlerService: AccessKeysService
  ) {
    attributionDialogResizeService.el = el;
  }

  ngOnInit() {
    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest) => {
          this.manifest = manifest;
          this.changeDetectorRef.markForCheck();
        }
      )
    );
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.styleService.onChange.subscribe((c) => {
        const backgroundRgbaColor = this.styleService.convertToRgba(c, 0.3);
        this.renderer.setStyle(
          this.container.nativeElement,
          'background-color',
          backgroundRgbaColor
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('keyup', ['$event'])
  handleKeys(event: KeyboardEvent) {
    this.accessKeysHandlerService.handleKeyEvents(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.attributionDialogResizeService.markForCheck();
  }

  ngAfterViewChecked() {
    this.attributionDialogResizeService.markForCheck();
  }
}
