import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatTabsModule,
  MatListModule,
  MatSliderModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class MimeMaterialModule {}
