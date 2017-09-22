import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogService } from './content-search-dialog.service';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';

describe('ContentSearchDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        ContentSearchDialogService,
        MimeResizeService,
        ContentSearchDialogConfigStrategyFactory
      ]
    });
  });

  it('should be created', inject([ContentSearchDialogService], (service: ContentSearchDialogService) => {
    expect(service).toBeTruthy();
  }));
});
