import { IiifSearchResult } from './../models/iiif-search-result';
import { Manifest } from './../models/manifest';
import { SearchResult } from './../models/search-result';
export declare class SearchResultBuilder {
    private q;
    private manifest;
    private iiifSearchResult;
    constructor(q: string, manifest: Manifest, iiifSearchResult: IiifSearchResult);
    build(): SearchResult;
    private findResources;
    private findSequenceIndex;
    private findLabel;
    private getFirstSequence;
    private getFirstSequenceCanvas;
}
