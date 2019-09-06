import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
  ElementRef,
  HostListener,
  AfterViewChecked,
  Renderer2,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MimeViewerIntl } from '../core/intl/viewer-intl';
import { IiifManifestService } from '../core/iiif-manifest-service/iiif-manifest-service';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';
import { Manifest } from '../core/models/manifest';
import { StyleService } from '../core/style-service/style.service';

@Component({
  templateUrl: './attribution-dialog.component.html',
  styleUrls: ['./attribution-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributionDialogComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  public manifest: Manifest;
  private destroyed: Subject<void> = new Subject();
  @ViewChild('container', { static: true }) container: ElementRef;

  constructor(
    public intl: MimeViewerIntl,
    private renderer: Renderer2,
    private el: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private iiifManifestService: IiifManifestService,
    private attributionDialogResizeService: AttributionDialogResizeService,
    private styleService: StyleService
  ) {
    attributionDialogResizeService.el = el;
  }

  ngOnInit() {
    this.iiifManifestService.currentManifest
      .pipe(takeUntil(this.destroyed))
      .subscribe((manifest: Manifest) => {
        this.manifest = manifest;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.styleService.onChange.pipe(takeUntil(this.destroyed)).subscribe(c => {
      const backgroundRgbaColor = this.styleService.convertToRgba(c, 0.3);
      this.renderer.setStyle(
        this.container.nativeElement,
        'background-color',
        backgroundRgbaColor
      );
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.attributionDialogResizeService.markForCheck();
  }

  ngAfterViewChecked() {
    this.attributionDialogResizeService.markForCheck();
  }
}
