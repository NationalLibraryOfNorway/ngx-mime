import { Component, ViewChild } from '@angular/core';
import { MimeModule } from '../../index';
import { MimeViewerConfig } from '../core/mime-viewer-config';
import { TestDynamicComponent } from './test-dynamic.component';
import { ViewerComponent } from './viewer.component';

@Component({
  template: `
    <mime-viewer
      [manifestUri]="manifestUri"
      [q]="q"
      [canvasIndex]="canvasIndex"
      [config]="config"
      [tabIndex]="tabIndex"
    ></mime-viewer>
  `,
  imports: [MimeModule],
})
export class TestHostComponent {
  @ViewChild(ViewerComponent, { static: true })
  viewerComponent!: ViewerComponent;
  manifestUri: string | null = null;
  q?: string;
  canvasIndex = 0;
  tabIndex = 0;
  config = new MimeViewerConfig({
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
