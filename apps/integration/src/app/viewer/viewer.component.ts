import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComponentsModule } from './components/components.module';
import { ElementsModule } from './elements/elements.module';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [ComponentsModule, ElementsModule],
})
export class ViewerComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  isComponent = false;
  manifestUris: string[] = [];
  canvasIndex = 0;
  private subscriptions = new Subscription();

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
