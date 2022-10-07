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
  manifestUri: string | null = null;
  canvasIndex = 0;
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
        if (params.has('manifestUri')) {
          this.manifestUri = params.get('manifestUri');
        } else {
          this.manifestUri =
            'http://localhost:4040/catalog/v1/iiif/a-ltr-book/manifest';
        }

        if (params.has('canvasIndex')) {
          const canvasIndexValue = params.get('canvasIndex');
          this.canvasIndex = canvasIndexValue
            ? parseInt(canvasIndexValue, 10)
            : 0;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
