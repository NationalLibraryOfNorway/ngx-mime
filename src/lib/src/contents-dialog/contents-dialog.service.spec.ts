import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { MimeMaterialModule } from './../shared/mime-material.module';
import { ContentsDialogService } from './contents-dialog.service';

describe('ContentsDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MimeMaterialModule,
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
