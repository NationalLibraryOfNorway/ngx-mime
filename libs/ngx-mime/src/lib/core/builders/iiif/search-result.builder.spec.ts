import { a300dpiManifest, a400dpiManifest } from '../../../test/testManifest';
import { testSearchResult } from '../../../test/testSearchResult';
import { MimeViewerConfig } from '../../mime-viewer-config';
import { IiifSearchResult } from '../../models/iiif-search-result';
import { Manifest } from '../../models/manifest';
import { SearchResultBuilder } from './search-result.builder';
import { ManifestBuilder } from './v2/manifest.builder';

describe('SearchResultBuilder', () => {
  let config: MimeViewerConfig;

  beforeEach(() => {
    config = new MimeViewerConfig();
  });

  it('should build empty search result', () => {
    const q = 'testquery';
    const manifest = new Manifest({});
    const iiifSearchResult: IiifSearchResult = {};
    const searchResult = new SearchResultBuilder(
      q,
      manifest,
      iiifSearchResult,
      config
    ).build();
    expect(searchResult).not.toBeNull();
  });

  it('should return search result for 400 dpi manifest', () => {
    const q = 'america';
    const manifest = new ManifestBuilder(a400dpiManifest).build();
    const searchResult = new SearchResultBuilder(
      q,
      manifest,
      testSearchResult,
      config
    ).build();

    expect(searchResult.hits.length).toEqual(2);
    expect(searchResult.hits[0].index).toEqual(0);
    expect(searchResult.hits[0].label).toEqual('label1');
    expect(searchResult.hits[0].rects[0].x).toEqual(304);
    expect(searchResult.hits[0].rects[0].y).toEqual(1178);
    expect(searchResult.hits[0].rects[0].width).toEqual(1024);
    expect(searchResult.hits[0].rects[0].height).toEqual(137);
    expect(searchResult.hits[0].rects[0].centerX).toEqual(816);
    expect(searchResult.hits[0].rects[0].centerY).toEqual(1246.5);
  });

  it('should return search result for 300 dpi manifest', () => {
    const q = 'america';
    const manifest = new ManifestBuilder(a300dpiManifest).build();
    const searchResult = new SearchResultBuilder(
      q,
      manifest,
      testSearchResult,
      config
    ).build();

    expect(searchResult.hits.length).toEqual(2);
    expect(searchResult.hits[0].index).toEqual(0);
    expect(searchResult.hits[0].label).toEqual('label1');
    expect(searchResult.hits[0].rects[0].x).toEqual(405);
    expect(searchResult.hits[0].rects[0].y).toEqual(1570);
    expect(searchResult.hits[0].rects[0].width).toEqual(1365);
    expect(searchResult.hits[0].rects[0].height).toEqual(182);
    expect(searchResult.hits[0].rects[0].centerX).toEqual(1087.5);
    expect(searchResult.hits[0].rects[0].centerY).toEqual(1661);
  });
});
