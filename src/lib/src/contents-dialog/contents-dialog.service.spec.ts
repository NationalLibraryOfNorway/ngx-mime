import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { ContentsDialogService } from './contents-dialog.service';

describe('ContentsDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        ContentsDialogService
      ]
    });
  });

  it('should be created', inject([ContentsDialogService], (service: ContentsDialogService) => {
    expect(service).toBeTruthy();
  }));
});
