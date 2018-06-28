import { Sequence } from '../models/manifest';
import { BuilderUtils } from './builder-utils';
import { CanvasBuilder } from './canvas.builder';

export class SequenceBuilder {
  constructor(private sequences: any[]) {}

  build(): Sequence[] {
    const sequences: Sequence[] = [];
    if (this.sequences) {
      for (let i = 0; i < this.sequences.length; i++) {
        const seq = this.sequences[i];
        sequences.push(
          new Sequence({
            id: BuilderUtils.extractId(seq),
            type: BuilderUtils.extracType(seq),
            label: seq.label,
            viewingHint: seq.viewingHint,
            canvases: new CanvasBuilder(seq.canvases).build()
          })
        );
      }
    }
    return sequences;
  }
}
