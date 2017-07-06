import { Injectable } from '@angular/core';
import { Options } from '../models/options';
import { TileSource } from '../models/manifest';

declare var OpenSeadragon: any;
@Injectable()
export class ViewerService {
  private options: Options;

  createViewer() {
    console.log(Object.assign({}, this.options));
    OpenSeadragon(Object.assign({}, this.options));
  }

  withOptions(options: Options): ViewerService {
    this.options = options;
    return this;
  }

  withTiles(tileSources: TileSource[]): ViewerService {
    this.options.tileSources = tileSources;
    return this;
  }
}
