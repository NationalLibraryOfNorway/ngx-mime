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
  MatCardModule,
  MatSnackBarModule
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
    MatCardModule,
    MatSnackBarModule
  ]
})
export class MimeMaterialModule {}
