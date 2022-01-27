import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { IiifContentSearchService } from './iiif-content-search.service';
import { SearchResultBuilder } from './../builders/search-result.builder';
import { SearchResult } from './../models/search-result';
import { Manifest, Service } from './../models/manifest';
import { MimeViewerConfig } from '../mime-viewer-config';

describe('IiifContentSearchService', () => {
  let httpTestingController: HttpTestingController;
  let service: IiifContentSearchService;
  let config: MimeViewerConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IiifContentSearchService],
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

  it('should return a search result', fakeAsync(() => {
    let result: SearchResult = new SearchResult();

    service.search(
      { ...new Manifest(), service: { ...new Service(), id: 'dummyUrl' } },
      'query'
    );
    service.onChange.subscribe((searchResult: SearchResult) => {
      result = searchResult;
    });

    httpTestingController.expectOne(`dummyUrl?q=query`).flush(
      new SearchResultBuilder(
        'query',
        new Manifest(),
        {
          hits: [
            {
              match: 'querystring',
            },
          ],
        },
        config
      ).build()
    );
    tick();
    expect(result?.size()).toBe(1);
  }));

  it('should return a empty search result if empty q', fakeAsync(() => {
    let result!: SearchResult;

    service.search(new Manifest(), '');
    service.onChange.subscribe((searchResult: SearchResult) => {
      result = searchResult;
    });

    httpTestingController.expectNone(`dummyUrl?q=`);
    tick();
    httpTestingController.verify();
    expect(result.size()).toBe(0);
  }));

  it('should cleanup on destroy', () => {});
});
