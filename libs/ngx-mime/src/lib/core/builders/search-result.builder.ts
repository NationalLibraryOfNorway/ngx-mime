import { Utils } from '../utils';
import { Hit } from './../models/hit';
import {
  Hit as IiifHit,
  IiifSearchResult,
  Resource as IiifResource,
} from './../models/iiif-search-result';
import { Canvas, Manifest, Sequence } from './../models/manifest';
import { Rect } from './../models/rect';
import { SearchResult } from './../models/search-result';

export class SearchResultBuilder {
  constructor(
    private q: string,
    private manifest: Manifest,
    private iiifSearchResult: IiifSearchResult
  ) {}

  public build(): SearchResult {
    const searchResult = new SearchResult();
    searchResult.q = this.q;
    if (this.iiifSearchResult && this.iiifSearchResult.hits) {
      this.iiifSearchResult.hits.forEach((hit: IiifHit, index: number) => {
        const id: number = index;
        let canvasIndex = -1;
        let label;
        const rects: Rect[] = [];
        if (this.manifest.sequences && this.manifest.sequences[0].canvases) {
          const resources = this.findResources(hit);
          for (const resource of resources) {
            canvasIndex = this.findSequenceIndex(resource);
            const physicalScale = this.getPhysicalScale(canvasIndex);
            const scale = Utils.getScaleFactor(physicalScale);
            label = this.findLabel(canvasIndex);
            const on = resource.on;
            if (on) {
              const coords = on.substring(on.indexOf('=') + 1).split(',');
              const rect = new Rect({
                x: Math.trunc(parseInt(coords[0], 10) * scale),
                y: Math.trunc(parseInt(coords[1], 10) * scale),
                width: Math.trunc(parseInt(coords[2], 10) * scale),
                height: Math.trunc(parseInt(coords[3], 10) * scale),
              });
              rects.push(rect);
            }
          }
        }

        searchResult.add(
          new Hit({
            id: id,
            index: canvasIndex,
            label: label,
            match: hit.match,
            before: hit.before,
            after: hit.after,
            rects: rects,
          })
        );
      });
    }
    return searchResult;
  }

  private findResources(hit: IiifHit): IiifResource[] {
    const resources: IiifResource[] = [];
    if (hit.annotations) {
      for (const annotation of hit.annotations) {
        if (this.iiifSearchResult.resources) {
          const res = this.iiifSearchResult.resources.find(
            (r: IiifResource) => r['@id'] === annotation
          );
          if (res) {
            resources.push(res);
          }
        }
      }
    }
    return resources;
  }

  private findSequenceIndex(resource: IiifResource): number {
    if (!this.manifest.sequences) {
      throw new Error('No sequences found!');
    }
    const firstSequence = this.getFirstSequence();
    const on = resource.on;
    if (on && firstSequence && firstSequence.canvases) {
      const id = on.substring(0, on.indexOf('#'));
      return firstSequence.canvases.findIndex((c) => c.id === id);
    }
    return -1;
  }

  private findLabel(index: number): string | undefined {
    if (index === -1) {
      return undefined;
    } else {
      const canvas = this.getFirstSequenceCanvas(index);
      return canvas ? canvas.label : undefined;
    }
  }

  private getFirstSequence(): Sequence | undefined {
    const sequences = this.manifest.sequences;
    return sequences ? sequences[0] : undefined;
  }

  private getFirstSequenceCanvas(index: number): Canvas | undefined {
    const firstSequence = this.getFirstSequence();
    return firstSequence && firstSequence.canvases !== undefined
      ? firstSequence.canvases[index]
      : undefined;
  }

  private getPhysicalScale(index: number): number | undefined {
    const canvas = this.getFirstSequenceCanvas(index);
    return canvas?.images?.[0].resource?.service?.service?.physicalScale;
  }
}
