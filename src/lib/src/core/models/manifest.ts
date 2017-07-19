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
  public tileSource: Service[];

  constructor(
    fields?: {
      context?: string,
      type?: string,
      id?: string,
      label?: string,
      metadata?: Metadata[],
      license?: string,
      attribution?: string,
      service?: Service,
      sequences?: Sequence[],
      structures?: Structure[],
      tileSource?: Service[]
    }
  ) {
    if (fields) {
      this.context = fields.context || this.context;
      this.type = fields.type || this.type;
      this.id = fields.id || this.id;
      this.label = fields.label || this.label;
      this.metadata = fields.metadata || this.metadata;
      this.license = fields.license || this.license;
      this.attribution = fields.attribution || this.attribution;
      this.service = fields.service || this.service;
      this.sequences = fields.sequences || this.sequences;
      this.structures = fields.structures || this.structures;
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

export class Sequence {
  public id: string;
  public type: string;
  public label: string;
  public viewingHint: string;
  public canvases: Canvas[];

  constructor(
    fields?: {
      id?: string,
      type?: string,
      label?: string,
      viewingHint?: string,
      canvases?: Canvas[]
    }
  ) {
    if (fields) {
      this.id = fields.id || this.id;
      this.type = fields.type || this.type;
      this.label = fields.label || this.label;
      this.viewingHint = fields.viewingHint || this.viewingHint;
      this.canvases = fields.canvases || this.canvases;
    }
  }
}

export class Canvas {
  public id: string;
  public type: string;
  public label: string;
  public thumbnail: string;
  public height: number;
  public width: number;
  public images: Images[];

  constructor(
    fields?: {
      id?: string,
      type?: string,
      label?: string,
      thumbnail?: string,
      height?: number,
      width?: number,
      images?: Images[]
    }
  ) {
    if (fields) {
      this.id = fields.id || this.id;
      this.type = fields.type || this.type;
      this.label = fields.label || this.label;
      this.thumbnail = fields.thumbnail || this.thumbnail;
      this.height = fields.height || this.height;
      this.width = fields.width || this.width;
      this.images = fields.images || this.images;
    }
  }
}

export class Images {
  public id: string;
  public type: string;
  public motivation: string;
  public resource: Resource;
  public on: string;

  constructor(
    fields?: {
      id?: string,
      type?: string,
      motivation?: string,
      resource?: Resource,
      on?: string
    }
  ) {
    if (fields) {
      this.id = fields.id || this.id;
      this.type = fields.type || this.type;
      this.motivation = fields.motivation || this.motivation;
      this.resource = fields.resource || this.resource;
      this.on = fields.on || this.on;
    }
  }
}

export class Resource {
  public id: string;
  public type: string;
  public format: string;
  public service: Service;
  public height: number;
  public width: number;

  constructor(
    fields?: {
      id?: string,
      type?: string,
      format?: string,
      service?: Service,
      height?: number,
      width?: number
    }
  ) {
    if (fields) {
      this.id = fields.id || this.id;
      this.type = fields.type || this.type;
      this.format = fields.format || this.format;
      this.service = fields.service || this.service;
      this.height = fields.height || this.height;
      this.width = fields.width || this.width;
    }
  }
}

export class Service {
  public context: string;
  public id: string;
  public protocol: string;
  public width: number;
  public height: number;
  public sizes: Size[];
  public tiles: Tile[];
  public profile: string;
  public physicalScale: number;
  public physicalUnits: string;
  public service: Service;

  constructor(
    fields?: {
      context?: string,
      id?: string,
      protocol?: string,
      width?: number,
      height?: number,
      sizes?: Size[],
      tiles?: Tile[],
      profile?: string,
      physicalScale?: number,
      physicalUnits?: string,
      service?: Service
    }
  ) {
    if (fields) {
      this.context = fields.context || this.context;
      this.id = fields.id || this.id;
      this.protocol = fields.protocol || this.protocol;
      this.width = fields.width || this.width;
      this.height = fields.height || this.height;
      this.sizes = fields.sizes || this.sizes;
      this.tiles = fields.tiles || this.tiles;
      this.profile = fields.profile || this.profile;
      this.physicalScale = fields.physicalScale || this.physicalScale;
      this.physicalUnits = fields.physicalUnits || this.physicalUnits;
      this.service = fields.service || this.service;
    }
  }
}

export class Size {
  constructor(
    public width: number,
    public height: number
  ) { }
}

export class Tile {
  public width: number;
  public scaleFactors: number[];

  constructor(fields?: {width?: number, scaleFactors?: number[]}) {
    if (fields) {
      this.width = fields.width || this.width;
      this.scaleFactors = fields.scaleFactors || this.scaleFactors;
    }
  }
}

export class Structure {
  public id: string;
  public type: string;
  public label: string;
  public canvases: Canvas[];

  constructor(
    fields?: {
      id?: string,
      type?: string,
      label?: string,
      canvases?: Canvas[]
    }
  ) {
    if (fields) {
      this.id = fields.id || this.id;
      this.type = fields.type || this.type;
      this.label = fields.label || this.label;
      this.canvases = fields.canvases || this.canvases;
    }
  }
}

export class TileSource {

}
