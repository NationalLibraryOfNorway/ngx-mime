import { SearchResult } from './../models/search-result';
import { SearchResultBuilder } from './search-result.builder';

describe('SearchResultBuilder', () => {

  it('should build empty search result', () => {
    const searchResult = new SearchResultBuilder({}).build();
    expect(searchResult).not.toBeNull();
  });

});
