import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { MimeDomHelper } from '../mime-dom-helper';
import { ViewerService } from '../viewer-service/viewer.service';
import { ClickService } from '../click-service/click.service';
import { PageService } from '../page-service/page-service';
import { ModeService } from '../mode-service/mode.service';
import { AccessKeysService } from './access-keys.service';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { ContentsDialogConfigStrategyFactory } from '../../contents-dialog/contents-dialog-config-strategy-factory';
import { ContentSearchDialogConfigStrategyFactory } from '../../content-search-dialog/content-search-dialog-config-strategy-factory';
import { FullscreenService } from '../fullscreen-service/fullscreen.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';
import { ViewerLayoutService } from '../viewer-layout-service/viewer-layout-service';
import { IiifContentSearchService } from '../iiif-content-search-service/iiif-content-search.service';
import { ContentSearchNavigationService } from '../navigation/content-search-navigation-service/content-search-navigation.service';

describe('AccessKeysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        AccessKeysService,
        ViewerService,
        PageService,
        ContentSearchDialogService,
        ContentsDialogConfigStrategyFactory,
        ContentSearchDialogConfigStrategyFactory,
        ClickService,
        ModeService,
        IiifManifestService,
        ContentsDialogService,
        MimeViewerIntl,
        MimeDomHelper,
        FullscreenService,
        MimeResizeService,
        ViewerLayoutService,
        IiifContentSearchService,
        ContentSearchNavigationService
      ]
    });
  });

  it('should be created', inject([AccessKeysService], (service: AccessKeysService) => {
      expect(service).toBeTruthy();
    }));
});
