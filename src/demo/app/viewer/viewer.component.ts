import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements OnInit, OnDestroy {
  public manifestUri: string;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.manifestUri = params['manifestUri'];
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
