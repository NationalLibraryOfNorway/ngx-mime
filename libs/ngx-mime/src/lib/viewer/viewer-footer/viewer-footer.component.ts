import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';
import { IiifContentSearchService } from '../../core/iiif-content-search-service/iiif-content-search.service';
import { ViewerLayoutService } from '../../core/viewer-layout-service/viewer-layout-service';
import { CanvasGroupNavigatorComponent } from './canvas-group-navigator/canvas-group-navigator.component';
import { ContentSearchNavigatorComponent } from './content-search-navigator/content-search-navigator.component';

@Component({
  selector: 'mime-viewer-footer',
  templateUrl: './viewer-footer.component.html',
  styleUrls: ['./viewer-footer.component.scss'],
  imports: [
    MatDivider,
    MatToolbar,
    ContentSearchNavigatorComponent,
    NgClass,
    CanvasGroupNavigatorComponent,
  ],
})
export class ViewerFooterComponent {
  private readonly iiifContentSearchService = inject(IiifContentSearchService);
  private readonly viewerLayoutService = inject(ViewerLayoutService);

  readonly mimeFooterBefore = viewChild.required('mimeFooterBefore', {
    read: ViewContainerRef,
  });
  readonly mimeFooterAfter = viewChild.required('mimeFooterAfter', {
    read: ViewContainerRef,
  });
  readonly searchResult = this.iiifContentSearchService.searchResult;
  readonly isXSmall = this.viewerLayoutService.isXSmall;
  readonly showContentSearchNavigator = computed(
    () => this.searchResult().size() > 0,
  );
  readonly showPageNavigator = computed(
    () => this.searchResult().size() === 0 || !this.isXSmall(),
  );
}
