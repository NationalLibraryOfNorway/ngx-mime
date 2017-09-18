import { IiifSearchResult } from './../models/iiif-search-result';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';
import { SearchResultBuilder } from './search-result.builder';

describe('SearchResultBuilder', () => {

  it('should build empty search result', () => {
    const manifest = new Manifest({});
    const iiifSearchResult: IiifSearchResult = {};
    const searchResult = new SearchResultBuilder(manifest, iiifSearchResult).build();
    expect(searchResult).not.toBeNull();
  });

  it('should return search result', () => {
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
    ]});
    const iiifSearchResult: IiifSearchResult = {
      resources: [
        {
          '@id': 'rid2#xywh=968,1062,321,78"',
          on: 'canvasid2#xywh=968,1062,321,78'
        }
      ],
      hits: [
        {
          annotations: ['rid2#xywh=968,1062,321,78"']
        }
      ]
    };
    const searchResult = new SearchResultBuilder(manifest, iiifSearchResult).build();
    expect(searchResult.hits[0].index).toEqual(1);
    expect(searchResult.hits[0].label).toEqual('label2');
  });

});
