export interface IiifSearchResult {
  resources?: Resource[];
  hits?: Hit[];
}

export interface Resource {
  '@id': string;
}

export interface Hit {
  match?: string;
  before?: string;
  after?: string;
}
