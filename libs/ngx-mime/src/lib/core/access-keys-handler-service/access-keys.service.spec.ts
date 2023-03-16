import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ContentSearchDialogConfigStrategyFactory } from '../../content-search-dialog/content-search-dialog-config-strategy-factory';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { InformationDialogConfigStrategyFactory } from '../../information-dialog/information-dialog-config-strategy-factory.service';
import { InformationDialogService } from '../../information-dialog/information-dialog.service';
import { SharedModule } from '../../shared/shared.module';
import { AltoServiceStub } from '../../test/alto-service-stub';
import { ViewDialogConfigStrategyFactory } from '../../view-dialog/view-dialog-config-strategy-factory';
import { ViewDialogService } from '../../view-dialog/view-dialog.service';
import { AltoService } from '../alto-service/alto.service';
import { CanvasService } from '../canvas-service/canvas-service';
import { ClickService } from '../click-service/click.service';
import { FullscreenService } from '../fullscreen-service/fullscreen.service';
import { HighlightService } from '../highlight-service/highlight.service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { MimeViewerIntl } from '../intl';
import { MimeDomHelper } from '../mime-dom-helper';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { ModeService } from '../mode-service/mode.service';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';
import { StyleService } from '../style-service/style.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { ViewerService } from '../viewer-service/viewer.service';
import { AccessKeysService } from './access-keys.service';

describe('AccessKeysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule],
      providers: [
        AccessKeysService,
        ViewerService,
        CanvasService,
        ContentSearchDialogService,
        InformationDialogConfigStrategyFactory,
        ContentSearchDialogConfigStrategyFactory,
        ClickService,
        ModeService,
        IiifManifestService,
        InformationDialogService,
        MimeViewerIntl,
        MimeDomHelper,
        FullscreenService,
        MimeResizeService,
        ViewerLayoutService,
        IiifContentSearchService,
        ContentSearchNavigationService,
        StyleService,
        HighlightService,
        ViewDialogService,
        ViewDialogConfigStrategyFactory,
        { provide: AltoService, useClass: AltoServiceStub },
      ],
    });
  });

  it('should be created', inject(
    [AccessKeysService],
    (service: AccessKeysService) => {
      expect(service).toBeTruthy();
    }
  ));
});
