import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewerComponent as ComponentViewerComponent } from './components/viewer/viewer.component';
import { ViewerComponent as ElementsViewerComponent } from './elements/viewer/viewer.component';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [ComponentViewerComponent, ElementsViewerComponent],
})
export class ViewerComponent implements OnInit, OnDestroy {
  isComponent = false;
  manifestUris: string[] = [];
  canvasIndex = 0;
  private readonly route = inject(ActivatedRoute);
  private readonly subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.isComponent = params['id'] === 'components';
      }),
    );

    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.handleQueryParams(params);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private handleQueryParams(params: any) {
    if (params.has('manifestUri')) {
      this.manifestUris = params.getAll('manifestUri');
    } else {
      this.manifestUris = [
        'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest',
      ];
    }

    if (params.has('canvasIndex')) {
      const canvasIndexValue = params.get('canvasIndex');
      this.canvasIndex = canvasIndexValue ? parseInt(canvasIndexValue, 10) : 0;
    }
  }
}
