import { ChangeDetectorRef } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerState, SpinnerService } from '../../core/spinner-service/spinner.service';

@Component({
  selector: 'mime-spinner',
  templateUrl: './viewer-spinner.component.html',
  styleUrls: ['./viewer-spinner.component.scss']
})
export class ViewerSpinnerComponent implements OnDestroy, OnInit {
  visible = false;

  private spinnerStateChanged: Subscription;

  constructor(
    private spinnerService: SpinnerService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.spinnerStateChanged = this.spinnerService.spinnerState
      .subscribe((state: SpinnerState) => {
        this.visible = state.show;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.spinnerStateChanged.unsubscribe();
  }
}
