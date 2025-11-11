import { Component, ViewChild } from '@angular/core';
import { MimeViewerComponent } from '../../index';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { TestDynamicComponent } from './test-dynamic.component';
import { ViewerComponent } from './viewer.component';

@Component({
  template: `
    <mime-viewer
      [manifestUri]="manifestUri"
      [canvasIndex]="canvasIndex"
      [config]="config"
      [tabIndex]="tabIndex"
    ></mime-viewer>
  `,
  imports: [MimeViewerComponent],
})
export class TestHostComponent {
  @ViewChild(ViewerComponent, { static: true })
  public viewerComponent!: ViewerComponent;
  public manifestUri: string | null = null;
  public canvasIndex = 0;
  public tabIndex = 0;
  public config = new MimeViewerConfig({
    attributionDialogHideTimeout: -1,
  });

  addComponentToStartOfHeader() {
    this.viewerComponent.mimeHeaderBeforeRef.createComponent(
      TestDynamicComponent,
    );
  }

  addComponentToEndOfHeader() {
    this.viewerComponent.mimeHeaderAfterRef.createComponent(
      TestDynamicComponent,
    );
  }

  addComponentToStartOfFooter() {
    this.viewerComponent.mimeFooterBeforeRef.createComponent(
      TestDynamicComponent,
    );
  }

  addComponentToEndOfFooter() {
    this.viewerComponent.mimeFooterAfterRef.createComponent(
      TestDynamicComponent,
    );
  }
}
