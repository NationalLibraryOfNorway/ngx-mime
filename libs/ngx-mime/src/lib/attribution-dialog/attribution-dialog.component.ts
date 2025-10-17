import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessKeysService } from '../core/access-keys-handler-service/access-keys.service';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../core/intl';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';

@Component({
  templateUrl: './attribution-dialog.component.html',
  styleUrls: ['./attribution-dialog.component.scss'],
  standalone: false,
})
export class AttributionDialogComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked
{
  intl = inject(MimeViewerIntl);
  private renderer = inject(Renderer2);
  private iiifManifestService = inject(IiifManifestService);
  private attributionDialogResizeService = inject(
    AttributionDialogResizeService,
  );
  private styleService = inject(StyleService);
  private accessKeysHandlerService = inject(AccessKeysService);

  public manifest: Manifest | null = null;
  private subscriptions = new Subscription();
  @ViewChild('container', { static: true }) container!: ElementRef;

  ngOnInit() {
    this.attributionDialogResizeService.el = this.container;

    this.subscriptions.add(
      this.iiifManifestService.currentManifest.subscribe(
        (manifest: Manifest | null) => {
          this.manifest = manifest;
        },
      ),
    );
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.styleService.onChange.subscribe((color: string | undefined) => {
        if (color) {
          const backgroundRgbaColor = this.styleService.convertToRgba(
            color,
            0.3,
          );
          this.renderer.setStyle(
            this.container?.nativeElement,
            'background-color',
            backgroundRgbaColor,
          );
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('keydown', ['$event'])
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
