import { BreakpointObserver } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { injectedStub } from '../../../testing/injected-stub';
import { MockBreakpointObserver } from '../../test/mock-breakpoint-observer';
import { MimeViewerConfig } from '../mime-viewer-config';
import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from './viewer-layout-service';

describe('ViewerLayoutService', () => {
  let config: MimeViewerConfig;
  let service: ViewerLayoutService;
  let breakpointObserver: MockBreakpointObserver;

  beforeEach(() => {
    config = new MimeViewerConfig();
    TestBed.configureTestingModule({
      providers: [
        ViewerLayoutService,
        { provide: BreakpointObserver, useClass: MockBreakpointObserver },
      ],
    });
    service = TestBed.inject(ViewerLayoutService);
    breakpointObserver = injectedStub(BreakpointObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Layout change', () => {
    it('should emit an event when the ViewerLayout is toggled', () => {
      let newLayout!: ViewerLayout;
      service.onChange.subscribe((state: ViewerLayout) => (newLayout = state));

      service.setLayout(ViewerLayout.ONE_PAGE);
      expect(newLayout).toBeDefined();
      expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);

      service.setLayout(ViewerLayout.TWO_PAGE);
      expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);
    });

    it('should toggle the ViewerLayout when calling toggle()', () => {
      let newLayout!: ViewerLayout;
      service.onChange.subscribe((state: ViewerLayout) => (newLayout = state));
      service.setLayout(ViewerLayout.ONE_PAGE);
      expect(newLayout).toBeDefined();
      expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);

      service.toggle();
      expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);

      service.toggle();
      expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);
    });
  });

  describe('initial layout', () => {
    it('should set the initial TWO_PAGE layout to the specified layout in mime-config', () => {
      breakpointObserver.setMatches(false);
      service.init(true);

      expect(service.layout).toEqual(ViewerLayout.TWO_PAGE);
    });

    it('should set the initial layout to ONE_PAGE on mobile or tablet in portait, regardless of mime-config', () => {
      breakpointObserver.setMatches(true);
      service.init();

      expect(service.layout).toEqual(ViewerLayout.ONE_PAGE);
    });

    it('should set the initial layout to TWO_PAGE if the manifest is paged AND we are not on mobile or tablet in portrait', () => {
      breakpointObserver.setMatches(false);
      service.init(true);

      expect(service.layout).toEqual(ViewerLayout.TWO_PAGE);
    });
  });
});
