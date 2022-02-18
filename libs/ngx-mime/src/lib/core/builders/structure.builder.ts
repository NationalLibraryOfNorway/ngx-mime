import { Structure, Sequence } from '../models/manifest';
import { BuilderUtils } from './builder-utils';

export class StructureBuilder {
  constructor(private structures: any[], private sequences: Sequence[]) {}

  build(): Structure[] {
    const structures: Structure[] = [];
    if (this.structures) {
      for (let i = 0; i < this.structures.length; i++) {
        const structure = this.structures[i];
        structures.push(
          new Structure({
            id: BuilderUtils.extractId(structure),
            type: BuilderUtils.extracType(structure),
            label: structure.label,
            canvases: structure.canvases,
            canvasIndex: BuilderUtils.findCanvasIndex(
              structure.canvases,
              this.sequences
            ),
          })
        );
      }
    }
    return structures;
  }
}
