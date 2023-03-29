import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';

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
})
export class TestHostComponent {
  @ViewChild(ViewerComponent, { static: true })
  public viewerComponent: any;
  public manifestUri: string | null = null;
  public canvasIndex = 0;
  public tabIndex = 0;
  public config = new MimeViewerConfig({
    attributionDialogHideTimeout: -1,
  });

  constructor(private r: ComponentFactoryResolver) {}

  addComponentToStartOfHeader() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeHeaderBeforeRef.createComponent(factory);
  }

  addComponentToEndOfHeader() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeHeaderAfterRef.createComponent(factory);
  }

  addComponentToStartOfFooter() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeFooterBeforeRef.createComponent(factory);
  }

  addComponentToEndOfFooter() {
    const factory = this.r.resolveComponentFactory(TestDynamicComponent);
    this.viewerComponent.mimeFooterAfterRef.createComponent(factory);
  }
}
