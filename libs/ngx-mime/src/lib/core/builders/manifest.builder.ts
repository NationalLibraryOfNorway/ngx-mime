import { Manifest, Sequence } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { SequenceBuilder } from './sequence.builder';
import { ServiceBuilder } from './service.builder';
import { MetadataBuilder } from './metadata.builder';
import { StructureBuilder } from './structure.builder';
import { TileSourceBuilder } from './tile-source.builder';

export class ManifestBuilder {
  constructor(private data: any) {}

  build(): Manifest {
    const sequences: Sequence[] = new SequenceBuilder(
      this.data.sequences
    ).build();

    return new Manifest({
      context: BuilderUtils.extractContext(this.data),
      type: BuilderUtils.extracType(this.data),
      id: BuilderUtils.extractId(this.data),
      viewingDirection: BuilderUtils.extractViewingDirection(this.data),
      label: this.data.label,
      metadata: new MetadataBuilder(this.data.metadata).build(),
      license: this.data.license,
      logo: this.data.logo,
      attribution: this.data.attribution,
      service: new ServiceBuilder(this.data.service).build(),
      sequences: sequences,
      structures: new StructureBuilder(this.data.structures, sequences).build(),
      tileSource: new TileSourceBuilder(this.data.sequences).build(),
      viewingHint: this.data.viewingHint
    });
  }
}
