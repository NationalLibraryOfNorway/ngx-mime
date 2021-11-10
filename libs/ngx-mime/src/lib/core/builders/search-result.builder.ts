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
            label = this.findLabel(canvasIndex);
            const on = resource.on;
            if (on) {
              const scale = this.getScale(canvasIndex);
              const coords = on.substring(on.indexOf('=') + 1).split(',');
              const rect = new Rect({
                x: this.scaleValue(coords[0], scale),
                y: this.scaleValue(coords[1], scale),
                width: this.scaleValue(coords[2], scale),
                height: this.scaleValue(coords[3], scale),
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

  private getScale(index: number): number {
    const physicalScale = this.getPhysicalScale(index);
    return Utils.getScaleFactor(physicalScale);
  }

  private getPhysicalScale(index: number): number | undefined {
    const canvas = this.getFirstSequenceCanvas(index);
    return canvas?.images?.[0].resource?.service?.service?.physicalScale;
  }

  private scaleValue(value: string, scale: number): number {
    return Math.trunc(parseInt(value, 10) * scale)
  }
}
