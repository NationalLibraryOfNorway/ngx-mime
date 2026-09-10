import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestManifests } from '../../../testing';
import { testSearchResult } from '../../test/testSearchResult';
import { MimeViewerConfig } from '../mime-viewer-config';
import { IiifContentSearchService } from './iiif-content-search.service';

describe('IiifContentSearchService', () => {
  let httpTestingController: HttpTestingController;
  let service: IiifContentSearchService;
  let config: MimeViewerConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        IiifContentSearchService,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IiifContentSearchService);
    config = new MimeViewerConfig();
    service.setConfig(config);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a search result', async () => {
    service.search(TestManifests.withContentSearchService(), 'query');
    TestBed.tick();
    httpTestingController.expectOne(`dummyUrl?q=query`).flush(testSearchResult);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.searchResult().size()).toBe(2);
  });

  it('should return a empty search result if empty q', () => {
    service.search(TestManifests.aEmpty(), '');
    httpTestingController.expectNone(`dummyUrl?q=`);

    expect(service.searchResult().size()).toBe(0);
  });

  it('should cleanup on destroy', async () => {
    service.search(TestManifests.withContentSearchService(), 'fakeQuery');
    TestBed.tick();
    httpTestingController
      .expectOne(`dummyUrl?q=fakeQuery`)
      .flush(testSearchResult);
    await TestBed.inject(ApplicationRef).whenStable();

    service.destroy();

    expect(service.selectedHit()).toBeNull();
    expect(service.searching()).toBeFalsy();
    expect(service.query()).toBe('');
    expect(service.searchResult().q).toEqual('');
    expect(service.searchResult().hits.length).toBe(0);
  });
});
