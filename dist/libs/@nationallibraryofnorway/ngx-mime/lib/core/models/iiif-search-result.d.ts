export interface IiifSearchResult {
    resources?: Resource[];
    hits?: Hit[];
}
export interface Resource {
    '@id': string;
    on?: string;
}
export interface Hit {
    annotations?: string[];
    match?: string;
    before?: string;
    after?: string;
}
