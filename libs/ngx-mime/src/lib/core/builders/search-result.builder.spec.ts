import { IiifSearchResult } from './../models/iiif-search-result';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';
import { SearchResultBuilder } from './search-result.builder';

describe('SearchResultBuilder', () => {
  it('should build empty search result', () => {
    const q = 'testquery';
    const manifest = new Manifest({});
    const iiifSearchResult: IiifSearchResult = {};
    const searchResult = new SearchResultBuilder(
      q,
      manifest,
      iiifSearchResult
    ).build();
    expect(searchResult).not.toBeNull();
  });

  it('should return search result', () => {
    const q = 'testquery';
    const manifest = new Manifest({
      sequences: [
        {
          canvases: [
            {
              id: 'canvasid1',
              label: 'label1'
            },
            {
              id: 'canvasid2',
              label: 'label2'
            }
          ]
        }
      ]
    });
    const iiifSearchResult: IiifSearchResult = {
      resources: [
        {
          '@id': 'rid2#xywh=968,1062,321,78',
          on: 'canvasid2#xywh=968,1062,321,78'
        },
        {
          '@id': 'rid2#xywh=1968,11062,1321,178',
          on: 'canvasid2#xywh=1968,11062,1321,178'
        }
      ],
      hits: [
        {
          annotations: [
            'rid2#xywh=968,1062,321,78',
            'rid2#xywh=1968,11062,1321,178'
          ]
        }
      ]
    };
    const searchResult = new SearchResultBuilder(
      q,
      manifest,
      iiifSearchResult
    ).build();
    expect(searchResult.hits[0].rects.length).toEqual(2);
    expect(searchResult.hits[0].index).toEqual(1);
    expect(searchResult.hits[0].label).toEqual('label2');
    expect(searchResult.hits[0].rects[0].x).toEqual(968);
    expect(searchResult.hits[0].rects[0].y).toEqual(1062);
    expect(searchResult.hits[0].rects[0].width).toEqual(321);
    expect(searchResult.hits[0].rects[0].height).toEqual(78);
    expect(searchResult.hits[0].rects[0].centerX).toEqual(1128.5);
    expect(searchResult.hits[0].rects[0].centerY).toEqual(1101);
  });
});
