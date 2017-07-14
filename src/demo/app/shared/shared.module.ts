import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MimeModule } from 'ngx-mime';

import { DemoMaterialModule } from './demoMaterialModule';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      FlexLayoutModule,
      DemoMaterialModule,
      MimeModule
    ],
    declarations: [
    ],
    exports: [
      CommonModule,
      FormsModule,
      FlexLayoutModule,
      DemoMaterialModule,
      MimeModule
    ]
})
export class SharedModule { }
