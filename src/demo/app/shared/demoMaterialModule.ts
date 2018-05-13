import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  MatMenuModule,
  MatGridListModule,
  MatRadioModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatGridListModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class DemoMaterialModule {}
