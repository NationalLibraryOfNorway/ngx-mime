import { Injectable } from '@angular/core';
import { CanvasService } from '../core/canvas-service/canvas-service';

@Injectable()
export class CanvasServiceStub extends CanvasService {
  constructor() {
    super();
    this.canvasGroupCountState.set(10);
    this.canvasCountState.set(10);
  }

  override getCanvasGroupLabel(index: number): string {
    return '' + index;
  }

  public getZoom(): number {
    return 0;
  }

  setCanvasGroupIndexChange(index: number) {
    this.canvasGroupIndexState.set(index);
  }

  setCanvasGroupCount(canvasGroupCount: number): void {
    this.canvasGroupCountState.set(canvasGroupCount);
  }
}
