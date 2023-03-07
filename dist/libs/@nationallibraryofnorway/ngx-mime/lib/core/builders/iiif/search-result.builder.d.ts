import { MimeViewerConfig } from '../../mime-viewer-config';
import { IiifSearchResult } from './../../models/iiif-search-result';
import { Manifest } from './../../models/manifest';
import { SearchResult } from './../../models/search-result';
export declare class SearchResultBuilder {
    private q;
    private manifest;
    private iiifSearchResult;
    private config;
    constructor(q: string, manifest: Manifest, iiifSearchResult: IiifSearchResult, config: MimeViewerConfig);
    build(): SearchResult;
    private findResources;
    private findSequenceIndex;
    private findLabel;
    private getFirstSequence;
    private getFirstSequenceCanvas;
    private getScale;
    private getPhysicalScale;
    private scaleValue;
}
//# sourceMappingURL=search-result.builder.d.ts.map