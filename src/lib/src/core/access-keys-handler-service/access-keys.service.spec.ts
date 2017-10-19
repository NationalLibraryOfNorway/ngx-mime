import { ViewerService } from '../viewer-service/viewer.service';
import { inject, TestBed } from '@angular/core/testing';
import { ContentSearchDialogService } from '../../content-search-dialog/content-search-dialog.service';
import { ClickService } from '../click-service/click.service';
import { PageService } from '../page-service/page-service';
import { ModeService } from '../mode-service/mode.service';
import { IiifManifestService } from '../iiif-manifest-service/iiif-manifest-service';
import { ContentsDialogService } from '../../contents-dialog/contents-dialog.service';
import { AccessKeysService } from './access-keys.service';
import { MimeViewerIntl } from '../intl/viewer-intl';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared/shared.module';
import { ContentsDialogConfigStrategyFactory } from '../../contents-dialog/contents-dialog-config-strategy-factory';
import { ContentSearchDialogConfigStrategyFactory } from '../../content-search-dialog/content-search-dialog-config-strategy-factory';
import { MimeDomHelper } from '../mime-dom-helper';
import { FullscreenService } from '../fullscreen-service/fullscreen.service';
import { MimeResizeService } from '../mime-resize-service/mime-resize.service';

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
        MimeResizeService
      ]
    })
  });

  it('should be created', inject([AccessKeysService], (service: AccessKeysService) => {
      expect(service).toBeTruthy();
    }));
});
