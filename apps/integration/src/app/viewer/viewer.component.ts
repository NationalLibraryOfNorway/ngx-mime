import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit, OnDestroy {
  isComponent = false;
  manifestUris: string[] = [];
  canvasIndex = 0;
  viewerHeight = 100;
  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.isComponent = params['id'] === 'components';
      })
    );

    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.handleQueryParams(params);
      })
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
    this.viewerHeight = 100 / this.manifestUris.length;

    if (params.has('canvasIndex')) {
      const canvasIndexValue = params.get('canvasIndex');
      this.canvasIndex = canvasIndexValue ? parseInt(canvasIndexValue, 10) : 0;
    }
  }
}
