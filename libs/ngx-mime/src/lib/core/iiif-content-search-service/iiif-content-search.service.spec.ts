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
  let config: MimeViewerConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IiifContentSearchService],
    });
    config = new MimeViewerConfig();
  });

  it('should be created', inject(
    [IiifContentSearchService],
    (service: IiifContentSearchService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should return a search result', inject(
    [IiifContentSearchService, HttpClient, HttpTestingController],
    fakeAsync(
      (
        svc: IiifContentSearchService,
        http: HttpClient,
        httpMock: HttpTestingController
      ) => {
        let result: SearchResult = new SearchResult();
        svc.setConfig(config);
        svc.search(
          { ...new Manifest(), service: { ...new Service(), id: 'dummyUrl' } },
          'query'
        );
        svc.onChange.subscribe((searchResult: SearchResult) => {
          result = searchResult;
        });

        httpMock.expectOne(`dummyUrl?q=query`).flush(
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
      }
    )
  ));

  it('should return a empty search result if empty q', inject(
    [IiifContentSearchService, HttpClient, HttpTestingController],
    fakeAsync(
      (
        svc: IiifContentSearchService,
        http: HttpClient,
        httpMock: HttpTestingController
      ) => {
        let result!: SearchResult;
        svc.setConfig(config);
        svc.search(new Manifest(), '');
        svc.onChange.subscribe((searchResult: SearchResult) => {
          result = searchResult;
        });

        httpMock.expectNone(`dummyUrl?q=`);
        tick();
        httpMock.verify();
        expect(result.size()).toBe(0);
      }
    )
  ));
});
