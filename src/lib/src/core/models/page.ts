declare const OpenSeadragon: any;

export class Page {
  constructor(
    public pageIndex: number,
    public tileSource: any,
    public masterWidth: number,
    public masterHeight: number
  ) { }

  getBounds() {
    //this.bounds = new OpenSeadragon.Rect(0, 0, config.masterWidth, config.masterHeight);
    return new OpenSeadragon.Rect(0, 0, this.masterWidth, this.masterHeight);
  }
}
