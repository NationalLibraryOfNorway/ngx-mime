import { TestBed } from '@angular/core/testing';
import { MediaObserver } from '@angular/flex-layout';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from './viewer-layout-service';

describe('ViewerLayoutService', () => {
  let config: MimeViewerConfig;
  let service: ViewerLayoutService;
  let mediaObserver: any;

  beforeEach(() => {
    config = new MimeViewerConfig();
    TestBed.configureTestingModule({
      providers: [ViewerLayoutService]
    });
    service = TestBed.inject(ViewerLayoutService);
    mediaObserver = TestBed.inject(MediaObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit when ViewerLayout is toggled', () => {
    let newLayout: ViewerLayout;
    service.onChange.subscribe((state: ViewerLayout) => (newLayout = state));
    service.setLayout(ViewerLayout.ONE_PAGE);
    expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);
    service.setLayout(ViewerLayout.TWO_PAGE);
    expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);
  });

  it('should set initial TWO_PAGE layout to specified layout in mime-config', () => {
    const initLayout = config.initViewerLayout;
    spyOn(mediaObserver, 'isActive').and.returnValue(false);
    service.init();

    if (initLayout === ViewerLayout.TWO_PAGE) {
      expect(service.layout === ViewerLayout.TWO_PAGE);
    }
  });

  it('should set initial layout to ONE_PAGE on mobile, regardless of mime-config', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(true);
    service.init();
    expect(service.layout).toEqual(ViewerLayout.ONE_PAGE);
  });

  it('should set initial layout to TWO_PAGE if manifest is paged AND we are not and mobile', () => {
    spyOn(mediaObserver, 'isActive').and.returnValue(false);
    service.init(true);
    expect(service.layout).toEqual(ViewerLayout.TWO_PAGE);
  });

  it('should toggle ViewerLayout when calling toggle()', () => {
    let newLayout: ViewerLayout;
    service.onChange.subscribe((state: ViewerLayout) => (newLayout = state));
    service.setLayout(ViewerLayout.ONE_PAGE);
    expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);

    service.toggle();
    expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);

    service.toggle();
    expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);
  });
});
