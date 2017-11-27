import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { IiifContentSearchService } from './iiif-content-search.service';
import { SearchResultBuilder } from './../builders/search-result.builder';
import { SearchResult } from './../models/search-result';
import { Manifest } from './../models/manifest';

describe('IiifContentSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IiifContentSearchService
      ]
    });
  });

  it('should be created', inject([IiifContentSearchService], (service: IiifContentSearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a search result', inject([IiifContentSearchService, HttpClient, HttpTestingController],
    fakeAsync((svc: IiifContentSearchService, http: HttpClient, httpMock: HttpTestingController) => {
    let result: SearchResult = null;

    svc.search({
      service: {
        id: 'dummyUrl'
      }
    }, 'query');
    svc.onChange.subscribe((searchResult: SearchResult) => {
      result = searchResult;
    });

    httpMock.expectOne(`dummyUrl?q=query`)
      .flush(new SearchResultBuilder('query', new Manifest(), {
        hits: [
          {
            match: 'querystring'
          }
        ]
      }).build());
    tick();
    expect(result.size()).toBe(1);

  })));

});
