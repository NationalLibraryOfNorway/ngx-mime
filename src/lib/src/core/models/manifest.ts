export class Manifest {
  public context: string;
  public type: string;
  public id: string;
  public label: string;
  public metadata: Metadata[];
  public license: string;
  public attribution: string;
  public service: Service;
  public sequences: Sequence[];
  public structures: Structure[];
  public tileSource: TileSource[];

  constructor(
    fields?: {
      context?: string,
      type?: string,
      id?: string,
      label?: string,
      attribution?: string,
      metadata?: Metadata[],
      tileSource?: TileSource[]
    }
  ) {
    if (fields) {
      this.context = fields.context || this.context;
      this.type = fields.type || this.type;
      this.id = fields.id || this.id;
      this.label = fields.label || this.label;
      this.attribution = fields.attribution || this.attribution;
      this.metadata = fields.metadata || this.metadata;
      this.tileSource = fields.tileSource || this.tileSource;
    }
  }
}

export class Metadata {
  constructor(
    public label: string,
    public value: string|number
  ) { }
}

export class Service {

}

export class TileSource {

}

export class Sequence {

}

export class Structure {

}
