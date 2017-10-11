import { TestBed, inject } from '@angular/core/testing';

import { ViewerLayout } from '../models/viewer-layout';
import { ViewerLayoutService } from './viewer-layout-service';


describe('ViewerLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewerLayoutService]
    });
  });

  it('should be created', inject([ViewerLayoutService], (service: ViewerLayoutService) => {
    expect(service).toBeTruthy();
  }));

  it('should emit when ViewerLayout is toggled', inject([ViewerLayoutService], (service: ViewerLayoutService) => {
    let newLayout: ViewerLayout;
    service.viewerLayoutState.subscribe((state: ViewerLayout) => newLayout = state);
    service.setState(ViewerLayout.ONE_PAGE);
    expect(newLayout).toEqual(ViewerLayout.ONE_PAGE);
    service.setState(ViewerLayout.TWO_PAGE);
    expect(newLayout).toEqual(ViewerLayout.TWO_PAGE);
}));
});
