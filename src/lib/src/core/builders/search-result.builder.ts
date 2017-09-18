import { IiifSearchResult } from './../models/iiif-search-result';
import { SearchResult, Hit } from './../models/search-result';

export class SearchResultBuilder {

  constructor(private iiifSearchResult: IiifSearchResult) { }

  public build(): SearchResult {
    const searchResult = new SearchResult();
    const hits: Hit[] = [];
    if (this.iiifSearchResult.hits) {
      for (const iiifHit of this.iiifSearchResult.hits) {
        searchResult.add(new Hit({
          match: iiifHit.match,
          before: iiifHit.before,
          after: iiifHit.after
        }));
      }
    }
    return searchResult;
  }
}
