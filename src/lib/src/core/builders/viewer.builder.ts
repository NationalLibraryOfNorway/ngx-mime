import { Injectable } from '@angular/core';
import { Options } from '../models/options';
import { Service, TileSource } from '../models/manifest';

declare const OpenSeadragon: any;
@Injectable()
export class ViewerBuilder {
  private options: Options;

  create() {
    OpenSeadragon(Object.assign({}, this.options));
  }

  withOptions(options: Options): ViewerBuilder {
    this.options = options;
    return this;
  }

  withTiles(tileSources: Service[]): ViewerBuilder {
    this.options.tileSources = tileSources;
    return this;
  }
}
