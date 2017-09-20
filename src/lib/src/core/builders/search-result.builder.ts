import { Manifest } from './../models/manifest';
import { IiifSearchResult, Hit as IiifHit, Resource as IiifResource } from './../models/iiif-search-result';
import { SearchResult, Hit } from './../models/search-result';

export class SearchResultBuilder {

  constructor(private q: string, private manifest: Manifest, private iiifSearchResult: IiifSearchResult) { }

  public build(): SearchResult {
    const searchResult = new SearchResult();
    searchResult.q = this.q;
    const hits: Hit[] = [];
    if (this.iiifSearchResult.hits) {
      this.iiifSearchResult.hits.forEach((hit: IiifHit, index: number) => {
        let canvasIndex = -1;
        let label = null;
        if (this.manifest.sequences && this.manifest.sequences[0].canvases) {
          const resource = this.findResource(hit);
          canvasIndex = this.findSequenceIndex(resource);
          label = this.findLabel(canvasIndex);
        }

        searchResult.add(new Hit({
          index: canvasIndex,
          label: label,
          match: hit.match,
          before: hit.before,
          after: hit.after
        }));
      });
      return searchResult;
    }
  }

  private findResource(hit: IiifHit): IiifResource {
    const res = this.iiifSearchResult.resources.find((r: IiifResource) => r['@id'] === hit.annotations[0]);
    return res;
  }

  private findSequenceIndex(resource: IiifResource): number {
    const firstSequence = this.manifest.sequences[0];
    const on = resource.on;
    const id = on.substring(0, on.indexOf('#'));
    return firstSequence.canvases.findIndex(c => c.id === id);
  }

  private findLabel(index: number): string {
    return this.manifest.sequences[0].canvases[index].label;
  }

}
