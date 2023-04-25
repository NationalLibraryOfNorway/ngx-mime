import { TestBed } from '@angular/core/testing';
import { provideAutoSpy } from 'jasmine-auto-spies';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { InformationDialogService } from '../../information-dialog/information-dialog.service';
import { SharedModule } from '../../shared/shared.module';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { AltoService } from '../alto-service/alto.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeDomHelper } from '../mime-dom-helper';
import { ModeService } from '../mode-service/mode.service';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { ViewerService } from '../viewer-service/viewer.service';
import { AccessKeysService } from './access-keys.service';

describe('AccessKeysService', () => {
  let service: AccessKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        AccessKeysService,
        provideAutoSpy(ViewerService),
        provideAutoSpy(CanvasService),
        provideAutoSpy(ModeService),
        provideAutoSpy(IiifManifestService),
        provideAutoSpy(IiifContentSearchService),
        provideAutoSpy(ContentSearchDialogService),
        provideAutoSpy(InformationDialogService),
        provideAutoSpy(ViewDialogService),
        provideAutoSpy(MimeDomHelper),
        provideAutoSpy(ContentSearchNavigationService),
        provideAutoSpy(AltoService),
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AccessKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
