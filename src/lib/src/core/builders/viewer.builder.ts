import { Injectable } from '@angular/core';
import { Options } from '../models/options';
import { TileSource } from '../models/manifest';

declare var OpenSeadragon: any;
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

  withTiles(tileSources: TileSource[]): ViewerBuilder {
    this.options.tileSources = tileSources;
    return this;
  }
}
