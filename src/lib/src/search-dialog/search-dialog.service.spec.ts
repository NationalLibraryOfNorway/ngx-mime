import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { SearchDialogService } from './search-dialog.service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { SearchDialogConfigStrategyFactory } from './search-dialog-config-strategy-factory';

describe('SearchDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        SearchDialogService,
        MimeResizeService,
        SearchDialogConfigStrategyFactory
      ]
    });
  });

  it('should be created', inject([SearchDialogService], (service: SearchDialogService) => {
    expect(service).toBeTruthy();
  }));
});
