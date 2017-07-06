import { Injectable } from '@angular/core';
import { Options } from '../models/options';

declare var OpenSeadragon: any;
@Injectable()
export class ViewerService {
  constructor(private options: Options) { }

  open() {
    OpenSeadragon(Object.assign({}, this.options));
  }

  close() {

  }

  setOptions(options: Options) {
    this.options = options;
  }

  setTileSources(tileSources: any[]) {
    this.options.tileSources = tileSources;
  }

  addTileSources(tileSources: any[]) {
    this.options.tileSources.concat(tileSources);
  }
}
