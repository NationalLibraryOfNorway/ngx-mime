import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import {
  SpinnerService,
  SpinnerState,
} from '../../core/spinner-service/spinner.service';

@Component({
  selector: 'mime-spinner',
  templateUrl: './viewer-spinner.component.html',
  styleUrls: ['./viewer-spinner.component.scss'],
  imports: [MatProgressSpinner],
})
export class ViewerSpinnerComponent implements OnDestroy, OnInit {
  private spinnerService = inject(SpinnerService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  public visible = false;
  private subscriptions = new Subscription();

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
