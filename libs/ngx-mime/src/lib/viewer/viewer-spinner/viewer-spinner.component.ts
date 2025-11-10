import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
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
  public visible = false;
  private readonly spinnerService = inject(SpinnerService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly subscriptions = new Subscription();

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
