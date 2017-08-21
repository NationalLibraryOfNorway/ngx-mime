import { TestBed, inject } from '@angular/core/testing';

import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MimeMaterialModule } from './../shared/mime-material.module';
import { ContentsDialogService } from './contents-dialog.service';
import { IiifManifestService } from './../core/iiif-manifest-service/iiif-manifest-service';

describe('ContentsDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MimeMaterialModule,
        SharedModule,
        HttpClientModule
      ],
      providers: [
        ContentsDialogService,
        IiifManifestService
      ]
    });
  });

  it('should be created', inject([ContentsDialogService], (service: ContentsDialogService) => {
    expect(service).toBeTruthy();
  }));
});
