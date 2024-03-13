import { TestBed } from '@angular/core/testing';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { MimeDomHelper } from '../core/mime-dom-helper';
import { AttributionDialogResizeService } from './attribution-dialog-resize.service';

describe('AttributionDialogResizeService', () => {
  let service: Spy<AttributionDialogResizeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AttributionDialogResizeService,
        provideAutoSpy(MimeDomHelper),
      ],
    });
    service = TestBed.inject(
      AttributionDialogResizeService,
    ) as Spy<AttributionDialogResizeService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
