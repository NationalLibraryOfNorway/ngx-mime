import { Sequence } from '../../../models/manifest';
import { BuilderUtils } from './builder-utils';
import { CanvasBuilder } from './canvas.builder';

export class SequenceBuilder {
  constructor(private data: any) {}

  build(): Sequence[] {
    const sequences: Sequence[] = [];
    if (this.data) {
      sequences.push(
        new Sequence({
          id: BuilderUtils.extractId(this.data),
          type: 'Sequence',
          label: 'Current Page Order',
          viewingHint: BuilderUtils.extractViewingHint(this.data.behavior),
          canvases: new CanvasBuilder(this.data.items).build(),
        })
      );
    }

    return sequences;
  }
}
