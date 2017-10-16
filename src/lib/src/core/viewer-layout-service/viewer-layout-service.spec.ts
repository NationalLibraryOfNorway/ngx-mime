import { TestBed, inject } from '@angular/core/testing';
import { ObservableMedia } from '@angular/flex-layout';

import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from './viewer-layout-service';


describe('ViewerLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ViewerLayoutService,
        ObservableMedia
      ]
    });
  });

  it('should be created', inject([ViewerLayoutService], (service: ViewerLayoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should emit when ViewerLayout is toggled', inject([ViewerLayoutService], (service: ViewerLayoutService) => {
    let newLayout: ViewerLayout;
    service.onChange.subscribe((state: ViewerLayout) => newLayout = state);
    service.setLayout(ViewerLayout.ONE_PAGE);
    expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);
    service.setLayout(ViewerLayout.TWO_PAGE);
    expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);
  }));

  it('should set isPagedManifest when manifest is \'paged\'', () => {
    pending('');
  });

  it('should set layout to TWO_PAGE if manifest is \'paged\' and TWO_PAGE is set in mime-config', () => {
    pending('');
  });

  it('should set layout to ONE_PAGE if manifest is not \'paged\'', () => {
    pending('');
  });

  it('should set layout to ONE_PAGE if this is set in mime-config', () => {
    pending('');
  });

  it('should start with one-page-layout on mobile', () => {
    pending('');
  })

});
