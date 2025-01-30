import { Manifest, Sequence } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { MetadataBuilder } from './metadata.builder';
import { SequenceBuilder } from './sequence.builder';
import { ServiceBuilder } from './service.builder';
import { StructureBuilder } from './structure.builder';
import { TileSourceBuilder } from './tile-source.builder';

export class ManifestBuilder {
  constructor(private data: any) {}

  build(): Manifest {
    const sequences: Sequence[] = new SequenceBuilder(this.data).build();

    const manifest = new Manifest({
      context: BuilderUtils.extractContext(this.data),
      type: BuilderUtils.extracType(this.data),
      id: BuilderUtils.extractId(this.data),
      viewingDirection: BuilderUtils.extractViewingDirection(this.data),
      label: BuilderUtils.extractLanguageValue(this.data.label),
      metadata: new MetadataBuilder(this.data.metadata).build(),
      license: this.data.rights,
      logo: BuilderUtils.extractLogo(this.data.provider),
      attribution: BuilderUtils.extractLanguageValue(
        this.data.requiredStatement?.value,
      ),
      service: new ServiceBuilder(this.data.service).build(),
      sequences: sequences,
      structures: new StructureBuilder(this.data.structures, sequences).build(),
      tileSource: new TileSourceBuilder(this.data.items).build(),
      viewingHint: BuilderUtils.extractViewingHint(this.data.behavior),
    });

    return manifest;
  }
}
