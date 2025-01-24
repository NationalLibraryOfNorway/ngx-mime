import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  SpinnerService,
  SpinnerState,
} from '../../core/spinner-service/spinner.service';

@Component({
  selector: 'mime-spinner',
  templateUrl: './viewer-spinner.component.html',
  styleUrls: ['./viewer-spinner.component.scss'],
})
export class ViewerSpinnerComponent implements OnDestroy, OnInit {
  public visible = false;
  private subscriptions = new Subscription();

  constructor(
    private spinnerService: SpinnerService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.spinnerService.spinnerState.subscribe((state: SpinnerState) => {
        this.visible = state.show;
        this.changeDetectorRef.detectChanges();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
