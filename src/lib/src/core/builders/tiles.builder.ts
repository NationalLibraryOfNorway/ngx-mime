import { Tile } from '../models/manifest';

export class TilesBuilder {
  constructor(private tiles: any[]) {}

  build(): Tile[] {
    const tiles: Tile[] = [];
    if (this.tiles) {
      for (let i = 0; i < this.tiles.length; i++) {
        const tile = this.tiles[i];
        tiles.push(
          new Tile({
            width: tile.width,
            scaleFactors: tile.scaleFactors
          })
        );
      }
    }
    return tiles;
  }
}
