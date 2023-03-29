import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { MimeResizeService } from './../core/mime-resize-service/mime-resize.service';
import { SharedModule } from './../shared/shared.module';
import { ContentSearchDialogConfigStrategyFactory } from './content-search-dialog-config-strategy-factory';
import { ContentSearchDialogService } from './content-search-dialog.service';

describe('ContentSearchDialogService', () => {
  let service: ContentSearchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        ContentSearchDialogService,
        provideAutoSpy(MimeResizeService),
        provideAutoSpy(ContentSearchDialogConfigStrategyFactory),
      ],
    });
    service = TestBed.inject(ContentSearchDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
