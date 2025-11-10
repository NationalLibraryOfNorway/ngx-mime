import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
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
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatTooltip,
    MatDialogClose,
    MatIcon,
    MatDialogContent,
  ],
})
export class AttributionDialogComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked
{
  @ViewChild('container', { static: true }) container!: ElementRef;
  intl = inject(MimeViewerIntl);
  manifest: Manifest | null = null;
  private readonly renderer = inject(Renderer2);
  private readonly iiifManifestService = inject(IiifManifestService);
  private readonly attributionDialogResizeService = inject(
    AttributionDialogResizeService,
  );
  private readonly styleService = inject(StyleService);
  private readonly accessKeysHandlerService = inject(AccessKeysService);
  private readonly subscriptions = new Subscription();

  @HostListener('keydown', ['$event'])
  handleKeys(event: KeyboardEvent) {
    this.accessKeysHandlerService.handleKeyEvents(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.attributionDialogResizeService.markForCheck();
  }

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

  ngAfterViewChecked() {
    this.attributionDialogResizeService.markForCheck();
  }
}
